import React from 'react';
import styled from '@emotion/styled';
import { useStore } from 'effector-react';

import { modalEvent } from './services/events';
import { $savedGames, $modal } from './services/store';
import { Card } from '../../molecules/Card';
import { Modal } from './Modal';

const Wrapper = styled.div``;
const CardWrapper = styled.div``;
const ClearAll = styled.button``;

export const SavedGames = (props) => {
	const cards = useStore($savedGames);
	const modalView = useStore($modal);

	return (
		<Wrapper>
			<ClearAll data-testid="clear-btn" onClick={() => modalEvent()} />
			<CardWrapper data-testid="card-wrapper">
				{cards.map((value, id) => (
					<Card key={id} data={value} />
				))}
			</CardWrapper>

			{modalView ? <Modal /> : null}
		</Wrapper>
	);
};
