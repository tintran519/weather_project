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
      textForecastObj: this.props.forecastInfo.txt_forecast.forecastday,
      textForecast: [],
      tenDayForecast: true,
      hourlyForecastObj: this.props.hourlyForecastInfo,
      hourlyForecastDisplay: 'temperature'
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ celsius: nextProps.celsiusToggle })
  }

  componentWillMount() {
    //remove night details for each day from json array
    let textForecast = [];
    this.state.textForecastObj.forEach((day,index) => {
      if(index % 2 === 0) textForecast.push(day)})

    //create new array with detailed info & save to state
    let forecastObj = this.state.forecast;
    let {simpleforecast:{forecastday}} = forecastObj
    forecastday.forEach((day,index) => {day.textForecast = textForecast[index]})
    this.setState({ textForecast: forecastday })
  }

  renderForecast() {
    if(this.state.tenDayForecast) {
      return this.state.textForecast.map((day,index) =>
        <tbody key={index}>
          <tr className="forecastRows" style={{borderBottom: '1px dotted rgba(255,255,255,.12)'}} ref={"forecastRow " + index} onClick={this.textForecastToggle.bind(this,index)}>
            <td>{day.date.weekday}</td>
            <td className="tempIcon"><img src={day.icon_url} /></td>
            <td><i style={{display: 'block'}} className="wi wi-humidity"></i><span className="pop">{day.pop}%</span></td>
            <td className="tempHigh" ref={day.period}>{!this.state.celsius ? day.high.fahrenheit : day.high.celsius}&deg;</td>
            <td className="tempLow">{!this.state.celsius ? day.low.fahrenheit : day.low.celsius}&deg;</td>
          </tr>
          <tr style={{ display:'none' }} className="textForecastRow" ref={"textForecast " + index}>
            <td colSpan='5'>{day.textForecast.fcttext}</td>
          </tr>
        </tbody>
        )
    } else {
      return this.state.forecast.simpleforecast.forecastday.slice(0,5).map((day,index) =>
        <tbody key={index}>
          <tr className="forecastRows" style={{borderBottom: '1px dotted rgba(255,255,255,.12)'}} ref={"forecastRow " + index} onClick={this.textForecastToggle.bind(this,index)}>
            <td>{day.date.weekday}</td>
            <td className="tempIcon"><img src={day.icon_url} /></td>
            <td><i style={{display: 'block'}} className="wi wi-humidity"></i><span>{day.pop}%</span></td>
            <td className="tempHigh" ref={day.period}>{!this.state.celsius ? day.high.fahrenheit : day.high.celsius}&deg;</td>
            <td className="tempLow">{!this.state.celsius ? day.low.fahrenheit : day.low.celsius}&deg;</td>
          </tr>
          <tr style={{ display:'none' }} className="textForecastRow" ref={"textForecast " + index}>
            <td colSpan='5'>{day.textForecast.fcttext}</td>
          </tr>
        </tbody>
        )
    }
  };

  renderHour(hourInput) {
    let hour = Number(hourInput)
    if(hour > 12) {
      return hour - 12
    } else if(hour === 0) {
      return hour + 12
    } else {
      return hour
    }
  }

  renderHourlyForecast() {
    switch(this.state.hourlyForecastDisplay) {
      case 'temperature':
        return this.state.hourlyForecastObj.slice(0,25).map((hour,index) =>
          <div className="hourlyData" key={index}>
            <div>{this.renderHour(hour.FCTTIME.hour)}&nbsp;{hour.FCTTIME.ampm}</div>
            <div><img src={hour.icon_url} /></div>
            <div>{!this.state.celsius ? hour.feelslike.english : hour.feelslike.metric}&deg;</div>
          </div>
        )
        break;
      case 'precipitation':
        return this.state.hourlyForecastObj.slice(0,25).map((hour,index) =>
          <div className="hourlyData" key={index}>
            <div>{this.renderHour(hour.FCTTIME.hour)}&nbsp;{hour.FCTTIME.ampm}</div>
            <div><i className="wi wi-humidity"></i></div>
            <div>{hour.pop}%</div>
          </div>
        )
        break;
      case 'wind':
        return this.state.hourlyForecastObj.slice(0,25).map((hour,index) =>
          <div className="hourlyData" key={index}>
            <div>{this.renderHour(hour.FCTTIME.hour)}&nbsp;{hour.FCTTIME.ampm}</div>
            <div><i className={`wi wi-wind wi-towards-${hour.wdir.dir.toLowerCase()}`}></i></div>
            <div>{!this.state.celsius ? hour.wspd.english : hour.wspd.metric}</div>
          </div>
        )
        break;
    }
  }

  hourlyForecastDisplayOnChange(e) {
    this.setState({
      hourlyForecastDisplay: e.target.value
    });
  }

  textForecastToggle(index) {
    if(this.refs["textForecast " + index].style.display === 'none') {
      this.refs["forecastRow " + index].style.borderBottom = 'none'
      this.refs["textForecast " + index].style.display = 'table-row'
    } else {
      this.refs["forecastRow " + index].style.borderBottom = '1px dotted rgba(255,255,255,.12)'
      this.refs["textForecast " + index].style.display = 'none'
    }
  }

  onFiveDayClick() {
    this.setState({ tenDayForecast: false });
  }

  onTenDayClick() {
    this.setState({ tenDayForecast: true });
  }

  render() {
    return (
    <div className="sectionWrapper">
      <table id="forecastTable">
        <tbody>
          <tr>
            <th colSpan='5'>Forecast</th>
          </tr>
        </tbody>
        <tbody>
          <tr colSpan='1'>
            <td id="hourlyForecastHeader">
              <select style={{background:'none'}} onChange={this.hourlyForecastDisplayOnChange.bind(this)} value={this.state.hourlyForecastDisplay}>
                <option value="temperature">Temperature</option>
                <option value="precipitation">Precipitation</option>
                <option value="wind">Wind</option>
              </select>
            </td>
          </tr>
        </tbody>
        <tbody id="hourlyForecastWrapper">
          <tr>
            <td colSpan='5'>
              {this.renderHourlyForecast()}
            </td>
          </tr>
        </tbody>
          {this.renderForecast()}
        <tbody>
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
