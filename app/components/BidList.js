import React from "react";
import {render} from "react-dom";
import $ from 'jquery';

export class BidList extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      userId: "1",
      requestSuccess: '0',
      total_count: '',
      lastInsertedId: null,
      dataHtml: null

    }
    this.actionUrlPOST = "http://localhost/reactapi";
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event){
  }

  componentDidMount(){
    if(this.props.lastInsertedId != null || this.props.lastInsertedId == ""){
      console.log(this.props);
      this.setState({lastInsertedId: this.props.lastInsertedId});
    }
    console.log(this.state.lastInsertedId);
    var data = {
      user_id: this.state.userId
    }
    var self = this;
    // Submit form via jQuery/AJAX
    $.ajax({
      type: 'POST',
      dataType: 'json',       
      url: this.actionUrlPOST + "/bid_list.php",
      data: data,
    }).done(function(response) {
      var dataElem = response.data;

      var dataHtml = dataElem.map((obj) =>
        <tr key={obj.id}>
           <td> 
             <div  className=""><a href={obj.bid_link} target="_blank">{obj.bid_link}</a></div>
           </td>
           <td> 
             <div  className="">{obj.title}</div>
           </td>          
           <td> 
             <div  className="">{obj.description}</div>
           </td>
           <td> 
             <div  className="">{obj.lead != null ? obj.lead : '--'}</div>
           </td>
           <td> 
             <div  className="">{obj.conversion != null ? obj.conversion : '--'}</div>
           </td>
           <td> 
             <div  className=" ">{obj.created_date}</div>
           </td>
        </tr>
        );
      self.setState({dataHtml:dataHtml, requestSuccess: '1', total_count: response.total_count});
    });
  }

  render(){
    return (
      <div className="container">
          <div className="justify-content-center">
            <hr></hr>
            <nav className="navbar navbar-default">
              <div className="container-fluid">
                <div className="navbar-header">
                  <ul className="nav navbar-nav">
                    <li className="list-group-item justify-content-between"><div>Bids <span className="badge">{this.state.total_count}</span></div></li>
                    <li className="list-group-item justify-content-between"><div>Leads <span className="badge">{this.state.total_count}</span></div></li>
                    <li className="list-group-item justify-content-between"><div>Conversions <span className="badge">{this.state.total_count}</span></div></li>
                  </ul>
                </div>
              </div>
            </nav>
              <hr></hr>
          </div>
          {this.state.requestSuccess === '1' ? <table className="table table-inverse">
            <thead>
              <tr>
                <th>Bid Link</th>
                <th>Title</th>
                <th>Description</th>
                <th>Leads</th>
                <th>Conversions</th>
                <th>Created date</th>
              </tr>
            </thead>
            <tbody>
              {this.state.dataHtml}
            </tbody>
          </table> : null}          
      </div>
      );
  }
}
