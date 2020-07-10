import { createApi } from 'effector';
import { gameDomain } from '../../domain';
import { $playground } from '../Playground/';

export const $score = gameDomain.store({
	score: 0,
	bestScore: window.localStorage.getItem('bestScore') || 0,
});

$score.on($playground, (state, { tiles }) => {
	let newScore = tiles.reduce((acc, current) => acc + current.value, 0);

	return {
		score: newScore,
		bestScore: newScore > state.bestScore ? newScore : state.bestScore,
	};
});

$score.updates.watch(({ bestScore }) => window.localStorage.setItem('bestScore', bestScore));
