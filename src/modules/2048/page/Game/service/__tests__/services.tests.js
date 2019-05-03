import { mountEvent, newGameEvent } from '../events.js';
import { $playground, generation, random } from '../stores';

/**
 * Обработать нажатия на кнопки в панели (3 эвента)
 * обработка нажатий кнопок на клавиатуре
 * логика хранения для плэйграунд хранилища
 * логика хранения для скора
 * по нажатию на ньюгейм перерендеривается окружение с рандомными данными [done]
 * первая отрисовка плэйграунда [done]
 * первая отрисовка если есть данные в локалсторадж [done]
 * первая отрисовка если в локалсторадж данных нет [done]
 * рандомная генерация активных блоков [done]
 * отрисовка поля исходя из значений высоты и ширины [done]
 */

// TODO: fix problem with isolation.
it('Drawing a playground based on height and width and random generation of active blocks', () => {
	let countActiveBlocks = 3; // No more than three
	let playgroundWidth = 3;
	let playgroundHeight = 4;

	let generator = generation(countActiveBlocks, playgroundWidth, playgroundHeight);
	let randomizer = random(countActiveBlocks, playgroundWidth, playgroundHeight);

	expect(randomizer.length).toBe(3);
	expect(randomizer[2].length).toBe(2);
	expect(Number.isInteger(randomizer[0][0])).toBeTruthy();

	expect(generator.length).toBe(playgroundHeight);
	expect(generator[0].length).toBe(playgroundWidth);

	let counterActiveBlock = 0;
	for (let i = 0; i < playgroundHeight; i++) {
		for (let j = 0; j < playgroundWidth; j++) {
			if (generator[i][j] > 0) ++counterActiveBlock;
		}
	}

	expect(counterActiveBlock).toBe(countActiveBlocks);
});

it('Playground mounting with empty playground', () => {
	let localStorage = { playground: [], count: 2, width: 3, height: 4 }; //localStorage imitation

	expect($playground.getState()).toEqual([]);
	mountEvent(localStorage);

	let playgroundStore = $playground.getState(); // storage state after mounting
	expect(playgroundStore.length).toBe(4);
	expect(playgroundStore[0].length).toBe(3);
});

it('Playground mounting with playground', () => {
	let playgroundStore = $playground.getState();
	let localStorage = { playground: [[0, 0, 8], [0, 1024, 0]], count: 2, width: 3, height: 4 }; //localStorage imitation

	mountEvent(localStorage);

	playgroundStore = $playground.getState(); // storage state after mounting
	expect(playgroundStore.length).toBe(2);
	expect(playgroundStore[0].length).toBe(3);
});

it('newGame event', () => {
	let localStorage = { playground: [], count: 2, width: 3, height: 4 };

	newGameEvent(localStorage);
	let playgroundStore = $playground.getState();

	expect(playgroundStore.length).toBe(4);
	expect(playgroundStore[0].length).toBe(3);
});
