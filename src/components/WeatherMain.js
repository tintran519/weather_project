import React from 'react';

class WeatherMain extends React.Component{
  componentDidMount() {
    console.log(this.props);
  }

  render() {
    return(
      <div>
        <h1>Main Weather</h1>
      </div>
      )
  }
}

export default WeatherMain;
