import React from 'react';
import { styled } from 'linaria/react';

const Wrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100px;
	height: 100px;
	border-radius: 5px;
	margin: 5px;

	color: white;
	background-color: #ccc;

	font-size: 40px;
	font-family: sans-serif;
`;

export const Cell = (props) => (
	<Wrapper data-testid="block">
		<span>{props.number || ''}</span>
	</Wrapper>
);
