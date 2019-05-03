import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import { useStore } from 'effector-react';

import { Panel } from '../../organisms/Panel';
import { Playground } from '../../organisms/Playground';
import { $playground } from './service/stores';
import { mountEvent } from './service/events';

const Wrapper = styled('div')`
	min-width: 80%;
	margin: auto;
`;

const fakeData = [{ name: 'Score', count: 0 }, { name: 'Best score', count: 20 }];

export const Game = () => {
	const playgroundStore = useStore($playground);
	useEffect(() => {
		mountEvent({ playground: [], count: 3, width: 10, height: 10 });
	}, []);

	return (
		<Wrapper>
			<Panel data={fakeData} />
			<Playground data={playgroundStore} />
		</Wrapper>
	);
};
