import React from 'react';
import { widthEvent, heightEvent } from '../services/events';
import { $settings, $playground } from '../services/store';

beforeEach(() => ($settings.setState({ width: 0, height: 0 }), $playground.setState([])));

describe('Settings tests', () => {
	it('Change width and height playground', () => {
		widthEvent(5);
		heightEvent(2);
		expect($settings.getState()).toEqual({ width: 5, height: 2 });
	});

	it('Generate playground when change width or height', () => {
		heightEvent(10);
		expect($playground.getState().length).toBe(10);
	});
	it.todo('Sync with localstorage');
});
