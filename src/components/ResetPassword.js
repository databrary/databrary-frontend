/**
 * Created by maksim on 5/23/17.
 */

import React from "react";
import Paper from "react-md/lib/Papers";
import "../scss/resetPassword.css";

import {resetPasswordEmail, resetPasswordToken, checkTokenExpiry} from "../api/resetpassword";
import {Button} from "react-md/lib/Buttons";
import queryString from "query-string";
import {withRouter} from "react-router";
import {connect} from "react-redux";
import {Field, reduxForm, SubmissionError as FormSubmissionError} from "redux-form";
import {Route, Switch} from "react-router-dom";
import zxcvbn from "zxcvbn";
import FormTextField from "./FormTextField";

const validatePassword = values => {
    const errors = {};
    if (!values.password) {
        errors.password = 'Required'
    } else if (values.password !== values.confirmPassword) {
        errors.password = "Passwords don't match"
    }

    if (!values.confirmPassword) {
        errors.confirmPassword = 'Required'
    } else if (values.password !== values.confirmPassword) {
        errors.confirmPassword = "Passwords don't match"
    }

    return errors
};

class PasswordForm extends React.Component {
    constructor(props) {
        super(props);
        let token = queryString.parse(props.location.search).token;
        this.state = {
            token: token,
            expired: false,
            passwordScore: 0,
        };
        this._handleSubmitReset = this._handleSubmitReset.bind(this);
        this._sentReset = this._sentReset.bind(this);
        this._expired = this._expired.bind(this);
        this._onChange = this._onChange.bind(this);

    }

    _onChange(val) {
        let stats = zxcvbn(val),
            currentScore = stats.score;

        this.setState({
            ...this.state,
            passwordScore: currentScore
        });
    }

    componentWillMount() {
        checkTokenExpiry(this.state.token).then(
            function (response) {
                if (response.status === "ok") {
                    // do nothing because form updates state
                } else if (response.status === "expired") {
                    this.setState({expired: true})
                } else if (response.status === "error") {
                    throw new FormSubmissionError({_error: ""})
                } else {
                    throw new Error(`Unexpected response checkTokenExpiry in ${this.__proto__.constructor.name}`)
                }
            }.bind(this))
    }

    _handleSubmitReset(formData) {
        resetPasswordToken(this.state.token, formData.password).then(
            function (response) {
                if (response.status === "ok") {
                    // do nothing because form updates state
                } else if (response.status === "expired") {
                    this.setState({expired: true})
                } else if (response.status === "error") {
                    throw new FormSubmissionError({_error: ""})
                } else {
                    throw new Error(`Unexpected response resetPasswordToken in ${this.__proto__.constructor.name}`)
                }
            }.bind(this))
    };

    _sentReset = () => (
        <div>Your password has been sucessfully reset. Please navigate to the home page and log in.
            <footer
                className="md-cell md-cell--12 md-dialog-footer md-dialog-footer--inline"
                style={{alignItems: 'center', margin: 0}}
            >
                <Button className="md-cell md-cell--12" type="submit" raised label="Home"
                        onClick={function () {
                            this.props.history.push("/")
                        }.bind(this)}/>
            </footer>
        </div>
    );

    _expired = () => (
        <div>Your request has expired. Please restart the recovery process.
            <footer
                className="md-cell md-cell--12 md-dialog-footer md-dialog-footer--inline"
                style={{alignItems: 'center', margin: 0}}
            >
                <Button className="md-cell md-cell--12" type="submit" raised label="Restart"
                        onClick={function () {
                            this.props.history.push("/reset-password")
                        }.bind(this)}/>
            </footer>
        </div>
    );

    render() {
        let width = 24 * this.state.passwordScore + 4;
        let style = {
            width: width + '%',
            opacity: width * .01 + .5,
            background: this.state.passwordScore < 4 ? '#FC6F6F' : '#5CE592',
            height: 5,
            transition: 'all 400ms linear',
            display: 'inline-block',
        };

        const {valid, pristine, submitting, submitSucceeded, handleSubmit} = this.props;
        return (
            this.state.expired ? this._expired() :
                submitSucceeded ? this._sentReset() :
                    // i have no idea why if you remove this and stretch the window the form is shrunken
                    <form style={{minWidth: 380}} onSubmit={handleSubmit(this._handleSubmitReset)}>
                        <Field name="password" type="password" onchange={this._onChange} component={FormTextField}
                               customSize="title" size={10} label="Password" required/>
                        <Field name="confirmPassword" type="password" component={FormTextField} label="Confirm Password"
                               customSize="title" size={10} required/>
                        <div
                            className="md-cell md-cell--12 md-dialog-footer md-dialog-footer--inline"
                            style={{alignItems: 'center', margin: 0, justifyContent: 'center'}}
                        >
                            Password Strength:&nbsp;
                            <div
                                style={{fontWeight: 'bold'}}>{['Weak', 'Okay', 'Good', 'Strong', 'Great'][this.state.passwordScore]}</div>
                        </div>
                        <div
                            className="md-cell md-cell--12 md-dialog-footer md-dialog-footer--inline"
                            style={{alignItems: 'center', margin: 0, justifyContent: 'flex-start'}}
                        >
                            <span style={style}/>
                        </div>
                        <div
                            className="md-cell md-cell--12 md-dialog-footer md-dialog-footer--inline"
                            style={{alignItems: 'center', margin: 0}}
                        >
                            <Button disabled={!valid || pristine || submitting} className="md-cell md-cell--12"
                                    type="submit" primary
                                    raised label="Reset Password"
                                    onClick={handleSubmit(this._handleSubmitReset)}/>
                        </div>
                    </form>
        )
    }
}
const ConnectedPasswordForm = connect()(reduxForm({
    form: 'passwordForm', // a unique identifier for this form
    validate: validatePassword, // <--- validation function given to redux-form
})(PasswordForm));


class EmailForm extends React.Component {
    constructor(props) {
        super(props);
        this._handleSubmitRequest = this._handleSubmitRequest.bind(this);
    }

    _handleSubmitRequest(formState) {
        return resetPasswordEmail(formState.email).then(
            function (response) {
                if (response.status === "ok") {
                    // do nothing because form updates state
                } else if (response.status === "error") {
                    throw new FormSubmissionError({_error: ""})
                } else {
                    throw new Error(`Unexpected response resetPasswordToken in ${this.__proto__.constructor.name}`)
                }
            }.bind(this))
    };

    render() {
        const email = value =>
            value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
                ? 'Invalid email address'
                : undefined;
        const required = value => value ? undefined : 'Required';
        const {valid, pristine, submitting, submitSucceeded, handleSubmit} = this.props;
        return (
            submitSucceeded ? <div>Request submitted. Please check your email.</div> :
                <form style={{minWidth: 217}} onSubmit={handleSubmit(this._handleSubmitRequest)}>
                    <Field name="email" type="email" component={FormTextField} label="Email"
                           customSize="title" size={10} validate={[email, required]} required/>
                    <footer
                        className="md-cell md-cell--12 md-dialog-footer md-dialog-footer--inline"
                        style={{alignItems: 'center', margin: 0}}
                    >
                        <Button disabled={!valid || pristine || submitting} className="md-cell md-cell--12"
                                type="submit" primary
                                raised label="Send request"
                                onClick={handleSubmit(this._handleSubmitRequest)}/>
                    </footer>
                </form>
        )
    }
}

const ConnectedEmailForm = connect()(reduxForm({
    form: 'emailForm', // a unique identifier for this form
})(EmailForm));

class ResetPassword extends React.Component {

    render() {
        // router won't pass search params as path
        let actualPath = this.props.location.pathname + this.props.location.search;
        return (
            <div className="paper-container">
                <Paper
                    key={1}
                    zDepth={1}
                    className="paper-example"
                >
                    <Switch location={{...this.props.location, pathname: actualPath}}>
                        <Route exact path="/reset-password" component={ConnectedEmailForm}/>
                        <Route exact path="/reset-password?token=(.*)" component={ConnectedPasswordForm}/>
                    </Switch>
                </Paper>
            </div>
        );
    }
}


const ConnectedResetPassword = withRouter(connect()(ResetPassword));
export {ConnectedResetPassword, PasswordForm, validatePassword}