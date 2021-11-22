/**
 * Copyright (c) 2018-present, Evolvier Technologies. All rights reserved.
 *
 */

'use strict';

import React, {Component} from 'react';

import {View, ActivityIndicator} from 'react-native';

import styles from './styles';
import {AppStyles, AppColors} from '@theme';

class Loading extends Component {
  render() {
    return (
      <View style={[AppStyles.containerWhite, styles.loadingVeiw]}>
        <ActivityIndicator size="large" color={AppColors.brand.primary} />
      </View>
    );
  }
}

export default Loading;
