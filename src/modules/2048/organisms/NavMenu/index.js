import React from 'react';
import styled from '@emotion/styled';

const Wrapper = styled('div')`
	display: flex;
	align-items: center;
	justify-content: space-between;

	border-bottom: 1px solid grey;
`;

const Logo = styled('h1')`
	font-family: sans-serif;
`;

const Navigation = styled('div')`
	display: flex;
	justify-content: space-between;

	a {
		display: block;
		margin: 20px;
		cursor: pointer;

		font-family: sans-serif;
	}
`;

export const NavMenu = () => (
	<Wrapper>
		<Logo>2048</Logo>
		<Navigation>
			<a>Game</a>
			<a>Saved games</a>
			<a>Settings</a>
		</Navigation>
	</Wrapper>
);
