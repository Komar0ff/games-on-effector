import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Button } from '../index';

describe('> Button tests', () => {
	it('Must get the lines to draw', () => {
		const { container } = render(<Button text="New game" />);
		expect(container.textContent).toBe('New game');
	});

	it('Must react to pressing', () => {
		const handleClick = jest.fn();
		const { getByTestId } = render(<Button onClick={() => handleClick()} />);
		const button = getByTestId('btn');

		fireEvent.click(button);
		expect(handleClick).toHaveBeenCalledTimes(1);
	});
});
