import { tileGeneration, cellsGeneration } from '../index';

it('Tile generation', () => {
	expect(tileGeneration(4, 10, 10).length).toBe(4);
	expect(tileGeneration(7, 10, 10)[0].x < 10 && tileGeneration(7, 10, 10)[0].y < 10).toBeTruthy();
});

it('Cells generation', () => {
	// array of arrays? really needed?
	expect(cellsGeneration(10, 10).length).toBe(10);
	expect(cellsGeneration(10, 10)[5].length).toBe(10);
});
