/**
 * Created by maksim on 5/26/17.
 */
import config from "../config";
import axios from "axios";

function getProfile() {
    return axios.get(
        `${config.domain}/profile`,
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

export {getProfile}