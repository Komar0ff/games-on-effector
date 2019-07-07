import React from 'react';
import styled from '@emotion/styled';

const Wrapper = styled.div`
	position: relative;

	width: 300px;
	height: 500px;
	border: 1px solid black;
	border-radius: 5px;

	cursor: pointer;
`;

const Panel = styled.div``;
const Move = styled.div``;
const Score = styled.div``;
const Button = styled.div`
	position: absolute;
`;

export const Card = (props) => (
	<Wrapper>
		<Panel>
			<Move data-testid="move">{props.data.move}</Move>
			<Score data-testid="score">{props.data.score}</Score>
		</Panel>

		<Button data-testid="card-btn" onClick={() => props.onClick(props.id)} />
	</Wrapper>
);
