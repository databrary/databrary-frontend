/**
 * Created by maksim on 5/26/17.
 */
import config from "../config";
import axios from "axios";

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

export {getProfile}