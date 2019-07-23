import { $score } from '../stores/score';
import { scoreUpdateEvent } from '../events';
import '../__mocks__/score.mock.js';

describe('Score tests', () => {
	let score = 1024;
	it('scoreUpdate', () => {
		scoreUpdateEvent(score);

		let store = $score.getState();
		expect(store).toEqual({ score: 1024, bestScore: 1024 });
	});

	it('Best score update', () => {
		let scoreSecond = 16;

		scoreUpdateEvent(score);
		scoreUpdateEvent(scoreSecond);

		let store = $score.getState();
		expect(store).toEqual({ score: 16, bestScore: 1024 });
	});
});
