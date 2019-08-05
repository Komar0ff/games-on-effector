import React from 'react';
import { styled } from 'linaria/react';
import { Row } from '../../molecules/Row';

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	border-radius: 5px;
	margin-top: 50px;
`;

export const Playground = (props) => (
	<Wrapper>
		{props.data.map((value, id) => (
			<Row key={id} data={value} />
		))}
	</Wrapper>
);
