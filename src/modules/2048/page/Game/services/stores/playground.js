import { gameDomain } from '../domain';
import { mountEvent, newGameEvent, moveEvent } from '../events';
import { join } from 'upath';

export const $playground = gameDomain.store([]);

$playground
	.on(
		mountEvent.map(({ playground, count, width, height }) =>
			playground.length ? playground : generation(count, width, height)
		),
		(_, payload) => payload
	)

	.on(
		newGameEvent.map(({ count, width, height }) => generation(count, width, height)),
		(_, payload) => payload
	)

	.on(moveEvent, (state, payload) => {
		let newState = moving(state, payload);
		let flag = true;

		let fullFlag = full(newState)
		let equalFlag = equal(state, newState)

		if(!equalFlag) {
			while (flag) {
				let newActiveBlock = random(1, newState.length, newState[0].length);
	
				!newState[newActiveBlock[0][0]][newActiveBlock[0][1]]
					? ((newState[newActiveBlock[0][0]][newActiveBlock[0][1]] = 2), (flag = false))
					: null;
			}
		}

		equalFlag && fullFlag ? console.log('You lose') : null
		return newState;
	});

export const full = (state) => state.every((rows) => rows.every(Boolean));
export const equal = (firstState, secondState) => {
	let equal = true;

	for(let i = 0; i<=firstState.length-1; i++){
		for(let j = 0; j<=firstState[i].length-1; j++){
			if(firstState[i][j] != secondState[i][j]) equal = false
		}
	}

	return equal;
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

export const moving = (oldState, moveKey) => {
	let newState = [...oldState];

	if (moveKey === 37) {
		for (let i = 0; i < newState.length; i++) {
			let _ = [];
			for (let j = 0; j < newState[i].length; j++) {
				if (newState[i][j]) _.push(newState[i][j]);
			}

			if (_ || _.length > 1) {
				for (let k = 0; k < _.length; k++) {
					if (_[k] == _[k + 1]) (_[k] += _[k + 1]), delete _[k + 1];
				}
			}
			_ = _.filter(Boolean);

			newState[i] = _;
			while (newState[i].length != oldState[i].length) newState[i].push(0);
		}
	}

	if (moveKey === 39) {
		for (let i = 0; i < newState.length; i++) {
			let _ = [];
			for (let j = 0; j < newState[i].length; j++) {
				if (newState[i][j]) _.push(newState[i][j]);
			}

			if (_ || _.length > 1) {
				for (let k = _.length - 1; k > 0; k--) {
					if (_[k] == _[k - 1]) (_[k] += _[k - 1]), delete _[k - 1];
				}
			}
			_ = _.filter(Boolean);

			newState[i] = _;
			while (newState[i].length != oldState[i].length) newState[i].unshift(0);
		}
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
								if (_[k] == _[k + 1]) (_[k] += _[k + 1]), delete _[k + 1];
							}
						}

						_ = _.filter(Boolean);

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
								if (_[k] == _[k + 1]) (_[k] += _[k + 1]), delete _[k + 1];
							}
						}

						_ = _.filter(Boolean);

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
