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
      <div style={{width:'500px', height:'500px'}}>
        <h2>Map here</h2>
        <GoogleMap
          bootstrapURLKeys={{key: 'AIzaSyDkUrLdM6wL9QkBCTzjWxMm9le-TMMkZ4U'}}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}>
        </GoogleMap>
      </div>
      );
  }
}

export default Maps;
