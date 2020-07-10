export const tileGeneration = (count, width, height) => {
	let output = [];

	for (let i = 0; i < count; i++) {
		let xСoordinate = Math.floor(Math.random() * width);
		let yСoordinate = Math.floor(Math.random() * height);

		output.push({
			x: xСoordinate,
			y: yСoordinate,
			value: 2,
		});
	}

	return output;
};

export const cellsGeneration = (width, height) => {
	let result = [];

	for (let i = 0; i < height; i++) {
		result.push([]);
		for (let j = 0; j < width; j++) {
			result[i].push(0);
		}
	}

	return result;
};

export const full = (state) => state.every((rows) => rows.every(Boolean));

export const equal = (firstState, secondState) =>
	firstState.every((row, i) => row.every((cell, j) => cell === secondState[i][j]));

export const scoring = (state) => {
	let result = 0;

	for (let i = 0; i < state.length; i++) {
		result += state[i].reduce((acc, value) => acc + value);
	}

	return result;
};

export const random = (count, width, height) => {
	let output = [];

	// TODO
	for (let i = 0; i < count; i++) {
		let xСoordinate = Math.floor(Math.random() * width);
		let yСoordinate = Math.floor(Math.random() * height);

		output.push([xСoordinate, yСoordinate]);
	}

	return output;
};

export const generation = (count, width, height) => {
	let result = {};

	result.cells = cellsGeneration(width, height);
	result.tiles = tileGeneration(count, width, height);

	return result;
};

export const winning = (state) =>
	state.find((value) => value.find((subValue) => subValue === 2048)) ? true : false;
