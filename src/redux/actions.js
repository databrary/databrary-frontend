/*
 * action types
 */

export const SET_REMEMBER_ME = 'SET_REMEMBER_ME';

export function setRememberMe(rememberMe) {
    return {type: SET_REMEMBER_ME, rememberMe}
}

export const SET_LOGGED_IN = 'SET_LOGGED_IN';

export function setLoggedIn(loggedIn) {
    return {type: SET_LOGGED_IN, loggedIn}
}