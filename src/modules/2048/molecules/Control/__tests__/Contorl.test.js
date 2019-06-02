import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Control } from '../index';

describe('> Control tests', () => {
	it('button drawing', () => {
		const { getAllByTestId } = render(<Control />);
		const buttonCount = getAllByTestId('btn').length;
		expect(buttonCount).toBe(3);
	});

	it('Lifting up', () => {
		const handleClick = jest.fn((id) => id);
		const { getAllByTestId } = render(<Control onClick={(id) => handleClick(id)} />);
		const button = getAllByTestId('btn')[1];
		fireEvent.click(button);
		expect(handleClick).toHaveBeenCalledTimes(1);
	});
});
