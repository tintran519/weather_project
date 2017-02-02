import React,{components} from 'react';
import '../assets/WeatherMain.css';
import { Link } from 'react-router';
import Forecast from './weather/Forecast';
import Details from './weather/Details';

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
      forecast: [],
      currentHigh: '',
      currentLow: '',
      currentObservation: [],
      detailForecastCurrentDay: [],
      detailForecastCurrentNight: []
    }
  }

  //load weather API
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
          currentTempDescr: results.current_observation.weather,
          forecast: results.forecast.simpleforecast.forecastday,
          currentHigh: results.forecast.simpleforecast.forecastday[0].high.fahrenheit,
          currentLow: results.forecast.simpleforecast.forecastday[0].low.fahrenheit,
          currentObservation: results.current_observation,
          detailForecastCurrentDay: results.forecast.txt_forecast.forecastday[0],
          detailForecastCurrentNight: results.forecast.txt_forecast.forecastday[1],
        })
      })
    }

  render() {
    return(
      <div className="mainWrapper">
        <div className="row header-top">
          <h1 id="locationName">{this.state.name}</h1>
          <div id="locationChange">
            <button>
              <Link to="/" className="locationPicker">Change location</Link>
            </button>
        </div>
          <h3 id="country">{this.state.country}</h3>
          <h4>{this.state.date}</h4>
        </div>

        <div className="row header-bot">
          <img src={this.state.currentTempIcon} />
          <span id="tempDescr">{this.state.currentTempDescr}</span>
          <div>
            <span id="currentHigh">&uarr;&nbsp;{this.state.currentHigh}&deg;</span>
            <span id="currentLow">&darr;&nbsp;{this.state.currentLow}&deg;</span>
          </div>
          <h1 id="currentTemp">{this.state.currentTemp}&deg;</h1>
        </div>

        <div className="row">
          {this.state.forecast.length === 0 ? <div>Loading...</div> : <Forecast forecastInfo={this.state.forecast} />}
          {this.state.currentObservation.length === 0 ? <div>Loading...</div> : <Details currentObservationInfo={this.state.currentObservation} currentDayDetail={this.state.detailForecastCurrentDay} currentNightDetail={this.state.detailForecastCurrentNight} />}
        </div>

      </div>
      )
  }
}

export default WeatherMain;
