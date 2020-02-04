import React, { useLayoutEffect } from 'react';
import { styled } from 'linaria/react';
import { useStore } from 'effector-react';

import { Modal } from '../../components/Modal';
import { Panel } from '../../components/Panel';
import { Playground } from '../../components/Playground';

import { $playground } from './stores/playground';
import { $gameStatus } from './stores/gameStatus';
import { $score } from './stores/score';

import { mountEvent, moveEvent, newGameEvent, savedGameEvent } from './events';

const Wrapper = styled.div`
	min-width: 80%;
	margin: auto;
`;

export const Game = () => {
	const playgroundStore = useStore($playground);
	const score = useStore($score);
	const gameStatus = useStore($gameStatus);
	const settings = JSON.parse(window.localStorage.getItem('settings'));

	useLayoutEffect(() => {
		mountEvent({
			playground: JSON.parse(window.localStorage.getItem('playground')) || null,

			count: 2,
			width: settings ? settings.width : 5,
			height: settings ? settings.height : 5
		});
		document.addEventListener('keydown', handleMove);
	}, []);

	const handleMove = (data) => {
		moveEvent(data.keyCode);
	};

	const handleClick = (id) => {
		switch (id) {
			case 0:
				newGameEvent({
					playground: null,
					count: 3,
					width: settings ? settings.width : 5,
					height: settings ? settings.height : 5
				});
				break;
			case 1:
				savedGameEvent();
				break;
		}
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
