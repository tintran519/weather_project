import React from 'react';
import '../../assets/WeatherMain.css';
import '../../assets/bower_components/weather-icons/css/weather-icons.css';

class SunMoonPhase extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      phases: this.props.phasesInfo
    }
  }

  render() {
    return(
      <div className="sectionWrapper">
        <table id="phaseTable">
          <tbody>
            <tr>
              <th colSpan='3'>Sun & Moon</th>
            </tr>
            <tr>
              <td><i className="wi wi-sunrise phaseIcon"></i></td>
              <td><i className="wi wi-sunset phaseIcon"></i></td>
            </tr>
            <tr>
              <td>{this.props.phasesInfo.sunrise.hour}:{this.props.phasesInfo.sunrise.minute}&nbsp;AM</td>
              <td>{this.props.phasesInfo.sunset.hour - 12}:{this.props.phasesInfo.sunset.minute}&nbsp;PM</td>
            </tr>
            <tr style={{borderTop: '1px dotted rgba(255,255,255,.12)'}}>
              <td><i className="wi wi-moonrise phaseIcon"></i></td>
              <td><i className="wi wi-moonset phaseIcon"></i></td>
            </tr>
            <tr>
              <td>{this.props.phasesInfo.moonrise.hour > 12 ? this.props.phasesInfo.moonrise.hour - 12 : this.props.phasesInfo.moonrise.hour}:{this.props.phasesInfo.moonrise.minute}&nbsp;{this.props.phasesInfo.moonrise.hour > 11 ? 'PM' : 'AM'}</td>
              <td>{this.props.phasesInfo.moonset.hour > 12 ? this.props.phasesInfo.moonset.hour - 12 : this.props.phasesInfo.moonset.hour}:{this.props.phasesInfo.moonset.minute}&nbsp;{this.props.phasesInfo.moonset.hour > 11 ? 'PM' : 'AM'}</td>
            </tr>
          </tbody>
        </table>
      </div>
      );
  }

}
export default SunMoonPhase;
