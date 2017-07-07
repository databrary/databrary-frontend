/**
 * Created by maksim on 5/17/17.
 */

import React, {Component} from "react";
import { Field, reduxForm } from 'redux-form'
import Button from "react-md/lib/Buttons";
import {connect} from "react-redux";
import {addSnackToast} from "../redux/actions";
import {withRouter} from "react-router";
import {EditTabs} from './MyEditTabs.js';

import styles from '../scss/profile.css';


class Profile extends Component {

    render() {

        return (
            <EditTabs />
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
