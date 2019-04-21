import React from 'react'
import styled from '@emotion/styled'

const Wrapper = styled('div')`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 100px;
  border-radius: 5px;

  color: white;
  background-color: #f44336;

  font-size: 40px;
  font-family: sans-serif;
`

export const Block = (props) => (
  <Wrapper>
    <span>{props.value}</span>
  </Wrapper>
)