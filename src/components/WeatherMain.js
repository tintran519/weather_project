import React from 'react';
import '../assets/WeatherMain.css';

class WeatherMain extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      name:'',
      country:'',
      date: '',
      currentTemp:'',
      currentTempIcon:'',
      currentTempDescr: '',
    }
  }

  componentWillMount() {
    let _this = this;
    fetch(`/weather/${this.props.location.state.selectedLocation.zmw}`)
      .then((response) => {

        if(response.status >= 400){
        throw new Error("Bad response from server");
      }
        return response.json();
      })
      .then((results) => {
        console.log(results)
        this.setState({
          name: results.current_observation.display_location.full,
          country: results.current_observation.display_location.country,
          date: results.current_observation.observation_time.slice(16),
          currentTemp: results.current_observation.temp_f,
          currentTempIcon: results.current_observation.icon_url,
          currentTempDescr: results.current_observation.weather
        })
        console.log(this.state);
        console.log(this.props.location.state.selectedLocation.zmw)
        })
  }

  render() {
    return(
      <div className="mainWrapper">
        <div className="row header-top">
          <h1>{this.state.name}</h1>
          <h3>{this.state.country}</h3>
          <h4>{this.state.date}</h4>
        </div>

        <div className="row header-bot">
          <img src={this.state.currentTempIcon} />
          <h3>{this.state.currentTempDescr}</h3>
          <h1>{this.state.currentTemp}</h1>
        </div>
      </div>
      )
  }
}

export default WeatherMain;
