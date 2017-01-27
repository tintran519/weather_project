import React, {components} from 'react';
import '../assets/SearchBar.css'
require('es6-promise').polyfill();
require('isomorphic-fetch');


class SearchBar extends React.Component {
  constructor(props){
    super(props);
    this.state ={
      location: '',
      list:[]
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

  renderLocations() {
    // console.log(this.state.list)
    return this.state.list.map((location,index) =>
      <option value={location.name} key={index} data-link={location.l} ref="selectedLocation" />
      )
  };

  changeLocation(e) {
    let _this = this;
    this.setState({
      [e.target.name]: e.target.value
    })
    fetch(`/location?q=${this.state.location}`)
      .then(function(response){
        if(response.status >= 400) {
          throw new Error("Bad response from server");
        }
        return response.json();
      })
      .then(function(results) {
        _this.setState({ list: results.RESULTS })
        console.log('API call',results.RESULTS);
      });
  }

  submitSearch(e) {
    e.preventDefault();
    let submitLocation = this.state.location
    let link = this.refs.selectedLocation.dataset.link;
    let cities = submitLocation.substr(0, submitLocation.indexOf(','));
    let states = submitLocation.substr(submitLocation.indexOf(',') + 2);

    console.log('city and state', cities, states);
    // console.log('submit',this.state.location);
    // console.log('ref',this.refs.selectedLocation.dataset.link);
    fetch(`/weather/${states}/${cities}?link=${link}`)
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
            list="location_list"
            onChange={this.changeLocation.bind(this)}
            value={this.state.location}
            placeholder="Enter City or ZIP code"
            type="text"
            name="location"
            className="form-control"
           />
           <datalist id="location_list">
            {this.renderLocations()}
           </datalist>
        </div>
      </form>
      );
  }
}

export default SearchBar;
