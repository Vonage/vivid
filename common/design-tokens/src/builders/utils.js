import fs from 'fs';

export function removeFolderSafely(outputFolder) {
	if (fs.existsSync(outputFolder)) {
		fs.rmdirSync(outputFolder, { recursive: true });
		return true;
	}
	return false;
}
