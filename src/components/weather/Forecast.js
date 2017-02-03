import React,{components} from 'react';
import '../../assets/WeatherMain.css';


class Forecast extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      forecast: this.props.forecastInfo,
      textForecast: this.props.forecastInfo.txt_forecast.forecastday
    }
  }

  renderForecast() {
    console.log(this.state.textForecast[0])
    return this.state.forecast.simpleforecast.forecastday.map((day,index) =>
      <tr className="forecastRows" key={index}>
        <td>{day.date.weekday}</td>
        <td className="tempIcon"><img src={day.icon_url} /></td>
        <td className="tempHigh" ref={day.period}>{day.high.fahrenheit}&deg;</td>
        <td className="tempLow">{day.low.fahrenheit}&deg;</td>
      </tr>
      )
  };

  render() {
    return (
    <div className="col-md-3 forecastWrapper">
      <table id="forecastTable">
        <tbody>
          <tr>
            <th colSpan='4'>Forecast</th>
          </tr>
          {this.renderForecast()}
          <tr colSpan='2'>
            <td>
              <span>5 DAY</span>&nbsp;|&nbsp;<span>10 DAY</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    );
  }
}

export default Forecast;
