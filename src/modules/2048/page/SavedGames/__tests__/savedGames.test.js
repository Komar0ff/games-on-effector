import React from 'react';

import { SavedGames } from '../index';
import { $savedGames, $modal } from '../services/store';
import { modalEvent } from '../services/events'

import '../__mocks__/savedGames.mock.js';


beforeEach(() => $modal.setState(false))
describe('Saved games tests', () => {
	it('Сomplete delete', () => {
		const { getByTestId } = render(<SavedGames />);

		expect(getByTestId('card-wrapper').children.length).toBe(4); // checking the number of cards

    modalEvent('yes') // modal change event
		expect(getByTestId('card-wrapper').children.length).toBe(0);
  });
  
  it('Dont delete', () => {
    const { getByTestId } = render(<SavedGames />);

    modalEvent('no') // modal change event
		expect(getByTestId('card-wrapper').children.length).toBe(4);
  })
});

describe('Modal tests', () => {
  it.todo('Snapshot')

  it('Open/closed modal', () => {
    const { getByTestId } = render(<SavedGames />);

    fireEvent.click(getByTestId('clear-btn'))
    expect($modal.getState()).toBeTruthy()

    modalEvent()  // whether it's a 'yes' or a 'no'
    expect($modal.getState()).toBeFalsy()
  })
})