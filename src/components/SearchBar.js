import React, {components} from 'react';
import '../assets/SearchBar.css'
require('es6-promise').polyfill();
require('isomorphic-fetch');


class SearchBar extends React.Component {
  constructor(props){
    super(props);
    this.state ={
      location: ''
    }
  }

  // componentDidMount(){
  //   fetch(`/weather?location=${this.state.location}`)
  //     .then(function(response){
  //       if(response.status >= 400) {
  //         throw new Error("Bad response from server");
  //       }
  //       return response.json();
  //     })
  //     .then(function(results) {
  //       console.log('API call',results);
  //     });
  // }

  changeLocation(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  submitSearch(e) {
    e.preventDefault();
    fetch(`/weather?location=${this.state.location}`)
      .then(function(response){
        if(response.status >= 400) {
          throw new Error("Bad response from server");
        }
        return response.json();
      })
      .then(function(results) {
        console.log('API call',results);
      });
  }

  render() {
    return (
      <form onSubmit={this.submitSearch.bind(this)}>
        <h3>Enter location</h3>

        <div className="form-group">
          <label className="control-label"></label>
          <input
            onChange={this.changeLocation.bind(this)}
            value={this.state.location}
            placeholder="Enter City or ZIP code"
            type="text"
            name="location"
            className="form-control"
           />
        </div>
      </form>
      );
  }
}

export default SearchBar;
