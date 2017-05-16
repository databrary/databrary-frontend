// import React, {PureComponent} from "react";
import Button from "react-md/lib/Buttons/Button";
// import Toolbar from "react-md/lib/Toolbars";
// import {connect} from "react-redux";
// import inboxListItems from "./constants/inboxListItems";
// import MenuButton from "react-md/lib/Menus/MenuButton";
// import ListItem from "react-md/lib/Lists/ListItem";
// import {logOut} from "./api/loginout";
import UserButton from "./UserButton";
import Register from "./Register";
import React, {Component} from "react";
import {Route, Switch} from "react-router-dom";
import NavigationDrawer from "react-md/lib/NavigationDrawers";
import NavLink from "./NavLink";

import Home from "./Home";
import Page1 from "./Page1";
import Page2 from "./Page2";
import Page3 from "./Page3";
// import Profile from "./Profile";
// import {Route, Switch} from "react-router-dom";
// import NavigationDrawer from 'react-md/lib/NavigationDrawers';
// import NavLink from './NavLink';
// const ToolbarMenu = (props) => (
//     <MenuButton id="woop" buttonChildren="more_vert" icon {...props}>
//         <ListItem primaryText="Settings"/>
//         <ListItem primaryText="Help"/>
//         <ListItem primaryText="Feedback"/>
//     </MenuButton>
// );
// import Home from './Home';
// import Page1 from './Page1';
// import Page2 from './Page2';
// import Page3 from './Page3';
//
// const navItems = [{
//     exact: true,
//     label: 'Home',
//     to: '/',
//     icon: 'home',
// }, {
//     label: 'Page 1',
//     to: '/page-1',
//     icon: 'bookmark',
// }, {
//     label: 'Page 2',
//     to: '/page-2',
//     icon: 'donut_large',
// }, {
//     label: 'Page 3',
//     to: '/page-3',
//     icon: 'flight_land',
// }];
//
// class App extends PureComponent {
//     constructor(props) {
//         super(props);
//
//         this.state = {
//             visible: true,
//             position: 'left',
//         };
//
//         this._toggleLeft = this._toggleLeft.bind(this);
//         this._toggleRight = this._toggleRight.bind(this);
//         this._closeDrawer = this._closeDrawer.bind(this);
//         this._handleToggle = this._handleToggle.bind(this);
//     }
//
//
//     componentDidMount() {
//         window.addEventListener("beforeunload", (ev) => {
//             ev.preventDefault();
//             if (!this.props.rememberMe) {
//                 logOut()
//             }
//             // return
//         });
//
//     }
//
//     componentWillUnmount() {
//         window.removeEventListener('onbeforeunload', this.handleWindowClose);
//     }
//
//     _handleToggle(visible) {
//         this.setState({visible});
//     }
//
//     _closeDrawer() {
//         this.setState({visible: false});
//     }
//
//     _toggleLeft() {
//         this.setState({visible: !this.state.visible, position: 'left'});
//     }
//
//     _toggleRight() {
//         this.setState({visible: !this.state.visible, position: 'right'});
//     }
//
//     render() {
//         // const left = this.state.position === 'left';
//         // const close = <Button icon onClick={this._closeDrawer}>{left ? 'arrow_back' : 'close'}</Button>;
//         // const actions = [
//         //     <Button key="search" icon>search</Button>,
//         //     <Button key="favorite" icon>favorite</Button>,
//         //     <UserButton />,
//         // ];
//         // // All don't fit for mobile
//         // const nav = <Button key="nav" icon onClick={this._toggleLeft}>menu</Button>;
//         //
//         // const header = (
//         //     <Toolbar
//         //         title="Databrary"
//         //         nav={left ? null : close}
//         //         actions={left ? close : null}
//         //         className="md-divider-border md-divider-border--bottom"
//         //     />
//         // );
//         return (
//             <Route
//                 render={({ location }) => (
//                     <NavigationDrawer
//                         drawerType={Drawer.DrawerTypes.CLIPPED}
//                         drawerTitle="Databrary"
//                         toolbarTitle="Databrary"
//                         navItems={navItems.map(props => <NavLink {...props} key={props.to} />)}
//                     >
//                         <Switch key={location.key}>
//                             <Route exact path="/" location={location} component={Home} />
//                             <Route path="/page-1" location={location} component={Page1} />
//                             <Route path="/page-2" location={location} component={Page2} />
//                             <Route path="/page-3" location={location} component={Page3} />
//                         </Switch>
//                     </NavigationDrawer>
//                 )}
//             />
//         );
//     }
// }
//
// export default App
// // const mapStateToProps = (state) => {
// //     return {
// //         rememberMe: state.rememberMe
// //     }
// // };
// //
// // export default connect(
// //     mapStateToProps,
// // )(App);

const navItems = [{
    exact: true,
    label: 'Home',
    to: '/',
    icon: 'home',
}, {
    label: 'Page 1',
    to: '/page-1',
    icon: 'bookmark',
}, {
    label: 'Page 2',
    to: '/page-2',
    icon: 'donut_large',
}, {
    label: 'Page 3',
    to: '/page-3',
    icon: 'flight_land',
}];

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            visible: true,
            position: 'left',
        };

        this._toggleLeft = this._toggleLeft.bind(this);
        this._toggleRight = this._toggleRight.bind(this);
        this._closeDrawer = this._closeDrawer.bind(this);
        this._handleToggle = this._handleToggle.bind(this);
    }


    // componentDidMount() {
    //     window.addEventListener("beforeunload", (ev) => {
    //         ev.preventDefault();
    //         if (!this.props.rememberMe) {
    //             logOut()
    //         }
    //         // return
    //     });
    //
    // }
    //
    // componentWillUnmount() {
    //     window.removeEventListener('onbeforeunload', this.handleWindowClose);
    // }

    _handleToggle(visible) {
        this.setState({visible});
    }

    _closeDrawer() {
        this.setState({visible: false});
    }

    _toggleLeft() {
        this.setState({visible: !this.state.visible, position: 'left'});
    }

    _toggleRight() {
        this.setState({visible: !this.state.visible, position: 'right'});
    }
    render() {
        const closeButton = (
            <Button
                style={{marginLeft: 5, marginRight: 5}}
                raised
                primary
                label="Sign up"
                href="/user/register"
                // tooltipLabel="Close the interactive demo"
                // tooltipDelay={150}
                // tooltipPosition="left"
            />
        );
        const userButton = <UserButton/>;
        return (
            <Route
                render={({location}) => (
                    <NavigationDrawer
                        mobileDrawerType={NavigationDrawer.DrawerTypes.TEMPORARY}
                        tabletDrawerType={NavigationDrawer.DrawerTypes.TEMPORARY}
                        desktopDrawerType={NavigationDrawer.DrawerTypes.TEMPORARY}
                        drawerTitle="Databrary"
                        toolbarActions={[closeButton, userButton]}
                        toolbarTitle="Databrary"
                        toolbarThemeType="themed"
                        navItems={navItems.map(props => <NavLink {...props} key={props.to}/>)}
                    >
                        <Switch key={location.key}>
                            <Route exact path="/" location={location} component={Home}/>
                            <Route exact path="/user/register" location={location} component={Register}/>
                            <Route path="/page-1" location={location} component={Page1}/>
                            <Route path="/page-2" location={location} component={Page2}/>
                            <Route path="/page-3" location={location} component={Page3}/>
                        </Switch>
                    </NavigationDrawer>
                )}
            />
        );
    }
}

export default App;
