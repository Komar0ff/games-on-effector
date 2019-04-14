import React from 'react';
import { render } from 'react-dom';

import locked from './assets/images/locked.svg';
import { wrapper, block, blocked } from './style.module.css';
import { TwoThousand } from './modules/2048';

const App = () => (
	<TwoThousand />
	// <div className={wrapper}>
	// 	<div className={block}> test </div>
	// 	<div className={blocked}> test </div>
	// 	<div className={blocked}> test </div>
	// </div>
);

render(<App />, document.getElementById('root'));
