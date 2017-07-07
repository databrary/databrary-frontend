import React, { PureComponent } from 'react';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import Tabs from 'react-md/lib/Tabs/Tabs';
import Tab from 'react-md/lib/Tabs/Tab';
import TabsContainer from 'react-md/lib/Tabs/TabsContainer';
import Slider from 'react-md/lib/Sliders';
import {EditProfile} from './EditProfile.js';

import CircularProgress from 'react-md/lib/Progress/CircularProgress';

import styles from '../scss/tabs.css';

export class EditTabs extends PureComponent {
  constructor(props) {
    super(props);

    this.state = { activeTabIndex: 0, tabTwoChildren: null };
    this._handleTabChange = this._handleTabChange.bind(this);
  }

  componentWillUnmount() {
    if (this._timeout) {
      clearTimeout(this._timeout);
    }
  }

  _handleTabChange(activeTabIndex) {
    if (activeTabIndex === 1 && !this.state.tabTwoChildren) {
      // Fake async loading
      this._timeout = setTimeout(() => {
        this._timeout = null;

        this.setState({
          tabTwoChildren: [
            <Slider id="slider" defaultValue={30} key="slider" className="md-cell md-cell--12" />,
            <Slider id="slider" defaultValue={30} key="slider" className="md-cell md-cell--12" />,
          ],
        });
      }, 3000);
    }

    this.setState({ activeTabIndex });
  }

  render() {
    const { activeTabIndex } = this.state;
    let { tabTwoChildren } = this.state;

    if (!tabTwoChildren && activeTabIndex === 1) {
      tabTwoChildren = <CircularProgress id="loading-tab-two" key="loading" />;
    }

    return (
      <TabsContainer slideStyle={{height: 1000}} onTabChange={this._handleTabChange} activeTabIndex={activeTabIndex} panelClassName="md-grid" colored>
        <Tabs tabId="tab">
          <Tab label="My Profile">
            <EditProfile />
          </Tab>
          <Tab label="My Affiliates">
            
          </Tab>
          <Tab label="My Volumes">
            
          </Tab>
        </Tabs>
      </TabsContainer>
    );
  }
}