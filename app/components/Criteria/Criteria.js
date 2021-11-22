/**
 * Copyright (c) 2018-present, Evolvier Technologies. All rights reserved.
 *
 */

'use strict';

import React, {Component} from 'react';
import {observer} from 'mobx-react';
import {View, Text, TouchableOpacity} from 'react-native';
import CheckBox from 'react-native-checkbox-heaven';

import styles from './styles';
import {AppColors, AppStyles} from '@theme';
import PropTypes from 'prop-types';

@observer
class Criteria extends Component {
  constructor(props) {
    super(props);

    this.state = {
      checked: false,
    };
  }

  handleOnChange() {
    this.props.onPress();
  }

  checkBoxView() {
    if (this.props.checkBox) {
      return (
        <View style={styles.checkBoxView}>
          <CheckBox
            iconSize={20}
            iconName="matMix"
            checked={this.props.selected}
            checkedColor={AppColors.brand.secondary}
            uncheckedColor={AppColors.border}
            onChange={this.props.onPress}
            disabled={false}
            disabledColor={AppColors.border}
          />
        </View>
      );
    } else {
      return null;
    }
  }

  render() {
    return (
      <TouchableOpacity
        onPress={this.props.onPress}
        style={styles.mainView}
        activeOpacity={0.8}
        disabled={this.props.touchDisabled}>
        <View style={[styles.checkBoxAndRangeView]}>
          {this.checkBoxView()}
          <View
            style={
              this.props.checkBox ? styles.rangeView : styles.rangePaddingView
            }>
            <Text style={[AppStyles.regularText]}>{this.props.range}</Text>
          </View>
        </View>
        <View style={[styles.rewardView]}>
          <Text style={[AppStyles.regularText]}>{this.props.reward}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

Criteria.propTypes = {
  color1: PropTypes.string.isRequired,
  color2: PropTypes.string.isRequired,
  range: PropTypes.string.isRequired,
  reward: PropTypes.string.isRequired,
  onPress: PropTypes.func,
  selected: PropTypes.bool,
  checkBox: PropTypes.bool,
  touchDisabled: PropTypes.bool,
};

export default Criteria;
