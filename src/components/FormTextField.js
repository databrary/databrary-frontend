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
        };
        this._onChange = this._onChange.bind(this);
    }

    _onChange(val) {
        this.props.onchange(val);
        this.props.input.onChange(val);
    }

    render() {
        return (
            <TextField
                label={this.props.label}
                className={this.props.className ? this.props.className : "md-cell md-cell--12 async-validating"}
                size={this.props.size}
                type={this.props.type}
                customSize={this.props.customSize}
                onChange={this.props.onchange ? this._onChange : this.props.input.onChange}
                errorText={this.props.meta.error}
                helpText={this.props.meta.warning}
                error={this.props.meta.dirty && Boolean(this.props.meta.error)}
                required={this.props.required ? true : null}
                onBlur={this.props.input.onBlur}
                inlineIndicator={this.props.meta.asyncValidating ?
                    <CircularProgress className="my-circle-progress"/> : null}
            />
        );
    }
}

export default FormTextField