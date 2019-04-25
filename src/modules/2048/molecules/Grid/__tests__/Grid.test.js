import React from 'react'
import { render, fireEvent } from 'react-testing-library'

import { Grid } from '../index.js'

/**
 * Отрисовка игрового поля из блоков по нужным размерам 
 * постороение игрового поля из неактивных блоков [done]
 * случайное отображение активных блоков поверх неактивных
 * показ активных блоков [done]
 */

describe('Grid tests', () => {
  it('Building a playing field of inactive blocks', () => {
    const {getByTestId, getAllByTestId,  debug} = render(<Grid width={4} height={4} active={[]}/>)
    const grid = getByTestId('grid')
    const countBlocks = getAllByTestId('block')

    expect(countBlocks.length).toBe(16)
    expect(grid.children.length).toBe(16)
  })

  it('Display of active blocks', () => {
    const activeData = [{count: 1024}, {count: 16}]
    const {getAllByTestId,  debug} = render(<Grid width={4} height={4} active={activeData}/>)
    const countActiveBlocks = getAllByTestId('active-block')

    expect(countActiveBlocks.length).toBe(2)
  })
})
