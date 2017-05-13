import React, {PureComponent} from "react";
import Drawer from "react-md/lib/Drawers";
import Button from "react-md/lib/Buttons/Button";
import Toolbar from "react-md/lib/Toolbars";

import inboxListItems from "./constants/inboxListItems";
import MenuButton from "react-md/lib/Menus/MenuButton";
import ListItem from "react-md/lib/Lists/ListItem";

import LoginDialog from "./Dialog";

const ToolbarMenu = (props) => (
    <MenuButton id="woop" buttonChildren="more_vert" icon {...props}>
        <ListItem primaryText="Settings" />
        <ListItem primaryText="Help" />
        <ListItem primaryText="Feedback" />
    </MenuButton>
);

export default class SimpleExample extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            visible: false,
            position: 'left',
        };

        this._toggleLeft = this._toggleLeft.bind(this);
        this._toggleRight = this._toggleRight.bind(this);
        this._closeDrawer = this._closeDrawer.bind(this);
        this._handleToggle = this._handleToggle.bind(this);
    }

    _handleToggle(visible) {
        this.setState({ visible });
    }

    _closeDrawer() {
        this.setState({ visible: false });
    }

    _toggleLeft() {
        this.setState({ visible: !this.state.visible, position: 'left' });
    }

    _toggleRight() {
        this.setState({ visible: !this.state.visible, position: 'right' });
    }


// <LoginDialog />,
// <ToolbarMenu key="menu" id="woop-menu" />
// <Button key="account_circle" icon>account_circle</Button>,
    render() {
        const left = this.state.position === 'left';
        const close = <Button icon onClick={this._closeDrawer}>{left ? 'arrow_back' : 'close'}</Button>;
        const actions = [
            <Button key="search" icon>search</Button>,
            <Button key="favorite" icon>favorite</Button>,
            <LoginDialog />,
        ];
        // All don't fit for mobile
        const nav = <Button key="nav" icon onClick={this._toggleLeft}>menu</Button>;

        const header = (
            <Toolbar
                title="Databrary"
                nav={left ? null : close}
                actions={left ? close : null}
                className="md-divider-border md-divider-border--bottom"
            />
        );
        return (
            <div>
                <div className="toolbar-group">
                    <Toolbar
                        themed
                        title="Databrary"
                        nav={nav}
                        actions={actions}
                    />
                </div>
                <div className="md-grid">
                    <Drawer
                        {...this.state}
                        navItems={inboxListItems}
                        onVisibilityToggle={this._handleToggle}
                        type={Drawer.DrawerTypes.TEMPORARY}
                        header={header}
                        style={{zIndex: 100}}
                    />
                </div>
            </div>
        );
    }
}
