import React from 'react';
import { useStore } from 'effector-react';

import { $settings, $playground } from './stores';
import { widthEvent, heightEvent } from './events';

import { Playground } from '../../components/Playground';

export const Settings = () => {
	const playground = useStore($playground);

	return (
		<>
			<input
				onChange={(event) => widthEvent(event.target.value)}
				type="range"
				min="2"
				max="10"
				step="1"
			/>
			<input
				onChange={(event) => heightEvent(event.target.value)}
				type="range"
				min="2"
				max="10"
				step="1"
			/>

			<Playground data={playground} />
		</>
	);
};
