import React from "react";
import { render } from "react-dom";
import { AxiosProvider, Request, Get, Delete, Head, Post, Put, Patch, withAxios } from 'react-axios'
import $ from 'jquery';


export class Count extends React.Component{
	constructor(props){
		super(props);
	}

	componentDidMount(event){
		var props = this.props;
		this.setState({props});
	}

	render(){
		var props = this.props;
		return (
			<div>
	            <nav className="navbar navbar-default">
	              <div className="container-fluid">
	                <div className="navbar-header">
	                  <ul className="nav navbar-nav">
	                    <li className="list-group-item justify-content-between"><div>Bids <span className="badge">{this.props.bidsCount}</span></div></li>
	                    <li className="list-group-item justify-content-between"><div>Leads <span className="badge">{this.props.leadsCount}</span></div></li>
	                    <li className="list-group-item justify-content-between"><div>Conversions <span className="badge">{this.props.conversionCount}</span></div></li>
	                  </ul>
	                </div>
	              </div>
	              <div className="navbar navbar-default">
	              </div>
	            </nav>
			</div>
			);
	}
}