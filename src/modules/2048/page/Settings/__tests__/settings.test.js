import React from 'react';
import { widthEvent, heightEvent, playgroundUpdateEvent } from '../services/events';
import { $settings, $playground } from '../services/store';

beforeEach(
	() => (
		$settings.setState({ width: 0, height: 0 }), $playground.setState({ tiles: [], cells: [] })
	)
);

describe('Settings tests', () => {
	it('Change width and height playground', () => {
		widthEvent(5);
		heightEvent(2);

		expect($settings.getState()).toEqual({ width: 5, height: 2 });
		expect(JSON.parse(window.localStorage.getItem('settings'))).toEqual({ width: 5, height: 2 });
	});

	it('Generate playground when change width or height', () => {
		playgroundUpdateEvent({ width: 5, height: 10 });

		expect($playground.getState().cells.length).toBe(10);
		expect($playground.getState().cells[0].length).toBe(5);
	});
	it.todo('Sync with localstorage');
});
