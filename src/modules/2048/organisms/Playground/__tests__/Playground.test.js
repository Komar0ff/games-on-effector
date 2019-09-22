import React from 'react';
import { Playground } from '../index.js';
import { render } from '@testing-library/react';

describe('Playground tests', () => {
	it('render playground', () => {
		const { getAllByTestId } = render(
			<Playground
				data={{
					tiles: [],
					cells: [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]]
				}}
			/>
		);

		const playgroundRows = getAllByTestId('row');
		const playgroundBlocks = getAllByTestId('block');

		expect(playgroundRows.length).toBe(3); // height playground
		expect(playgroundRows[0].children.length).toBe(4); // width playground
		expect(playgroundBlocks.length).toBe(12);
	});
});
