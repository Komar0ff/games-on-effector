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
		{props.data.map((value, id) => (
			<ScoreArea key={id}>
				{value.name}: {value.count}
			</ScoreArea>
		))}
	</Wrapper>
);
