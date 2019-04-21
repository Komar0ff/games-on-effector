import React from 'react';
import styled from '@emotion/styled';

import { Panel } from '../../organisms/Panel';
import { Playground } from '../../organisms/Playground';

const Wrapper = styled('div')`
	min-width: 80%;
	margin: auto;
`;

export const Game = () => (
	<Wrapper>
		<Panel />
		<Playground />
	</Wrapper>
);
