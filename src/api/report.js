/**
 * Created by maksim on 5/25/17.
 */
import config from "../config";
import axios from "axios";
import {store} from "../redux/store";
import {addSnackToast} from "../redux/actions";

function reportError(msg, uuid) {
    axios.post(
        `${config.domain}/api/report-error`,
        {
            msg,
            errorUuid: uuid
        },
        {
            withCredentials: true
        }
    )
}

function makeErrorSnack(error, text) {
    let status = error.response ? error.response.status : "disconnected";
    let snack = {
        text: `Error ${status}: ${text}`,//Couldn't check logged in status. Please clear your cookies.`,
        action: error.response ?
            {
                label: 'Report',
                onClick: () => {
                    reportError("failed to verify log in status", error.response && error.response.data.data.errorUuid)
                },
            }
            : 'Ok',
    };
    store.dispatch(addSnackToast(snack));
}

export {reportError, makeErrorSnack}