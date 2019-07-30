import { createStore } from 'effector';
import { mountEvent, modalEvent, alertEvent, removeCardEvent, startingSavedEvent } from './events';

import { updatePath } from '../../../routes/';

export const $modal = createStore(false).on(modalEvent, (store) => !store);
export const $alert = createStore(false);

$alert.on(alertEvent, (_) => true).watch(() => setTimeout(() => $alert.setState(false), 2000));

export const $savedGames = createStore([]);

$savedGames
	.on(mountEvent, (_) => JSON.parse(window.localStorage.getItem('savedGames')) || [])
	.on(modalEvent, (_, payload) => {
		if (payload === 'yes') {
			window.localStorage.removeItem('savedGames');
			return [];
		}
	})
	.on(removeCardEvent, (state, payload) => [...state].splice(payload, 1))
	.on(startingSavedEvent, (state, payload) => {
		window.localStorage.setItem('playground', JSON.stringify(state[payload].playground));
		updatePath('Game');
	})
	.updates.watch(() => alertEvent());
