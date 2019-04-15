import React from 'react';
export const Button = (props) => (
	<button style={{ cursor: 'pointer' }} onClick={() => props.onClick}>
		{props.text}
	</button>
);
