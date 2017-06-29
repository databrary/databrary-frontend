/**
 * Created by maksim on 5/15/17.
 */
import Dialog from "react-md/lib/Dialogs";
import React, {Component} from "react";
import TextField from "react-md/lib/TextFields";
import {Button} from "react-md/lib/Buttons";
import SelectionControl from "react-md/lib/SelectionControls/SelectionControl";
import {connect} from "react-redux";
import {setLoggedIn} from "../redux/actions";
import {logIn} from "../api/user";

export class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            rememberMe: false,
            error: ''
        };

        this._handleFieldChange = this._handleFieldChange.bind(this);
        this._handleSubmit = this._handleSubmit.bind(this);
    }

    _handleFieldChange(value, event) {
        let id = event.target.id;
        this.setState(function () {
            let state = {};
            state[id] = value;
            return state
        });
    }

    _handleSubmit(event) {
        event.preventDefault();

        logIn(this.state.email, this.state.password, this.state.rememberMe).then(
            function (response) {
                if (response.status === "ok") {
                    this.props.setLoggedIn(true);
                    this.props.hideForm();
                } else if (response.status === "error") {
                    this.setState({error: 'Incorrect Email/Password.'})
                } else {
                    throw new Error(`Unexpected response logIn in ${this.__proto__.constructor.name}`)
                }
            }.bind(this));
    };

    render() {
        return (

            <form className="md-grid">
                <TextField id="email" label="Email" className="md-cell md-cell--12" onChange={this._handleFieldChange}
                           required customSize="title" size={10}/>
                <TextField id="password" label="Password" className="md-cell md-cell--12" type="password"
                           onChange={this._handleFieldChange} customSize="title" size={10}
                           required/>
                <footer className="md-cell md-cell--12 md-dialog-footer md-dialog-footer--inline"
                        style={{alignItems: 'center', margin: 0}}>
                    <Button primary type="submit" raised label="Log In" className="md-cell md-cell--12"
                            onClick={this._handleSubmit}/>
                    <SelectionControl className="md-cell md-cell--12" onChange={this._handleFieldChange}
                                      name="rememberMe"
                                      id="rememberMe" label="Remember Me" type="checkbox"/>
                </footer>
                <footer className="md-cell md-cell--12 " style={{alignItems: 'center', margin: 0}}>
                    {this.state.error ?
                        <p style={{textAlign: 'center'}}>{this.state.error} <a href="/reset-password">Recover
                            Password</a></p> : ''}

                </footer>
            </form>

        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setLoggedIn: (loggedIn) => dispatch(setLoggedIn(loggedIn)),
    }
};

const ConnectedLoginForm = connect(null, mapDispatchToProps)(LoginForm);

class LoginDialog extends Component {
    render() {
        const {visible, onHide} = this.props;
        return (
            <Dialog dialogStyle={{width: "30%"}} id="LoginDialog" visible={visible} onHide={onHide}>
                <ConnectedLoginForm hideForm={onHide}/>
            </Dialog>
        )
    }
}

export class LoginButton extends Component {
    constructor(props) {
        super(props);

        this.state = {visible: false};
    }

    _openDialog = () => {
        this.setState({visible: true});
    };

    _closeDialog = () => {
        this.setState({visible: false});
    };

    render() {
        const {visible} = this.state;
        return (
            <Button style={{marginLeft: 5, marginRight: 5}} primary raised key="account_circle" label="Log In"
                    onClick={this._openDialog}>
                account_circle
                <LoginDialog visible={visible} onHide={this._closeDialog}/>
            </Button>
        );
    }
}