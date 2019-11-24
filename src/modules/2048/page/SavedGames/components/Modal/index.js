import React from 'react';
import ReactDOM from 'react-dom';
import { styled } from 'linaria/react';

import { modalEvent } from '../../events';

const Wrapper = styled.div``;
const Button = styled.button``;
const ButtonWrapper = styled.div``;

export const Modal = () => {
	return ReactDOM.createPortal(
		<div>
			<Wrapper data-testid="modal-wrapper">
				<span>Вы точно хотите удалить все карточки?</span>
				<ButtonWrapper>
					<Button onClick={() => modalEvent('yes')}>Да</Button>
					<Button onClick={() => modalEvent('no')}>Нет</Button>
				</ButtonWrapper>
			</Wrapper>
		</div>,
		document.body
	);
};
