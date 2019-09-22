import React from 'react';
import { styled } from 'linaria/react';

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
	16384: '#4CAF50'
};

const Wrapper = styled.div`
	position: absolute;
	top: ${(props) => (props.coordinate ? `${props.coordinate.y * 120 + 10}px` : '10px')};
	left: ${(props) => (props.coordinate ? `${props.coordinate.x * 110}px` : '5px')};

	display: flex;
	align-items: center;
	justify-content: center;

	width: 100px;
	height: 100px;
	margin: 5px;
	border-radius: 5px;

	color: white;
	background-color: ${(props) => colorScheme[`${props.block}`]};

	font-size: 40px;
	font-family: sans-serif;
`;

export const Tile = (props) => (
	<Wrapper
		block={props.number ? `${props.number}` : 'backgroundColor'}
		coordinate={props.coordinate}
		data-testid="block"
	>
		<span>{props.number}</span>
	</Wrapper>
);
