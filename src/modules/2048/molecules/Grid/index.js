import React from 'react';
import styled from '@emotion/styled';

import { Block } from '../../atoms/Block';

const Wrapper = styled('div')`
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	align-items: center;
	width: 450px;
	height: 450px;
	background-color: #dedbdb;
	border-radius: 5px;
`;

export const Grid = (props) => {
	const emptyBlocks = [];
	const activeBlocks = [];

	for (let y = 0; y < props.height; ++y) {
		for (let x = 0; x < props.width; ++x) {
			emptyBlocks.push(<Block />);
		}
	}

	return (
		<Wrapper data-testid="grid">
			{emptyBlocks}
			{props.active.map((value, id) => (
				<Block key={id} count={value.count} active />
			))}
		</Wrapper>
	);
};
