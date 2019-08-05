import React from 'react';
import { styled } from 'linaria/react';

import { Control } from '../../molecules/Control';
import { Score } from '../../molecules/Score';

const Wrapper = styled.div`
	display: flex;
	justify-content: space-between;
`;

export const Panel = (props) => (
	<Wrapper>
		<Control onClick={(id) => props.onClick(id)} />
		<Score data={props.data} />
	</Wrapper>
);
