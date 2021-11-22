/**
 * Copyright (c) 2018-present, Oleum. All rights reserved.
 *
 */

'use strict';

import React, {Component} from 'react';

import {View, Text, TouchableOpacity} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';

import {AppStyles} from '@theme';
import styles from './styles';

class SavedLocationItem extends Component {
  render() {
    return (
      <View style={styles.locationItemMainView}>
        <View style={styles.addressView}>
          <View style={styles.locationLabel}>
            <Text style={[AppStyles.regularText, AppStyles.darkText]}>
              {this.props.data.label}
            </Text>
          </View>

          <Text style={[AppStyles.regularBoldText, styles.addressText]}>
            {this.props.data.name}
          </Text>
          <Text style={[AppStyles.regularText]}>{this.props.data.address}</Text>
        </View>
        {!this.props.disableDelete ? (
          <TouchableOpacity
            style={styles.iconView}
            onPress={() => this.props.onPressDelete(this.props.data)}>
            <MaterialIcons style={[styles.lcoationIcon]} name="delete" />
          </TouchableOpacity>
        ) : null}
      </View>
    );
  }
}

SavedLocationItem.propTypes = {
  data: PropTypes.object.isRequired,
  onPressDelete: PropTypes.func,
  disableDelete: PropTypes.bool.isRequired,
};

export default SavedLocationItem;
