/**
 * Created by maksim on 5/15/17.
 */

import {combineReducers} from "redux";
import {SET_LOGGED_IN, SET_REMEMBER_ME} from "./actions";


function rememberMe(state = false, action) {
    switch (action.type) {
        case SET_REMEMBER_ME:
            return action.rememberMe;
        default:
            return state
    }
}

function loggedIn(state = false, action) {
    switch (action.type) {
        case SET_LOGGED_IN:
            return action.loggedIn;
        default:
            return state
    }
}

const app = combineReducers({
    rememberMe,
    loggedIn,
});

export default app
