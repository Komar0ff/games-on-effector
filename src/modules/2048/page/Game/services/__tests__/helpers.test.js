import { generation, random, equal, full, scoring, moving, winning } from '../helpers';

const helpersMock = {
	equalMock: {
		firstState: [[0, 0, 8], [0, 1024, 0]],
		secondState: [[0, 0, 8], [0, 1024, 2]]
	},

	fullMock: {
		state: [[1, 4, 4], [3, 4, 5]]
	},

	scoringMock: {
		state: [[1024, 0, 0], [16, 1024, 2]]
	},

	winningMock: {
		state: [[16, 0, 0], [16, 2048, 2]]
	}
};

const movingMock = {
	left: {
		oldState: [[0, 0, 8, 0], [8, 16, 8, 0], [0, 8, 8, 8]],
		newState: [[8, 0, 0, 0], [8, 16, 8, 0], [16, 8, 0, 0]],
		keyCode: 37
	},

	up: {
		oldState: [[8, 0, 8, 8], [0, 0, 2, 0], [0, 8, 8, 8]],
		newState: [[8, 8, 8, 16], [0, 0, 2, 0], [0, 0, 8, 0]],
		keyCode: 38
	},

	right: {
		oldState: [[2, 0, 0, 0], [8, 0, 0, 0], [0, 8, 8, 8]],
		newState: [[0, 0, 0, 2], [0, 0, 0, 8], [0, 0, 8, 16]],
		keyCode: 39
	},

	down: {
		oldState: [[0, 0, 8, 8], [0, 0, 2, 0], [0, 8, 8, 8]],
		newState: [[0, 0, 8, 0], [0, 0, 2, 0], [0, 8, 8, 16]],
		keyCode: 40
	}
};

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

	it('is there a 2048?', () => {
		const result = winning(helpersMock.winningMock.state);
		expect(result).toBeTruthy();
	});
});

describe('Move tests', () => {
	it('Arrow left move event', () => {
		let moveLeft = moving(movingMock.left.oldState, movingMock.left.keyCode);
		expect(moveLeft).toEqual(movingMock.left.newState);
	});

	it('Arrow right move event', () => {
		let moveRight = moving(movingMock.right.oldState, movingMock.right.keyCode);
		expect(moveRight).toEqual(movingMock.right.newState);
	});

	it('Arrow up move event', () => {
		let moveUp = moving(movingMock.up.oldState, movingMock.up.keyCode);
		expect(moveUp).toEqual(movingMock.up.newState);
	});

	it('Arrow down move event', () => {
		let moveDown = moving(movingMock.down.oldState, movingMock.down.keyCode);
		expect(moveDown).toEqual(movingMock.down.newState);
	});
});
