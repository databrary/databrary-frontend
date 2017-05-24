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
import {setLoggedIn} from "../redux/actions";
import {loggedIn} from "../api/loginout";
import ResetPassword from "./ResetPassword";

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
                this.props.setLoggedIn(response);
            }.bind(this))
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
            <Switch>
                <Route exact path="/reset-password" component={ResetPassword}/>
                <Route
                    render={
                        function ({location}) {
                            return (
                                <NavigationDrawer
                                    mobileDrawerType={NavigationDrawer.DrawerTypes.TEMPORARY}
                                    tabletDrawerType={NavigationDrawer.DrawerTypes.TEMPORARY}
                                    desktopDrawerType={NavigationDrawer.DrawerTypes.TEMPORARY}
                                    drawerTitle="Databrary"
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
        setLoggedIn: (loggedIn) => dispatch(setLoggedIn(loggedIn))
    }
};

const connectedApp = connect(mapStateToProps, mapDispatchToProps)(App);
export default withRouter(connectedApp)
