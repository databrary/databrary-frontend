/**
 * Created by maksim on 5/15/17.
 */
import React, {PureComponent} from "react";
import ListItem from "react-md/lib/Lists/ListItem";
import MenuButton from "react-md/lib/Menus/MenuButton";
import {connect} from "react-redux";
import {setLoggedIn} from "../redux/actions";
import {logOut} from "../api/loginout";
import {withRouter} from "react-router";
//

class LoggedInButton extends PureComponent {
    constructor(props) {
        super(props);
        this.logOut = this.logOut.bind(this);
    }

    logOut() {
        logOut().then(function () {
                this.props.history.push("/");
                this.props.setLoggedIn(false);
            }.bind(this)
        )
    }

    render() {
        return (
            <MenuButton
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

const mapStateToProps = () => {
    return {}
};

const mapDispatchToProps = (dispatch) => {
    return {
        setLoggedIn: (loggedIn) => dispatch(setLoggedIn(loggedIn))
    }
};

export default LoggedInButton = withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(LoggedInButton));