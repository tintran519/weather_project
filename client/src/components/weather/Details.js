import React from 'react';
import '../../assets/WeatherMain.css';

class Details extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentTempIcon: this.props.currentObservationInfo.icon_url,
      feelsLike: this.props.currentObservationInfo.feelslike_f,
      humidity: this.props.currentObservationInfo.relative_humidity,
      visibility: this.props.currentObservationInfo.visibility_mi,
      uv: this.props.currentObservationInfo.UV,
      detailCurrentDay: this.props.currentDayDetail.fcttext,
      detailCurrentNight: this.props.currentNightDetail.fcttext
    }
  }

    render() {
      return (
        <div className="sectionWrapper detail">
          <table id="detailsTable">
            <tbody>
              <tr>
                <th colSpan='3'>Details</th>
              </tr>
              <tr>
                <td rowSpan='4' id="detailIcon">
                  <img src={this.state.currentTempIcon} role="presentation" />
                </td>
                <td className="detailLabel">Feels like</td>
                <td className="detailValue">{this.state.feelsLike}&deg;</td>
              </tr>
              <tr>
                <td className="detailLabel">Humidity</td>
                <td className="detailValue">{this.state.humidity}</td>
              </tr>
              <tr>
                <td className="detailLabel">Visibility</td>
                <td className="detailValue">{this.state.visibility}&nbsp;miles</td>
              </tr>
              <tr>
                <td className="detailLabel">UV Index</td>
                <td className="detailValue">{this.state.uv}</td>
              </tr>
              <tr>
                <td colSpan='3' className="detailTextForecast">Tonight - {this.state.detailCurrentNight}</td>
              </tr>
              <tr>
                <td colSpan='3' className="detailTextForecast">Today - {this.state.detailCurrentDay}</td>
              </tr>
            </tbody>
          </table>
        </div>
        );
    }
  }

export default Details;
