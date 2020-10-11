#!/usr/bin/env node
const
	_ = require('lodash'),
	fs = require('fs'),
	ts = require('typescript');

const config = JSON.parse(fs.readFileSync('../../tsconfig.json', 'utf8'));
//const content = fs.readFileSync('./src/vwc-fab.ts', 'utf8');
//const res = ts.transpileModule(content, config);

const host = ts.createCompilerHost({});
host.writeFile = (filename, data, writeByteOrderMark, onError, sourceFiles)=>{
	console.log(filename, '\n', data, '\n');
};

//console.log(ts.ModuleResolutionKind.NodeJs);

const program = ts.createProgram(['./src/vwc-fab.ts'],  _.omit(config.compilerOptions, 'moduleResolution'), host);
let emitResult = program.emit();
console.log(emitResult);