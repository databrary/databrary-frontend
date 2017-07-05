/**
 * Created by maksim on 5/17/17.
 */

import React, {Component} from "react";
import { Field, reduxForm } from 'redux-form'
import Button from "react-md/lib/Buttons";
import {connect} from "react-redux";
import {getProfile, editProfile} from "../api/user";
import {addSnackToast} from "../redux/actions";
import {withRouter} from "react-router";
import styles from '../scss/profile.css';


class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lastName: "",
            firstName: "",
            show: false
        }
        this.toggle = this.toggle.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillMount() {
        if (this.props.loggedIn) {
            getProfile().then(
                function (response) {
                    if (response.status === "ok") {
                        this.setState({...response.user});
                    } else if (response.status === "error") {
                        this.props.history.push("/");
                    } else {
                        throw new Error(`Unexpected response profile in ${this.__proto__.constructor.name}`)
                    }
                }.bind(this)
            )
        }
    }

    toggle() {
        this.setState({show: true} );
    }

    handleChange(event) {
        if(event.target.value) {
            var newstate = {}; 
            newstate[event.target.name] = event.target.value; 
            this.setState(newstate);
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        editProfile(this.state).then(
            function (response) {
                if (response.status === "ok") {
                    this.setState({...response.user});
                    this.setState({show: false} );
                } else if (response.status === "error") {
                    this.setState({error: 'Could not edit profile.'})
                } else {
                    throw new Error(`Unexpected response edit profile in ${this.__proto__.constructor.name}`)
                }
            }.bind(this));
    }

    render() {

        let orcid = null;
        if (this.state.orcid) {
            orcid = <div>
                       <label htmlFor="orcid">ORCID</label>
                       <span>{this.state.orcid}</span>
                    </div>
        } 
        let affiliation = null;
        if (this.state.affiliation) {
            affiliation = <div>
                               <label htmlFor="affiliation">Affiliation</label>
                               <span>{this.state.affiliation}</span>
                            </div>
        } 
        if (this.state.show) {  
            return (
                <div className="profile">
                    <form onSubmit={this.handleSubmit}>
                        <div>
                            <img src={`https://nyu.databrary.org/web/images/avatar.png?size=500`}
                                 alt={this.state.firstName + " " + this.state.lastName}/>
                            <h2>{this.state.firstName + " " + this.state.lastName}</h2>
                            <Button type="submit" raised label="Submit Changes" className="button-green"/>
                        </div>
                        <div>
                            <label>
                               First Name
                            </label>
                            <input type='text' name="firstName" placeholder={this.state.firstName} onChange={this.handleChange}/>
                        </div>
                        <div>
                            <label>
                               Last Name
                            </label>
                            <input type='text' name="lastName" placeholder={this.state.lastName} onChange={this.handleChange}/>
                        </div>
                        <div>
                            <label>
                               ORCID
                            </label>
                            <input type='text' name="orcid" placeholder={this.state.orcid} onChange={this.handleChange}/>
                        </div>
                        <div>
                            <label>
                               Affiliation
                            </label>
                            <input type='text' name="affiliation" placeholder={this.state.affiliation} onChange={this.handleChange}/>
                        </div>
                        <div>
                            <label>
                               Email
                            </label>
                            <input type='text' name="email" placeholder={this.state.email} onChange={this.handleChange}/>
                        </div>
                    </form>
                    <hr />
                    <a href={"/party/" + this.state.accountId}>Switch to public view</a>
                    <br />
                    <a href={"/party/" + this.state.accountId + "/activity"}>User history</a>
                </div>
            );
        } else {
            return (
                <div className="profile">
                    <div>
                        <img src={`https://nyu.databrary.org/web/images/avatar.png?size=500`}
                             alt={this.state.firstName + " " + this.state.lastName}/>
                        <h2>{this.state.firstName + " " + this.state.lastName}</h2>
                        <Button raised label="Edit Profile" onClick={this.toggle} />
                    </div>
                    {orcid}
                    {affiliation}
                    <div>
                       <label htmlFor="email">Email</label>
                       <span>{this.state.email}</span>
                    </div>
                    <hr />
                    <a href={"/party/" + this.state.accountId}>Switch to public view</a>
                    <br />
                    <a href={"/party/" + this.state.accountId + "/activity"}>User history</a>
                </div>
            );
        }
    }
}


const mapStateToProps = (state) => {
    return {
        loggedIn: state.appReducer.flags.loggedIn,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        addToast: (toast) => dispatch(addSnackToast(toast))
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Profile));
