const
	_ = require('lodash'),
	fp = require('lodash/fp'),
	glob = require('glob'),
	kefir = require('kefir'),
	split = require('split'),
	chalk = require('chalk'),
	chokidar = require('chokidar'),
	minimatch = require('minimatch'),
	{ spawn } = require('child_process'),
	{ readFile } = require('fs'),
	{ pipeline } = require('stream'),
	{ dirname, sep, join: joinPath } = require('path'),
	{ createHash } = require('crypto');

const stringValue = (text)=> createHash('md5').update(text).digest()[0];
const globFunction = (pattern)=> (filename)=> minimatch(filename, pattern, { matchBase: true });
const readFileStream = (filename)=> kefir.fromNodeCallback((cb)=> readFile(filename, 'utf8', cb));

const
	SECOND = 1000,
	COLORS = ["blue", "yellow", "cyan", "green", "orange"],
	DEFAULT_ROOT_FOLDERS = ["common", "components"],
	DEFAULT_IGNORE_PATHS = ["**/node_modules/**", "./.*"],
	DEFAULT_DEBOUNCE_SCOPE_ACTION = 0.8 * SECOND;

const EXECUTION_PLAN = [
	{
		name: "styles",
		patterns: fp.overSome(["*.sass", "*.scss"].map(globFunction)),
		commandLine: (scopes)=> ["lerna", ["run", "build:styles", ...scopes.flatMap((scope)=> ["--scope", scope])]],
		delayBy: SECOND
	},
	{
		name: "typescript",
		patterns: (filename)=> /(?<!\.d)\.ts$/i.test(filename),
		commandLine: (scopes)=> ["lerna", ["run", "build:typescript", ...scopes.flatMap((scope)=> ["--scope", scope])]],
		delayBy: 3 * SECOND
	}
];

const rootFoldersProperty = kefir
	.concat([
		readFileStream('./package.json')
			.map(fp.pipe(JSON.parse, fp.get('workspaces')))
			.flatMap((workspaceGlobs)=> kefir.combine(workspaceGlobs.map((g)=> kefir.fromNodeCallback((cb)=> glob(g, {}, cb))), fp.concat))
			.ignoreErrors(),
		kefir.constant(DEFAULT_ROOT_FOLDERS)
	])
	.take(1)
	.toProperty();

const fsActivityStream = rootFoldersProperty
	.flatMapLatest((rootFolders)=> {
		const watcher = chokidar
			.watch(rootFolders, {
				ignored: DEFAULT_IGNORE_PATHS,
				followSymlinks: false,
				persistent: true,
				ignoreInitial: true
			}, 'all');

		return kefir
			.merge([
				kefir.fromEvents(watcher, 'all', fp.rest(_.identity)),
				kefir.fromEvents(watcher, 'error').flatMap(kefir.constantError),
			])
			.map(([eventName, filepath])=> ({ eventName, filepath }))
			.filter(fp.pipe(fp.get('filepath'), fp.overSome(EXECUTION_PLAN.map(fp.get('patterns')))))
	});

const scopeActivityStream = fsActivityStream.flatMap(({ filepath })=>{
	return kefir
		.concat(
			dirname(filepath)
				.split(sep)
				.map(
					fp.pipe(
						(part, index, allParts)=> allParts.slice(0, allParts.length - index).join(sep),
						fp.unary(fp.partial(joinPath, [fp, 'package.json'])),
						(candidateFile)=> readFileStream(candidateFile).map(JSON.parse)
					)
				)
		)
		.ignoreErrors()
		.beforeEnd(fp.noop)
		.take(1)
		.map(fp.pipe(
			fp.get('name'),
			(scope)=> ({ scope, filename: filepath })
		));
});

const workerLog = kefir
	.merge(
		EXECUTION_PLAN.map(({ name, patterns, commandLine, delayBy })=>{
			const executionScopeStream = scopeActivityStream.filter(fp.pipe(fp.get('filename'), patterns));
			return executionScopeStream
				.bufferBy(scopeActivityStream.debounce(delayBy ?? DEFAULT_DEBOUNCE_SCOPE_ACTION))
				.map(fp.pipe(fp.map('scope'), fp.uniq, fp.compact))
				.filter(fp.negate(fp.isEmpty))
				.flatMapConcat((scopes)=>{
					return kefir.concat([
						kefir.constant(chalk.bold(`Starting execution for scopes ${_.truncate(scopes.join(',', 30))} (${scopes.length} in total)`)),
						kefir
							.stream(({ emit, error, end })=>{
								const process = spawn(...commandLine(scopes), { stdio: [0, 'pipe', 'pipe'] });
								process.on('exit', end);
								process.on('error', error);

								const lineStream = pipeline(process.stdout, split(), _.noop)
								const lineErrorStream = pipeline(process.stderr, split(), _.noop)
								lineStream.on('data', emit);
								lineErrorStream.on('data', emit);

								return ()=> {
									process.off('exit', end);
									process.off('error', error);
									lineStream.off('data', emit);
									lineErrorStream.off('data', emit);
								};
							})
							.takeErrors(1)
							.map((line)=> ["  ", line].join(''))
					])
				})
				.map((message)=> [chalk[COLORS[stringValue(name) % COLORS.length]](name), message].join(': '));
		})
	);

kefir
	.merge([
		rootFoldersProperty.map((folders)=> chalk.bgGreen(` Listening at folders "${_.truncate(folders.join(', '), 50)}" `)),
		workerLog
	])
	.onValue(console.log);