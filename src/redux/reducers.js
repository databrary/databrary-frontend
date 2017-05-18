/**
 * Created by maksim on 5/15/17.
 */

import {combineReducers} from "redux";
import {SET_LOGGED_IN, SET_REMEMBER_ME} from "./actions";


const initialState = {
    loggedIn: false,
    rememberMe: false,
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

const app = combineReducers({
    flags,
});

export default app
