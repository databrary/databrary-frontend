import React from "react";
import {Step, StepButton, Stepper} from "material-ui/Stepper";
import {Button} from "react-md/lib/Buttons";
import ExpandTransition from "material-ui/internal/ExpandTransition";
import FormTextField from "./FormTextField";
import {addSnackToast} from "../redux/actions";
import {connect} from "react-redux";
import {Field, isValid, reduxForm} from "redux-form";
import {userExists} from "../api/user";
import AffiliationsAutoComplete from "./AutoComplete";
import Checkbox from "react-md/lib/SelectionControls/Checkbox";
import config from "../config";
import Card from 'react-md/lib/Cards/Card';
import CardText from 'react-md/lib/Cards/CardText';
import CardActions from 'react-md/lib/Cards/CardActions';
import Paper from 'react-md/lib/Papers';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const userExist = (values) => {
    return userExists(values.email).then((exists) => {
        if (exists) {
            throw {email: 'That email already exists'}
        }
    })
};

class AccountForm extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Paper
                key={1}
                zDepth={1}
                // raiseOnHover={i === 0}
                className="md-background--card"
            >
                <div className="md-grid">
                    <Field name="firstName" component={FormTextField} label="First name" customSize="title" size={10}
                           className="md-cell md-cell--6" required/>
                    <Field name="lastName" component={FormTextField} label="Last name" customSize="title" size={10}
                           className="md-cell md-cell--6" required/>
                </div>
                <div className="md-grid">
                    <Field name="email" component={FormTextField} label="Email" customSize="title" size={10}
                           className="md-cell md-cell--6" required/>
                    <Field name="affiliation" component={AffiliationsAutoComplete} label="Affiliation"
                           customSize="title"
                           size={10} className="md-cell md-cell--6" required/>
                </div>
            </Paper>
        )
    }
}

class AgreementForm extends React.Component {

    state = {
        expanded: false
    };

    render() {
        const checkBox = (props) => <Checkbox
            id="agreeAgreement"
            name="simpleCheckboxes"
            label="I have read and understand the Databrary Access Agreement"
            value={props.input.checked}
        />;

        return (
            <div>
                <Card raise={false} expanded={this.state.expanded} onExpanderClick={() => {
                    this.setState({expanded: !this.state.expanded})
                }}>
                    <div style={{padding: 15}}>
                        <p>As a member of the Databrary community, you promise to:</p>
                        <ol>
                            <li>Treat Databrary data with the same high standard of care that you treat data collected
                                in your own laboratory.
                            </li>
                            <li>Respect participants' wishes about sharing their data just as you do in your lab.</li>
                            <li>Take care in authorizing other people (affiliates and collaborators) and take
                                responsibility for their conduct and use of Databrary data, just as you do in your own
                                lab.
                            </li>
                        </ol>
                    </div>
                    <CardActions expander>
                        <Button onClick={() => {
                            this.setState({expanded: !this.state.expanded})
                        }} flat label="Read the Databrary Access Agreement"/>
                    </CardActions>
                    <CardText expandable>
                        <embed src={`${config.static}/pdfs/agreement.pdf`} width="100%" height="2100px"/>
                    </CardText>

                </Card>
                <Field name="agreement" component={checkBox}/>
            </div>
        )
    }
}

const ReduxAgreementForm = reduxForm({
    form: 'agreementForm', // a unique identifier for this form
    validate, // <--- validation function given to redux-form
})(AgreementForm);


const validate = values => {
    const errors = {};
    if (!values.firstName) {
        errors.firstName = 'Required'
    }

    if (!values.lastName) {
        errors.lastName = 'Required'
    }

    if (!values.email) {
        errors.email = 'Required'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address'
    }

    if (!values.affiliation) {
        errors.affiliation = 'Required'
    }

    if (!values.agreement) {
        errors.agreement = 'Required'
    }

    return errors
};


const ReduxAccountForm = reduxForm({
    form: 'accountForm', // a unique identifier for this form
    validate, // <--- validation function given to redux-form
    asyncValidate: userExist, // async validation
    asyncBlurFields: ['email']
})(AccountForm);

class RegistrationTransition extends React.Component {


    constructor(props) {
        super(props);
        // this._handleSubmit = this._handleSubmit.bind(this);
        this.state = {
            loading: false,
            finished: false,
            stepIndex: 0,
            stepValid: false,
        };

    }

    _isValid = (stepIndex) => {
        switch (stepIndex) {
            case 0:
                return this.props.isValidAccountForm
        }
    };

    handleNext = () => {
        const {stepIndex} = this.state;
        if (!this.state.loading) {
            this.setState({
                loading: false,
                stepIndex: stepIndex + 1,
                finished: stepIndex >= 2,
            })
        }
    };

    handlePrev = () => {
        const {stepIndex} = this.state;
        if (!this.state.loading) {
            this.setState({
                loading: false,
                stepIndex: stepIndex - 1,
            })
        }
    };

    getStepContent(stepIndex) {
        switch (stepIndex) {
            case 0:
                return <ReduxAccountForm/>;
            case 1:
                return <ReduxAgreementForm/>;
            case 2:
                return (
                    <Paper
                        key={1}
                        zDepth={1}
                        // raiseOnHover={i === 0}
                        className="md-background--card"
                    >
                        <div style={{padding: 15}}>
                            <header><h2>Stay Tuned</h2>
                            </header>
                            <div ><p>Your request for authorization is now pending. We will send you an email
                                notification after your request for authorization is approved. In the meantime, you can
                                learn more about how to share data by reading our <a
                                    href="http://databrary.org/access.html"
                                    target="_blank">Databrary User
                                    Guide</a>.</p><p>You can also:<br></br><a href="/profile">View and complete your
                                profile</a><br></br><a href="/volume">Browse public volumes</a></p></div>
                        </div>
                    </Paper>
                );
            default:
                return 'You\'re a long way from home sonny jim!';
        }
    }

    renderContent() {
        const {finished, stepIndex} = this.state;
        const contentStyle = {margin: '0 16px'};

        if (finished) {
            return (
                <div style={contentStyle}>
                    <p>
                        <a
                            onClick={(event) => {
                                event.preventDefault();
                                this.setState({stepIndex: 0, finished: false});
                            }}
                        >
                            Click here
                        </a> to reset the example.
                    </p>
                </div>
            );
        }

        return (
            <div style={contentStyle}>
                <div>{this.getStepContent(stepIndex)}</div>
                <div style={{textAlign: "center", marginTop: 24, marginBottom: 12}}>
                    <Button raised label="Back" disabled={stepIndex === 0} onClick={this.handlePrev}
                            style={{marginRight: 12}}/>
                    <Button raised label={stepIndex === 2 ? 'Finish' : 'Next'} disabled={this._isValid(stepIndex)}
                            primary
                            onClick={this.handleNext}/>
                </div>
            </div>
        );
    }

    render() {
        const {loading, stepIndex} = this.state;

        return (
            <div style={{width: '80%', maxWidth: 'auto', margin: 'auto'}}>
                <Stepper linear={false} activeStep={stepIndex}>
                    <Step>
                        <StepButton onClick={() => this.setState({stepIndex: 0})}>
                            Create Account
                        </StepButton>
                    </Step>
                    <Step>
                        <StepButton onClick={() => this.setState({stepIndex: 1})}>
                            Sign Agreement
                        </StepButton>
                    </Step>
                    <Step>
                        <StepButton onClick={() => this.setState({stepIndex: 2})}>
                            Stay Tuned
                        </StepButton>
                    </Step>
                </Stepper>
                <ExpandTransition loading={loading} open={true} style={{overflow: 'visible'}}>
                    {this.renderContent()}
                </ExpandTransition>
            </div>
        );
    }
}

const ConnectedRegistrationTransition = connect(
    state => ({isValidAccountForm: isValid('accountForm')(state)}),
    (dispatch) => ({addToast: (toast) => dispatch(addSnackToast(toast))}),
)(RegistrationTransition);

export default ConnectedRegistrationTransition;



