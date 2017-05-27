/**
 * Created by maksim on 5/25/17.
 */
import config from "../config";
import axios from "axios";

function reportError(msg, uuid) {
    axios.post(
        `${config.domain}/api/report-error`,
        {
            msg,
            uuid
        },
        {
            withCredentials: true
        }
    )
}

export {reportError}