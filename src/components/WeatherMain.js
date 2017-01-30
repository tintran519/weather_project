import React from 'react';

class WeatherMain extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      locationName:this.props.location.state.selectedLocation.name,
      locationSimpleForecast:'',
      locationFullForecast:[]
    }
  }

  componentWillMount() {
    fetch(`/weather/${this.props.location.state.selectedLocation.zmw}`)
      .then((response) => {

        if(response.status >= 400){
        throw new Error("Bad response from server");
      }
        return response.json();
      })
      .then((results) => console.log(results));

      console.log(this.props.location.state.selectedLocation.zmw)
  }

  render() {
    return(
      <div>
        <h1>{this.state.locationName}</h1>
      </div>
      )
  }
}

export default WeatherMain;
