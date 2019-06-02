import React from 'react';
import styled from '@emotion/styled';

const Wrapper = styled('div')`
	display: flex;
	flex-direction: column;
	width: 50%;
`;

const ScoreArea = styled('div')`
	padding: 20px;
	margin: 10px;

	border: 1px solid grey;
	border-radius: 5px;
`;

export const Score = (props) => (
	<Wrapper data-testid="scorePanel">
		<ScoreArea>
			Score: {props.data['score']}
		</ScoreArea>
		<ScoreArea>
			Best score: {props.data['bestScore']}
		</ScoreArea>
	</Wrapper>
);
