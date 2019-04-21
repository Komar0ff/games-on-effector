import React from 'react';
import styled from '@emotion/styled';

import { Block } from '../../atoms/Block';

const Wrapper = styled('div')``;

export const Playground = () => (
	<Wrapper>
		<Block value="1024" />
	</Wrapper>
);
