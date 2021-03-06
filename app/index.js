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
    this.userLogout = this.userLogout.bind(this);
  }

  userLoggedIn (userData){
    this.setState({
      isLogin: 'welcome',
      user: userData
    });
    sessionStorage.setItem('user', JSON.stringify(this.state.user));
  }

  componentDidMount(){
    var sessionData = JSON.parse(sessionStorage.getItem('user'));
    if(sessionData != null && sessionData.id != null){
      this.setState({
        isLogin: 'welcome',
        user: sessionData
      });
    }
  }

  userLogout(){
    this.setState({
      isLogin: "",
      user: ""      
    });
    sessionStorage.clear('user');
  }

  render(){
    if(this.state.isLogin === 'welcome') {
      return (
        <div  >
          <div className="form-main">
            <AddBid userData={this.state.user} logout={this.userLogout}/>
          </div>
        </div>
        );
    } else{
      return (
        <div>
          <div className="form-main">
            <SignupForm logIn={this.userLoggedIn}/>
          </div>
        </div>
        );
    }
  }
}
render (<App />, window.document.getElementById("app"));
