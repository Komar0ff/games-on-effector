import React from 'react';
import { render } from 'react-dom';

import { wrapper, block, blocked } from './style.module.scss';

const App = () => {
	return (
		<div className={wrapper}>
			<div className={blocked}> test </div>
			<div className={block}> test </div>
			<div className={blocked}> test </div>
		</div>
	);
};

render(<App />, document.getElementById('root'));
