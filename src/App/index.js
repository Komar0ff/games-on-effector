import React from 'react';
import styled, { injectGlobal } from 'react-emotion';

import Card from './Card';

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
`;

const Wrapper = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;

  position: fixed;
  width: 100%;
  height: 100%;
  
  color: white;
  background-color: #3c1f5f;
`;

const Header = styled('h1')`
  margin-top: 30px;
  font-family: 'Dosis', sans-serif;
`;

const Games = styled('div')`
  display: flex;
  flex-wrap: wrap;

  width: 80%;
  margin: 100px auto;
`;

const Cards = [
  {
    CardName: '2048',
    Description: 'This a single-player sliding block puzzle. Split and win'
  },
  {
    CardName: 'Battleship',
    Description:
      'You must successfully invade the home port of their opponent while protecting their own ports from invasion.',
    block: true
  }
];

export default class App extends React.Component {
  render() {
    return (
      <Wrapper>
        <Header>Games on React</Header>
        <Games>
          {Cards.map((obj, id) => (
            <Card key={id} CardName={obj.CardName} Description={obj.Description} block={obj.block} />
          ))}
        </Games>
      </Wrapper>
    );
  }
}
