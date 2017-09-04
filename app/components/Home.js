import React from "react";
import {render} from "react-dom";

export class Home extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      email:"",
      pwd:""      
    };
  }  

  handleClick(event){
    alert("form is submitted");
    event.preventDefault();
  }
  render (){
    return (
      <div>
	<form onSubmit={this.handleClick}>
        <label for="email">Email:</label>
        <input type="email" class="form-control" id="email" placeholder="Enter email" name="email"></input>
	<br></ br>
        <label for="pwd">Password:</label>
        <input type="password" class="form-control" id="pwd" placeholder="Enter password" name="pwd"></input>
	<br></br>
        <button type="submit" class="btn btn-default" onClick={this.handleClick}>Submit</button>
	</form>
      </div>
    );
  }
}
