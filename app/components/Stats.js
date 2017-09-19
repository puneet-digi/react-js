import React from "react";
import { render } from "react-dom";
import { AxiosProvider, Request, Get, Delete, Head, Post, Put, Patch, withAxios } from 'react-axios'
import $ from 'jquery';

export class Stats extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			bidToLeadRation: "",
			leadToConversionRation: ""
		};
		this.setRatios = this.setRatios().bind(this);
		this.getRatio = this.getRatio().bind(this);
		this.getHCF = this.getHCF().bind(this);
		this.getLCM = this.getLCM().bind(this);
	}


	componentDidMount(){
	}

	setRatios(){
		this.setState({
			bidToLeadRation: this.getRatio(this.props.bidsCount, this.props.leadsCount),
			leadToConversionRation: this.getRatio(this.props.leadsCount, this.props.conversionCount)
		});
	}

	getRatio(one, two){
		var HCF = this.getHCF(one, two);
		return one/HCF + ":" + two/HCF;
	}


	getHCF(one, two){
		var HCF = one * two/ this.getLCM();
		return HCF;
	}

	getLCM(one, two){
		var LCM = null;
		var lowest = one < two ? one : two;
		for(var i = lowest; ; i++) {
		  if(i%one == 0 && i%two == 0){
		  	var LCM = i
		    break;
		  }
		}
		return LCM;
	}

	render(){
		return (
			<div>

			</div>
		)
	}

}