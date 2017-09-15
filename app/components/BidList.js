import React from "react";
import {render} from "react-dom";
import $ from 'jquery';

export class BidList extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      userId: "1",
      requestSuccess: '0',
      dataHtml: null
    }
    this.actionUrlPOST = "http://localhost/reactapi";
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event){
  }

  componentDidMount(){
      var data = {
        user_id: this.state.userId
      }
      self = this;
      // Submit form via jQuery/AJAX
      $.ajax({
        type: 'POST',
        dataType: 'json',       
        url: this.actionUrlPOST + "/bid_list.php",
        data: data,
      }).done(function(response) {
        var dataElem = response.data;
        var dataHtml = dataElem.map((obj) => 
          <li  key = {obj.id}>
            <div>
              <div  className="form-control mb-2 mr-sm-2 mb-sm-0"><a href={obj.bid_link} target="_blank">{obj.bid_link}</a></div>
              <div  className="form-control mb-2 mr-sm-2 mb-sm-0">{obj.description}</div>
              <div  className="form-control mb-2 mr-sm-2 mb-sm-0">{obj.lead}</div>
              <div  className="form-control mb-2 mr-sm-2 mb-sm-0">{obj.conversion}</div>
              <div  className="form-control mb-2 mr-sm-2 mb-sm-0">{obj.created_date}</div>
            </div>
          </li>
          );
        self.setState({dataHtml:dataHtml, requestSuccess: '1'});
      });
  }

  render(){
    return (
      <div className="container">
          <div className="justify-content-center">
            <h1>Your Bids </h1>
            <hr></hr>
          </div>
          {this.state.requestSuccess === '1' ? <ul>{this.state.dataHtml}</ul> : null}          
      </div>
      );
  }
}
