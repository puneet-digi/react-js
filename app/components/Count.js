import React from "react";
import { render } from "react-dom";
import $ from 'jquery';
import {Stats} from "./Stats";


export class Count extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		var props = {
			bid_to_lead:this.props.bid_to_lead,
			lead_to_conversion: this.props.lead_to_conversion,
			bid_to_conversion: this.props.bid_to_conversion,
		    bid_to_lead_percentage: this.props.bid_to_lead_percentage,
	        lead_to_conversion_percentage: this.props.lead_to_conversion_percentage,
	        bid_to_conversion_percentage: this.props.bid_to_conversion_percentage
		};
		return (
			<div>
	           
	             
	                  <ul className="nav navbar-nav">
	                    <li className="list-group-item justify-content-between"><div>Bids <span className="badge">{this.props.bidsCount}</span></div></li>
	                    <li className="list-group-item justify-content-between"><div>Leads <span className="badge">{this.props.leadsCount}</span></div></li>
	                    <li className="list-group-item justify-content-between"><div>Conversions <span className="badge">{this.props.conversionCount}</span></div></li>
	                  </ul>
	                
	              <div className="">
	              	<Stats {...props}/>
	              </div>
	          
			</div>
			);
	}
}