import React from 'react';
import { styled } from 'linaria/react';
import { useStore } from 'effector-react';
import { settingsApi, $settings } from '../../page/Game/stores/settings';

const Wrapper = styled.div``;

export function Settings() {
	const settings = useStore($settings);
	return <Wrapper>test</Wrapper>;
}
