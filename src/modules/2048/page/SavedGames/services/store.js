import { createStore } from 'effector';
import { clearAll } from './events';

export const $savedGames = createStore([]);

$savedGames.reset(clearAll);
