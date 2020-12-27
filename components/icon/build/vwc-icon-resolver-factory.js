import path from "path";
import kefir from "kefir";
import aws from "aws-sdk";
import parseArgs from "minimist";
import { createHash } from "crypto";
import { readdir, readFile, writeFile, mkdir } from "fs";

const
	S3_UPLOAD_CONCURRENCY = 10,
	DEFAULT_BASE_URL = "https://d1zxmm6snown09.cloudfront.net",  //Dev
	DEFAULT_OUTPUT_FOLDER = "./src",
	DEFAULT_ICON_FOLDER = "./build/icon",
	DEFAULT_SKIP = false,
	DEFAULT_RESOLVE_STRATEGY = "esm", // cdn/esm
	DEFAULT_CDN_CACHE_CONTROL = "public, max-age=604800";

const
	{
		awsAccessKey,
		awsAccessSecret,
		awsBucketName,
		awsSkipUpload = DEFAULT_SKIP,
		awsBaseUrl = DEFAULT_BASE_URL,
		iconFolder = DEFAULT_ICON_FOLDER,
		outputFolder = DEFAULT_OUTPUT_FOLDER,
		resolveStrategy = DEFAULT_RESOLVE_STRATEGY
	} = parseArgs(process.argv.slice(2), { alias: { "skip": "awsSkipUpload" } }),
	log = (message)=> console.log(["✓", message].join(' ')),
	warn = (message)=> console.warn(["✘", message].join(' '));

const
	baseDir = (filename)=> path.resolve(...[iconFolder, filename].filter(Boolean)),
	sha256 = (text)=>{
		const hasher = createHash('sha256');
		hasher.update(text);
		return hasher.digest('hex');
	};

const iconStream = kefir
	.fromNodeCallback((cb)=> readdir(baseDir(), cb))
	.flatten()
	.filter((filename)=> path.extname(filename.toLowerCase()) === ".svg")
	.map(baseDir)
	.flatMap((filename)=> {
		return kefir
			.fromNodeCallback((cb) => readFile(filename, 'utf8', cb))
			.map((content)=> ({ content, filename }));
	});

const createAwsResolver = function({ awsAccessKey, awsAccessSecret, awsBucketName, awsSkipUpload }){
	const pushToS3Bucket = (iconStream)=> {
		const s3 = new aws.S3({ secretAccessKey: awsAccessSecret, accessKeyId: awsAccessKey });
		return iconStream
			.flatMapConcurLimit(
				({ filename, content })=> {
					return kefir
						.fromNodeCallback((cb) => s3.upload({
							Bucket: awsBucketName,
							Key: [sha256(content), "svg"].join('.'),
							Body: content,
							ContentType: "image/svg+xml",
							CacheControl: DEFAULT_CDN_CACHE_CONTROL
						}, cb))
						.map(({ Location: location, ETag: etag, key })=> ({ filename, content, location, etag, key }))
				}, S3_UPLOAD_CONCURRENCY);
	};

	const generateResolver = (iconStream)=>
		iconStream
			.scan((manifest, { filename, content })=> Object.assign(manifest, { [filename.match(/([^/]+)\..+$/)[1]]: [sha256(content), "svg"].join('.') }), {})
			.last()
			.map((resourceMap)=> {
				return [
					`const resourceMap = ${JSON.stringify(resourceMap)};`,
					`export default function(iconId){ const resourceLocation = resourceMap[iconId]; return resourceLocation ? fetch(["${awsBaseUrl}", resourceLocation].join('/')).then((res)=> res.text()) : Promise.reject("Icon [" + iconId + "] not found"); };`
				].join('\n');
			});

	return (iconStream)=> {
		return kefir.merge([
			!awsSkipUpload && iconStream.thru(pushToS3Bucket).map(({ key })=> ({ type: "log", value: `${key} successfully uploaded` })),
			iconStream.thru(generateResolver).map((code)=> ({ type: "code", value: code }))
		].filter(Boolean));
	};
};
const createDynamicResolver = function(){
	const RELATIVE_MODULE_PATH = "icon";
	const
		baseModulePath = path.resolve(process.cwd(), outputFolder, RELATIVE_MODULE_PATH),
		esModuleTemplate = (svgContent)=>  `export default function(){ return \`${svgContent.replace(/`,/g, '\\``')}\`; }`;

	return (iconStream)=> {
		return kefir.concat([
			kefir
				.fromNodeCallback((cb)=> mkdir(baseModulePath, cb))
				.flatMapErrors(({ code, ...err })=> kefir[code === "EEXIST" ? "never" : "constantError"]({ code, ...err }))
				.ignoreValues(),
			iconStream
				.flatMapConcurLimit(({ content, filename })=> {
					const moduleName = `${path.basename(filename, path.extname(filename))}.js`;
					return kefir
						.fromNodeCallback((cb)=> writeFile(path.join(baseModulePath, moduleName), esModuleTemplate(content), cb))
						.map(()=> ({ type: "debug", value: `"${moduleName}" module was created successfully` }));
				}, 5)
				.beforeEnd(()=>({
						type: "code",
						value: `export default function(iconId){ return import('./${RELATIVE_MODULE_PATH}/' + iconId + ".js").then(({ default: f })=> f()); }`
				}))
		]);
	};
}

const processStream = iconStream
	.thru((({ "cdn": createAwsResolver, "esm": createDynamicResolver })[resolveStrategy] || (()=> ()=> kefir.never()))({ awsAccessKey, awsAccessSecret, awsBucketName, awsSkipUpload }))
	.takeErrors(1);

kefir
	.merge([
		processStream
			.filter(({ type })=> type === "code")
			.map(({ value })=> value)
			.take(1)
			.flatMap((code)=> kefir.fromNodeCallback((cb)=> writeFile(path.resolve(process.cwd(), outputFolder, 'icon-resolve.autogenerated.js'), code, cb)))
			.map(()=> `Icon resolver module created successfully!`),
		processStream
			.filter(({ type })=> type === "log")
			.map(({ value })=> value)
	])
	.onValue(log)
	.onError((message)=> {
		warn(message);
		process.exit(1);
	});