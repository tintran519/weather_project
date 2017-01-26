import React, { Component } from 'react';
import '../assets/App.css';

class App extends Component {
  render() {
    return (
        <div className="App">
          <h2 className="App-header">Sky View</h2>
          <SearchBar />
        </div>
    );
  }
}

export default App;
