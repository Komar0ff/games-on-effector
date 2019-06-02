
import { $score } from '../stores/score';
import { scoreUpdateEvent } from '../events';

describe('Score tests', () => {
	it('scoreUpdate', () => {
		let score = 1024;
		scoreUpdateEvent(score);

		let store = $score.getState();
		expect(store).toEqual({ score: 1024, bestScore: 1024 });
	});

	it('Best score update', () => {
		let scoreFirst = 1024;
		scoreUpdateEvent(scoreFirst);

		let scoreSecond = 16;
		scoreUpdateEvent(scoreSecond);

		let store = $score.getState();
		expect(store).toEqual({ score: 16, bestScore: 1024 });
	});
});