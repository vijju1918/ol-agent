/**
 * Copyright (c) 2018-present, Oleum. All rights reserved.
 *
 */

'use strict';

import React, { Component } from 'react';
import { View, StatusBar } from 'react-native';
import RNBootSplash from 'react-native-bootsplash';

import styles from './styles';
import { AppColors } from '@theme';
import { AppResources } from '@config';

import Loading from '@components/Loading';
import Image from '@components/Image';

class SplashScreen extends Component {
  componentDidMount() {
    RNBootSplash.hide({ duration: 600 });
  }

  render() {
    return (
      <View style={styles.containerSplashScreen}>
        <StatusBar
          backgroundColor={AppColors.statusBarBg}
          hidden={false}
          barStyle={AppColors.statusBarStyle}
        />
        <View style={styles.containerSplashScreen}>
          <Image style={[styles.mrCanLogo]} source={AppResources.mrCan} />
          <Image
            style={[styles.appLogo]}
            resizeMode={'contain'}
            source={AppResources.appLogoBlack}
          />
          <View style={styles.loading}>
            <Loading color={AppColors.brand.secondary} />
          </View>
        </View>
      </View>
    );
  }
}

export default SplashScreen;
