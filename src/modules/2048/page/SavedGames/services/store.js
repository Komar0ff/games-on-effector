import { createStore } from 'effector';
import { mountEvent, modalEvent, alertEvent, removeCardEvent } from './events';

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
	.on(removeCardEvent, (store, payload) => [...store].splice(payload, 1))
	.updates.watch(() => alertEvent());
