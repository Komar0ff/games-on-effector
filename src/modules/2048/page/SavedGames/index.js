import React from 'react';
import styled from '@emotion/styled';
import { useStore } from 'effector-react';

import { clearAll } from './services/events';
import { $savedGames } from './services/store';
import { Card } from '../../molecules/Card';

const Wrapper = styled.div``;
const CardWrapper = styled.div``;
const ClearAll = styled.button``;

export const SavedGames = (props) => {
	const store = useStore($savedGames);
	return (
		<Wrapper>
			<ClearAll data-testid="clear-btn" onClick={() => clearAll()} />
			<CardWrapper data-testid="card-wrapper">
				{store.map((value, id) => (
					<Card key={id} data={value} />
				))}
			</CardWrapper>
		</Wrapper>
	);
};
