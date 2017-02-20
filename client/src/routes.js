import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';
import SearchBar from './components/SearchBar';
import WeatherMain from './components/WeatherMain';

export default(
  <Route path="/" component={App}>
    <IndexRoute component={SearchBar} />
    <Route path="weather/:country/:state/:zmw" component={WeatherMain} />
  </Route>
  )
