import { combine } from 'effector';
import { $playground } from './Playground';
import { $score } from './Score';
import { $status } from './Status';

export const $gameState = combine(
	$status,
	$score,
	$playground,
	(status, { score }, playground) => ({
		status: status,
		score: score,
		playground: playground
	})
);
