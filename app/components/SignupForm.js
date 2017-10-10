import React from "react";
import { render } from "react-dom";
import $ from 'jquery';

export class SignupForm extends React.Component {
  
  constructor(props){
    super(props);
	    this.state = {
  			email:"",
  			password:""
    	};
    this.actionUrlPOST = process.env.API_URL;
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }


  handleSubmit(e){
	    var self = this;
      e.preventDefault();
      
      fetch(this.actionUrlPOST + "/user.php", {
        method: "POST",
        body: JSON.stringify({
          email: this.state.email,
          password: this.state.password
        }),
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        }).then((response) => response.json())
          .then((responseJson) => {
              //data response is available in this responseJson variable
              if(responseJson.error==1){
                alert(responseJson.message);
              }else {
                self.props.logIn(responseJson.data);
              }
            }
          ).catch((error) => {
                console.error(error);
              }
          );
  }

  handleChange(event){
  	var inputName = event.target.name;
  	this.setState({[inputName]: event.target.value});
  }

  render(){
  	return (
  		<div className="container">
        <div className="form-outer">
        <div className="justify-content-center">
          <h1>Login</h1>
          <hr></hr>
        </div>
    		<form onSubmit={this.handleSubmit}>
          <div className="form-group row">
            <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Email</label>
    	      <div className="col-sm-10">
              <input type="email" className="form-control" value={this.state.email} name="email" onChange={this.handleChange} placeholder="Email" />
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Password</label>
            <div className="col-sm-10">
                <input type="password" className="form-control" value={this.state.password} name="password" onChange={this.handleChange} placeholder="Password" />
            </div>
          </div>
          <div className="form-group row">
            <div className="col-sm-12">
              <button className="btn btn-primary" type="submit">Login</button>
            </div>
          </div>
        </form>
        </div>
	    </div>
  		);
  }

}