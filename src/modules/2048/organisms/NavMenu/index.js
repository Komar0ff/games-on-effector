import React from 'react';
import { styled } from 'linaria/react';
import { updatePath } from '../../routes';

const Wrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;

	border-bottom: 1px solid grey;
`;

const Logo = styled.h1`
	font-family: sans-serif;
`;

const Navigation = styled.div`
	display: flex;
	justify-content: space-between;

	a {
		display: block;
		margin: 20px;
		cursor: pointer;

		font-family: sans-serif;
	}
`;

export function NavMenu() {
	return (
		<Wrapper>
			<Logo>2048</Logo>
			<Navigation>
				<a onClick={() => updatePath('Game')}>Game</a>
				<a onClick={() => updatePath('SavedGames')}>Saved games</a>
				<a onClick={() => updatePath('Settings')}>Settings</a>
			</Navigation>
		</Wrapper>
	);
}
