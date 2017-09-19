import React from "react";
import { render } from "react-dom";
import { AxiosProvider, Request, Get, Delete, Head, Post, Put, Patch, withAxios } from 'react-axios'
import $ from 'jquery';

export class SignupForm extends React.Component {
  
  constructor(props){
    super(props);
	    this.state = {
  			email:"",
  			password:""
    	};
    this.actionUrlPOST = "http://localhost/reactapi";
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }


  handleSubmit(e){
	    var self = this;
      e.preventDefault();
      var data = {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
        gender: this.state.gender
      };
      // Submit form via jQuery/AJAX
      $.ajax({
        type: 'POST',
        dataType: 'json',       
        url: this.actionUrlPOST + "/user.php",
        data: data,
      }).done(function(data) {
        console.log(data);
        if(data.error==1){
          alert(data.message);
        }else {
          self.props.logIn(data.data);
        }
      }).fail(function(jqXhr) {
        alert('Login Failed');
      });	  
  }

  handleChange(event){
  	var inputName = event.target.name;
  	this.setState({[inputName]: event.target.value});
  }

  render(){
  	return (
  		<div className="container">
        <div className="justify-content-center">
          <h1>Login</h1>
          <hr></hr>
        </div>
    		<form onSubmit={this.handleSubmit}>
          <div className="form-group row">
            <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Email</label>
    	      <div className="col-sm-5">
              <input type="email" className="form-control" value={this.state.email} name="email" onChange={this.handleChange} placeholder="Email" />
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Password</label>
            <div className="col-sm-5">
                <input type="password" className="form-control" value={this.state.password} name="password" onChange={this.handleChange} placeholder="Password" />
            </div>
          </div>
          <div className="form-group row">
            <div className="col-sm-10">
              <button className="btn btn-primary" type="submit">Login</button>
            </div>
          </div>
        </form>
	    </div>
  		);
  }

}