/**
 * Created by maksim on 5/15/17.
 */
import Dialog from "react-md/lib/Dialogs";
import React, {Component, PureComponent} from "react";
import TextField from "react-md/lib/TextFields";
import {Button} from "react-md/lib/Buttons";
import SelectionControl from "react-md/lib/SelectionControls/SelectionControl";
import {connect} from "react-redux";
import {setLoggedIn, setRememberMe} from "../redux/actions";
import {logIn} from "../api/loginout";
export default class LoginButton extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {visible: false};
    }

    openDialog = () => {
        this.setState({visible: true});
    };

    closeDialog = () => {
        this.setState({visible: false});
    };

    render() {
        const {visible} = this.state;
        return (
            <Button style={{marginLeft: 5, marginRight: 5}} primary raised key="account_circle" label="Sign in"
                    onClick={this.openDialog}>
                account_circle<LoginDialog visible={visible} onHide={this.closeDialog}/>
            </Button>
        );
    }
}


class LoginDialog extends PureComponent {
    render() {
        const {visible, onHide} = this.props;
        return (
            <Dialog dialogStyle={{width: "auto"}} id="LoginDialog" visible={visible} onHide={onHide}>
                <LoginForm onLogIn={onHide}/>
                {/*<TestLoginForm />*/}
            </Dialog>
        )
    }
}

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
        };

        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleFieldChange(value, event) {
        let id = event.target.id;
        this.setState(function () {
            let state = {};
            state[id] = value;
            return state
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        logIn(this.state.email, this.state.password).then(
            function (loggedIn) {
                if (loggedIn === true) {
                    this.props.setLoggedIn(true);
                    this.props.onLogIn();
                } else {
                    this.props.setLoggedIn(false)
                }
            }.bind(this)
        )

    };

    render() {
        return (
            <form className="md-grid">
                <TextField
                    id="email"
                    label="Email"
                    // defaultValue="Vintage 50's Dress"
                    // customSize="title"
                    className="md-cell md-cell--12"
                    onChange={this.handleFieldChange}
                    required
                />
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
                <footer
                    className="md-cell md-cell--12 md-dialog-footer md-dialog-footer--inline"
                    style={{alignItems: 'center', margin: 0}}
                >
                    <Button className="md-cell md-cell--12" type="submit" raised label="Login"
                            onClick={this.handleSubmit}/>
                    <SelectionControl
                        className="md-cell md-cell--12"
                        onChange={(v, e) => this.props.onRememberMeCheck(v)}
                        name="remember_me_checkbox"
                        id="remember_me_checkbox"
                        label="Remember Me"
                        type="checkbox"
                    />
                </footer>
            </form>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        rememberMe: state.rememberMe,
        loggedIn: state.loggedIn,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onRememberMeCheck: (rememberMe) => dispatch(setRememberMe(rememberMe)),
        setLoggedIn: (loggedIn) => dispatch(setLoggedIn(loggedIn))
    }
};

LoginForm = connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginForm);