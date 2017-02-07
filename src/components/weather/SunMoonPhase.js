import React from 'react';
import '../../assets/WeatherMain.css';
import '../../../bower_components/weather-icons/css/weather-icons.css';

class SunMoonPhase extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      phases: ''
    }
  }

  render() {
    return(
      <div id="phaseWrapper">
        <table>
          <tbody>
            <th>Sun & Moon</th>
          </tbody>
        </table>
      </div>
      );
  }

}
export default SunMoonPhase;
