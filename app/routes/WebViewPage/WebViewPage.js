/**
 * Copyright (c) 2018-present, Oleum. All rights reserved.
 *
 */

'use strict';

import React, {Component} from 'react';
import {WebView} from 'react-native-webview';

import PropTypes from 'prop-types';

class WebViewPage extends Component {
  _onNavigationStateChange(data) {
    if (this.props.onNavigationStateChange) {
      this.props.onNavigationStateChange(data);
    }
  }

  actionComplete() {
    if (this.props.actionComplete) {
      this.props.actionComplete();
    }
  }

  render() {
    return (
      <WebView
        onLoad={this.actionComplete()}
        source={{
          uri: this.props.url,
        }}
        onNavigationStateChange={this._onNavigationStateChange.bind(this)}
      />
    );
  }
}

WebViewPage.propTypes = {
  url: PropTypes.string.isRequired,
  actionComplete: PropTypes.func,
  onNavigationStateChange: PropTypes.func,
};
export default WebViewPage;
