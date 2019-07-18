import React from 'react';
import { useStore } from 'effector-react';

import { $routing } from './routes';
import { NavMenu } from './organisms/NavMenu';

import { Game } from './page/Game';
import { SavedGames } from './page/SavedGames';
import { Settings } from './page/Settings';

export const TwoThousand = () => {
	const routing = useStore($routing);

	const routes = {
		Game: <Game />,
		SavedGames: <SavedGames />,
		Settings: <Settings />
	};

	return (
		<>
			<NavMenu />
			{routes[routing]} // It's a temporary solution. We have to solve the routing issue.
		</>
	);
};
