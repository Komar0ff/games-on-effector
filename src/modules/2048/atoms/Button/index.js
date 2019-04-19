import React from 'react';
export const Button = (props) => (
	<button data-testid="btn" style={{ cursor: 'pointer' }} onClick={() => props.onClick()}>
		{props.text}
	</button>
);
