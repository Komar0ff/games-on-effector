import React from 'react';
import ReactDOM from 'react-dom';
// import { Provider } from 'react-redux';
// import { createStore } from 'redux';
import { Router, Route,  hashHistory } from 'react-router';

import App from './App.js';

// let store = createStore();


ReactDOM.render(
	// <Provider store={store}>
		<Router history={hashHistory}>
			<Route path="/" component={App}>
			</Route>
		</Router>,
	// </Provider>,
	document.getElementById('root')

	);