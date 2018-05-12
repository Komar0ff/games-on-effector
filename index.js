import React from 'react';
import ReactDOM from 'react-dom';
// import { Provider } from 'react-redux';
// import { createStore } from 'redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import App from './App.js';

// let store = configureStore();


ReactDOM.render(
	// <Provider store={store}>
		<Router history={browserHistory}>
			<Route path="/" component={App}>
					<Route path='/2048' />
					<Route path='/Tictactoe' />
					<Route path='/Ships' />
			</Route>
		</Router>,
	// </Provider>,
	document.getElementById('root')

	);