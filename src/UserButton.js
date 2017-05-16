/**
 * Created by maksim on 5/12/17.
 */
import React, {PureComponent} from "react";
import {connect} from "react-redux";
import LoginButton from "./LoginButton";
import LoggedInButton from "./LoggedInButton";


class UserButton extends PureComponent {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            this.props.loggedIn ? <LoggedInButton className={this.props.className}/> :
                <LoginButton className={this.props.className}/>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        loggedIn: state.loggedIn,
    }
};

export default connect(
    mapStateToProps,
)(UserButton);