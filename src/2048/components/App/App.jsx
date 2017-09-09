import React, { Component } from 'react';
import './App.css';
import Menu from '../Menu/';


class App extends Component {
  render() {
    return (
      <div
        className="App pt-dark"
      >
        <Menu />
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  children: React.PropTypes.element.isRequired,
};

export default App;
