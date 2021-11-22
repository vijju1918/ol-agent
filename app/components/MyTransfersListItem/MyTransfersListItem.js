/**
 * Copyright (c) 2018-present, Evolvier Technologies. All rights reserved.
 *
 */

'use strict';

import React, {Component} from 'react';
import {View, Text} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import PropTypes from 'prop-types';

import {getDateTimeString} from '../../lib/utils';
import AppStrings from '@config/strings';
import {AppStyles} from '@theme';
import styles from './styles';

import Image from '@components/Image';
class MyTransfersListItem extends Component {
  render() {
    return (
      <View style={styles.transfersView}>
        <View style={styles.contactAndVendorDetailsView}>
          <View style={styles.contactDetailsView}>
            <View style={styles.contactAvatarView}>
              <Image
                style={styles.contactAvatar}
                source={{
                  uri: this.props.data.contactImage,
                }}
              />
            </View>
            <View style={styles.contactNameAndTransferDateView}>
              <View style={styles.contactNameView}>
                <Text
                  style={[
                    AppStyles.regularText,
                    AppStyles.darkText,
                    styles.name,
                  ]}>
                  {this.props.data.contactName}
                </Text>
              </View>
              <View style={styles.TransferDateView}>
                <Text style={[AppStyles.mediumText, AppStyles.darkText]}>
                  {getDateTimeString(
                    this.props.data.transferDate,
                    'DD MMMM YYYY',
                  )}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.vendorDetailsView}>
            <View style={styles.vendorImageView}>
              <Image
                style={styles.vendorLogo}
                source={{
                  uri: this.props.data.vendorLogo,
                }}
              />
            </View>
            <View style={styles.vendorNameView}>
              <Text style={[AppStyles.mediumText, AppStyles.darkText]}>
                {this.props.data.corporateName}
              </Text>
            </View>
          </View>
        </View>
        <View style={AppStyles.verticalLine} />
        <View style={styles.fuelDetailsView}>
          <View style={styles.iconView}>
            <MaterialCommunityIcons
              style={styles.buttonIcon}
              name={this.props.data.transferIcon}
              color={this.props.data.transferIconColor}
            />
          </View>
          <View style={styles.fuelPointView}>
            <View>
              <Text style={[AppStyles.titleBoldText, AppStyles.darkText]}>
                {this.props.data.fuelpoint}
              </Text>
            </View>
            <View>
              <Text style={[AppStyles.mediumText, AppStyles.darkText]}>
                {AppStrings.fp}
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

MyTransfersListItem.propTypes = {
  data: PropTypes.object.isRequired,
};

export default MyTransfersListItem;
