import React from 'react';
import ReactDOM from 'react-dom';
import styled from '@emotion/styled';

const Wrapper = styled.div``;

export const Modal = (props) => {
	return ReactDOM.createPortal(
		<div>
			<Wrapper data-testid="modal-wrapper">
				<span>{props.gameStatus === 'WIN' ? 'Вы победили' : 'Вы проиграли'}</span>
				<span> Ваш результат: {props.score} </span>
			</Wrapper>
		</div>,
		document.body
	);
};
