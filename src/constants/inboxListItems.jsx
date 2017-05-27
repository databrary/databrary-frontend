/**
 * Created by maksim on 5/12/17.
 */
import React from "react";
import FontIcon from "react-md/lib/FontIcons";

// export default [{
//     key: 'inbox',
//     primaryText: 'Inbox',
//     leftIcon: <FontIcon>inbox</FontIcon>,
//     active: true,
// }, {
//     key: 'starred',
//     primaryText: 'Starred',
//     leftIcon: <FontIcon>star</FontIcon>,
// }, {
//     key: 'send-mail',
//     primaryText: 'Send mail',
//     leftIcon: <FontIcon>send</FontIcon>,
// }, {
//     key: 'drafts',
//     primaryText: 'Drafts',
//     leftIcon: <FontIcon>drafts</FontIcon>,
// }, { key: 'divider', divider: true }, {
//     key: 'all-mail',
//     primaryText: 'All mail',
//     leftIcon: <FontIcon>mail</FontIcon>,
// }, {
//     key: 'trash',
//     primaryText: 'Trash',
//     leftIcon: <FontIcon>delete</FontIcon>,
// }, {
//     key: 'spam',
//     primaryText: 'Spam',
//     leftIcon: <FontIcon>info</FontIcon>,
// }];
export default [{
    // exact: true,
    label: 'Home',
    primaryText: 'Home',
    to: '/',
    icon: <FontIcon>home</FontIcon>,
}, {
    label: 'Profile',
    primaryText: 'Profile',
    to: '/getProfile',
    icon: <FontIcon>bookmark</FontIcon>,
}]
// }, {
//     label: 'Page 2',
//     to: '/page-2',
//     icon: 'donut_large',
// }, {
//     label: 'Page 3',
//     to: '/page-3',
//     icon: 'flight_land',
// }];