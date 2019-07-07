import React from 'react';
import ReactDOM from 'react-dom';
import styled from '@emotion/styled';

const Wrapper = styled.div``;

export const Alert = () => {
	return ReactDOM.createPortal(
		<div>
			<Wrapper data-testid="modal-wrapper">
				<span>Карточки удалены</span>
			</Wrapper>
		</div>,
		document.body
	);
};
