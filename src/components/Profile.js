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
import config from "../config";
import axios from "axios";

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
            axios.get(
                `${config.domain}/profile`,
                {
                    withCredentials: true
                }
            ).then(
                function (response) {
                    if (response.data.status === "ok") {
                        this.setState({...JSON.parse(response.data.payload)});
                    } else {
                        console.log(response.data.status); //TODO
                        console.log(response.data.payload); //TODO
                    }
                }.bind(this)
            ).catch(
                function (error) {
                    console.log(error) //TODO
                }
            );
        }
    }

    render() {

        return (
            <Card style={{maxWidth: 600}} className="md-block-centered">
                <Media>
                    <img src={`${config.static}/images/ahmad.jpg`} alt="presentation"/>
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

export default connect(mapStateToProps)(Profile);
