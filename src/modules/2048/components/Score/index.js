import React from 'react';
import { styled } from 'linaria/react';

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	width: 50%;
`;

const ScoreArea = styled('div')`
	padding: 20px;
	margin: 10px;

	border: 1px solid black;
	border-radius: 10px;
	box-shadow: 2px 2px 1px black;
`;

export function Score(props) {
	return (
		<Wrapper data-testid="scorePanel">
			<ScoreArea>Score: {props.data['score']}</ScoreArea>
			<ScoreArea>Best score: {props.data['bestScore']}</ScoreArea>
		</Wrapper>
	);
}
