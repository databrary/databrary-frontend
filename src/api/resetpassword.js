/**
 * Created by maksim on 5/15/17.
 */
import config from "../config";
import axios from "axios";
function resetPasswordEmail(email) {
    return axios.post(
        `${config.domain}/api/user/reset-password/email`,
        {"email": email}
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

function resetPasswordToken(token, password) {
    return axios.post(
        `${config.domain}/api/user/reset-password/token`,
        {
            "token": token,
            "password": password,
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
    )
}


export {resetPasswordEmail, resetPasswordToken}