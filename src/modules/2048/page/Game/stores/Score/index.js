import { createApi } from 'effector';
import { gameDomain } from '../../domain';

const $score = gameDomain({
	score: 0,
	bestScore: window.localStorage.getItem('bestScore') || 0
});
$score.updates.watch(({ bestScore }) => window.localStorage.setItem('bestScore', bestScore));

export const scoreApi = createApi($score, {
	update: (state, payload) => ({
		score: payload,
		bestScore: state.bestScore < payload ? payload : state.bestScore
	}),
	clean: (state) => ({ ...state, score: 0 })
});
