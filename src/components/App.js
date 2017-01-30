import React, { Component } from 'react';
import '../assets/App.css';
import SearchBar from './SearchBar';

class App extends Component {

  render() {
    return (
        <div className="App">
          {this.props.children}
        </div>
    );
  }
}

export default App;
