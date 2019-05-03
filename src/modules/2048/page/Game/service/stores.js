import { gameDomain } from './domain';
import { mountEvent } from './events';

export const $playground = gameDomain.store([]);
export const $score = gameDomain.store({ score: 0, bestScore: 0 });

$playground.on(
	mountEvent.map(({ playground, count, width, height }) =>
		playground.length ? playground : generation(count, width, height)
	),
	(_, payload) => payload
);

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
				if (activeBlocks[k][1] === i && activeBlocks[k][0] === j) result[i][j] = 2;
			}
		}
	}

	return result;
};
