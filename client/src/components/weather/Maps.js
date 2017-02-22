import React from 'react';
import '../../assets/WeatherMain.css';
import GoogleMap from 'google-map-react';

class Maps extends React.Component {

  static defaultProps = {
    center: {
      lat: 59.938043,
      lng: 30.337157
    },
    zoom: 6,
  }

  constructor(props) {
    super(props);
  }

  // componentDidMount() {
  //   console.log(this.props);
  //   const { lat, lon } = this.props.coordinatesInfo
  // }


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
                  defaultCenter={this.props.center}
                  defaultZoom={this.props.zoom}>
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
