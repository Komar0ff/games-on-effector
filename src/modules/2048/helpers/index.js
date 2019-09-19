export const tileGeneration = (count, width, height) => {
	let output = [];

	for (let i = 0; i < count; i++) {
		let xСoordinate = Math.floor(Math.random() * width);
		let yСoordinate = Math.floor(Math.random() * height);

		output.push({
			x: xСoordinate,
			y: yСoordinate,
			value: 2
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
	let result = [];
	let coordinates = random(count, width, height);

	for (let i = 0; i < height; i++) {
		result.push([]);
		for (let j = 0; j < width; j++) {
			result[i].push(0);
			for (let k = 0; k < coordinates.length; k++) {
				if (coordinates[k][1] === i && coordinates[k][0] === j) result[i][j] = 2;
			}
		}
	}

	// let result = []

	// for(let i = 0; i < height; i++) {
	//   result.push([])
	//   for(let j = 0; j < width; j++) { result[i].push(0)}
	// }

	// coordinates.forEach((values) => result[values[0]][values[1]] = 2)

	return result;
};

export const winning = (state) =>
	state.find((value) => value.find((subValue) => subValue === 2048)) ? true : false;

// todo
export const moving = (previousState, moveKey) => {
	let newState = [...previousState];

	switch (moveKey) {
		case 37:
			for (let i = 0; i < newState.length; i++) {
				let _ = [];
				for (let j = 0; j < newState[i].length; j++) {
					if (newState[i][j]) _.push(newState[i][j]);
				}

				if (_ || _.length > 1) {
					for (let k = 0; k < _.length; k++) {
						if (_[k] == _[k + 1]) (_[k] += _[k + 1]), _.splice(k + 1, 1);
					}
				}

				newState[i] = _;
				while (newState[i].length != previousState[i].length) newState[i].push(0);
			}
			break;

		case 39:
			for (let i = 0; i < newState.length; i++) {
				let _ = [];
				for (let j = 0; j < newState[i].length; j++) {
					if (newState[i][j]) _.push(newState[i][j]);
				}

				if (_ || _.length > 1) {
					for (let k = _.length - 1; k > 0; k--) {
						if (_[k] == _[k - 1]) (_[k] += _[k - 1]), _.splice(k + 1, 1);
					}
				}

				newState[i] = _;
				while (newState[i].length != previousState[i].length) newState[i].unshift(0);
			}
			break;
	}

	if (moveKey === 38) {
		let checked = [];

		for (let i = 0; i < newState.length; i++) {
			for (let j = 0; j < newState[i].length; j++) {
				let _ = [];
				let flag = checked.filter((value) => value === j);

				if (!flag.length) {
					if (newState[i][j]) {
						checked.push(j);
						_.push(newState[i][j]);
						for (let k = i + 1; k < newState.length; k++) {
							if (newState[k][j]) _.push(newState[k][j]), (newState[k][j] = 0);
						}

						if (_ || _.length > 1) {
							for (let k = 0; k < _.length; k++) {
								if (_[k] == _[k + 1]) (_[k] += _[k + 1]), _.splice(k + 1, 1);
							}
						}

						for (let f = 0; f < newState.length; f++) {
							if (!_[f]) _[f] = 0;
							newState[f][j] = _[f];
						}
					}
				}
			}
		}
	}

	if (moveKey === 40) {
		let checked = [];

		for (let i = newState.length - 1; i >= 0; i--) {
			for (let j = newState[i].length - 1; j >= 0; j--) {
				let _ = [];
				let flag = checked.filter((value) => value === j);

				if (!flag.length) {
					if (newState[i][j]) {
						checked.push(j);
						_.push(newState[i][j]);

						for (let k = i - 1; k >= 0; k--) {
							if (newState[k][j]) _.push(newState[k][j]), (newState[k][j] = 0);
						}

						if (_ || _.length > 1) {
							for (let k = 0; k < _.length; k++) {
								if (_[k] == _[k + 1]) (_[k] += _[k + 1]), _.splice(k + 1, 1);
							}
						}

						for (let f = newState.length - 1; f >= 0; f--) {
							if (!_[f]) _[f] = 0;
						}

						_ = _.reverse();

						for (let f = newState.length - 1; f >= 0; f--) {
							newState[f][j] = _[f];
						}
					}
				}
			}
		}
	}

	return newState;
};
