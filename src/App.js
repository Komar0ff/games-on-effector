import React, { Component } from 'react';

class App extends Component {
	render() {
		return ( 
		<div className='container'>
			<div Link to='/one' className='numbers element'>one</div>
			<div Link to='/two' className='ships element'>two</div>
			<div Link to='/three' className='tictactoe element'>three</div>
		</div>
		);	
	}
}

export default App;
