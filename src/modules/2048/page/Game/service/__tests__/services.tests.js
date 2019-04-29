import {buttonClick} from '../index.js'

/**
 * Обработать нажатия на кнопки в панели (3 эвента)
 * обработка нажатий кнопок на клавиатуре
 * логика хранения для основного хранилища
 * логика хранения для скора
 * по нажатию на ньюгейм перерендериваетс окружение с рандомными данными
 */


describe('Services tests', () => {
  it('button events', () => {
    const newGameResult = buttonClick(0)
    expect(newGameResult)
  })
})
