import React from "react";
import { render } from "react-dom";

export class Clock extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      stamp: "",
      date: props.timeFrom
    };
  }  
  
  componentDidMount() {
    var that = this;
    this.timerID = setInterval(
      function(){that.tick();},
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick(){
    var msPerMinute = 60 * 1000;
    var msPerHour = msPerMinute * 60;
    var msPerDay = msPerHour * 24;
    var msPerMonth = msPerDay * 30;
    var msPerYear = msPerDay * 365;    
    
    var current = new Date();
    var elapsed = current - this.state.date;

    if (elapsed < msPerMinute) {
      var timeStamp = Math.round(elapsed/1000) + ' seconds ago';   
    }    
    else if (elapsed < msPerHour) {
      var timeStamp =  Math.round(elapsed/msPerMinute) + ' minutes ago';   
    }    
    else if (elapsed < msPerDay ) {
      var timeStamp = Math.round(elapsed/msPerHour ) + ' hours ago';   
    }
    else if (elapsed < msPerMonth) {
      var timeStamp = Math.round(elapsed/msPerDay) + ' days ago';   
    }    
    else if (elapsed < msPerYear) {
      var timeStamp = Math.round(elapsed/msPerMonth) + ' months ago';   
    }    
    else {
      var timeStamp = Math.round(elapsed/msPerYear ) + ' years ago';   
    }
    this.setState({stamp: timeStamp});
  }

  render() {
    return (
      <div>
        {this.state.date.toLocaleDateString()} <p><i>{this.state.stamp}</i></p>
      </div>
    );
  }

}
