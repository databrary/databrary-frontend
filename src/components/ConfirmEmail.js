/**
 * Created by maksim on 6/12/17.
 */

import React from "react";
import {Button} from "react-md/lib/Buttons";
import {PasswordForm, validatePassword} from './ResetPassword'
import {reduxForm} from "redux-form";
import "../scss/resetPassword.css";
import Paper from 'react-md/lib/Papers';
import {withRouter} from "react-router";

class ConfirmEmailPassword extends PasswordForm {
    _sentReset = () => (
        <div style={{padding: 15}}>
            <header><h2>Stay Tuned</h2></header>
            <div>
                <p>
                    Your request for authorization is now pending. We will send you an email
                    notification after your request for authorization is approved. In the meantime, you
                    can
                    learn more about how to share data by reading our &nbsp;
                    <a href="http://databrary.org/access.html">Databrary User Guide</a>.
                </p>
                <p>
                    You can also:
                    <br></br><a href="/profile">View and complete your profile</a>
                    <br></br><a href="/volume">Browse public volumes</a>
                </p>
            </div>
        </div>
    );

    _expired = () => (
        <div>Your confirmation request has expired. Please proceed to recover your password.
            <footer
                className="md-cell md-cell--12 md-dialog-footer md-dialog-footer--inline"
                style={{alignItems: 'center', margin: 0}}
            >
                <Button className="md-cell md-cell--12" type="submit" raised label="Recover"
                        onClick={function () {
                            this.props.history.push("/reset-password")
                        }.bind(this)}/>
            </footer>
        </div>
    );
}

const ConnectedPasswordForm = withRouter(reduxForm({
    form: 'passwordForm', // a unique identifier for this form
    validate: validatePassword, // <--- validation function given to redux-form
})(ConfirmEmailPassword));

export default class AccountConfirmation extends React.Component {
    render() {
        return (
            <div className="paper-container">
                <Paper key={1} zDepth={1} className="paper-example">
                    <ConnectedPasswordForm/>
                </Paper>
            </div>
        );
    }
}


