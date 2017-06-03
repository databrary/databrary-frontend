/**
 * Created by maksim on 5/15/17.
 */
import config from "../config";
import axios from "axios";
import {makeErrorSnack} from "./report";

function resetPasswordEmail(email) {
    return axios.post(
        `${config.domain}/api/user/reset-password/email`,
        {"email": email}
    ).then(
        () => ({status: 'ok'})
    ).catch(
        function (error) {
            makeErrorSnack(error, "couldn't submit reset-password email");
            return {status: 'error'}
        }
    );
}

function resetPasswordToken(token, password) {
    return axios.post(
        `${config.domain}/api/user/reset-password/token`,
        {"token": token, "password": password}
    ).then(
        () => ({status: 'ok'})
    ).catch(
        function (error) {
            if (error.response && error.response.status === 403) {
                return {status: "expired"}
            } else {
                makeErrorSnack(error, "couldn't submit reset-password token");
                return {status: 'error'}
            }
        }
    )
}

export {resetPasswordEmail, resetPasswordToken}