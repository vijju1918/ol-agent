/**
 * Copyright (c) 2018-present, Evolvier Technologies. All rights reserved.
 *
 */

'use strict';

import React, {Component} from 'react';
import {
  View,
  TouchableOpacity,
  FlatList,
  TouchableHighlight,
} from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles';
import {AppStyles, AppColors} from '@theme';
import {fetchVehicleDetailsUsingVehicleId} from '@lib/utils';
import {AppConstants} from '@config';
import CanItem from '@components/CanItem';

import Vehicles from '@stores/Vehicles';

class CanList extends Component {
  renderCanListItem(item) {
    let vehicleInfo = fetchVehicleDetailsUsingVehicleId(
      Vehicles.list,
      item && item.user && item.user.id,
    );

    return (
      <TouchableHighlight
        style={
          item.type === AppConstants.userTypes.oleum
            ? styles.drCanListItem
            : styles.canListItem
        }
        onPress={() => this.onSelectCanItem(item)}
        activeOpacity={1}
        underlayColor={AppColors.buttonBg}>
        <CanItem
          name={
            vehicleInfo
              ? vehicleInfo.title
                ? vehicleInfo.title
                : vehicleInfo.number
                ? vehicleInfo.number
                : ''
              : item.title
          }
          subTitle={vehicleInfo && item.title}
          image={item.image}
          points={Number(item.quantity)}
        />
      </TouchableHighlight>
    );
  }

  onSelectCanItem(item) {
    this.props.onPress(item);
    this.props.onBack();
  }

  itemSeparatorComponent() {
    return <View style={[AppStyles.horizontalLine, styles.line]} />;
  }

  _keyExtractor = item => item.id;

  render() {
    return (
      <TouchableOpacity
        style={AppStyles.lightBoxBg}
        activeOpacity={1}
        onPress={() => this.props.onBack()}>
        <TouchableOpacity
          style={styles.contentView}
          onPress={() => {}}
          activeOpacity={1}>
          <FlatList
            data={this.props.canList}
            renderItem={({item, i}) => this.renderCanListItem(item, i)}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.notificationContentContainerStyle}
            ItemSeparatorComponent={() => this.itemSeparatorComponent()}
            keyExtractor={this._keyExtractor}
          />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  }
}

CanList.propTypes = {
  canList: PropTypes.array.isRequired,
  onPress: PropTypes.func.isRequired,
};

export default CanList;
