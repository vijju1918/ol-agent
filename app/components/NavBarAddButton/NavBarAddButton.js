/**
 * Copyright (c) 2018-present, Evolvier Technologies. All rights reserved.
 *
 */
'use strict';

import React, {Component} from 'react';

import {View, Text} from 'react-native';
import {createIconSetFromFontello} from 'react-native-vector-icons';
import PropTypes from 'prop-types';

import TouchableOpacity from '@components/TouchableOpacity';

import styles from './styles';
import {AppStyles} from '@theme';
import {AppIconFonts} from '@config';

const Icon = createIconSetFromFontello(AppIconFonts);

class NavBarAddButton extends Component {
  render() {
    return (
      <View style={styles.buttonMainView}>
        <TouchableOpacity
          style={[AppStyles.buttonTouch, styles.mainView]}
          activeOpacity={1}
          onPress={() => this.props.onClick()}>
          <View style={styles.iconWrapper}>
            <Icon
              style={[AppStyles.navBarIcons, styles.addIcon]}
              name="oleum_add"
            />
            <Text style={[AppStyles.mediumBoldText, AppStyles.whiteText]}>
              Add
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

NavBarAddButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default NavBarAddButton;
