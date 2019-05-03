import React from 'react';
import styled from '@emotion/styled';
import { Row } from '../../molecules/Row';

const Wrapper = styled('div')`
	display: flex;
	justify-content: center;
	border-radius: 5px;
	margin-top: 50px;
	padding: 10px;
	background-color: #9e9e9e;
`;

export const Playground = (props) => (
	<Wrapper>
		{props.data.map((value, id) => (
			<Row key={id} data={value} />
		))}
	</Wrapper>
);
