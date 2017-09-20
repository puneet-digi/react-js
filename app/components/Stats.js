import React from "react";
import { render } from "react-dom";
import { AxiosProvider, Request, Get, Delete, Head, Post, Put, Patch, withAxios } from 'react-axios'
import $ from 'jquery';

export class Stats extends React.Component {
	constructor(props){
		super(props);
	}

	render(){
		return (
			<div>
				<div className="item  col-xs-12 col-lg-12">
		            <div className="thumbnail ">
		                <i><h3 className="group inner list-group-item-heading"><u>Statistics</u></h3></i>
		                <div className="col-xs-3 pull-left" >
			                <p className="lead">Current Ratios</p>
				            <div className="row col-xs-12 col-lg-12">
	                            <p >Bid to Lead ratio | <b>{this.props.bid_to_lead}</b></p>
	                            <p >Lead to Conversion ratio | <b>{this.props.lead_to_conversion}</b></p>
	                            <p >Bid to Conversion ratio | <b>{this.props.bid_to_conversion}</b></p>
	                    	</div>
                    	</div>
                    	<div className="col-xs-6 pull-left">
			                <p className="lead">Percentage</p>
				            <div className="row col-xs-12 col-lg-12">
	                            <p ><b>{this.props.bid_to_lead_percentage}% </b> Bid to lead percentage</p>
	                            <p ><b>{this.props.lead_to_conversion_percentage}% </b> Lead to Conversion percentage</p>
	                            <p ><b>{this.props.bid_to_conversion_percentage}% </b> Bid to conversion percentage</p>
	                    	</div>
                    	</div>
	            	</div>	
	            </div>
			</div>
		)
	}

}