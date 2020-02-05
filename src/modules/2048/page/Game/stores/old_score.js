// import { gameDomain } from '../domain';
// import { scoreUpdateEvent, scoreCleanEvent, mountEvent } from '../events';

// export const $oldscore = gameDomain.store({
// 	score: 0,
// 	bestScore: window.localStorage.getItem('bestScore') || 0
// });

// $oldscore
// 	.on(scoreUpdateEvent, (state, payload) => ({
// 		score: payload,
// 		bestScore: state.bestScore < payload ? payload : state.bestScore
// 	}))
// 	.on(scoreCleanEvent, (state) => ({ ...state, score: 0 }))
// 	.updates.watch(({ bestScore }) => window.localStorage.setItem('bestScore', bestScore));
