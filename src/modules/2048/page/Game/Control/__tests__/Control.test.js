import React from 'react'
import { Control } from '../index'
import { fireEvent } from 'react-testing-library';

describe('test', () => {
  it('test1', () => {
    const { container, debug, getByText} = render(<Control />)
    debug(container)

    fireEvent.click(getByText('New game'))

    debug(container)
  })

  it('test2', () => {
    const { container, debug } = render(<Control />)
    debug(container)
  })
})
