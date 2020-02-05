import React, { useState } from 'react';
import { styled } from 'linaria/react';
import { Button } from '../Button';

const data = [
	{ id: 0, text: 'New game' },
	{ id: 1, text: 'Save game' },
	{ id: 2, text: 'Revert step' }
];

const Wrapper = styled('div')``;

export function Control(props) {
	return (
		<Wrapper data-testid="control">
			{data.map((value, id) => (
				<Button key={id} id={value.id} text={value.text} onClick={() => props.onClick(id)} />
			))}
		</Wrapper>
	);
}
