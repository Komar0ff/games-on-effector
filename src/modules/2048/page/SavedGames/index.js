import React, { useLayoutEffect } from 'react';
import styled from '@emotion/styled';
import { useStore } from 'effector-react';

import { modalEvent, removeCardEvent, mountEvent } from './services/events';
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
					<Card key={id} data={value} onClick={(id) => removeCardEvent(id)} />
				))}
			</CardWrapper>

			{modalView ? <Modal /> : null}
			{alertView ? <Alert /> : null}
		</Wrapper>
	);
};
