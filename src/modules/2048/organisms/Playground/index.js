import React from 'react';
import styled from '@emotion/styled';

import { Block } from '../../atoms/Block';
import { Grid } from '../../molecules/Grid'

const Wrapper = styled('div')`
  display: flex;
  justify-content: center;
  margin-top: 50px;
`;

const activeData = [{count: 1024}, {count: 16}]

export const Playground = () => (
	<Wrapper>
		<Grid width={4} height={4} active={activeData}/>
	</Wrapper>
);
