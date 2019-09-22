import React from 'react';
import { styled } from 'linaria/react';
import { Row } from '../../molecules/Row';
import { TileBlock } from '../../atoms/TileBlock';

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

		{props.data.tiles.map((tile, id) => (
			<TileBlock key={id} number={tile.value} coordinate={{ x: tile.x, y: tile.y }} />
		))}
	</Wrapper>
);
