import React from 'react';
import { SavedGames } from '../index';
import { $savedGames } from '../services/store';
import '../__mocks__/savedGames.mock.js';

describe('Saved games tests', () => {
	it('Сomplete cleaning', () => {
		const { getByTestId } = render(<SavedGames />);

		expect(getByTestId('card-wrapper').children.length).toBe(4); // checking the number of cards

		fireEvent.click(getByTestId('clear-btn'));
		expect(getByTestId('card-wrapper').children.length).toBe(0);
	});
});
