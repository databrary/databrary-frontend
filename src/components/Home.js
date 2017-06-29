import React, {Component} from "react";
import "../scss/home.css";
import config from "../config";
import {LoginForm} from "./LoginButton"
export default class Home extends Component {
    render() {
        return (
            <div className="home">
                <div className="home-header">
                    <LoginForm />
                </div>
                <p className="home-intro">
                    
                </p>
            </div>
        );
    }
}
