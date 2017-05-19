/**
 * Created by maksim on 5/17/17.
 */
import React, {Component} from "react";
import config from "../config";

export default class Page1 extends Component {
    render() {
        return (
            <img src={`${config.static}/images/404.jpg`} className="fourOhfour" alt="404"/>
        );
    }
}
