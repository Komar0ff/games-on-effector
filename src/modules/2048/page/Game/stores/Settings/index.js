import { createApi } from 'effector';
import { gameDomain } from '../../domain/';

const $settings = createStore({ width: 0, height: 0 });

export const settingsApi = createApi($settings, {
	width: (state, playground) => ({ ...state, width: payload }),
	height: (state, playground) => ({ ...state, height: payload }),
});

$settings.update.watch((data) => window.localStorage.setItem('settings', JSON.parse(data)));
