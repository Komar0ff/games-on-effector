import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import { Panel } from '../index.js';

afterEach(cleanup);

describe('Panel tests', () => {
	const fakeData = { score: 0, bestScore: 0 };
	it('Storage forwarding to score panel', () => {
		const { getByTestId, debug } = render(<Panel data={fakeData} />);
		const scorePanel = getByTestId('scorePanel');

		expect(scorePanel.children[0].textContent).toBe(`Score: ${fakeData['score']}`);
		expect(scorePanel.children[1].textContent).toBe(`Best score: ${fakeData['bestScore']}`);
	});
});
