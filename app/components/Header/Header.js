/**
 * Copyright (c) 2018-present, Oleum. All rights reserved.
 *
 */

'use strict';

import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {View, Text, ActivityIndicator} from 'react-native';
import {observer} from 'mobx-react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import TouchableOpacity from '@components/TouchableOpacity';

import {AppColors, AppStyles} from '@theme';
import styles from './styles';

import Cans from '@stores/Cans';

@observer
class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  getValue() {
    let totalCanValue = 0;
    if (this.props.isHome) {
      return Cans.total;
    } else if (this.props.isVehicleCan && Cans.totalVehicleCanQuantity) {
      return Cans.totalVehicleCanQuantity;
    } else if (
      !this.props.isHome &&
      !this.props.isVehicleCan &&
      Cans.totalQuantity
    ) {
      return Cans.totalQuantity;
    } else {
      return totalCanValue;
    }
  }

  render() {
    return (
      <View style={styles.controlMainView}>
        <View style={styles.fpMainView}>
          <View style={styles.fpView}>
            <Text style={[AppStyles.largeText, styles.fpCountText]}>
              {this.getValue() ? Number(this.getValue()).toFixed(2) : '00.00'}
            </Text>
            <Text
              style={[
                AppStyles.regularBoldText,
                styles.fpText,
                styles.textLeftMargin,
              ]}>
              F
            </Text>
            <Text style={[AppStyles.regularText, styles.fpText]}>uel</Text>
            <Text
              style={[
                AppStyles.regularBoldText,
                styles.fpText,
                styles.textLeftMarginSmall,
              ]}>
              P
            </Text>
            <Text style={[AppStyles.regularText, styles.fpText]}>oints</Text>
          </View>
          <Text style={[AppStyles.smallText]}>One FP = 1 Rupee</Text>
        </View>
        <View style={styles.loadingView}>
          <ActivityIndicator
            animating={this.props.loading}
            size="large"
            color={AppColors.brand.accentSecondary}
          />
        </View>
        <TouchableOpacity
          style={[AppStyles.buttonTouch, styles.addFPMainView]}
          activeOpacity={1}
          onPress={() => this.props.onClickAddFP()}>
          <View style={styles.centerAlign}>
            <View style={styles.addIconView}>
              <MaterialCommunityIcons style={styles.addIcon} name="plus" />
            </View>
            <Text style={[AppStyles.smallBoldText, AppStyles.darkText]}>
              ADD FP
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

Header.propTypes = {
  loading: PropTypes.bool,
  functionOne: PropTypes.func,
  functionTwo: PropTypes.func,
};

export default Header;
