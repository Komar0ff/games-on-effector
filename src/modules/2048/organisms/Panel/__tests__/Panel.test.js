import React from 'react';
import { render, fireEvent, cleanup } from 'react-testing-library';
import { Panel } from '../index.js';

afterEach(cleanup);

describe('Panel tests', () => {
	const fakeData = [{ name: 'Score', count: 0 }, { name: 'Best score', count: 20 }];
	it('Storage forwarding to score panel', () => {
		const { getByTestId, debug } = render(<Panel data={fakeData} />);
		const scorePanel = getByTestId('scorePanel');

		expect(scorePanel.children[0].textContent).toBe(`Score: ${fakeData[0].count}`);
		expect(scorePanel.children[1].textContent).toBe(`Best score: ${fakeData[1].count}`);
	});

	it('Events lifting up', () => {
		const handleClick = jest.fn();
		const { getByTestId, debug } = render(<Panel data={fakeData} onClick={handleClick} />);
		const control = getByTestId('control');

		fireEvent.click(control.children[0]);
		expect(handleClick).toHaveBeenCalledTimes(1);
	});
});
