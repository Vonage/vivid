import os from 'os';
import { exec } from 'child_process';
import standardVersion from 'standard-version';

standardVersion({
	bumpFiles: [{ filename: 'lerna.json', type: 'json' }],
	packageFiles: [{ filename: 'lerna.json', type: 'json' }],
	skip: {
		bump: true,
		commit: true,
		tag: true
	}
}).then(r => {
	console.log(r);
}).catch(err => {
	console.error(`standard-version failed with message: ${err.message}`)
})