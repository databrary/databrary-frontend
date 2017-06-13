import React from "react";
import {Step, StepButton, Stepper} from "material-ui/Stepper";
import {Button} from "react-md/lib/Buttons";
import ExpandTransition from "material-ui/internal/ExpandTransition";
import FormTextField from "./FormTextField";
import {addSnackToast} from "../redux/actions";
import {connect} from "react-redux";
import {Field, isValid, isDirty, reduxForm, getFormValues} from "redux-form";
import {userExists, register} from "../api/user";
import AffiliationsAutoComplete from "./AutoComplete";
import Checkbox from "react-md/lib/SelectionControls/Checkbox";
import config from "../config";
import Card from 'react-md/lib/Cards/Card';
import CardText from 'react-md/lib/Cards/CardText';
import CardActions from 'react-md/lib/Cards/CardActions';
import Paper from 'react-md/lib/Papers';
import {withRouter} from "react-router";
import '../scss/dropZone.css'

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const userExist = (values) => {
    return userExists(values.email).then((exists) => {
        if (exists) {
            throw {email: 'That email already exists'}
        }
    })
};

class AccountForm extends React.Component {
    render() {
        return (
            <Paper key={1} zDepth={1} className="md-background--card">
                <div className="md-grid">
                    <Field name="firstName" initValue={this.props.inits ? this.props.inits.firstName : null}
                           component={FormTextField} label="First name" customSize="title" size={10}
                           className="md-cell md-cell--6" required/>
                    <Field name="lastName" initValue={this.props.inits ? this.props.inits.lastName : null}
                           component={FormTextField} label="Last name" customSize="title" size={10}
                           className="md-cell md-cell--6" required/>
                </div>
                <div className="md-grid">
                    <Field name="email" initValue={this.props.inits ? this.props.inits.email : null}
                           component={FormTextField} label="Email" customSize="title" size={10}
                           className="md-cell md-cell--6" required/>
                    <Field name="affiliation" initValue={this.props.inits ? this.props.inits.affiliation : null}
                           component={AffiliationsAutoComplete} label="Affiliation"
                           customSize="title" size={10} className="md-cell md-cell--6" required/>
                </div>
                <div className="md-grid">
                    <Field name="orcid" initValue={this.props.inits ? this.props.inits.orcid : null}
                           component={FormTextField} label="ORCID" customSize="title" size={10}
                           className="md-cell md-cell--6" normalize={(val) => val.replace(/\D/g, '')}/>
                    <Field name="homepage" initValue={this.props.inits ? this.props.inits.homepage : null}
                           component={FormTextField} label="Homepage"
                           customSize="title" size={10} className="md-cell md-cell--6"/>
                </div>
            </Paper>
        )
    }
}

class AgreementForm extends React.Component {

    state = {
        expanded: false,
        checked: false,
    };

    render() {
        const checkBox = () => <Checkbox
            id="agreeAgreement"
            name="simpleCheckboxes"
            label="I have read and understand the Databrary Access Agreement"
            checked={this.state.checked}
            onChange={function (val) {
                this.props.change('agreement', val);
                this.setState({checked: val});
            }.bind(this)}
        />;

        return (
            <div>
                <Card raise={false} expanded={this.state.expanded}
                      onExpanderClick={() => {
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
                        }}
                                flat label="Read the Databrary Access Agreement"/>
                    </CardActions>
                    <CardText expandable>
                        <embed src={`${config.static}/pdfs/agreement.pdf`} width="100%" height="2100px"/>
                    </CardText>
                </Card>
                <Field name="agreement" validate={[(val) => (val === true ? undefined : 'Required')]}
                       component={checkBox}/>
            </div>
        )
    }
}

const confirmationForm = () => (
    <Paper key={1} zDepth={1} className="md-background--card">
        <div style={{padding: 15}}>
            <header><h2>Confirmation Email</h2></header>
            <div>
                <p>
                    We've sent you an email confirmation form. Please confirm your email address
                </p>
            </div>
        </div>
    </Paper>
);

function orcidCheckSum(baseDigits) {
    if (baseDigits !== undefined) {
        let total = 0;
        let i;
        let checkDigit = baseDigits[baseDigits.length - 1] === 'X' || baseDigits[baseDigits.length - 1] === 'x' ?
            10 : parseInt(baseDigits[baseDigits.length - 1], 10);
        for (i = 0; i < baseDigits.length - 1; i++) {
            let digit = parseInt(baseDigits[i], 10);
            total = (total + digit) * 2;
        }
        let remainder = total % 11;
        let result = (12 - remainder) % 11;
        return result === checkDigit
    } else {
        return true
    }
}

const validateAccount = values => {
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

    if (!orcidCheckSum(values.orcid)) {
        errors.orcid = 'Malformed'
    }

    return errors
};

const ReduxAgreementForm = reduxForm({
    form: 'agreementForm',
})(AgreementForm);

const ReduxAccountForm = reduxForm({
    form: 'accountForm',
    validate: validateAccount,
    asyncValidate: userExist,
    asyncBlurFields: ['email']
})(AccountForm);

class RegistrationTransition extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stepIndex: 0,
            accountForm: null,
        };
    }

    _handleSubmitAll = () => {
        register(this.state.accountForm).then(
            response => {
                if (response.status === 'ok') {
                    this.setState({stepIndex: this.state.stepIndex + 1})
                } else {
                    this._handlePrev()
                }
            }
        );
    };

    _handleSubmitAccountForm = () => {
        this.setState({
            stepIndex: this.state.stepIndex + 1,
            accountForm: this.props.accountForm,
        });
    };

    _handlePrev = () => {
        const {stepIndex} = this.state;
        this.setState({
            stepIndex: stepIndex - 1,
        });
    };

    _getStepContent(stepIndex) {
        switch (stepIndex) {
            case 0:
                return <ReduxAccountForm inits={this.state.accountForm}/>;
            case 1:
                return <ReduxAgreementForm/>;
            case 2:
                return confirmationForm();
            default:
                return 'You\'re a long way from home sonny jim!';
        }
    }

    renderContent() {
        const {stepIndex} = this.state;
        const contentStyle = {margin: '0 16px'};
        const disabled = !([this.props.isValidAccountForm, this.props.isValidAgreementForm, true][stepIndex]);
        const buttonActions = [this._handleSubmitAccountForm, this._handleSubmitAll, () => this.props.history.push("/")];
        const buttonLabels = ['Next', 'Submit', 'Finish'];
        const buttonLabel = buttonLabels[stepIndex];
        const nextButtonAction = buttonActions[stepIndex];
        return (
            <div style={contentStyle}>
                <div>{this._getStepContent(stepIndex)}</div>
                <div style={{textAlign: "center", marginTop: 24, marginBottom: 12}}>
                    <Button raised label="Back" disabled={stepIndex === 0 || stepIndex === 2} onClick={this._handlePrev}
                            style={{marginRight: 12}}/>
                    <Button raised label={buttonLabel} disabled={disabled} primary onClick={nextButtonAction}/>
                </div>
            </div>
        );
    }

    render() {
        const {stepIndex} = this.state;

        return (
            <div style={{width: '80%', maxWidth: 'auto', margin: 'auto'}}>
                <Stepper linear={false} activeStep={stepIndex}>
                    <Step><StepButton>Create Account</StepButton></Step>
                    <Step><StepButton>Sign Agreement</StepButton></Step>
                    <Step><StepButton>Stay Tuned</StepButton></Step>
                </Stepper>
                <ExpandTransition open={true} style={{overflow: 'visible'}}>
                    {this.renderContent()}
                </ExpandTransition>
            </div>
        );
    }
}

const ConnectedRegistrationTransition = connect(
    state => ({
        isValidAccountForm: isValid('accountForm')(state) && isDirty('accountForm'),
        isValidAgreementForm: isValid('agreementForm')(state) && isDirty('agreementForm'),
        accountForm: getFormValues('accountForm')(state),
    }),
    (dispatch) => ({addToast: (toast) => dispatch(addSnackToast(toast))}),
)(RegistrationTransition);

export default withRouter(ConnectedRegistrationTransition);



