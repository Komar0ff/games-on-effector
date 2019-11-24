import { createStore } from 'effector';
import { widthEvent, heightEvent, playgroundUpdateEvent } from '../events';
import { random, generation } from '../../../helpers';

export const $settings = createStore({ width: 0, height: 0 });

$settings
	.on(widthEvent, (store, playground) => ({ ...store, width: playground }))
	.on(heightEvent, (store, playground) => ({ ...store, height: playground }))
	.updates.watch(
		(data) => (
			playgroundUpdateEvent(data), window.localStorage.setItem('settings', JSON.stringify(data))
		)
	);

export const $playground = createStore([]);
$playground.on(playgroundUpdateEvent, (_, { width, height }) => generation(2, width, height));
