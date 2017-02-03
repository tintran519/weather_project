import React,{components} from 'react';
import '../../assets/WeatherMain.css';
import classnames from 'classnames';
import '../../../bower_components/weather-icons/css/weather-icons.css';
import '../../../bower_components/weather-icons/css/weather-icons-wind.css';


class Forecast extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      forecast: this.props.forecastInfo,
      textForecast: this.props.forecastInfo.txt_forecast.forecastday,
      tenDayForecast: true
    }
  }

  renderForecast() {
    if(this.state.tenDayForecast) {
      return this.state.forecast.simpleforecast.forecastday.map((day,index) =>
        <tr className="forecastRows" key={index}>
          <td>{day.date.weekday}</td>
          <td className="tempIcon"><img src={day.icon_url} /></td>
          <td><i style={{display: 'block'}} className="wi wi-raindrop"></i><span>{day.pop}%</span></td>
          <td className="tempHigh" ref={day.period}>{day.high.fahrenheit}&deg;</td>
          <td className="tempLow">{day.low.fahrenheit}&deg;</td>
        </tr>
        )
    } else {
      return this.state.forecast.simpleforecast.forecastday.slice(0,5).map((day,index) =>
        <tr className="forecastRows" key={index}>
          <td>{day.date.weekday}</td>
          <td className="tempIcon"><img src={day.icon_url} /></td>
          <td><i style={{display: 'block'}} className="wi wi-raindrop"></i><span>{day.pop}%</span></td>
          <td className="tempHigh" ref={day.period}>{day.high.fahrenheit}&deg;</td>
          <td className="tempLow">{day.low.fahrenheit}&deg;</td>
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
