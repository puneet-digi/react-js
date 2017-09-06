import React from 'react';
import {render} from 'react-dom';

import {Clock} from "./components/Clock";

class App extends React.Component {

  render(){
    return ( 
      <div>
      	<div>
      	  <Clock timeFrom={new Date("2017-09-06 18:06:00".replace(/-/g,"/"))}/>
      	</div>
      	<div>
      	</div>
      </div>
    );
  }
}

render (<App />, window.document.getElementById("app"));
