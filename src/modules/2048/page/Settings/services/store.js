import { createStore } from 'effector';
import { widthEvent, heightEvent } from './events';

export const $settings = createStore({ width: 0, height: 0 });

$settings.on(widthEvent, (store, playground) => ({ ...store, width: playground }));
$settings.on(heightEvent, (store, playground) => ({ ...store, height: playground }));

export const $playground = createStore([]);

$playground.on(heightEvent, (store, playground) => generation(2, 10, playground));
$playground.on(widthEvent, (store, playground) => generation(2, playground, 10));

export const random = (count, width, height) => {
	let output = [];

	for (let i = 0; i < count; i++) {
		let xСoordinate = Math.floor(Math.random() * width);
		let yСoordinate = Math.floor(Math.random() * height);

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
