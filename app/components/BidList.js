import React from "react";
import {render} from "react-dom";
import $ from 'jquery';
import {Count} from "./Count";

export class BidList extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      userId: props.userId,
      lastInsertedId: props.lastInsertedId || null,
      requestSuccess: '0',
      total_count: '',
      dataHtml: null,
      leadsCount: "",
      ratios: {},
      conversionCount: ""
    }
    this.actionUrlPOST = process.env.API_URL;
    this.afterInsert = this.afterInsert.bind(this);
    this.loadData = this.loadData.bind(this);
  }

  afterInsert(){
    this.setState({lastInsertedId: this.props.lastInsertedId}); 
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.lastInsertedId !==nextProps.lastInsertedId){
      this.loadData();
    }
  }

  componentDidMount(){
    this.loadData();
  }

  loadData(){
      var self = this;

     fetch(this.actionUrlPOST + "/bid_list.php", {
      method: "POST",
      body: JSON.stringify({
        user_id: this.state.userId
      }),
      headers:{
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }).then((response) => response.json())
        .then((responseJson) => {
            //data response is available in this responseJson variable
          var dataElem = responseJson.data;
          self.setState({ratios: responseJson.ratios});
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
          self.setState({
            dataHtml:dataHtml, 
            requestSuccess: '1', 
            total_count: responseJson.total_count,
            leadsCount: responseJson.leadsCount,
            conversionCount: responseJson.conversionCount
          });
        }).catch((error) => {
              console.error(error);
        }
      );
  }

  render(){
    var props = {
      bidsCount: this.state.total_count,
      leadsCount: this.state.leadsCount,
      conversionCount: this.state.conversionCount,
      bid_to_lead: this.state.ratios.bid_to_lead,
      lead_to_conversion: this.state.ratios.lead_to_conversion,
      bid_to_conversion: this.state.ratios.bid_to_conversion,
      bid_to_lead_percentage: this.state.ratios.bid_to_lead_percentage,
      lead_to_conversion_percentage: this.state.ratios.lead_to_conversion_percentage,
      bid_to_conversion_percentage: this.state.ratios.bid_to_conversion_percentage
    };
    return (
      <div className="">
          <div className="justify-content-center">
            <hr></hr>
                <Count {...props}/>
              <hr></hr>
          </div>
          {this.state.requestSuccess === '1' ? <table className="table table-striped">
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
