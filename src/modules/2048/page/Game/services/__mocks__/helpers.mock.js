export const helpersMock = {
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

export const movingMock = {
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
