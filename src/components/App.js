import React, { Component } from 'react'
import '../styles/App.css'
import '../styles/index.css'
import {apiKey} from '../../config/keys.js'

// import the Google Maps API Wrapper from google-maps-react
import { GoogleApiWrapper } from 'google-maps-react' 
// import child component
import MapContainer from './MapContainer'
import Header from './Header';
import Resources from './Resources';
import AboutMe from './AboutMe';

class App extends Component {
  render() {
    return (
      <div className="container">
        <Header/>
        <MapContainer google={this.props.google} />
        <Resources />
        <AboutMe />
      </div>
    );
  }
}
// OTHER MOST IMPORTANT: Here we are exporting the App component WITH the GoogleApiWrapper. You pass it down with an object containing your API key
export default GoogleApiWrapper({
  apiKey: apiKey,
})(App)
