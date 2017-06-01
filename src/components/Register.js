import React from "react";
import {Step, StepButton, Stepper} from "material-ui/Stepper";
import {Button} from "react-md/lib/Buttons";
import ExpandTransition from "material-ui/internal/ExpandTransition";
import TextField from "react-md/lib/TextFields";
import FormTextField from "./FormTextField";
import {addSnackToast} from "../redux/actions";
import {connect} from "react-redux";
import {Field, reduxForm} from "redux-form";
import {userExists} from "../api/user";
import SearchToolbarExample from "./AutoComplete";

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));


const userExist = (values) => {
    //TODO get ride of sleep
    return sleep(2000).then(() => userExists(values.email).then((data) => {
        if (data.exists) {
            throw {email: 'That email already exists'}
        }
    }))
};

class AccountForm extends React.Component {
    constructor(props) {
        super(props);
        this._handleSubmit = this._handleSubmit.bind(this);
    }

    _handleSubmit() {

    }

    render() {
        return (
            <div>
                <div className="md-grid">
                    <Field name="firstName" component={FormTextField}
                           label="First name"
                           customSize="title"
                           size={10}
                           className="md-cell md-cell--6"
                           required
                    />
                    <Field name="lastName" component={FormTextField}
                           label="Last name"
                           customSize="title"
                           size={10}
                           className="md-cell md-cell--6"
                           required
                    />
                </div>
                <div className="md-grid">
                    <Field name="email" component={FormTextField}
                           label="Email"
                           customSize="title"
                           size={10}
                           className="md-cell md-cell--6"
                           required
                    />
                    <Field name="affiliation" component={SearchToolbarExample}
                           label="Affiliation"
                           customSize="title"
                           size={10}
                           className="md-cell md-cell--6"
                           required
                    />
                </div>
            </div>
        )
    }
}


const validate = values => {
    const errors = {};
    if (!values.password) {
        errors.password = 'Required'
    } else if (values.password !== values.confirmPassword) {
        errors.password = "Passwords don't match"
    }

    if (!values.confirmPassword) {
        errors.confirmPassword = 'Required'
    } else if (values.password !== values.confirmPassword) {
        errors.confirmPassword = "Passwords don't match"
    }

    return errors
};

const mapDispatchToProps = (dispatch) => {
    return {
        addToast: (toast) => dispatch(addSnackToast(toast))
    }
};

const ConnectedAccountForm = connect(null, mapDispatchToProps)(reduxForm({
    form: 'accountForm', // a unique identifier for this form
    validate, // <--- validation function given to redux-form
    asyncValidate: userExist, // async validation
    asyncBlurFields: ['email']
})(AccountForm));

class HorizontalTransition extends React.Component {

    state = {
        loading: false,
        finished: false,
        stepIndex: 0,
    };

    dummyAsync = (cb) => {
        this.setState({loading: true}, () => {
            this.asyncTimer = setTimeout(cb, 500);
        });
    };

    handleNext = () => {
        const {stepIndex} = this.state;
        if (!this.state.loading) {
            this.dummyAsync(() => this.setState({
                loading: false,
                stepIndex: stepIndex + 1,
                finished: stepIndex >= 4,
            }));
        }
    };

    handlePrev = () => {
        const {stepIndex} = this.state;
        if (!this.state.loading) {
            this.dummyAsync(() => this.setState({
                loading: false,
                stepIndex: stepIndex - 1,
            }));
        }
    };

    getStepContent(stepIndex) {
        switch (stepIndex) {
            case 0:
                return <ConnectedAccountForm/>;
            case 1:
                return (
                    <div>
                        <TextField style={{marginTop: 0}} label="Ad group name"/>
                        <p>
                            Ad group status is different than the statuses for campaigns, ads, and keywords, though the
                            statuses can affect each other. Ad groups are contained within a campaign, and each campaign
                            can
                            have one or more ad groups. Within each ad group are ads, keywords, and bids.
                        </p>
                        <p>Something something whatever cool</p>
                    </div>
                );
            case 2:
                return (
                    <p>
                        Try out different ad text to see what brings in the most customers, and learn how to
                        enhance your ads using features like ad extensions. If you run into any problems with your
                        ads, find out how to tell if they're running and how to resolve approval issues.
                    </p>
                );
            case 3:
                return (
                    <p>
                        adfhsfdkhgsfkljghskfjlghskljfhgskljfhg
                    </p>
                );
            case 4:
                return (
                    <p>
                        adfhsfdkhgsfkljghskfjlghskljfhgskljfhg
                    </p>
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
                    <Button
                        raised
                        label="Back"
                        disabled={stepIndex === 0}
                        onClick={this.handlePrev}
                        style={{marginRight: 12}}
                    />
                    <Button
                        raised
                        label={stepIndex === 4 ? 'Finish' : 'Next'}
                        primary
                        onClick={this.handleNext}
                    />
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
                            Create an ad group
                        </StepButton>
                    </Step>
                    <Step>
                        <StepButton onClick={() => this.setState({stepIndex: 2})}>
                            Create an ad
                        </StepButton>
                    </Step>
                    <Step>
                        <StepButton onClick={() => this.setState({stepIndex: 3})}>
                            Create an adadfadfa
                        </StepButton>
                    </Step>
                    <Step>
                        <StepButton onClick={() => this.setState({stepIndex: 4})}>
                            Create an adadfadf43535435
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


export default HorizontalTransition;