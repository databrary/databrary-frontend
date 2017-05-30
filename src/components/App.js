import Button from "react-md/lib/Buttons/Button";
import UserButton from "./UserButton";
import React, {Component} from "react";
import {NavigationDrawer} from "react-md/lib/NavigationDrawers";
import NavLink from "./NavLink";
import {connect} from "react-redux";
import {Link as RouterLink, Route, Switch} from "react-router-dom";
import {withRouter} from "react-router";
import the404Page from "./the404Page";
import Home from "./Home";
import {addSnackToast, setLoggedIn} from "../redux/actions";
import {loggedIn} from "../api/loginout";
import ResetPassword from "./ResetPassword";
import {reportError} from "../api/report";

const navItems = [{
    exact: true,
    label: 'Home',
    to: '/home',
    icon: 'home',
    loggedIn: false,
}, {
    exact: true,
    label: 'Profile',
    to: '/getProfile',
    icon: 'account_circle',
    loggedIn: true,
}];

class App extends Component {
    async componentDidMount() {
        const {default: Register} = await import('./Register');
        const {default: Profile} = await import('./Profile');
        this.setState({
            lazyRegister: <Register/>, lazyProfile: <Profile/>,
        });
    }

    constructor(props) {
        super(props);
        this.state = {
            lazyRegister: null,
            lazyProfile: null,
        };
        loggedIn().then(
            function (response) {
                if (response.status === "ok") {
                    this.props.setLoggedIn(response.loggedIn);
                } else if (response.status === "error") {
                    this.props.addToast({
                        text: `Error ${response.code}: Couldn't check logged in status. Please clear your cookies.`,
                        action: {
                            label: 'Report',
                            onClick: () => {
                                reportError("failed to verify log in status", response.errorUuid)
                            },
                        },
                    })
                } else {
                    throw `Unexpected response loggedIn in ${this.__proto__.constructor.name}`
                }
            }.bind(this))
    }

    _toastHello() {
        this.props.addToast({
            text: 'Connection timed out. Showing limited messages.',
            toastAction: {
                label: 'Retry',
                onClick: () => {
                    alert('You tried again for some reason..'); // eslint-disable-line no-alert
                },
            },
        });
    }

    render() {
        const signUpButton = (
            <Button
                style={{marginLeft: 5, marginRight: 5}}
                raised
                primary
                label="Sign up"
                component={RouterLink}
                to="/user/register"
            />
        );
        const userButton = <UserButton/>;
        const testSnackbar = <Button raised label="Toast Hello, World" onClick={this._toastHello.bind(this)}/>;
        return (
            <Switch>
                <Route path="/reset-password" component={ResetPassword}/>
                <Route
                    render={
                        function ({location}) {
                            return (
                                <NavigationDrawer
                                    mobileDrawerType={NavigationDrawer.DrawerTypes.TEMPORARY}
                                    tabletDrawerType={NavigationDrawer.DrawerTypes.TEMPORARY}
                                    desktopDrawerType={NavigationDrawer.DrawerTypes.TEMPORARY}
                                    drawerTitle="Databrary"
                                    toolbarActions={[this.props.loggedIn ? null : signUpButton, userButton, testSnackbar]}
                                    toolbarTitle="Databrary"
                                    toolbarThemeType="themed"
                                    navItems={
                                        navItems.filter(p => (this.props.loggedIn === p.loggedIn) || !p.loggedIn).map(props =>
                                            <NavLink {...props} key={props.to}/>)
                                    }
                                >
                                    <Switch key={location.key}>
                                        <Route exact path="/" location={location} component={Home}/>
                                        <Route exact path="/home" location={location} component={Home}/>
                                        {this.props.loggedIn ? null :
                                            <Route exact path="/user/register" location={location}
                                                   render={() => this.state.lazyRegister || <h2>Loading...</h2>}/>}
                                        {this.props.loggedIn ?
                                            <Route exact path="/profile" location={location}
                                                   render={() => this.state.lazyProfile ||
                                                   <h2>Loading...</h2>}/> : null}
                                        <Route path='*' component={the404Page}/>
                                    </Switch>
                                </NavigationDrawer>
                            )
                        }.bind(this)
                    }
                />
            </Switch>

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
        setLoggedIn: (loggedIn) => dispatch(setLoggedIn(loggedIn)),
        addToast: (toast) => dispatch(addSnackToast(toast))
    }
};

const connectedApp = connect(mapStateToProps, mapDispatchToProps)(App);
export default withRouter(connectedApp)
