import React,{components} from 'react';
import '../assets/WeatherMain.css';
import { Link } from 'react-router';

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
      forecast: ''
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
          forecast: results.forecast.simpleforecast.forecastday
        })
        console.log(this.state.forecast);
        console.log(this.props.location.state.selectedLocation.zmw)
        })
  }

  renderForecast() {
    return this.state.forecast.map((day,index) =>
      <div key={index}>{day.date.weekday}</div>
      )
  };

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
          <h3>{this.state.country}</h3>
          <h4>{this.state.date}</h4>
        </div>

        <div className="row header-bot">
          <img src={this.state.currentTempIcon} />
          <h3>{this.state.currentTempDescr}</h3>
          <h1>{this.state.currentTemp}&deg;</h1>
        </div>

      <div className="row col-sm-8 forecast">
        <section>
          <h3>Forecast</h3>
          {this.renderForecast()}
        </section>
      </div>

      <div className="row col-md-4">
        <section>
          <h3>Details</h3>
        </section>
      </div>

      </div>
      )
  }
}

export default WeatherMain;
