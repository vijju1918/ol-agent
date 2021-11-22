/**
 * Copyright (c) 2018-present, Evolvier Technologies. All rights reserved.
 *
 */
'use strict';

import React, {Component} from 'react';

import PropTypes from 'prop-types';
import {View, Text, TouchableOpacity} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {createIconSetFromFontello} from 'react-native-vector-icons';

import CustomTextInput from '@components/CustomTextInput';

import styles from './styles';
import {AppColors, AppFonts, AppStyles} from '@theme';
import {AppIconFonts} from '@config';

const Icon = createIconSetFromFontello(AppIconFonts);

class CustomSelectField extends Component {
  renderIcon() {
    return (
      <View style={styles.dropDownIconView}>
        <MaterialCommunityIcons style={styles.dropDownIcon} name="menu-down" />
      </View>
    );
  }

  render() {
    return (
      <View style={styles.mainView}>
        <View style={styles.textFieldLabelMainView}>
          <View style={styles.iconView}>
            <View style={styles.iconWrapView}>
              <Icon
                style={[AppStyles.icons, styles.icons]}
                name={'oleum_vehicle'}
              />
            </View>
          </View>
          <View style={styles.labelView}>
            <Text style={[AppStyles.regularText]}>{this.props.label}</Text>
          </View>
        </View>
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.inputTouch}
          disabled={this.props.disabled}
          onPress={this.props.onPress.bind(this)}>
          <View style={styles.inputFieldView}>
            <CustomTextInput
              editable={false}
              placeholder={this.props.placeholder}
              value={this.props.value}
              baseColor={AppColors.inputLable}
              tintColor={AppColors.brand.primary}
              labelTextStyle={AppStyles.regularText}
              fontSize={AppFonts.base.size}
              autoCapitalize={'words'}
              maxLength={30}
              style={AppStyles.inputBoldFont}
              inputContainerStyle={styles.inputContainerStyle}
              renderLeftAccessory={() => this.renderIcon()}
            />
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

CustomSelectField.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

export default CustomSelectField;
