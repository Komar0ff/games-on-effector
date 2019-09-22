import React from 'react';
import { styled } from 'linaria/react';

import { Block } from '../../atoms/Block';

const Wrapper = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	display: flex;
	justify-content: center;
	background-color: white;
`;

export const Tiles = (props) => (
	<Wrapper>
		<Block number={2} coordinate={{ x: 1, y: 1 }} />
	</Wrapper>
);
