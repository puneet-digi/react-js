import React from "react";
import { render } from "react-dom";
import { AxiosProvider, Request, Get, Delete, Head, Post, Put, Patch, withAxios } from 'react-axios'
import $ from 'jquery';
import {BidList} from "./BidList";

export class AddBid extends React.Component {
  constructor(props){
  super(props);
  this.state = {
	    bid_link:"",		    
		  description:""
   	};
   this.actionUrlPOST = "http://localhost/reactapi";
   this.handleSubmit = this.handleSubmit.bind(this);
   this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
  	var inputName = event.target.name;
  	this.setState({[inputName]: event.target.value});
  }

  handleSubmit(e){
	  var self      
      e.preventDefault()
      self = this
      var data = {
        bid_link: this.state.bid_link,
        description: this.state.description
      }
      // Submit form via jQuery/AJAX
      $.ajax({
        type: 'POST',
        dataType: 'json',       
        url: this.actionUrlPOST + "/add_bid.php",
        data: data,
      }).done(function(data) {
      	// code for successfull insert goes here

      }).fail(function(jqXhr) {
        
      });	  
  }

  render(){
  	return (
  		<div className="container">
			<div className="justify-content-center">
	          	<h1>Welcome {this.props.userData.firstname}</h1>
	          	<hr></hr>
        	</div>
    		<form onSubmit={this.handleSubmit} className="form-inline">
	            <input type="text" placeholder="Add New Link" className="form-control mb-2 mr-sm-2 mb-sm-0 " value={this.state.bid_link} name="bid_link" onChange={this.handleChange} />
				<div className="input-group mb-2 mr-sm-2 mb-sm-0">	            
	            	<input type="text" placeholder="Add Description" className="form-control" value={this.state.description} name="description" onChange={this.handleChange} />
	            </div>
		        <button type="submit" className="btn btn-primary">Submit</button>
	     	</form>
	     	<BidList userId={this.props.userData.id}/>
  		</div>
  		);
  }

}