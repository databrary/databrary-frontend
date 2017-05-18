/**
 * Created by maksim on 5/17/17.
 */

import React from "react";
import Card from "react-md/lib/Cards/Card";
import CardTitle from "react-md/lib/Cards/CardTitle";
import CardActions from "react-md/lib/Cards/CardActions";
import CardText from "react-md/lib/Cards/CardText";
import Media, {MediaOverlay} from "react-md/lib/Media";
import Avatar from "react-md/lib/Avatars";
import Button from "react-md/lib/Buttons";
import ahmad from "../../public/ahmad.jpg";


const ExpandableMediaCard = () => (
    <Card style={{maxWidth: 600}} className="md-block-centered">
        <Media>
            <img src={ahmad} alt="presentation"/>
            <MediaOverlay>
                <CardTitle title="Such nature" subtitle="Wow!">
                    <Button className="md-cell--right" icon>star_outline</Button>
                </CardTitle>
            </MediaOverlay>
        </Media>
        <CardTitle
            avatar={<Avatar src="https://unsplash.it/40/40?random&time=1495035933387" alt="presentation"/>}
            title="Card Title"
            subtitle="Card Subtitle"
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

export default ExpandableMediaCard;
