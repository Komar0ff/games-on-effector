import React from 'react';
import { styled } from 'linaria/react';
import { Row } from '../../molecules/Row';
import { Tile } from '../../atoms/Tile';

const Wrapper = styled.div`
	position: relative;
	display: flex;
	flex-direction: column;
	justify-content: center;
	border-radius: 5px;
	margin-top: 50px;
`;

export function Playground(props) {
	return (
		<Wrapper>
			{props.data.cells.map((value, id) => (
				<Row key={id} data={value} />
			))}

			{props.data.tiles.map((tile, id) => (
				<Tile key={id} number={tile.value} coordinate={{ x: tile.x, y: tile.y }} />
			))}
		</Wrapper>
	);
}
