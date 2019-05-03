import React from 'react';
import styled from '@emotion/styled';

import { Block } from '../../atoms/Block';

const Wrapper = styled('div')``;

export const Row = (props) => (
	<Wrapper data-testid="row">
		{props.data.map((value, id) => (
			<Block key={id} number={value} />
		))}
	</Wrapper>
);
