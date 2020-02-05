import React from 'react';
import { styled } from 'linaria/react';

import { Control } from '../Control';
import { Score } from '../Score';

const Wrapper = styled.div`
	display: flex;
	justify-content: space-between;
`;

export function Panel(props) {
	return (
		<Wrapper>
			<Control onClick={(id) => props.onClick(id)} />
			<Score data={props.data} />
		</Wrapper>
	);
}
