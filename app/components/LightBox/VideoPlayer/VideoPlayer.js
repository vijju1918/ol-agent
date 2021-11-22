/**
 * Copyright (c) 2018-present, Evolvier Technologies. All rights reserved.
 *
 */

'use strict';

import React, {Component} from 'react';
import {View, TouchableOpacity} from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Video from 'react-native-video';

import styles from './styles';
import PropTypes from 'prop-types';

class VideoPlayer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      renderClose: false,
    };
  }

  onProgress({currentTime}) {
    if (!this.state.renderClose && currentTime > Number(this.props.duration)) {
      this.setState({
        renderClose: true,
      });
      this.props.videoClose();
    }
  }

  closeVideo() {
    this.props.onBack();
  }

  renderCloseButton() {
    if (this.state.renderClose) {
      return (
        <TouchableOpacity
          onPress={() => this.closeVideo()}
          style={styles.iconMainView}>
          <View>
            <MaterialCommunityIcons
              style={styles.buttonIcon}
              name={'close-circle'}
              color={'grey'}
            />
          </View>
        </TouchableOpacity>
      );
    } else {
      return null;
    }
  }

  render() {
    return (
      <View style={styles.lightBoxBg}>
        {this.renderCloseButton()}
        <Video
          source={{
            uri: this.props.url,
          }}
          ref={ref => {
            this.player = ref;
          }}
          fullscreen={true}
          onLoad={this.props.actionComplete}
          fullscreenOrientation={'landscape'}
          fullscreenAutorotate={true}
          onBuffer={this.onBuffer}
          onError={this.videoError}
          onProgress={this.onProgress.bind(this)}
          style={styles.backgroundVideo}
        />
      </View>
    );
  }
}

VideoPlayer.propTypes = {
  url: PropTypes.string,
  videoClose: PropTypes.func,
  duration: PropTypes.number,
  actionComplete: PropTypes.func.isRequired,
};

export default VideoPlayer;
