import React, { useState } from 'react';
import styled from '@emotion/styled';
import { Button } from '../../atoms/Button';

const data = [{ text: 'New game' }, { text: 'Save game' }, { text: 'Revert step' }];

const Wrapper = styled('div')``;

export const Control = (props) => (
	<Wrapper>
		{data.map((value, id) => (
			<Button key={id} text={value.text} onClick={() => props.handleClick} />
		))}
	</Wrapper>
);
