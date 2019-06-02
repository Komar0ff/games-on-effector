import {
	generation,
	random,
	equal,
	full,
	scoring
} from '../helpers';

describe('Helpers', () => {
	let playgroundActiveBlocks = 3;
	let playgroundWidth = 3;
	let playgroundHeight = 4;

	it('Create random active blocks', () => {
		let output = random(playgroundActiveBlocks, playgroundWidth, playgroundHeight);

		expect(output.length).toBe(playgroundActiveBlocks);
		expect(output[0].length).toBe(2); // two coordinates
		expect(Number.isInteger(output[0][0])).toBeTruthy(); // coordinate must be number
	});

	it('Generating a playground', () => {
		let generator = generation(playgroundActiveBlocks, playgroundWidth, playgroundHeight);

		expect(generator.length).toBe(playgroundHeight);
		expect(generator[0].length).toBe(playgroundWidth);

		let counterActiveBlock = 0;
		for (let i = 0; i < playgroundHeight; i++) {
			for (let j = 0; j < playgroundWidth; j++) {
				if (generator[i][j] > 0) ++counterActiveBlock;
			}
		}

		expect(counterActiveBlock).toBe(playgroundActiveBlocks);
	});

	it('Array equal', () => {
		const firstState = [[0, 0, 8], [0, 1024, 0]];
		const secondState = [[0, 0, 8], [0, 1024, 2]];

		let result = equal(firstState, secondState);
		expect(result).toBe(false);
	});

	it('Array full', () => {
		const state = [[1, 4, 4], [3, 4, 5]];

		let result = full(state);
		expect(result).toBe(true);
	});

	it('Scoring', () => {
		const state = [[1024, 0, 0], [16, 1024, 2]];
		const result = scoring(state);

		expect(result).toBe(2066);
	});
});