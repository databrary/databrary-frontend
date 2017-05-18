import Button from "react-md/lib/Buttons/Button";
import UserButton from "./UserButton";
import Register from "./Register";
import React, {Component} from "react";
import {NavigationDrawer} from "react-md/lib/NavigationDrawers";
import NavLink from "./NavLink";
import Profile from "./Profile";
import {connect} from "react-redux";
import {Link as RouterLink, Route, Switch} from "react-router-dom";
import {withRouter} from "react-router";
import the404Page from "./the404Page";
import Home from "./Home";
const navItems = [{
    exact: true,
    label: 'Home',
    to: '/home',
    icon: 'home',
    loggedIn: false,
}, {
    exact: true,
    label: 'Profile',
    to: '/profile',
    icon: 'account_circle',
    loggedIn: true,
}];

class App extends Component {
    constructor(props) {
        super(props);
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
        return (
            <Route
                render={
                    function ({location}) {
                        return (
                            <NavigationDrawer
                                mobileDrawerType={NavigationDrawer.DrawerTypes.TEMPORARY}
                                tabletDrawerType={NavigationDrawer.DrawerTypes.TEMPORARY}
                                desktopDrawerType={NavigationDrawer.DrawerTypes.TEMPORARY}
                                drawerTitle="Databrary"
                                // drawerHeader={<CloseButton/>}
                                toolbarActions={[this.props.loggedIn ? null : signUpButton, userButton]}
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
                                        <Route path="/user/register" location={location} component={Register}/>}
                                    {this.props.loggedIn ?
                                        <Route path="/profile" location={location} component={Profile}/> : null}
                                    <Route path='*' component={the404Page}/>
                                </Switch>
                            </NavigationDrawer>
                        )
                    }.bind(this)
                }
            />
        );
    }
}

const mapStateToProps = (state) => {
    return {
        loggedIn: state.appReducer.flags.loggedIn,
    }
};

const connectedApp = connect(mapStateToProps)(App);
export default withRouter(connectedApp)
