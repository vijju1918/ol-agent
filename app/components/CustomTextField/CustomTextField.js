/**
 * Copyright (c) 2018-present, Evolvier Technologies. All rights reserved.
 *
 */
'use strict';

import React, {Component} from 'react';

import {View, Text} from 'react-native';
import PropTypes from 'prop-types';
import {createIconSetFromFontello} from 'react-native-vector-icons';

import CustomTextInput from '@components/CustomTextInput';

import styles from './styles';
import {AppColors, AppFonts, AppStyles} from '@theme';
import {AppIconFonts} from '@config';

const Icon = createIconSetFromFontello(AppIconFonts);

class CustomTextField extends Component {
  renderLeftAccessory(leftAccessory) {
    if (leftAccessory) {
      return (
        <Text style={[AppStyles.regularBoldText, styles.leftAccessoryText]}>
          {leftAccessory}
        </Text>
      );
    } else {
      return null;
    }
  }

  render() {
    const {
      hideIcon,
      label,
      subLabel,
      placeholder,
      value,
      leftAccessory,
      ...props
    } = this.props;
    return (
      <View style={styles.mainView}>
        <View style={styles.textFieldLabelMainView}>
          {!hideIcon ? (
            <View style={styles.iconView}>
              <View style={styles.iconWrapView}>
                <Icon
                  style={[AppStyles.icons, styles.icons]}
                  name={'oleum_vehicle'}
                />
              </View>
            </View>
          ) : null}
          <View style={styles.labelView}>
            <Text style={[AppStyles.regularText]}>{label}</Text>
          </View>
          {subLabel ? (
            <View style={styles.subLabelView}>
              <Text style={[AppStyles.mediumText]}>{subLabel}</Text>
            </View>
          ) : null}
        </View>
        <CustomTextInput
          placeholder={placeholder}
          value={value}
          baseColor={AppColors.brand.primary}
          tintColor={AppColors.brand.primary}
          labelTextStyle={AppStyles.regularText}
          fontSize={AppFonts.base.size}
          style={AppStyles.inputBoldFont}
          renderLeftAccessory={() => this.renderLeftAccessory(leftAccessory)}
          inputContainerStyle={
            this.props.hideIcon
              ? [styles.inputContainerStyle, styles.paddingWithoutIconStyle]
              : [styles.inputContainerStyle, styles.paddingStyle]
          }
          {...props}
        />
      </View>
    );
  }
}

CustomTextField.propTypes = {
  label: PropTypes.string.isRequired,
  subLabel: PropTypes.string,
  placeholder: PropTypes.string.isRequired,
  hideIcon: PropTypes.bool,
};

export default CustomTextField;
