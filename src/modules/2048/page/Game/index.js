import React from 'react';
import styled from '@emotion/styled';

import { Control } from '../../molecules/Control';
import { Score } from '../../molecules/Score';
import { Playground } from '../../organisms/Playground'

const Wrapper = styled('div')`
	min-width: 80%;
	margin: auto;
`;
const Panel = styled('div')`
	display: flex;
	justify-content: space-between;
`;

export const Game = () => (
	<Wrapper>
		<Panel>
			<Control />
			<Score />
		</Panel>
		<Playground />
	</Wrapper>
);
