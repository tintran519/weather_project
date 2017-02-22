import React from 'react';

class LocationMarker extends React.Component {
  render() {
    const MARKER_SIZE = 40;
    const placeStyle = {
      position: 'absolute',
      width: MARKER_SIZE,
      height: MARKER_SIZE,
      left: -MARKER_SIZE/2,
      top: -MARKER_SIZE/2
    }

    return (
      <div style={placeStyle}>
        <img src={require('../../../assets/images/mapMarker.png')} width='20' height='35' role="presentation" />
      </div>
      );
  }
}

export default LocationMarker;
