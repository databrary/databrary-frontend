/**
 * Created by maksim on 5/15/17.
 */
import config from "../config";
import axios from "axios";

import {makeErrorSnack, reportError} from "./report";

function userExists(email) {
    return axios.get(
        `${config.domain}/api/user/exists?email=${email}`
    ).then(
        response => response.data.data.exists
    ).catch(function (error) {
        if (error.response) {
            reportError("failed to check userExists", error.response.data.data.errorUuid)
        }
        return false
        }
    );
}

function getProfile() {
    return axios.get(
        `${config.domain}/api/user/profile`,
        {withCredentials: true}
    ).then(
        response => ({status: 'ok', user: response.data.data})
    ).catch(
        function (error) {
            makeErrorSnack(error, "couldn't get profile. Please try again.");
            return {status: 'error'}
        }
    );
}

function editProfile(account) {
    return axios.patch(
        `${config.domain}/api/user/profile`,
        account,
        {withCredentials: true}
    ).then(
        response => ({status: 'ok'})
    ).catch(
        function (error) {
            makeErrorSnack(error, "couldn't update profile. Please Try again.");
            return {status: 'error'}
        }
    );
}

function logIn(email, password, rememberMe) {
    return axios.post(
        `${config.domain}/api/user/login`,
        {rememberMe: rememberMe},
        {
            auth: {
                username: email,
                password: password
            },
            withCredentials: true
        }
    ).then(
        response => ({status: 'ok'})
    ).catch(
        function (error) {
            return {status: 'error'}
        }
    );
}

function logOut() {
    return axios.post(
        `${config.domain}/api/user/logout`,
        null,
        {withCredentials: true}
    ).then(
        response => ({status: 'ok'})
    ).catch(
        function (error) {
            makeErrorSnack(error, "couldn't logout. Please clear your cookies.");
            return {status: 'error'}
        }
    );
}

function loggedIn() {
    return axios.get(
        `${config.domain}/api/loggedin`,
        {withCredentials: true}
    ).then(
        response => response.data.data.loggedIn
    ).catch(
        function (error) {
            if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                return false
            } else {
                makeErrorSnack(error, "couldn't check logged in status. Please clear your cookies.");
                return false
            }
        }
    );
}

function register(account) {
    return axios.post(
        `${config.domain}/api/user/register`,
        account
    ).then(
        response => ({status: 'ok'})
    ).catch(
        function (error) {
            makeErrorSnack(error, "couldn't register. Please Try again.");
            return {status: 'error'}
        }
    );
}


export {register, userExists, getProfile, editProfile, logIn, logOut, loggedIn}
