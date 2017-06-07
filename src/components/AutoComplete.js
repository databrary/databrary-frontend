/**
 * Created by maksim on 6/1/17.
 */


import React, {PureComponent} from "react";
import Autocomplete from "react-md/lib/Autocompletes";
import config from '../config'

function waitForSocketConnection(socket, callback) {
    setTimeout(
        function () {
            if (socket.readyState === 1) {
                // console.log("Connection is made");
                if (callback !== null) {
                    callback();
                }


            } else {
                // console.log("wait for connection...");
                waitForSocketConnection(socket, callback);
            }

        }, 5); // wait 5 milisecond for the connection...
}

export default class AffiliationsAutoComplete extends PureComponent {
    constructor(props) {
        super(props);
        this.webSocket = null;
        this.state = {
            value: '',
            suggestions: [],
        };

        this._handleSearchChange = this._handleSearchChange.bind(this);
        this._handleAutoComplete = this._handleAutoComplete.bind(this);
        this._updateSuggestions = this._updateSuggestions.bind(this);
        this.componentWillUnmount = this.componentWillUnmount.bind(this);
    }

    componentWillUnmount() {
        if (this.webSocket) {
            this.webSocket.close()
        }
    }

    _updateSuggestions(response) {
        let data = JSON.parse(response.data);
        let unis = data.map(val => val.Target);
        this.setState({suggestions: unis})
    }

    _handleSearchChange(value) {
        if (!this.webSocket) {
            this.webSocket = new WebSocket(config.wss + '/api/autocomplete-affil');
            this.webSocket.onmessage = this._updateSuggestions
        }
        waitForSocketConnection(this.webSocket, () => this.webSocket.send(value));
        this.props.input.onChange(value);
        this.setState({value});
    }

    _handleAutoComplete(value) {
        this.props.input.onChange(value);
        this.setState({value})
    }

    render() {

        return <Autocomplete
            id="searchExample"
            label="Affiliation"
            required
            customSize="title"
            size={10}
            paddedBlock={false}
            data={this.state.suggestions}
            value={this.state.value}
            onAutocomplete={this._handleAutoComplete}
            onChange={this._handleSearchChange}
            className="md-cell md-cell--6"
            inputClassName="md-text-field--toolbar"
        />
    }
}