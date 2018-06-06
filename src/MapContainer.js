import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import db from "./db.js"


export default class MapContainer extends Component {
  constructor(props){
    super(props)

    this.state = {
        locations: [],
        events: []
    }
  }

  // ======================
  // ADD LOCATIONS TO STATE
  // ======================
 

  componentDidMount() {
    
    db.ref().on("value", (snapshot)  => {
      const allEvents = snapshot.val()
      const melroseLocation = allEvents['libraryEvents']['melrose_library']['location']
      const melroseEvents= allEvents['libraryEvents']['melrose_library']['allEvents'][0]

      this.setState({
        events: [melroseEvents].concat(this.state.events),
        locations: [{
                      'name': 'melrose library', 
                      'location': {
                        'lat': melroseLocation.lat,
                        'lng': melroseLocation.lng
                        }
                      }].concat(this.state.locations)
       }, () => this.loadMap());
    }, function (error) {
      console.log("Error: " + error.code);
    });
  }

  loadMap() {
    if (this.props && this.props.google) { // checks to make sure that props have been passed
      const {google} = this.props; // sets props equal to google
      const maps = google.maps; // sets maps to google maps props

      const mapRef = this.refs.map; // looks for HTML div ref 'map'. Returned in render below.
      const node = ReactDOM.findDOMNode(mapRef); // finds the 'map' div in the React DOM, names it node

      const mapConfig = Object.assign({}, {
        center: {lat: 37.7763887, lng: -122.2098494}, // sets center of google map to NYC.
        zoom: 13, // sets zoom. Lower numbers are zoomed further out.
        mapTypeId: 'roadmap' // optional main map layer. Terrain, satellite, hybrid or roadmap--if unspecified, defaults to roadmap.
      })

      this.map = new maps.Map(node, mapConfig); // creates a new Google map on the specified node (ref='map') with the specified configuration set above.

  // ==================
  // ADD MARKERS TO MAP
  // ==================
      this.state.locations.forEach( location => { // iterate through locations saved in state
        const marker = new google.maps.Marker({ // creates a new Google maps Marker object.
          position: {lat: location.location.lat, lng: location.location.lng}, // sets position of marker to specified location
          map: this.map, // sets markers to appear on the map we just created on line 35
          title: location.name // the title of the marker is set to the name of the location
        });
        // const time = this.state.events.
        let time = ''
        let event = ''

        if(this.state.events[0]){
          time = this.state.events[0].eventInfo.time
          event = this.state.events[0].eventInfo.info
        }
       

        var contentString = 
        '<div id="content">'+
        `<p id="firstHeading" class="firstHeading">Event: ${event}</p>`+
        `<p id="firstHeading" class="firstHeading">Time: ${time}</p>`+
        '</div>';

        var infowindow = new google.maps.InfoWindow({
          content: contentString,
          maxWidth: 200
        });

        marker.addListener('click', function() {
          infowindow.open(this.map, marker);
        });

      })

    }
    
  }

  render() {
    const style = { // MUST specify dimensions of the Google map or it will not work. Also works best when style is specified inside the render function and created as an object
      width: '90vw', // 90vw basically means take up 90% of the width screen. px also works.
      height: '75vh' // 75vh similarly will take up roughly 75% of the height of the screen. px also works.
    }

    return ( // in our return function you must return a div with ref='map' and style.
      <div ref="map" style={style}>
        loading map...
      </div>
    )
  }
}