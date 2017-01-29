import React, { Component } from 'react';
import '../assets/App.css';
import SearchBar from './SearchBar';

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      selectedLocation: ''
    }
  }

  handleLocationUpdate(location) {
    this.setState({
      selectedLocation: location
    });
  }

  render() {
    return (
        <div className="App">
          {this.props.children}
        </div>
    );
  }
}

export default App;
