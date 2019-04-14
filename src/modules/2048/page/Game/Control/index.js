import React, {useState} from 'react';
import styled from '@emotion/styled';
import { Button } from '../../../components/Button'

const data = [
  {text: 'New game'},
  {text: 'Save game'},
  {text: 'Revert step'},
]

const Wrapper = styled('div')``;

export const Control = (props) => {
  const [state, setState] = useState(false)
  console.log(state)

  return (
    <Wrapper>
      {data.map((value, id) => (<button key={id} value={value.text} />))}
    </Wrapper>
  )
}

  
