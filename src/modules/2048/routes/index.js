import { createStore, createEvent } from 'effector';

export const updatePath = createEvent();
export const $routing = createStore('Game'); // Game, SavedGames, Settings

// It's a temporary solution. We have to solve the routing issue.
$routing.on(updatePath, (_, payload) => payload);
