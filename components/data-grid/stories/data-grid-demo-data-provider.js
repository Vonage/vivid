export {
	sequentalData,
	treeData
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

function treeData() {
	return [
		{
			name: "Admins", children: [
				{
					name: {
						first: "fabien",
						last: "le gall"
					},
					city: "nanterre",
					email: "fabien.legall@example.com",
					username: "goldenlion501"
				}, {
					name: {
						first: "ruben",
						last: "leclercq"
					},
					city: "clermont-ferrand",
					email: "ruben.leclercq@example.com",
					username: "crazymouse343"
				}
			]
		},
		{
			name: "Editors", children: [
				{
					name: {
						first: "kelya",
						last: "roy"
					},
					city: "avignon",
					email: "kelya.roy@example.com",
					username: "tinymouse185"
				}, {
					name: {
						first: "roxane",
						last: "guillaume"
					},
					city: "marseille",
					email: "roxane.guillaume@example.com",
					username: "redswan463"
				}, {
					name: {
						first: "marius",
						last: "moulin"
					},
					city: "mulhouse",
					email: "marius.moulin@example.com",
					username: "ticklishduck726"
				}
			]
		},
		{
			name: "Subscribers", children: [
				{
					name: {
						first: "nina",
						last: "barbier"
					},
					city: "versailles",
					email: "nina.barbier@example.com",
					username: "orangemouse715"
				}, {
					name: {
						first: "marceau",
						last: "lucas"
					},
					city: "strasbourg",
					email: "marceau.lucas@example.com",
					username: "beautifulfish844"
				}
			]
		}
	];
}