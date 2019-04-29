import React from 'react';
import styled from '@emotion/styled';

import { Panel } from '../../organisms/Panel';
import { Playground } from '../../organisms/Playground';

const Wrapper = styled('div')`
	min-width: 80%;
	margin: auto;
`;

const fakeData = [{ name: 'Score', count: 0 }, { name: 'Best score', count: 20 }];

export const Game = () => (
	<Wrapper>
		<Panel data={fakeData} />
		<Playground />
	</Wrapper>
);
