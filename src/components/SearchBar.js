import React, {components} from 'react';
import '../assets/SearchBar.css'
require('es6-promise').polyfill();
require('isomorphic-fetch');
import { browserHistory } from 'react-router';


class SearchBar extends React.Component {
  constructor(props){
    super(props);
    this.state ={
      location: '',
      list: []
    }
  }

  renderLocations() {
    return this.state.list.map((location,index) =>
      <li key={index} ref={location.name} onClick={this.selectLocation.bind(this,location)}>{location.name}</li>
      )
  };

  selectLocation(item) {
    browserHistory.push({
      pathname: '/weather',
      state:{
        selectedLocation: item
      }
    })
  }

  changeLocation(e) {
    this.setState({
      [e.target.name]: e.target.value
    })

  }

  submitSearch(e) {
    e.preventDefault();
    let _this = this;
    fetch(`/location?q=${this.state.location}`)
      .then(function(response){
        if(response.status >= 400) {
          throw new Error("Bad response from server");
        }
        return response.json();
      })
      .then(function(results) {
        _this.setState({ location: '', list: results.RESULTS })
        console.log('API call',results.RESULTS);
      });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.submitSearch.bind(this)}>
          <h3>Enter location</h3>

          <div className="form-group">
            <label className="control-label"></label>
            <input
              list="location_list"
              onChange={this.changeLocation.bind(this)}
              value={this.state.location}
              placeholder="Enter City or ZIP code"
              type="text"
              name="location"
              className="form-control"
             />
          </div>
        </form>
        {this.state.list.length === 0 ? null : <h4>Search Results</h4>}
        <ul>
          {this.renderLocations()}
        </ul>
      </div>
      );
  }
}

export default SearchBar;
