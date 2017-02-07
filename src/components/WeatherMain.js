import React,{components} from 'react';
import '../assets/WeatherMain.css';
import { Link } from 'react-router';
import Forecast from './weather/Forecast';
import Details from './weather/Details';
import SunMoonPhase from './weather/SunMoonPhase';
import classnames from 'classnames';

class WeatherMain extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      name:'',
      country:'',
      date: '',
      currentTempF:'',
      currentTempC: '',
      currentTempIcon:'',
      currentTempDescr: '',
      forecast: [],
      currentHighF: '',
      currentLowF: '',
      currentHighC: '',
      currentLowC: '',
      currentObservation: [],
      detailForecastCurrentDay: [],
      detailForecastCurrentNight: [],
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
          celsius: false,
          name: results.current_observation.display_location.full,
          country: results.current_observation.display_location.country,
          date: results.current_observation.observation_time.slice(16),
          currentTempF: results.current_observation.temp_f,
          currentTempC: results.current_observation.temp_c,
          currentTempIcon: results.current_observation.icon_url,
          currentTempDescr: results.current_observation.weather,
          forecast: results.forecast,
          currentHighF: results.forecast.simpleforecast.forecastday[0].high.fahrenheit,
          currentLowF: results.forecast.simpleforecast.forecastday[0].low.fahrenheit,
          currentHighC: results.forecast.simpleforecast.forecastday[0].high.celsius,
          currentLowC: results.forecast.simpleforecast.forecastday[0].low.celsius,
          currentObservation: results.current_observation,
          detailForecastCurrentDay: results.forecast.txt_forecast.forecastday[0],
          detailForecastCurrentNight: results.forecast.txt_forecast.forecastday[1],
        })
      })
    }

  onCelsiusClick() {
    this.setState({ celsius: true })
  }

  onFahrenheitClick() {
    this.setState({ celsius: false })
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
            <span id="currentHigh">&uarr;&nbsp;{!this.state.celsius ? this.state.currentHighF : this.state.currentHighC}&deg;</span>
            <span id="currentLow">&darr;&nbsp;{!this.state.celsius ? this.state.currentLowF : this.state.currentLowC}&deg;</span>
          </div>
          <h1 id="currentTemp">{!this.state.celsius ? this.state.currentTempF : this.state.currentTempC}&deg;</h1>
          <div id="metricControl">
            <div className={classnames("metricToggle", {"metricToggleOff": !this.state.celsius})} onClick={this.onCelsiusClick.bind(this)}>C</div>
            <div className={classnames("metricToggle", {"metricToggleOff": this.state.celsius})} onClick={this.onFahrenheitClick.bind(this)}>F</div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            {this.state.forecast.length === 0 ? <div>Loading...</div> : <Forecast forecastInfo={this.state.forecast} celsiusToggle={this.state.celsius} />}
          </div>
          <div className="col-md-6">
            <div className="detailsWrapper">
              {this.state.currentObservation.length === 0 ? <div>Loading...</div> : <Details currentObservationInfo={this.state.currentObservation} currentDayDetail={this.state.detailForecastCurrentDay} currentNightDetail={this.state.detailForecastCurrentNight} />}
            </div>
            <div className="col-md-12">
              <SunMoonPhase />
            </div>
          </div>
        </div>

      </div>
      )
  }
}

export default WeatherMain;
