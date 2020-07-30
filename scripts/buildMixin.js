const path = require('path');
const buildSassMixin = require('../utils/scss/buildSassMixins');
const {argv} = require('yargs');

const dataFile = argv.generatorFile;

const mixinData = require(path.join(process.cwd(), dataFile));

buildSassMixin(mixinData);