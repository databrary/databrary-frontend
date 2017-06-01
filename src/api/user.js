/**
 * Created by maksim on 5/15/17.
 */
import config from "../config";
import axios from "axios";

function userExists(email) {
    return axios.get(
        `${config.domain}/api/user/exists?email=${email}`
    ).then(
        function (response) {
            return response.data.data
        }
    ).catch(
        function (error) {
            return {
                status: "error",
                code: error.response.status,
                errorUuid: error.response.data.data
            }
        }
    );
}

function getProfile() {
    return axios.get(
        `${config.domain}/profile`,
        {
            withCredentials: true
        }
    ).then(
        function (response) {
            return response.data
        }
    ).catch(
        function (error) {
            return {
                status: "error",
                code: error.response.status,
                errorUuid: error.response.data.data
            }
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
        function (response) {
            return response.data
        }
    ).catch(
        function (error) {
            return {
                status: "error",
                code: error.response.status,
                errorUuid: error.response.data.data
            }
        }
    );
}

function logOut() {
    return axios.post(
        `${config.domain}/api/user/logout`,
        {},
        {
            withCredentials: true
        }
    ).then(
        function (response) {
            return response.data
        }
    ).catch(
        function (error) {
            return {
                status: "error",
                code: error.response.status,
                errorUuid: error.response.data.data
            }
        }
    );
}

function loggedIn() {
    return axios.get(
        `${config.domain}/api/loggedin`,
        {
            withCredentials: true
        }
    ).then(
        function (response) {
            return {
                status: "ok",
                loggedIn: response.data.data.logged_in
            }
        }
    ).catch(
        function (error) {
            if (error.response.status === 401 || error.response.status === 403) {
                return {
                    status: "ok",
                    loggedIn: false
                }
            } else {
                return {
                    status: "error",
                    code: error.response.status,
                    errorUuid: error.response.data.data
                }
            }
        }
    );
}

export {userExists, getProfile, logIn, logOut, loggedIn}