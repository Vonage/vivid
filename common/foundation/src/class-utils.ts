/**
 * translates a plain 'object' into an array of classes (DOM)
 * class names are taken from keys
 * only a truthy valued keys taken
 *
 * @param input {object} - non-null, map of classes (keys) and their conditional toggles (via values)
 * @returns - an array of approved classes, order is NOT promised
 */
export function spreadObjectToClasses(input: Record<string, unknown>): Array<string> {
	if (!input || typeof input !== 'object') {
		console.error(`unexpected input; non-null object expected but got '${input}'`);
		return [];
	}
	return Object
		.entries(input)
		.filter(entryPair => entryPair[1])
		.map(entryPair => entryPair[0]);
}