import React from 'react';
import { widthEvent, heightEvent } from '../services/events';
import { $settings } from '../services/store';

beforeEach(() => $settings.setState({ width: 0, height: 0 }));

describe('Settings tests', () => {
	it('Change width and height playground', () => {
		widthEvent(5);
		heightEvent(2);
		expect($settings.getState()).toEqual({ width: 5, height: 2 });
	});
});
