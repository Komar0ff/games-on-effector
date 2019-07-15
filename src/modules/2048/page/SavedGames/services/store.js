import { createStore } from 'effector';
import { modalEvent, alertEvent, removeCardEvent } from './events';
import { mockData } from '../__mocks__/savedGames.mock';

export const $modal = createStore(false).on(modalEvent, (store) => !store);
export const $alert = createStore(false);

$alert.on(alertEvent, (store) => true).watch(() => setTimeout(() => $alert.setState(false), 2000));

export const $savedGames = createStore([]);

$savedGames
	.on(modalEvent, (store, payload) => (payload === 'yes' ? [] : store))
	.on(removeCardEvent, (store, payload) => [...store].splice(payload, 1))
	.updates.watch(() => alertEvent());
