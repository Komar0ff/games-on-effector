import React from 'react';
import { styled } from 'linaria/react';
import { Row } from '../../molecules/Row';
import { Tiles } from '../../molecules/Tiles';

const Wrapper = styled.div`
	position: relative;
	display: flex;
	flex-direction: column;
	justify-content: center;
	border-radius: 5px;
	margin-top: 50px;
`;

export const Playground = (props) => (
	<Wrapper>
		{props.data.cells.map((value, id) => (
			<Row key={id} data={value} />
		))}

		<Tiles data={props.data.tiles} />
	</Wrapper>
);
