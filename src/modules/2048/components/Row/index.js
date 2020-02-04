import React from 'react';
import { styled } from 'linaria/react';
import { Cell } from '../../atoms/Cell';

const Wrapper = styled.div`
	display: flex;
	background-color: #9e9e9e;
	padding-top: 10px;
`;

export function Row(props) {
	return (
		<Wrapper data-testid="row">
			{props.data.map((value, id) => (
				<Cell key={id} number={value} />
			))}
		</Wrapper>
	);
}
