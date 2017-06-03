/**
 * Created by maksim on 5/17/17.
 */

import React, {Component} from "react";
import Card from "react-md/lib/Cards/Card";
import CardTitle from "react-md/lib/Cards/CardTitle";
import CardActions from "react-md/lib/Cards/CardActions";
import CardText from "react-md/lib/Cards/CardText";
import Media, {MediaOverlay} from "react-md/lib/Media";
import Avatar from "react-md/lib/Avatars";
import Button from "react-md/lib/Buttons";
import {connect} from "react-redux";
import {getProfile} from "../api/user";
import {addSnackToast} from "../redux/actions";
import {withRouter} from "react-router";

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            party_name: "",
            party_prename: "",
        }
    }

    componentDidMount() {
        if (this.props.loggedIn) {
            getProfile().then(
                function (response) {
                    if (response.status === "ok") {
                        this.setState({...response.user});
                    } else if (response.status === "error") {
                        this.props.history.goBack();
                    } else {
                        throw new Error(`Unexpected response profile in ${this.__proto__.constructor.name}`)
                    }
                }.bind(this)
            )
        }
    }

    render() {

        return (
            <Card style={{maxWidth: 600}} className="md-block-centered">
                <Media>
                    <img src={`https://nyu.databrary.org/party/${this.state.party_id}/avatar?size=500`}
                         alt="presentation"/>
                    <MediaOverlay>
                        <CardTitle title={this.state.party_prename + " " + this.state.party_name} subtitle="Wow!">
                            <Button className="md-cell--right" icon>star_outline</Button>
                        </CardTitle>
                    </MediaOverlay>
                </Media>
                <CardTitle
                    avatar={<Avatar src="https://unsplash.it/40/40?random&time=1495035933387" alt="presentation"/>}
                    title={this.state.party_affiliation}
                    subtitle={this.state.party_id}
                />
                <CardActions expander>
                    <Button flat label="Action 1"/>
                    <Button flat label="Action 2"/>
                </CardActions>
                <CardText expandable>
                    adfadfkjhdslkfjg
                </CardText>
            </Card>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        loggedIn: state.appReducer.flags.loggedIn,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        addToast: (toast) => dispatch(addSnackToast(toast))
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Profile));
