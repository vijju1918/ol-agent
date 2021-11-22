/**
 * Copyright (c) 2018-present, Evolvier Technologies. All rights reserved.
 *
 */

'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity, Text, Platform, Linking } from 'react-native';

import styles from './styles';
import { AppStyles } from '@theme';
import { AppResources } from '@config';

import Image from '@components/Image';
class Update extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  openURL(url) {
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      }
    });
  }

  onPressUpdate() {
    if (Platform.OS === 'ios') {
      this.openURL('https://apps.apple.com/in/app/oleum/id1472407892');
    } else {
      this.openURL(
        'https://play.google.com/store/apps/details?id=com.oleumx.app&hl=en_IN',
      );
    }
    this.props.onBack();
  }

  render() {
    return (
      <TouchableOpacity
        style={[AppStyles.lightBoxBg, styles.alignCentre]}
        activeOpacity={1}>
        <TouchableOpacity
          style={styles.contentView}
          onPress={() => { }}
          activeOpacity={1}>
          <View style={styles.dataView}>
            <Image
              style={styles.appLogo}
              resizeMode={'contain'}
              source={AppResources.appLogoBlack}
            />
            <Text style={[AppStyles.titleBoldText, AppStyles.textSpace]}>
              New update available!
            </Text>
            <Text
              style={[
                AppStyles.regularText,
                AppStyles.darkText,
                AppStyles.textCenterAligned,
                AppStyles.textSpace,
              ]}>
              Please update the app to continue
            </Text>
          </View>
          <View style={styles.footerTouch}>
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.submitButtonTouch}
              onPress={() => this.onPressUpdate()}>
              <Text
                style={[
                  AppStyles.regularBoldText,
                  styles.submitButton,
                  AppStyles.darkText,
                ]}>
                UPDATE NOW
              </Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </TouchableOpacity>
    );
  }
}

Update.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Update;
