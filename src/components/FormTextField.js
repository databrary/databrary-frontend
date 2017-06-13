/**
 * Created by maksim on 6/1/17.
 */
import React from "react";
import TextField from "react-md/lib/TextFields";
import CircularProgress from "react-md/lib/Progress/CircularProgress";
import "../scss/formfield.css";
// text field for using with redux-form
class FormTextField extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: props.meta.dirty && Boolean(this.props.meta.error),
            value: ""
        };
        this._onChange = this._onChange.bind(this);
    }

    _onChange(val) {
        if (this.props.onchange) { // this is used by passwordform to check the complexity of a password
            this.props.onchange(val);
        }
        this.props.input.onChange(val);
        this.setState({value: val});
    }

    componentWillMount() {
        let initValue = this.props.initValue; // this is used by register to store entered values on navigating backwards
        if (initValue !== undefined && initValue !== null) {
            this.setState({value: initValue});
            if (this.props.onchange) {
                this.props.onchange(initValue);
            }
            this.props.input.onChange(initValue);
        }
    }

    render() {
        return (
            <TextField
                label={this.props.label}
                className={this.props.className ? this.props.className : "md-cell md-cell--12 async-validating"}
                size={this.props.size}
                type={this.props.type}
                customSize={this.props.customSize}
                onChange={this._onChange}
                errorText={this.props.meta.error}
                helpText={this.props.meta.warning}
                error={this.props.meta.dirty && Boolean(this.props.meta.error)}
                required={this.props.required ? true : null}
                value={this.state.value}
                onBlur={this.props.input.onBlur}
                inlineIndicator={this.props.meta.asyncValidating ?
                    <CircularProgress className="my-circle-progress"/> : null}
            />
        );
    }
}

export default FormTextField