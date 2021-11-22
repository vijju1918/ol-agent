/**
 * Copyright (c) 2018-present, Oleum. All rights reserved.
 *
 */

'use strict';

import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {View, Text} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {AppConstants} from '@config';
import {AppStyles} from '@theme';
import styles from './styles';

class OrderStatus extends Component {
  renderIconView() {
    if (this.props.iconName) {
      return (
        <View style={styles.iconView}>
          <MaterialCommunityIcons
            style={styles.buttonIcon}
            name={this.props.iconName}
          />
        </View>
      );
    } else {
      return null;
    }
  }

  render() {
    return (
      <View style={styles.orderStatusMainView}>
        <View style={styles.iconMainView}>
          <MaterialCommunityIcons
            style={styles.buttonIcon}
            name={
              this.props.status === AppConstants.promotionStatus.completed
                ? 'check'
                : 'close'
            }
          />
        </View>
        <View style={styles.statusAndReferenceIdView}>
          <View>
            <Text style={[AppStyles.regularBoldText, AppStyles.darkText]}>
              {this.props.status}
            </Text>
          </View>
          <View>
            <Text
              style={[
                AppStyles.mediumRegularText,
                AppStyles.darkText,
                styles.referenceidText,
              ]}>
              {'Reference Id : ' + this.props.referenceId}
            </Text>
          </View>
        </View>
        {this.renderIconView()}
      </View>
    );
  }
}

OrderStatus.propTypes = {
  status: PropTypes.string.isRequired,
  referenceId: PropTypes.string.isRequired,
  iconName: PropTypes.string,
};

export default OrderStatus;
