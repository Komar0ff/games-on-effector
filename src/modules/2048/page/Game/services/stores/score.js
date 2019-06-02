import { gameDomain } from '../domain';
import { scoreUpdateEvent } from '../events';

export const $score = gameDomain.store({ score: 0, bestScore: 0 });

$score.on(scoreUpdateEvent, (state, payload) => ({
	score: payload,
	bestScore: state.bestScore < payload ? payload : state.bestScore
}));
