import React from "react";
import {Step, StepButton, Stepper} from "material-ui/Stepper";
import {Button} from "react-md/lib/Buttons";
import ExpandTransition from "material-ui/internal/ExpandTransition";
import TextField from "react-md/lib/TextFields";

/**
 * A contrived example using a transition between steps
 */
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
                return (
                    <p>
                        Select campaign settings. Campaign settings can include your budget, network, bidding
                        options and adjustments, location targeting, campaign end date, and other settings that
                        affect an entire campaign.
                    </p>
                );
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
        const contentStyle = {margin: '0 16px', overflow: 'hidden'};

        if (finished) {
            return (
                <div style={contentStyle}>
                    <p>
                        <a
                            href="#"
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
                <div style={{marginTop: 24, marginBottom: 12}}>
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
                            Select campaign settings
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
                <ExpandTransition loading={loading} open={true}>
                    {this.renderContent()}
                </ExpandTransition>
            </div>
        );
    }
}


export default HorizontalTransition;