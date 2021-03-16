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
			role: 'Admin',
			name: {
				first: 'Fabien',
				last: 'Le gall'
			},
			city: 'Nanterre',
			email: 'fabien.legall@example.com',
			username: 'goldenlion501'
		}, {
			role: 'Admin',
			name: {
				first: 'Ruben',
				last: 'Leclercq'
			},
			city: 'Clermont-Ferrand',
			email: 'ruben.leclercq@example.com',
			username: 'crazymouse343'
		},
		{
			role: 'Editor',
			name: {
				first: 'Kelya',
				last: 'Roy'
			},
			city: 'Avignon',
			email: 'kelya.roy@example.com',
			username: 'tinymouse185'
		}, {
			role: 'Editor',
			name: {
				first: 'Roxane',
				last: 'Guillaume'
			},
			city: 'Marseille',
			email: 'roxane.guillaume@example.com',
			username: 'redswan463'
		}, {
			role: 'Editor',
			name: {
				first: 'Marius',
				last: 'Moulin'
			},
			city: 'Mulhouse',
			email: 'marius.moulin@example.com',
			username: 'ticklishduck726'
		},
		{
			role: 'Subscriber',
			name: {
				first: 'Nina',
				last: 'Barbier'
			},
			city: 'Versailles',
			email: 'nina.barbier@example.com',
			username: 'orangemouse715'
		}, {
			role: 'Subscriber',
			name: {
				first: 'Marceau',
				last: 'Lucas'
			},
			city: 'Strasbourg',
			email: 'marceau.lucas@example.com',
			username: 'beautifulfish844'
		}
	];
}