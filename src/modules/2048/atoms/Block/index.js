import React from 'react';
import styled from '@emotion/styled';

const Wrapper = styled('div')`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100px;
	height: 100px;
	border-radius: 5px;
	margin: 5px;

	color: white;
	background-color: ${props => props.active || '#737373'};

	font-size: 40px;
	font-family: sans-serif;
`;

const colorScheme = {
  backgroundColor: '#ccc',
  2: '#f44336',
  4: '#E91E63',
  8: '#9C27B0',
  16: '#673AB7',
  32: '#3F51B5',
  64: '#2196F3',
  128: '#03A9F4',
  256: '#00BCD4',
  512: '#FFEB3B',
  1024: '#FFC107',
  2048: '#FF9800',
  4096: '#FF5722',
  8192: '#8BC34A',
  16384: '#4CAF50',
};

export const Block = (props) => (
	<Wrapper data-testid={props.active ? 'active-block' : 'block'}>
		<span>{props.count}</span>
	</Wrapper>
);
