/**
 * Created by maksim on 5/15/17.
 */

import {combineReducers} from "redux";
import {ADD_SNACK_TOAST, REMOVE_SNACK_TOAST, SET_LOGGED_IN, SET_REMEMBER_ME} from "./actions";


const initialState = {
    loggedIn: false,
    rememberMe: false,
};

const initialSnackBarState = {
    toasts: []
};

function flags(state = initialState, action) {
    switch (action.type) {
        case SET_REMEMBER_ME:
            return {
                ...state,
                rememberMe: action.rememberMe
            };
        case SET_LOGGED_IN:
            return {
                ...state,
                loggedIn: action.loggedIn
            };
        default:
            return state
    }
}

function snackBar(state = initialSnackBarState, action) {
    const toasts = state.toasts.slice();
    switch (action.type) {
        case ADD_SNACK_TOAST:
            let {text, toastAction} = action.toast;
            toasts.push({
                text,
                action: toastAction
            });
            return {
                toasts
            };
        case REMOVE_SNACK_TOAST:
            toasts.pop();
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
