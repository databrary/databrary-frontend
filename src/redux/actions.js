/*
 * action types
 */

export const SET_LOGGED_IN = 'SET_LOGGED_IN';

export function setLoggedIn(loggedIn) {
    return {type: SET_LOGGED_IN, loggedIn}
}

export const ADD_SNACK_TOAST = 'ADD_SNACK_TOAST';

export function addSnackToast(toast) {
    return {type: ADD_SNACK_TOAST, toast}
}

export const REMOVE_SNACK_TOAST = 'REMOVE_SNACK_TOAST';

export function removeSnackToast() {
    return {type: REMOVE_SNACK_TOAST}
}