export {
	getColumns,
	getItems,
};

const getColumns = () => {
	return [
		{ path: 'x', header: 'A' },
		{ path: 'y', header: 'B' },
		{ path: 'z', header: 'C' }
	];
};

const getItems = (n) => {
	return new Array(n).fill(0).map((_, i) => {
		return { x: i, y: `text ${i}`, z: true };
	});
};
