import { generation, random, equal, full, scoring, moving, winning } from '../helpers';
import { helpersMock } from '../__mocks__/helpers.mock.js';

describe('Helpers', () => {
	let playgroundActiveBlocks = 3;
	let playgroundWidth = 3;
	let playgroundHeight = 4;

	it('Create random active blocks', () => {
		let output = random(playgroundActiveBlocks, playgroundWidth, playgroundHeight);

		expect(output.length).toBe(playgroundActiveBlocks); // Length is equal to the number of active blocks
		expect(Number.isInteger(output[0][0])).toBeTruthy(); // coordinate must be integer number

		for (let i = 0; i < playgroundActiveBlocks; i++) {
			expect(output[i].length).toBe(2); // only two coordinates.

			expect(output[i][0] > playgroundWidth).toBeFalsy(); // X the coordinate should not be greater than the width
			expect(output[i][1] > playgroundWidth).toBeFalsy(); // Y the coordinate should not be greater than the height

			// let _arr = [...output];
			// delete _arr[i];

			// _arr.map((value) => {
			// 	expect(value[0] === output[i][0] && value[1] === output[i][1]).toBeFalsy();
			// });
		}
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
		console.log('generator', generator);
		expect(counterActiveBlock).toBe(playgroundActiveBlocks);
	});

	// prettier-ignore
	it('Array equal', () => {
		expect(
			equal(
				[[0, 0, 8], [0, 1024, 0]], 
				[[0, 0, 8], [0, 1024, 2]]
			)
		).toBeFalsy(); // not equal
	});

	it('Array full', () => {
		expect(full([[1, 4, 4], [3, 4, 5]])).toBeTruthy(); // array is full
		expect(full([[1, 0, 4], [3, 4, 5]])).toBeFalsy(); // array is not full
	});

	it('Scoring', () => {
		expect(scoring([[1024, 0, 0], [16, 1024, 2]])).toBe(2066);
	});

	it('Is there a 2048?', () => {
		expect(winning([[16, 0, 0], [16, 2048, 2]])).toBeTruthy();
	});

	it('Move left/right/up/down', () => {
		let moveLeft = moving(helpersMock.left.oldState, helpersMock.left.keyCode);
		let moveRight = moving(helpersMock.right.oldState, helpersMock.right.keyCode);
		let moveUp = moving(helpersMock.up.oldState, helpersMock.up.keyCode);
		let moveDown = moving(helpersMock.down.oldState, helpersMock.down.keyCode);

		expect(moveLeft).toEqual(helpersMock.left.newState);
		expect(moveRight).toEqual(helpersMock.right.newState);
		expect(moveUp).toEqual(helpersMock.up.newState);
		expect(moveDown).toEqual(helpersMock.down.newState);
	});
});
