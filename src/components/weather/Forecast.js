import React,{components} from 'react';
import '../../assets/WeatherMain.css';
import classnames from 'classnames';
import '../../../bower_components/weather-icons/css/weather-icons.css';
import '../../../bower_components/weather-icons/css/weather-icons-wind.css';


class Forecast extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      celsius: this.props.celsiusToggle,
      forecast: this.props.forecastInfo,
      textForecast: this.props.forecastInfo.txt_forecast.forecastday,
      tenDayForecast: true
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ celsius: nextProps.celsiusToggle })
  }

  renderForecast() {
    if(this.state.tenDayForecast) {
      return this.state.forecast.simpleforecast.forecastday.map((day,index) =>
        <tr className="forecastRows" key={index}>
          <td>{day.date.weekday}</td>
          <td className="tempIcon"><img src={day.icon_url} /></td>
          <td><i style={{display: 'block'}} className="wi wi-humidity"></i><span>{day.pop}%</span></td>
          <td className="tempHigh" ref={day.period}>{!this.state.celsius ? day.high.fahrenheit : day.high.celsius}&deg;</td>
          <td className="tempLow">{!this.state.celsius ? day.low.fahrenheit : day.low.celsius}&deg;</td>
        </tr>
        )
    } else {
      return this.state.forecast.simpleforecast.forecastday.slice(0,5).map((day,index) =>
        <tr className="forecastRows" key={index}>
          <td>{day.date.weekday}</td>
          <td className="tempIcon"><img src={day.icon_url} /></td>
          <td><i style={{display: 'block'}} className="wi wi-humidity"></i><span>{day.pop}%</span></td>
          <td className="tempHigh" ref={day.period}>{!this.state.celsius ? day.high.fahrenheit : day.high.celsius}&deg;</td>
          <td className="tempLow">{!this.state.celsius ? day.low.fahrenheit : day.low.celsius}&deg;</td>
        </tr>
        )
    }
  };

  onFiveDayClick() {
    this.setState({ tenDayForecast: false });
  }

  onTenDayClick() {
    this.setState({ tenDayForecast: true });
  }

  render() {
    return (
    <div className="col-md-3 forecastWrapper">
      <table id="forecastTable">
        <tbody>
          <tr>
            <th colSpan='5'>Forecast</th>
          </tr>
          {this.renderForecast()}
          <tr colSpan='2'>
            <td>
              <span className={classnames("forecastToggle", {"forecastToggleOff": this.state.tenDayForecast})} onClick={this.onFiveDayClick.bind(this)}>5 DAY</span>&nbsp;|&nbsp;
              <span className={classnames("forecastToggle", {"forecastToggleOff": !this.state.tenDayForecast})} onClick={this.onTenDayClick.bind(this)}>10 DAY</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    );
  }
}

export default Forecast;
