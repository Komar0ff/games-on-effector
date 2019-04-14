import React from 'react';
import styled from '@emotion/styled';

import { Control } from './Control';
import { Score } from './Score';

const Wrapper = styled('div')``;
const Panel = styled('div')`
  display: flex;
  justify-content: space-around;
`;

export const Game = () => (
	<Wrapper>
		<Panel>
			<Control />
			<Score />
		</Panel>
	</Wrapper>
);
