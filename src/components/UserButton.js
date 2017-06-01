/**
 * Created by maksim on 5/12/17.
 */
import React, {PureComponent} from "react";
import {connect} from "react-redux";
import LoginButton from "./LoginButton";

import ListItem from "react-md/lib/Lists/ListItem";
import MenuButton from "react-md/lib/Menus/MenuButton";
import Positions from "react-md/lib/Menus/Positions";
import {setLoggedIn} from "../redux/actions";
import {logOut} from "../api/user";
import {withRouter} from "react-router";
import {reportError} from "../api/report";

class LoggedInButton extends PureComponent {
    constructor(props) {
        super(props);
        this.logOut = this.logOut.bind(this);
    }

    logOut() {
        logOut().then(
            function (response) {
                if (response.status === "ok") {
                    this.props.history.push("/");
                    this.props.setLoggedIn(false);
                } else if (response.status === "error") {
                    this.props.addToast({
                        text: `Error ${response.code}: Couldn't logout. Please clear your cookies.`,
                        action: {
                            label: 'Report',
                            onClick: () => {
                                reportError("failed to logout", response.errorUuid)
                            },
                        },
                    })
                } else {
                    throw `Unexpected response logout in ${this.__proto__.constructor.name}`
                }
            }.bind(this));
    }

    render() {
        return (
            <MenuButton
                contained={false}
                position={Positions.BELOW}
                icon key="account_circle" className={this.props.className}
                id="loggedin-menu"
                buttonChildren="account_circle"
            >
                <ListItem onClick={this.open} primaryText="My Account"/>
                <ListItem onClick={this.logOut} primaryText="Logout"/>
            </MenuButton>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setLoggedIn: (loggedIn) => dispatch(setLoggedIn(loggedIn))
    }
};

const ConnectedLoggedInButton = withRouter(connect(
    null,
    mapDispatchToProps
)(LoggedInButton));

class UserButton extends PureComponent {
    render() {
        return (
            this.props.loggedIn ? <ConnectedLoggedInButton className={this.props.className}/> :
                <LoginButton className={this.props.className}/>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        loggedIn: state.appReducer.flags.loggedIn,
    }
};

export default connect(
    mapStateToProps
)(UserButton);