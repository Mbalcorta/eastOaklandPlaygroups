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
    let allEvents = 'dood'
    if(this.state.events.length > 0 ) {
      allEvents = this.state.events[0]['libraryEvents']['melrose_library'][1]['info']
    }

    return(
      <div className="App">
        <h1>{ allEvents }</h1>
      </div>
    );
  }
}

export default App;
