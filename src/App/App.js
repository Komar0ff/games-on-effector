import React from 'react';
import styled, { injectGlobal } from 'react-emotion';

import twoThousand from '..'

injectGlobal`
  * {
    margin: 0;
    padding: 0;
  }

  @font-face {
    font-family: 'Dosis';
    src: local('Dosis'),
      local('Dosis-Regular'),
      url(https://fonts.googleapis.com/css?family=Dosis)
  }
`

const Wrapper = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;

  height: 100vh;
  color: white;
  background-color: #3c1f5f;
  
`

const Header = styled('h1')``
const Games = styled('div')`
  display: flex;
  margin-top: 100px;
`

const _twoThousand = styled('div')`
  width: 25rem;
  height: 200px;
  margin: 10px;
  font-family: 'Dosis', sans-serif;
  background: linear-gradient(to right, #ff1d96, #fb0067);
  border-radius: 5px;
  color: white;
  padding: 40px;
`

const CardName = styled('h2')`
  margin-bottom: 30px;
`

const Button = styled('button')`
  text-transform: uppercase;
  background: #bf005c;
  border: none;
  font-weight: 600;
  font-size: 18px;
  border-radius: 5px;
  color: white;
  padding: 10px;
`

export default class App extends React.Component {
	render() {
	  return ( 
      <Wrapper>
        <Header>Games on React</Header>
        <Games>
          <_twoThousand>
            <CardName>2048</CardName>
            <p>Split and win</p>
            <Button>Play now</Button>
          </_twoThousand>
          <_twoThousand />
        </Games>

      </Wrapper>
		);	
	}
}
