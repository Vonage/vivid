import os from 'os';
import { exec } from 'child_process';

const logExtractor = exec(`git log --tags --format="%d %s" --max-count=100`);
logExtractor.stdout.on('data', chunk => {
	const { commits, reminder } = parseGitLogChunk(chunk);
});

/**
 * results in object having:
 * - an array of parsed commits
 * - a leftover that should be kept for the next chunk
 */
function parseGitLogChunk(chunk) {
	const result = { commits: [], reminder: '' };

	for (const line of chunk.split(os.EOL)) {
		if (!line) {
			continue;
		}
		console.log(`-- ${line} --`);
	}

	return result;
}