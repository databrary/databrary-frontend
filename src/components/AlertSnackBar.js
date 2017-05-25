/**
 * Created by maksim on 5/25/17.
 */

import React from "react";
import {connect} from "react-redux";
import Snackbar from "react-md/lib/Snackbars";
import {removeSnackToast} from "../redux/actions";

class AlertBar extends React.Component {
    constructor(props) {
        super(props);

        this._removeToast = this._removeToast.bind(this);

        this.state = {
            autohide: false,
            autohideTimeout: 3000,

        };
    }

    _removeToast() {
        this.props.removeToast()
    }

    render() {
        return (
            <Snackbar {...this.state} toasts={this.props.toasts} onDismiss={this._removeToast}/>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        toasts: state.appReducer.snackBar.toasts,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        removeToast: () => dispatch(removeSnackToast())
    }
};

const connectedAlertBar = connect(mapStateToProps, mapDispatchToProps)(AlertBar);
export default connectedAlertBar
