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
            // return true;
            return (response.data.status === 'ok')
        }
    ).catch(
        function (error) {
            console.log(error); //TODO
        }
    );
    // return true;
}

function resetPasswordToken(token, password) {
    return axios.post(
        `${config.domain}/api/user/reset-password/token`,
        {
            "token": token,
            "password": password,
        }
    )
}


export {resetPasswordEmail, resetPasswordToken}