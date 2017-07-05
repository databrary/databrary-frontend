/**
 * Created by maksim on 5/17/17.
 */

import React, {Component} from "react";
import {connect} from "react-redux";
import {getStats, numberWithCommas} from "../api/sitestats";
import {withRouter} from "react-router";
import styles from '../scss/stats.css';


export class Stats extends Component {
    constructor(props) {
        super(props);
        this.state = {
            investigators: 0,
            affiliates: 0,
            files: 0,
            hours: 0
        }
    }

    componentDidMount() {
        getStats().then(
            function (response) {
                if (response.status === "ok") {
                    this.setState({investigators: response.user.authorized[3].total, affiliates: response.user.authorized[2].total, files: response.user.asset.total, hours: numberWithCommas(response.user.asset.sum_duration)});
                } 
            }.bind(this)
        )
    }

    render() {
 
        return (
            <div className="stats">
                <span className="stats-number">{this.state.investigators}</span>
                <span className="stats-text">investigators</span>
                <span className="stats-number">{this.state.affiliates}</span>
                <span className="stats-text">affiliates</span>
                <span className="stats-number">{this.state.files}</span>
                <span className="stats-text">files</span>
                <span className="stats-number">{this.state.hours}</span>
                <span className="stats-text">hours of recordings</span>
            </div>
        );
    }
}

