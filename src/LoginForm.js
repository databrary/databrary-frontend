/**
 * Created by maksim on 5/12/17.
 */
import React, {Component} from "react";
import TextField from "react-md/lib/TextFields";
import Button from "react-md/lib/Buttons/Button";
import axios from "axios";

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(value, event) {
        let id = event.target.id;
        console.log(event.target);
        this.setState(function () {
            let state = {};
            state[id] = value;
            return state
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        axios.post(
            'http://localhost:3444/api/user/login',
            {},
            {
                auth: {
                    username: this.state.email,
                    password: this.state.password
                },
                withCredentials: true
            }
        )
            .then(function (response) {
                console.log(response.data);
                console.log(response.headers);
            }).catch(
            function (error) {
                console.log(error)
            }
        );
    };

    render() {
        return (
            <form className="md-grid">
                <TextField
                    id="email"
                    label="Email"
                    // defaultValue="Vintage 50's Dress"
                    // customSize="title"
                    className="md-cell md-cell--12"
                    onChange={this.handleChange}
                    required
                />
                <TextField
                    id="password"
                    label="Password"
                    // defaultValue="Vintage 50's Dress"
                    // customSize="title"
                    className="md-cell md-cell--12"
                    type="password"
                    onChange={this.handleChange}
                    required
                />
                <div className="md-cell md-cell--12">
                    <Button type="submit" raised label="Login" onClick={this.handleSubmit}/>
                </div>
            </form>
        );
    }
}

// Decorate the form component
// LoginForm = reduxForm({
//     form: 'login' // a unique name for this form
// })(LoginForm);
//
export default LoginForm;
