/**
 * Created by maksim on 5/15/17.
 */
// import Cookies from "universal-cookie";
import config from "../config";
import axios from "axios";
// const cookies = new Cookies();
function logIn(email, password) {
    return axios.post(
        `${config.domain}/api/user/login`,
        {},
        {
            auth: {
                username: email,
                password: password
            },
            withCredentials: true
        }
    ).then(
        function (response) {
            // return true;
            return (response.data.status === 'ok')
        }
    ).catch(
        function (error) {
            console.log(error);
        }
    );
    // return true;
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
            // return true;
            return (response.data.status === 'ok')
        }
    ).catch(
        function (error) {
            console.log(error);
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
            return (response.data.status === 'ok' && response.data.payload["logged_in"] === true)
        }
    ).catch(
        function (error) {
            console.log(error);
            return false;
        }
    );
    // return true;
}

export {logIn, logOut, loggedIn}