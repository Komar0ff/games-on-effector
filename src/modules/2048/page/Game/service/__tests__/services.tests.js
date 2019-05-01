import { newGame, mount, generation, random } from '../index.js';

/**
 * Обработать нажатия на кнопки в панели (3 эвента)
 * обработка нажатий кнопок на клавиатуре
 * логика хранения для основного хранилища
 * логика хранения для скора
 * по нажатию на ньюгейм перерендеривается окружение с рандомными данными [!]
 * рандомная генерация активных блоков [done]
 * отрисовка поля исходя из значений высоты и ширины [done]
 */

describe('Services tests', () => {
	it('Drawing a playground based on height and width', () => {
		const fakeResult = [[0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0]];

		let result = mount(3, 4);
		expect(result).toEqual(fakeResult);
	});

	it('Random generation of active blocks', () => {
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

	it('New game events', () => {
		const fakeResult = [[0, 0, 0, 0, 0], [0, 0, 0, 0, 16], [2, 0, 0, 0, 0]];

		const newGameResult = newGame();
		expect(newGameResult).toEqual(fakeResult);
	});
});
