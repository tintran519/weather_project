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
      forecast: [],
      currentHigh: '',
      currentLow: ''
    }
  }

  //load weather API
  componentDidMount() {
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
          feelsLike: results.current_observation.feelslike_f,
          humidity: results.current_observation.relative_humidity,
          visibility: results.current_observation.visibility_mi,
          uv: results.current_observation.UV
        })
        console.log(this.state.forecast[0].high.fahrenheit);
        console.log(this.props.location.state.selectedLocation.zmw)
        })
  }

  renderForecast() {
    return this.state.forecast.map((day,index) =>
      <tr className="forecastRows" key={index}>
        <td>{day.date.weekday}</td>
        <td className="tempIcon"><img src={day.icon_url} /></td>
        <td className="tempHigh" ref={day.period}>{day.high.fahrenheit}&deg;</td>
        <td className="tempLow">{day.low.fahrenheit}&deg;</td>
      </tr>
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

        <div className="col-md-3 forecastWrapper">
          <table id="forecastTable">
            <tbody>
              <tr>
                <th colSpan='4'>Forecast</th>
              </tr>
              {this.renderForecast()}
            </tbody>
          </table>
        </div>

        <div className="col-md-3 detailsWrapper">
          <table id="detailsTable">
            <tbody>
              <tr>
                <th colSpan='3'>Details</th>
              </tr>
              <tr>
                <td rowSpan='4' id="detailIcon">
                  <img src={this.state.currentTempIcon} />
                </td>
                <td className="detailLabel">Feels like</td>
                <td className="detailValue">{this.state.feelsLike}&deg;</td>
              </tr>
              <tr>
                <td className="detailLabel">Humidity</td>
                <td className="detailValue">{this.state.visibility}</td>
              </tr>
              <tr>
                <td className="detailLabel">Visibility</td>
                <td className="detailValue">{this.state.visibility}miles</td>
              </tr>
              <tr>
                <td className="detailLabel">UV Index</td>
                <td className="detailValue">{this.state.uv}</td>
              </tr>
              <tr>
                <td colSpan='3' className="detailTextForecast">Tonight Weather Description Here skdfjskjflsjfsdfk</td>
              </tr>
              <tr>
                <td colSpan='3' className="detailTextForecast">Today Weather Description here alsfjlskdjflksdjflkjs</td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>

      </div>
      )
  }
}

export default WeatherMain;
