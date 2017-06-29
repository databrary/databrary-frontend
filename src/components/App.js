import Button from "react-md/lib/Buttons/Button";
import UserButton from "./UserButton";
import React, {Component} from "react";
import {NavigationDrawer} from "react-md/lib/NavigationDrawers";
import {connect} from "react-redux";
import {Route, Switch} from "react-router-dom";
import {withRouter} from "react-router";
import the404Page from "./the404Page";
import Home from "./Home";
import {addSnackToast, setLoggedIn} from "../redux/actions";
import {loggedIn} from "../api/user";
import {ConnectedResetPassword as ResetPassword} from "./ResetPassword";
import AccountConfirmation from './ConfirmEmail'

import FontIcon from "react-md/lib/FontIcons";
const navItems = [{
    primaryText: 'Home',
    to: '/home',
    loggedIn: false,
}, {
    primaryText: 'News',
    to: 'https://www.databrary.org/news.html',
    loggedIn: false,
}, {
    primaryText: 'Profile',
    to: '/profile',
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
        loggedIn().then((loggedIn) => this.props.setLoggedIn(loggedIn))
    }

    _toastHello() {
        this.props.addToast({
            text: 'Connection timed out. Showing limited messages.',
            action: {
                label: 'Retry',
                // onClick: () => {
                //     console.log("hello")
                // }
            },
        });
    }

    render() {
        const signUpButton = (
            <Button
                style={{marginLeft: 5, marginRight: 5}}
                raised
                primary
                label="Register"
                onClick={() => this.props.history.push("/user/register")}
            />
        );
        const userButton = <UserButton/>;
        //const testSnackbar = <Button raised label="Toast Hello, World" onClick={this._toastHello.bind(this)}/>;
        const logoImage = (
            <img
                style={{width:260}}
                alt="Databrary"
                src="https://nyu.databrary.org/web/images/logo/databrary-nav.svg"
            />
        );
        return (
            <Switch>
                <Route path="/reset-password" component={ResetPassword}/>
                <Route
                    render={
                        function ({location}) {
                            return (
                                <NavigationDrawer
                                    mobileDrawerType={NavigationDrawer.DrawerTypes.FULLHEIGHT}
                                    tabletDrawerType={NavigationDrawer.DrawerTypes.FULLHEIGHT}
                                    desktopDrawerType={NavigationDrawer.DrawerTypes.FULLHEIGHT}
                                    toolbarTitle={logoImage}
                                    toolbarActions={[this.props.loggedIn ? null : signUpButton, userButton]}
                                    toolbarThemeType="themed"
                                    navItems={
                                        navItems
                                            .filter(p => (this.props.loggedIn === p.loggedIn) || !p.loggedIn)
                                            .map(props =>
                                                ({
                                                    primaryText: props.primaryText,
                                                    leftIcon: props.leftIcon,
                                                    active: this.props.history.location.pathname === props.to,
                                                    onClick: () => props.to ? this.props.history.push(props.to) : null
                                                })
                                            )
                                    }
                                >
                                    <Switch key={location.key}>
                                        <Route exact path="/" location={location} component={Home}/>
                                        <Route exact path="/home" location={location} component={Home}/>
                                        {this.props.loggedIn ? null :
                                            <Route exact path="/user/register" location={location}
                                                   render={() => this.state.lazyRegister || <h2>Loading...</h2>}/>}
                                        {this.props.loggedIn ? null :
                                            <Route exact path="/user/confirm-email" location={location}
                                                   render={() => <AccountConfirmation/> || <h2>Loading...</h2>}/>}
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
