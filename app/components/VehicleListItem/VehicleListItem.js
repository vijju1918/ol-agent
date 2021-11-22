/**
 * Copyright (c) 2018-present, Evolvier Technologies. All rights reserved.
 *
 */

'use strict';

import React, {Component} from 'react';

import {View, Text} from 'react-native';
import {createIconSetFromFontello} from 'react-native-vector-icons';
import PropTypes from 'prop-types';

import styles from './styles';
import {AppStyles} from '@theme';
import {AppIconFonts, AppResources} from '@config';

import Image from '@components/Image';

const Icon = createIconSetFromFontello(AppIconFonts);

class VehicleListItem extends Component {
  render() {
    return (
      <View style={styles.vehicleItemView}>
        <View style={styles.vehicleLogoView}>
          <View style={styles.vehicleLogoIconView}>
            {this.props.image ? (
              <Image
                style={[styles.vehicleLogo]}
                source={
                  this.props.image
                    ? {
                        uri: this.props.image,
                      }
                    : AppResources.noImage
                }
              />
            ) : (
              <Icon
                style={[AppStyles.icons, styles.icons]}
                name={'oleum_vehicle'}
              />
            )}
          </View>
        </View>
        <View style={styles.vehicleDetailsView}>
          <Text style={[AppStyles.regularText]}>{this.props.regNumber}</Text>
          {this.props.modelName ? (
            <Text style={[AppStyles.titleBoldText, styles.modelText]}>
              {this.props.modelName}
            </Text>
          ) : null}
          <View style={[AppStyles.row, styles.mileageView]}>
            <Text style={[AppStyles.regularText, styles.modelText]}>
              {'Last known mileage: '}
            </Text>
            <Text style={[AppStyles.labelText, styles.modelText]}>
              {this.props.mileage ? this.props.mileage : '0'} km/l
            </Text>
          </View>
        </View>
        {/* <View style={styles.gpsMainView}>
          <View style={styles.gpsView}>
          <Image
              style={[styles.vehicleLogo]}
              source={AppResources.gps}
            />
          </View>
        </View> */}
      </View>
    );
  }
}

VehicleListItem.propTypes = {
  image: PropTypes.string.isRequired,
  modelName: PropTypes.string.isRequired,
  regNumber: PropTypes.string.isRequired,
  mileage: PropTypes.string,
  gpsActive: PropTypes.bool,
};

export default VehicleListItem;
