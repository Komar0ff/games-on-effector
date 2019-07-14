import { createStore } from 'effector';
import { widthEvent, heightEvent } from './events';

export const $settings = createStore({ width: 0, height: 0 });

$settings.on(widthEvent, (store, playground) => ({ ...store, width: playground }));
$settings.on(heightEvent, (store, playground) => ({ ...store, height: playground }));
