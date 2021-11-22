/**
 * Copyright (c) 2018-present, Evolvier Technologies. All rights reserved.
 *
 */

'use strict';

import React, {Component} from 'react';
import {View} from 'react-native';
import {createIconSetFromFontello} from 'react-native-vector-icons';

import TouchableOpacity from '@components/TouchableOpacity';

import {AppIconFonts} from '@config';
import styles from './styles';
import {AppStyles} from '@theme';

const Icon = createIconSetFromFontello(AppIconFonts);

class BackButton extends Component {
  render() {
    return (
      <TouchableOpacity
        style={[styles.mainView]}
        onPress={() => this.props.onBack()}
        activeOpacity={1}>
        <View style={[styles.mainSubView]}>
          <Icon
            style={[AppStyles.navBarIcons, styles.backIcon]}
            name="oleum_left-arrow"
          />
        </View>
      </TouchableOpacity>
    );
  }
}

export default BackButton;
