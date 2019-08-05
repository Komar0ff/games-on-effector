import React from 'react';
import { styled } from 'linaria/react';

import { Block } from '../../atoms/Block';

const Wrapper = styled.div`
	display: flex;
	background-color: #9e9e9e;
	justify-content: center;
	padding-top: 10px;
`;

export const Row = (props) => (
	<Wrapper data-testid="row">
		{props.data.map((value, id) => (
			<Block key={id} number={value} />
		))}
	</Wrapper>
);
