import React, { useLayoutEffect } from 'react';
import styled from '@emotion/styled';
import { useStore } from 'effector-react';

import { Modal } from '../../molecules/Modal';
import { Panel } from '../../organisms/Panel';
import { Playground } from '../../organisms/Playground';

import { $playground } from './services/stores/playground';
import { $gameStatus } from './services/stores/gameStatus';
import { $score } from './services/stores/score';

import { mountEvent, newGameEvent, moveEvent } from './services/events';

const Wrapper = styled('div')`
	min-width: 80%;
	margin: auto;
`;

export const Game = () => {
	const playgroundStore = useStore($playground);
	const score = useStore($score);
	const gameStatus = useStore($gameStatus);

	useLayoutEffect(() => {
		mountEvent({ playground: [], count: 8, width: 5, height: 5 });
		document.addEventListener('keydown', handleMove);
	}, []);

	const handleMove = (data) => {
		moveEvent(data.keyCode);
	};

	const handleClick = (id) => {
		if (!id) newGameEvent({ playground: [], count: 3, width: 5, height: 5 });
	};

	return (
		<Wrapper>
			<Panel data={score} onClick={(id) => handleClick(id)} />
			<Playground data={playgroundStore} />
			{gameStatus == 'WIN' || gameStatus == 'LOSE' ? (
				<Modal status={gameStatus} score={score.score} />
			) : null}
		</Wrapper>
	);
};
