import React from 'react';
import { Card } from '../index';

const mockData = {
	move: 5,
	score: 500,
	playground: [[0, 8, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]]
};

describe('Card tests', () => {
	it('Check move and score count', () => {
		const { getByTestId } = render(<Card data={mockData} />);

		expect(parseInt(getByTestId('move').textContent)).toBe(mockData.move);
		expect(parseInt(getByTestId('score').textContent)).toBe(mockData.score);
	});

	it('Remove handler', () => {
		const mockEvent = jest.fn((id) => id);
		const { getByTestId } = render(<Card id={1} data={mockData} onClick={(id) => mockEvent(id)} />);

		fireEvent.click(getByTestId('card-btn'));
		expect(mockEvent).toHaveBeenCalled();
	});
	it.todo('background playground');
});
