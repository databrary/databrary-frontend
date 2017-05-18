import React, {Component} from "react";
import "../scss/home.css";
import logo from "../../public/logo.svg";

export default class Home extends Component {
  render() {
    return (
      <div className="home">
        <div className="home-header">
          <img src={logo} className="home-logo" alt="logo" />
            <h2>Welcome to Databrary</h2>
        </div>
        <p className="home-intro">
            To get started upload some videos!
        </p>
      </div>
    );
  }
}
