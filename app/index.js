import React from 'react';
import {render} from 'react-dom';


import {Clock} from "./components/Clock";
import {SignupForm} from "./components/SignupForm";
import {AddBid} from "./components/AddBid";

class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      isLogin: "",
      user: ""
    }
    this.userLoggedIn = this.userLoggedIn.bind(this);
  }

  userLoggedIn (userData){
    this.setState({
      isLogin: 'welcome',
      user: userData
    });
  }

  render(){
    if(this.state.isLogin === 'welcome') {
      return (
        <div>
          <div>
            <AddBid userData={this.state.user}/>
          </div>
        </div>
        );
    } else{
      return (
        <div>
          <div>
            <SignupForm logIn={this.userLoggedIn}/>
          </div>
        </div>
        );
    }
  }
}
render (<App />, window.document.getElementById("app"));
