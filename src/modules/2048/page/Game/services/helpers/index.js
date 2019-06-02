export const full = (state) => state.every((rows) => rows.every(Boolean));
export const equal = (firstState, secondState) => {
	let equal = true;

	for (let i = 0; i <= firstState.length - 1; i++) {
		for (let j = 0; j <= firstState[i].length - 1; j++) {
			if (firstState[i][j] != secondState[i][j]) equal = false;
		}
	}

	return equal;
};
export const scoring = (state) => {
	let result = 0;

	for (let i = 0; i < state.length; i++) {
		result += state[i].reduce((acc, value) => acc + value);
	}

	return result;
};

export const random = (count, width, height) => {
	let output = [];

	for (let i = 0; i < count; i++) {
		let yСoordinate = Math.floor(Math.random() * height);
		let xСoordinate = Math.floor(Math.random() * width);

		output.push([xСoordinate, yСoordinate]);
	}

	return output;
};

export const generation = (count, width, height) => {
	let result = [];
	let randomizer = random(count, width, height);

	for (let i = 0; i < height; i++) {
		result.push([]);
		for (let j = 0; j < width; j++) {
			result[i].push(0);
			for (let k = 0; k < randomizer.length; k++) {
				if (randomizer[k][1] === i && randomizer[k][0] === j) result[i][j] = 2;
			}
		}
	}

	return result;
};
