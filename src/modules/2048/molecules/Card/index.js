import React from 'react';
import styled from '@emotion/styled';

const Wrapper = styled.div`
	border: 1px solid black;
	border-radius: 5px;

	width: 300px;
	height: 500px;
	cursor: pointer;
`;

const Panel = styled.div``;
const Move = styled.div``;
const Score = styled.div``;

export const Card = (props) => (
	<Wrapper>
		<Panel>
			<Move data-testid="move">{props.data.move}</Move>
			<Score data-testid="score">{props.data.score}</Score>
		</Panel>
	</Wrapper>
);
