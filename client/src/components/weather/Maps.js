import React from 'react';
import '../../assets/WeatherMain.css';
import GoogleMap from 'google-map-react';
import LocationMarker from './maps/LocationMarker';

class Maps extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      center: {
        lat: Number(this.props.coordinatesInfo.lat),
        lng: Number(this.props.coordinatesInfo.lon)
      }
    }
  }

  render() {
    return(
      <div className="sectionWrapper">
        <table id="mapTable">
          <tbody>
            <tr>
              <th colSpan='3'>Map</th>
            </tr>
            <tr>
              <td colSpan='3' rowSpan='3'>
                <GoogleMap
                  bootstrapURLKeys={{key: 'AIzaSyDkUrLdM6wL9QkBCTzjWxMm9le-TMMkZ4U'}}
                  defaultCenter={this.state.center}
                  defaultZoom={7}>
                  <LocationMarker lat={this.state.center.lat} lng={this.state.center.lng} text={'A'}/>
                </GoogleMap>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      );
  }
}

export default Maps;
