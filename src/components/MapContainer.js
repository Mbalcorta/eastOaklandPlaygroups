import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import db from "../js/db.js"
import date from '../js/getDate.js'
import Responsive from 'react-responsive-decorator'

class MapContainer extends Component {
  constructor(props){
    super(props)

    this.state = {
        events: [],
        isMobile: false
    }
  }

  // ======================
  // ADD LOCATIONS TO STATE
  // ======================
 

  componentDidMount() {
    // this.props.media({ minWidth: 768 }, () => {
    //   this.setState({
    //     isMobile: false
    //   })
    // })
    this.props.media({ maxWidth: 768 }, () => {
      this.setState({
        isMobile: true
      })
    })
    
    db.ref().on("value", (snapshot)  => {
      const allEvents = snapshot.val()

      //filter to only get events of today
     let eventsOfTheDay = []
     for( const events in allEvents){
      
      for(const eventDetails in allEvents[events]){

        const eachEventArray = allEvents[events][eventDetails]['allEvents']

        const filteredByDate = eachEventArray.filter(eachElement => {
        return eachElement['date'] === date
        })
   //replace libraryName underscores with spaces for map pin labels.
        if(filteredByDate.length > 0 ){
          let formatName = ''
          if(eventDetails === 'Avenue81_Library'){
            formatName = '81st Avenue Branch'
          } else {
            formatName = eventDetails.replace(/_/g, " ");
          }

          const eventLocation = allEvents[events][eventDetails]['location']
          
          eventsOfTheDay.push({
            eventName: formatName,
            events: filteredByDate,
            location: eventLocation
          })
        }  
      }
    }
      this.setState({
        events: eventsOfTheDay.concat(this.state.events)
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
        zoom: this.state.mobile ? 13 : 12, // sets zoom. Lower numbers are zoomed further out.
        mapTypeId: 'roadmap' // optional main map layer. Terrain, satellite, hybrid or roadmap--if unspecified, defaults to roadmap.
      })

      this.map = new maps.Map(node, mapConfig); // creates a new Google map on the specified node (ref='map') with the specified configuration set above.

      //this needs to add markers to map -> need to first filter object to show events of that day
      //once this is set in the state then create a marker for these events
      //separate out add markers code //make this be a function that will loop through libraryEvent object
      //make it work for once single post // have looping happening
      
  // ==================
  // ADD MARKERS TO MAP
  // ==================
      
      this.state.events.forEach( eventDetails => { // iterate through locations saved in state
        const marker = new google.maps.Marker({ // creates a new Google maps Marker object.
          position: {lat: eventDetails.location.lat, lng: eventDetails.location.lng}, // sets position of marker to specified location
          map: this.map, // sets markers to appear on the map we just created on line 35
          title: eventDetails.libraryName // the title of the marker is set to the name of the location
        });
      
       var contentString = ''
       eventDetails.events.forEach(eachEvent => {
        const location = eventDetails['eventName']
        contentString += 
        '<div id="content">'+
        `<p id="firstHeading" class="firstHeading">Location: ${location}</p>`
         eachEvent.eventInfo.forEach(eachEventInfo => {  
          
           const eventName = eachEventInfo.eventName
           const url = eachEventInfo.url
           const time = eachEventInfo.time
           
           contentString += 
           `<p id="firstHeading" class="firstHeading">Time: ${time}</p>`+
           `<label>Event: </label><a id="firstHeading" href= ${url} class="firstHeading" target="_blank">${eventName}</a>`+
           '</div>';
         })
       })

        var infowindow = new google.maps.InfoWindow({
          content: contentString,
          maxWidth: 200
        });

        //when pin point clicked will close pop up button
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

export default Responsive(MapContainer)