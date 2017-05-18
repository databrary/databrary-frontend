/**
 * Created by maksim on 5/15/17.
 */
import React, {PureComponent} from "react";
import ListItem from "react-md/lib/Lists/ListItem";
import MenuButton from "react-md/lib/Menus/MenuButton";
import {connect} from "react-redux";
import {setLoggedIn} from "../redux/actions";
import {logOut} from "../api/loginout";

class LoggedInButton extends PureComponent {
    constructor(props) {
        super(props);
        this._logOut = this._logOut.bind(this);
    }

    _logOut() {
        logOut();
        this.props.setLoggedIn(false);
        console.log("logged in")
    }

    render() {
        return (
            <MenuButton
                icon key="account_circle" className={this.props.className}
                id="loggedin-menu"
                buttonChildren="account_circle"
            >
                <ListItem onClick={this.open} primaryText="My Account"/>
                <ListItem onClick={this._logOut} primaryText="Logout"/>
            </MenuButton>

        );
    }
}

const mapStateToProps = () => {
    return {}
};

const mapDispatchToProps = (dispatch) => {
    return {
        setLoggedIn: (loggedIn) => dispatch(setLoggedIn(loggedIn))
    }
};

export default LoggedInButton = connect(
    mapStateToProps,
    mapDispatchToProps
)(LoggedInButton);