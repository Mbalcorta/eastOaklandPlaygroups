import React, { Component } from 'react';
import './App.css';
import './index.css'
import {apiKey} from '../config/keys.js'
// import the Google Maps API Wrapper from google-maps-react
import { GoogleApiWrapper } from 'google-maps-react' 
// import child component
import MapContainer from './MapContainer'
class App extends Component {
  render() {
    return (
      <div>
        <h1> East Oakland Playgroups </h1>
        <MapContainer google={this.props.google} />
      </div>
    );
  }
}
// OTHER MOST IMPORTANT: Here we are exporting the App component WITH the GoogleApiWrapper. You pass it down with an object containing your API key
export default GoogleApiWrapper({
  apiKey: apiKey,
})(App)
