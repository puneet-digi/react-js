import React from 'react';
import {render} from 'react-dom';


import {Clock} from "./components/Clock";
import {SignupForm} from "./components/SignupForm";
import {AddBid} from "./components/AddBid";

class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      active: "Login"
    }
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick (event){
    var active = this.state.active;
    var newActive = active === 'Login' ? 'Welcome' : 'Login';
    this.setState({
      active: newActive
    });
    {console.log(this.state);}
  }

  render(){    
    return ( 
      <div>
        <div>
          {this.state.active === 'Login' ? (<AddBid />) : (<SignupForm />)}
          <button type="button" onClick={this.handleClick}>Toggle</button>
        </div>
      </div>
    );
  }
}

render (<App />, window.document.getElementById("app"));
