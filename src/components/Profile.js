/**
 * Created by maksim on 5/17/17.
 */

import React, {Component} from "react";
import { Field, reduxForm } from 'redux-form'
import Button from "react-md/lib/Buttons";
import {connect} from "react-redux";
import {getProfile} from "../api/user";
import {addSnackToast} from "../redux/actions";
import {withRouter} from "react-router";
import styles from '../scss/profile.css';


class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            party_name: "",
            party_prename: "",
        }
    }

    componentWillMount() {
        if (this.props.loggedIn) {
            getProfile().then(
                function (response) {
                    if (response.status === "ok") {
                        this.setState({...response.user});
                        console.log(response);
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
                <hr />
                <a href={"/party/" + this.state.party_id}>Switch to public view</a>
                <br />
                <a href={"/party/" + this.state.party_id + "/activity"}>User history</a>
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
