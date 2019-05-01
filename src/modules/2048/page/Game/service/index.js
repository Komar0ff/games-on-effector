import { createDomain } from 'effector';

//domain
export const gameDomain = createDomain('game page domain');

export const mountEvent = gameDomain.event('mount event');
export const newGameEvent = gameDomain.event('new game event');
export const revertGameEvent = gameDomain.event('revert game event');
export const savedGameEvent = gameDomain.event('saved game event');
export const moveEvent = gameDomain.event('move on playground');

export const playgroundStore = gameDomain.store([]);
export const scoreStore = gameDomain.store({ score: 0, bestScore: 0 });

export const mount = (width, height) => {
	let result = [];
	for (let i = 0; i < height; i++) {
		result.push([]);
		for (let j = 0; j < width; j++) {
			result[i].push(0);
		}
	}

	return result;
};

export const random = (count, width, height) => {
	// let index =
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
	let activeBlocks = [];

	for (let i = 0; i < count; i++) {
		let yСoordinate = Math.floor(Math.random() * height);
		let xСoordinate = Math.floor(Math.random() * width);

		activeBlocks.push([xСoordinate, yСoordinate]);
	}

	for (let i = 0; i < height; i++) {
		result.push([]);
		for (let j = 0; j < width; j++) {
			result[i].push(0);
			for (let k = 0; k < activeBlocks.length; k++) {
				if (activeBlocks[k][1] === i && activeBlocks[k][0] === j) result[i][j] = 8;
			}
		}
	}

	return result;
};

// playgroundStore.on(mount, (state, payload) => payload)

const fakeResult = [[0, 0, 0, 0, 0], [0, 0, 0, 0, 16], [2, 0, 0, 0, 0]];

export const newGame = () => {
	return fakeResult;
};
