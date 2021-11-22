/**
 * Copyright (c) 2018-present, Evolvier Technologies. All rights reserved.
 *
 */

'use strict';

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text} from 'react-native';
import {observer} from 'mobx-react';

import TouchableOpacity from '@components/TouchableOpacity';

import {AppStyles, AppColors} from '@theme';
import styles from './styles';

@observer
class Button extends Component {
  disabled = false;
  onPress = (...args) => {
    let timeoutPeriod = this.props.touchDelay ? this.props.touchDelay : 1000;
    if (this.disabled) {
      return;
    }
    this.disabled = true;
    setTimeout(() => {
      this.disabled = false;
    }, timeoutPeriod);
    this.props.onPress && this.props.onPress(...args);
  };

  getTextColor(color, disabled) {
    if (disabled) {
      return AppColors.whiteText;
    } else if (color) {
      return color;
    } else {
      return AppColors.textPrimary;
    }
  }

  render() {
    return (
      <View>
        <TouchableOpacity
          disabled={this.props.disabled}
          style={
            this.props.disabled
              ? [styles.buttonTouchDisabled]
              : [
                  {
                    backgroundColor: this.props.buttonColor
                      ? this.props.buttonColor
                      : AppColors.brand.secondary,
                    borderColor: this.props.borderColor
                      ? this.props.borderColor
                      : AppColors.brand.secondary,
                  },
                  styles.buttonTouch,
                ]
          }
          activeOpacity={0.5}
          {...this.props}
          onPress={this.onPress.bind(this)}>
          <Text
            style={[
              AppStyles.regularBoldText,
              styles.buttonText,
              {
                color: this.getTextColor(
                  this.props.textColor,
                  this.props.disabled,
                ),
              },
            ]}>
            {this.props.buttonText}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

Button.propTypes = {
  buttonColor: PropTypes.string,
  textColor: PropTypes.string,
  borderColor: PropTypes.string,
  onPress: PropTypes.func.isRequired,
  buttonText: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
};

export default Button;
