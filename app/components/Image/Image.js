/**
 * Copyright (c) 2019-present, Evolvier Technologies. All rights reserved.
 *
 */

'use strict';

import React, {Component} from 'react';
import FastImage from 'react-native-fast-image';

class Image extends Component {
  get resizeMode() {
    switch (this.props.resizeMode) {
      case 'contain':
        return FastImage.resizeMode.contain;
      case 'stretch':
        return FastImage.resizeMode.stretch;
      case 'center':
        return FastImage.resizeMode.center;
      default:
        return FastImage.resizeMode.cover;
    }
  }

  get priority() {
    switch (this.props.priority) {
      case 'low':
        return FastImage.priority.low;
      case 'high':
        return FastImage.priority.high;
      default:
        return FastImage.priority.normal;
    }
  }

  onLoadStart(data) {
    if (this.props.onLoadStart) {
      this.props.onLoadStart(data);
    }
  }

  onProgress(data) {
    if (this.props.onProgress) {
      this.props.onProgress(data);
    }
  }

  onLoad(data) {
    if (this.props.onLoad) {
      this.props.onLoad(data);
    }
  }

  onError(data) {
    if (this.props.onError) {
      this.props.onError(data);
    }
  }

  onLoadEnd(data) {
    if (this.props.onLoadEnd) {
      this.props.onLoadEnd(data);
    }
  }

  render() {
    let source = this.props.source
      ? this.props.source
      : this.props.defaultSource
      ? this.props.defaultSource
      : '';
    return (
      <FastImage
        style={this.props.style}
        source={source}
        default
        resizeMode={this.resizeMode}
        onLoadStart={this.onLoadStart.bind(this)}
        onProgress={this.onProgress.bind(this)}
        onLoad={this.onLoad.bind(this)}
        onError={this.onError.bind(this)}
        onLoadEnd={this.onLoadEnd.bind(this)}
      />
    );
  }
}

export default Image;
