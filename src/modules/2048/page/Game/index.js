import React, { useLayoutEffect } from 'react';
import { styled } from 'linaria/react';
import { useStore } from 'effector-react';

import { Modal } from '../../components/Modal';
import { Panel } from '../../components/Panel';
import { Playground } from '../../components/Playground';

import { $playground } from './stores/Playground/';
import { $status } from './stores/Status/';
import { $score } from './stores/Score/';

import { saveGame } from './stores';

import { playgroundApi } from './stores/Playground/';
import { statusApi } from './stores/Status/';

const Wrapper = styled.div`
	min-width: 80%;
	margin: auto;
`;

export const Game = () => {
	const playgroundStore = useStore($playground);
	const score = useStore($score);
	const gameStatus = useStore($status);

	const settings = JSON.parse(window.localStorage.getItem('settings'));

	useLayoutEffect(() => {
		playgroundApi.mount({
			playground: JSON.parse(window.localStorage.getItem('playground')) || null,

			count: 2,
			width: settings ? settings.width : 5,
			height: settings ? settings.height : 5,
		});
		document.addEventListener('keydown', handleMove);
	}, []);

	const handleMove = ({ keyCode }) => {
		if (keyCode == 37) {
			playgroundApi.moveLeft();
		} else if (keyCode == 38) {
			playgroundApi.moveUp();
		} else if (keyCode == 39) {
			playgroundApi.moveRight();
		} else if (keyCode == 40) {
			playgroundApi.moveDown();
		}
	};

	const handleClick = (id) => {
		switch (id) {
			case 0:
				playgroundApi.newGame({
					playground: null,
					count: 3,
					width: settings ? settings.width : 5,
					height: settings ? settings.height : 5,
				});
			case 1: {
				saveGame();
			}
		}
	};

	return (
		<Wrapper>
			<Panel data={score} onClick={(id) => handleClick(id)} />
			<Playground data={playgroundStore} />
			{/* {gameStatus == 'WIN' gameStatus == 'LOSE' ? (
				<Modal status={gameStatus} score={score.score} />
			) : null} */}
		</Wrapper>
	);
};
