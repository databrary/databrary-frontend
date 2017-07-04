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
            party_name: "",
            party_prename: "",
            value: ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();

        editProfile(this.state.value).then(
            function (response) {
                if (response.status === "ok") {
                    alert('yes');
                } else if (response.status === "error") {
                    this.setState({error: 'Could not edit profile.'})
                } else {
                    throw new Error(`Unexpected response edit profile in ${this.__proto__.constructor.name}`)
                }
            }.bind(this));
    }

    componentWillMount() {
        if (this.props.loggedIn) {
            getProfile().then(
                function (response) {
                    if (response.status === "ok") {
                        this.setState({...response.user});
                    } else if (response.status === "error") {
                        this.props.history.goBack();
                    } else {
                        throw new Error(`Unexpected response profile in ${this.__proto__.constructor.name}`)
                    }
                }.bind(this)
            )
        }
    }

    render() {

        let orcid = null;
        if (this.state.party_orcid) {
            orcid = <div>
                       <label htmlFor="orcid">ORCID</label>
                       <span>{this.state.party_orcid}</span>
                    </div>
        } 
        let affiliation = null;
        if (this.state.party_affiliation) {
            affiliation = <div>
                               <label htmlFor="affiliation">Affiliation</label>
                               <span>{this.state.party_affiliation}</span>
                            </div>
        } 
        return (
            <div className="profile">
                <div>
                    <img src={`https://nyu.databrary.org/web/images/avatar.png?size=500`}
                         alt={this.state.party_prename + " " + this.state.party_name}/>
                    <h2>{this.state.party_prename + " " + this.state.party_name}</h2>
                    <Button raised label="Edit Profile" />
                </div>
                {orcid}
                {affiliation}
                <div>
                   <label htmlFor="email">Email</label>
                   <span>{this.state.party_email}</span>
                </div>
                <hr />
                <a href={"/party/" + this.state.party_id}>Switch to public view</a>
                <br />
                <a href={"/party/" + this.state.party_id + "/activity"}>User history</a>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <label>
                           First Name:
                        </label>
                        <input type='text' name="firstName" placeholder={this.state.party_prename} value={this.state.value} onChange={this.handleChange} required/>
                    </div>
                    <Button raised label="Submit" value="submit" type="submit"/>
                  </form>
            </div>
        );
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
