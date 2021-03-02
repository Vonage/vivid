export {
	sequentalData
}

function sequentalData(rowBlueprint, totalRows) {
	const result = new Array(totalRows);
	const bpMap = Object.entries(rowBlueprint);
	for (let i = 0; i < totalRows; i++) {
		const row = {};
		for (const [key, value] of bpMap) {
			row[key] = `${value.replace('{i}', i)}`;
		}
		result[i] = row;
	}
	return result;
}