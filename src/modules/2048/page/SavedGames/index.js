import React, { useLayoutEffect } from 'react';
import { styled } from 'linaria/react';
import { useStore } from 'effector-react';

import { modalEvent, removeCardEvent, mountEvent, startingSavedEvent } from './services/events';
import { $savedGames, $modal, $alert } from './services/store';

import { Modal } from './Modal';
import { Alert } from './Alert';
import { Card } from '../../molecules/Card';

const Wrapper = styled.div``;
const CardWrapper = styled.div``;
const ClearAll = styled.button``;

export const SavedGames = (props) => {
	useLayoutEffect(() => {
		mountEvent();
	}, []);

	const cards = useStore($savedGames);
	const modalView = useStore($modal);
	const alertView = useStore($alert);

	return (
		<Wrapper>
			<ClearAll data-testid="clear-btn" onClick={() => modalEvent()}>
				Clear all
			</ClearAll>
			<CardWrapper data-testid="card-wrapper">
				{cards.map((value, id) => (
					<Card
						id={id}
						key={id}
						data={value}
						onClick={(id) => startingSavedEvent(id)}
						onRemove={(id) => removeCardEvent(id)}
					/>
				))}
			</CardWrapper>

			{modalView ? <Modal /> : null}
			{alertView ? <Alert /> : null}
		</Wrapper>
	);
};
