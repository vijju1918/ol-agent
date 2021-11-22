/**
 * Copyright (c) 2018-present, Evolvier Technologies. All rights reserved.
 *
 */

'use strict';

import React, {Component} from 'react';
import {Actions} from 'react-native-router-flux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import TouchableOpacity from '@components/TouchableOpacity';

import styles from './styles';
import {AppStyles, AppColors} from '@theme';

class DrawerIcon extends Component {
  render() {
    return (
      <TouchableOpacity
        style={[AppStyles.buttonTouch, styles.mainView]}
        activeOpacity={1}
        underlayColor={AppColors.iconBg}
        onPress={() => Actions.drawerOpen()}>
        <MaterialIcons
          style={[AppStyles.navBarIcons, styles.drawerIcon]}
          name="menu"
        />
      </TouchableOpacity>
    );
  }
}

export default DrawerIcon;
