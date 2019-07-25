import React from 'react';

import { SavedGames } from '../index';
import { $savedGames, $modal } from '../services/store';
import { modalEvent, mountEvent } from '../services/events';

import '../__mocks__/savedGames.mock.js';

beforeEach(() => $modal.setState(false));

describe('Saved games tests', () => {
	// it('Mounting', () => {
	// 	window.localStorage.setItem('savedGames', [[[0, 0, 8], [0, 1024, 0]]])
	// 	mountEvent()

	// 	expect($savedGames.getState()).toEqual([[[0, 0, 8], [0, 1024, 0]]])

	// })

	it('Сomplete delete', () => {
		const { getByTestId } = render(<SavedGames />);

		expect(getByTestId('card-wrapper').children.length).toBe(4); // checking the number of cards

		modalEvent('yes'); // modal change event
		expect(getByTestId('card-wrapper').children.length).toBe(0);
	});

	it('Dont delete', () => {
		const { getByTestId } = render(<SavedGames />);

		modalEvent('no'); // modal change event
		expect(getByTestId('card-wrapper').children.length).toBe(4);
	});
});

describe('Modal tests', () => {
	it.todo('Snapshot'); // after complete design

	it('Open/closed modal', () => {
		const { getByTestId } = render(<SavedGames />);

		fireEvent.click(getByTestId('clear-btn'));
		expect($modal.getState()).toBeTruthy();

		modalEvent(); // whether it's a 'yes' or a 'no'
		expect($modal.getState()).toBeFalsy();
	});
});
