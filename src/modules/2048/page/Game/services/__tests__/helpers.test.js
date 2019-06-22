import { generation, random, equal, full, scoring, moving, winning } from '../helpers';
import { helpersMock, movingMock } from '../__mocks__/helpers.mock.js';

describe('Helpers', () => {
	let playgroundActiveBlocks = 3;
	let playgroundWidth = 3;
	let playgroundHeight = 4;

	it('Create random active blocks', () => {
		let output = random(playgroundActiveBlocks, playgroundWidth, playgroundHeight);

		expect(output[0].length).toBe(2); // two coordinates
		expect(output.length).toBe(playgroundActiveBlocks);
		expect(Number.isInteger(output[0][0])).toBeTruthy(); // coordinate must be integer number
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
		const result = equal(helpersMock.equalMock.firstState, helpersMock.equalMock.secondState);
		expect(result).toBeFalsy();
	});

	it('Array full', () => {
		const result = full(helpersMock.fullMock.state);
		expect(result).toBeTruthy();
	});

	it('Scoring', () => {
		const result = scoring(helpersMock.scoringMock.state);
		expect(result).toBe(2066);
	});

	it('Is there a 2048?', () => {
		const result = winning(helpersMock.winningMock.state);
		expect(result).toBeTruthy();
	});

	it('Move left/right/up/down', () => {
		let moveLeft = moving(movingMock.left.oldState, movingMock.left.keyCode);
		let moveRight = moving(movingMock.right.oldState, movingMock.right.keyCode);
		let moveUp = moving(movingMock.up.oldState, movingMock.up.keyCode);
		let moveDown = moving(movingMock.down.oldState, movingMock.down.keyCode);

		expect(moveLeft).toEqual(movingMock.left.newState);
		expect(moveRight).toEqual(movingMock.right.newState);
		expect(moveUp).toEqual(movingMock.up.newState);
		expect(moveDown).toEqual(movingMock.down.newState);
	});
});
