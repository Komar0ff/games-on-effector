import { $score } from '../stores/score';
import { scoreUpdateEvent, scoreCleanEvent } from '../events';
import '../__mocks__/score.mock.js';

/**
 * > Update and clean score
 * > Best score update
 */

describe.skip('Score tests', () => {
	let score = 1024;
	it('Update and clean score', () => {
		scoreUpdateEvent(score);
		expect($score.getState()).toEqual({ score: 1024, bestScore: 1024 });

		scoreCleanEvent(); // like when the new game started
		expect($score.getState()).toEqual({ score: 0, bestScore: 1024 });
	});

	it('Best score update', () => {
		let scoreSecond = 16;

		scoreUpdateEvent(score);
		scoreUpdateEvent(scoreSecond);

		let store = $score.getState();
		expect(store).toEqual({ score: 16, bestScore: 1024 });
		expect(parseInt(window.localStorage.getItem('bestScore'))).toBe(1024); // TODO: check excessive recalculation
	});
});
