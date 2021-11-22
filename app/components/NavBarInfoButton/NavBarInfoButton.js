/**
 * Copyright (c) 2018-present, Evolvier Technologies. All rights reserved.
 *
 */
'use strict';

import React, {Component} from 'react';

import {View, Share, Alert} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import PropTypes from 'prop-types';

import TouchableOpacity from '@components/TouchableOpacity';

import styles from './styles';
import {AppStyles} from '@theme';

class NavBarInfoButton extends Component {
  onShare = () => {
    try {
      this.props.shareLink().then(message => {
        Share.share({
          message: message,
        });
      });
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  render() {
    return (
      <View style={styles.buttonMainView}>
        {this.props.shareLink ? (
          <TouchableOpacity
            style={[AppStyles.buttonTouch, styles.mainView]}
            activeOpacity={1}
            onPress={this.onShare}>
            <View>
              <MaterialCommunityIcons
                style={AppStyles.navBarIcons}
                name="share-variant"
              />
            </View>
          </TouchableOpacity>
        ) : null}
        <TouchableOpacity
          style={[AppStyles.buttonTouch, styles.mainView]}
          activeOpacity={1}
          onPress={() => this.props.onClick()}>
          <View>
            <MaterialCommunityIcons
              style={AppStyles.navBarIcons}
              name="information-outline"
            />
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

NavBarInfoButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  shareLink: PropTypes.string,
};

export default NavBarInfoButton;
