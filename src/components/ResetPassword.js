/**
 * Created by maksim on 5/23/17.
 */

import React from "react";
import Paper from "react-md/lib/Papers";
import "../scss/resetPassword.css";
import TextField from "react-md/lib/TextFields";
import {resetPasswordEmail, resetPasswordToken} from "../api/resetpassword";
import {Button} from "react-md/lib/Buttons";
import queryString from "query-string";
import {withRouter} from "react-router";
import {connect} from "react-redux";
import {addSnackToast} from "../redux/actions";
import {Field, reduxForm} from "redux-form";
import {reportError} from "../api/report";

class passwordField extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: props.meta.dirty && Boolean(this.props.meta.error)
        }
    }

    render() {
        return (
            <TextField
                label={this.props.label}
                className="md-cell md-cell--12"
                type="password"
                onChange={this.props.input.onChange}
                errorText={this.props.meta.error}
                helpText={this.props.meta.warning}
                error={this.props.meta.dirty && Boolean(this.props.meta.error)}
                required
            />
        );
    }
}

const validate = values => {
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
    // if (!values.email) {
    //     errors.email = 'Required'
    // } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    //     errors.email = 'Invalid email address'
    // }
    if (!values.age) {
        errors.age = 'Required'
    } else if (isNaN(Number(values.age))) {
        errors.age = 'Must be a number'
    } else if (Number(values.age) < 18) {
        errors.age = 'Sorry, you must be at least 18 years old'
    }
    return errors
};

const warn = values => {


    const warnings = {};
    if (values.age < 19) {
        warnings.age = 'Hmm, you seem a bit young...'
    }
    return warnings
};

class PasswordForm extends React.Component {
    render(props) {
        const {valid, pristine, handleSubmit, submitting} = this.props;

        return (

            <form onSubmit={handleSubmit}>
                <Field name="password" type="password" component={passwordField} label="Password"/>
                <Field name="confirmPassword" type="password" component={passwordField} label="Confirm Password"/>
                <footer
                    className="md-cell md-cell--12 md-dialog-footer md-dialog-footer--inline"
                    style={{alignItems: 'center', margin: 0}}
                >
                    <Button disabled={!valid || pristine || submitting} className="md-cell md-cell--12" type="submit"
                            raised label="Reset Password"
                            onClick={handleSubmit}/>
                </footer>
            </form>
        )
    }
}
const ConnectedPasswordForm = reduxForm({
    form: 'passwordForm', // a unique identifier for this form
    validate, // <--- validation function given to redux-form
    warn // <--- warning function given to redux-form
})(PasswordForm);





class ResetPassword extends React.Component {

    constructor(props) {
        super(props);
        let parsedQ = queryString.parse(props.location.search);
        if (parsedQ.token !== undefined) {
            this.state = {
                password: '',
                confirmPassword: '',
                stage: 'token',
                token: parsedQ.token,
                succes: false,
            }
        } else {
            this.state = {
                email: '',
                sent: false,
                stage: 'email',
            };
        }

        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmitRequest = this.handleSubmitRequest.bind(this);
        this.handleSubmitReset = this.handleSubmitReset.bind(this);
    }

    handleFieldChange(value, event) {
        let id = event.target.id;
        this.setState(function () {
            let state = {};
            state[id] = value;
            return state
        });
    }

    handleChange(value) {
        if (value) {
            this.setState(function () {
                return Object.assign(this.state, value)
            });
        }
    }

//
    handleSubmitRequest(event) {
        event.preventDefault();
        resetPasswordEmail(this.state.email).then(
            function (response) {
                if (response.status === "ok") {
                    this.setState(function () {
                        let state = {};
                        state["sent"] = true;
                        return state
                    });
                } else if (response.status === "error") {
                    this.props.addToast({
                        text: "Couldn't submit password email",
                        action: {
                            label: 'Report',
                            onClick: () => {
                                reportError("failed to submit password email", response.errorUuid)
                            },
                        },
                    })
                } else {
                    throw `Unexpected response resetPasswordToken in ${this.__proto__.constructor.name}`
                }
            }.bind(this))
    };

    handleSubmitReset(event) {
        event.preventDefault();
        if (this.state.password === this.state.confirmPassword) {
            resetPasswordToken(this.state.token, this.state.password).then(
                function (response) {
                    if (response.status === "ok") {
                        this.setState({
                            stage: "token",
                            success: true,
                        })
                    } else if (response.status === "error") {
                        this.props.addToast({
                            text: "Couldn't change password",
                            action: {
                                label: 'Report',
                                onClick: () => {
                                    reportError("failed to submit token", response.errorUuid)
                                },
                            },
                        })
                    } else {
                        throw `Unexpected response resetPasswordToken in ${this.__proto__.constructor.name}`
                    }
                }.bind(this))
        } else {
            console.log("pws don't match") //TODO
        }
    };

    render() {

        const RequestFormBody = (
            <form className="md-grid">
                <div className="md-cell md-cell--12">
                    Enter the email you use for Databrary, and we’ll email you instructions on how to reset your
                    password.
                </div>
                <TextField
                    id="email"
                    label="Email"
                    className="md-cell md-cell--12"
                    onChange={this.handleFieldChange}
                    required
                />
                <footer
                    className="md-cell md-cell--12 md-dialog-footer md-dialog-footer--inline"
                    style={{alignItems: 'center', margin: 0}}
                >
                    <Button className="md-cell md-cell--12" type="submit" raised label="Request"
                            onClick={this.handleSubmitRequest}/>
                </footer>
            </form>
        );

        const ResetFormBody = (
            <form className="md-grid">
                <div className="md-cell md-cell--12">
                    Enter your new password.
                </div>
                <TextField
                    id="password"
                    label="Password"
                    // defaultValue="Vintage 50's Dress"
                    // customSize="title"
                    className="md-cell md-cell--12"
                    type="password"
                    onChange={this.handleFieldChange}
                    required
                />
                <TextField
                    id="confirmPassword"
                    label="Confirm Password"
                    // defaultValue="Vintage 50's Dress"
                    // customSize="title"
                    className="md-cell md-cell--12"
                    type="password"
                    onChange={this.handleFieldChange}
                    required
                />
                <footer
                    className="md-cell md-cell--12 md-dialog-footer md-dialog-footer--inline"
                    style={{alignItems: 'center', margin: 0}}
                >
                    <Button className="md-cell md-cell--12" type="submit" raised label="Reset"
                            onClick={this.handleSubmitReset}/>
                </footer>
            </form>
        );


        const SentReset = (
            <div>Your password has been sucessfully reset. Please navigate to the home page and log in.
                <Button className="md-cell md-cell--12" type="submit" raised label="Reset"
                        onClick={function () {
                            this.props.history.push("/")
                        }.bind(this)}/>
            </div>
        );

        const SentRequest = (
            <div>Check your email and please respond within 24 hours.</div>
        );

        return (
            <div className="paper-container">
                <Paper
                    key={1}
                    zDepth={1}
                    className="paper-example"
                >
                    {/*{this.state.stage === 'email' ?*/}
                    {/*(this.state.sent ? SentRequest : RequestFormBody) :*/}
                    {/*(this.state.succes ? SentReset : <ConnectedUserForm/>)*/}
                    {/*}*/}
                    <ConnectedPasswordForm onSubmit={this.handleSubmitReset}/>
                </Paper>
            </div>
        );
    }

}

const mapDispatchToProps = (dispatch) => {
    return {
        addToast: (toast) => dispatch(addSnackToast(toast))
    }
};

const connectedResetPassword = connect(null, mapDispatchToProps)(ResetPassword);
export default withRouter(connectedResetPassword)