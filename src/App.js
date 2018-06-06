import React, { Component} from "react"
import "./style.css"
import db from "./db.js"

class App extends Component{
  constructor(props){
    super(props)

    this.state = {
      events: []
    }
  }

  componentDidMount(){
    db.ref().on("value", (snapshot)  => {
      const allEvents = snapshot.val()
      this.setState({ events: [allEvents].concat(this.state.events) });
    }, function (error) {
      console.log("Error: " + error.code);
    });
  }
  
  render(){
    let eventTime = ''
    let eventDate = ''
    let eventInfo = ''
    if(this.state.events.length > 0 ) {
      console.log(this.state.events[0]['libraryEvents']['melrose_library'])
      eventInfo = this.state.events[0]['libraryEvents']['melrose_library'][2]['eventInfo']['info'][1]
      eventDate = this.state.events[0]['libraryEvents']['melrose_library'][2]['date']
      eventTime = this.state.events[0]['libraryEvents']['melrose_library'][2]['eventInfo']['time'][1]
    }

    return(
      <div className="App">
        <h1>Date: { eventDate }</h1>
        <h1>Event: { eventInfo }</h1>
        <h1>Time: { eventTime }</h1>
      </div>
    );
  }
}

export default App;
