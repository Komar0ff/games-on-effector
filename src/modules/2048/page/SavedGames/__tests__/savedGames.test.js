import React from 'react';

import { SavedGames } from '../index';
import { $savedGames, $modal } from '../stores';
import { modalEvent, startingSavedEvent } from '../events';

import { mockData } from '../__mocks__/savedGames.mock.js';

beforeEach(
	() => (
		window.localStorage.setItem('savedGames', JSON.stringify(mockData)), $modal.setState(false)
	)
);

describe.skip('Saved games tests', () => {
	it('Mounting', () => {
		const { getByTestId } = render(<SavedGames />);
		expect(getByTestId('card-wrapper').children.length).toBe(4);
	});

	it('Сomplete delete', () => {
		const { getByTestId } = render(<SavedGames />);

		act(() => {
			modalEvent('yes');
		}); // modal change event
		expect(getByTestId('card-wrapper').children.length).toBe(0);
		expect(window.localStorage.getItem('savedGames')).toBeFalsy();
	});

	it('Dont delete', () => {
		const { getByTestId } = render(<SavedGames />);

		act(() => {
			modalEvent('no');
		}); // modal change event
		expect(getByTestId('card-wrapper').children.length).toBe(4);
	});
});

describe.skip('Modal tests', () => {
	it('Open/closed modal', () => {
		const { getByTestId } = render(<SavedGames />);

		act(() => {
			fireEvent.click(getByTestId('clear-btn'));
		});
		expect($modal.getState()).toBeTruthy();

		act(() => {
			modalEvent();
		}); // whether it's a 'yes' or a 'no'
		expect($modal.getState()).toBeFalsy();
	});
});
