/**
 * Created by maksim on 5/15/17.
 */

import {combineReducers} from "redux";
import {ADD_SNACK_TOAST, REMOVE_SNACK_TOAST, SET_LOGGED_IN} from "./actions";


const initialState = {
    loggedIn: false,
};

const initialSnackBarState = {
    toasts: []
};

function flags(state = initialState, action) {
    switch (action.type) {
        case SET_LOGGED_IN:
            return {
                ...state,
                loggedIn: action.loggedIn
            };
        default:
            return state
    }
}

function snackBar(state = initialSnackBarState, actin) {
    const toasts = state.toasts.slice();
    switch (actin.type) {
        case ADD_SNACK_TOAST:
            let {text, action} = actin.toast;
            toasts.push({
                text,
                action: action
            });
            return {
                toasts
            };
        case REMOVE_SNACK_TOAST:
            toasts.shift();
            return {
                toasts
            };
        default:
            return state
    }
}

const app = combineReducers({
    flags,
    snackBar,
});

export default app
//
