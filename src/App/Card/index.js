import React from 'react';
import styled from 'react-emotion';

const Wrapper = styled('div')`
  width: 40%;
  height: 200px;
  margin: 10px;
  font-family: 'Dosis', sans-serif;
  background: linear-gradient(to right, #ff1d96, #fb0067);
  border-radius: 5px;
  color: white;
  padding: 40px;
`;

const CardName = styled('h2')`
  margin-bottom: 20px;
`;
const Description = styled('p')`
  margin-bottom: 70px;
  font-size: 20px;
`;

const Button = styled('button')`
  cursor: pointer;
  text-transform: uppercase;
  background: #bf005c;
  border: none;
  font-weight: 600;
  font-size: 18px;
  border-radius: 5px;
  color: white;
  padding: 15px;
  &:hover {
    background: #de1073;
  }
`;

const Lock = styled('div')`
  width: 100%;
  height: 100%;

  background-image: url(src/assets/images/locked.svg);
  background-position: center;
  background-repeat: no-repeat;
`;

export default class Card extends React.Component {
  render() {
    return (
      <Wrapper>
        {this.props.block ? (
          <Lock />
        ) : (
          <>
            <CardName> {this.props.CardName} </CardName>
            <Description>{this.props.Description}</Description>
            <Button>Play now</Button>
          </>
        )}
      </Wrapper>
    );
  }
}
