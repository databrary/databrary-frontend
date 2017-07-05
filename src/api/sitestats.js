/**
 * Created by maksim on 5/15/17.
 */
import config from "../config";
import axios from "axios";

import {makeErrorSnack, reportError} from "./report";

function getStats() {
    return axios.get(
        `${config.domain}/api/site-stats`,
    ).then(
        response => ({status: 'ok', user: response.data.data})
    ).catch(
    );
}

function numberWithCommas(x) {
    return parseInt(x).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export {getStats, numberWithCommas}
