#!/usr/bin/env node
/* eslint-disable */
const glob = require('glob');
process.stdout.end(glob.sync(process.argv[2]).join(' '));
