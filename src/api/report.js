/**
 * Created by maksim on 5/25/17.
 */
import config from "../config";
import axios from "axios";
import {store} from "../redux/store";
import {addSnackToast} from "../redux/actions";

function reportError(msg, uuid) {
    return axios.post(
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
                    reportError(`${text}`, error.response.data.data).catch(
                        (err) => {
                            let anotherSnack = {
                                text: `Sending report failed. Please email error@databrary.org and with these two codes: 
                                ${error.response.data.data}, ${err.response.data.data}`,
                                action: 'OK'
                            };
                            setTimeout(() => {
                                store.dispatch(addSnackToast(anotherSnack));
                            }, 500);
                        }
                    )
                },
                closeButton: true,
            }
            : 'Ok',
    };
    store.dispatch(addSnackToast(snack));
}

export {reportError, makeErrorSnack}