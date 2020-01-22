import React from 'react';
export function Button(props) {
	return (
		<button data-testid="btn" style={{ cursor: 'pointer' }} onClick={() => props.onClick()}>
			{props.text}
		</button>
	);
}
