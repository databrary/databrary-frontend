/**
 * Created by maksim on 5/15/17.
 */
import config from "../config";
import axios from "axios";
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
            return {...JSON.parse(response.data)}
        }
    ).catch(
        function (error) {
            let data = {...JSON.parse(error.reponse.data)};
            return {
                status: "error",
                code: error.response.status,
                errorUuid: data.data
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
            return {...JSON.parse(response.data)}
        }
    ).catch(
        function (error) {
            let data = {...JSON.parse(error.reponse.data)};
            return {
                status: "error",
                code: error.response.status,
                errorUuid: data.data
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
            return {...JSON.parse(response.data)}
        }
    ).catch(
        function (error) {
            if (error.response.status === 401 || error.response.status === 403) {
                return {
                    status: "ok",
                    loggedIn: false
                }
            } else {
                let data = {...JSON.parse(error.reponse.data)};
                return {
                    status: "error",
                    code: error.response.status,
                    errorUuid: data.data
                }
            }
        }
    );
}

export {logIn, logOut, loggedIn}