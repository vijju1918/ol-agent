/**
 * Copyright (c) 2018-present, Evolvier Technologies. All rights reserved.
 *
 */

'use strict';

import React, {Component} from 'react';
import {View, Text} from 'react-native';

import {getDateTimeString} from '../../lib/utils';
import {AppStyles} from '@theme';
import styles from './styles';

import Image from '@components/Image';

class AgentDispensationListItem extends Component {
  renderCustomer() {
    return (
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
                AppStyles.regularBoldText,
                AppStyles.darkText,
                styles.name,
              ]}>
              {this.props.data.user.type}
            </Text>
          </View>
          <View style={styles.designationView}>
            <Text style={[AppStyles.regularText]}>
              {this.props.data.designation}
            </Text>
          </View>
        </View>
      </View>
    );
  }
  render() {
    return (
      <View style={styles.dispensationView}>
        <View style={styles.contactAndVendorDetailsView}>
          <View style={styles.contactNameView}>
            <Text
              style={[
                AppStyles.regularBoldText,
                AppStyles.darkText,
                styles.name,
              ]}>
              {this.props.data && this.props.data.vehicleNumber}
            </Text>
            <Text style={[AppStyles.mediumRegularText]}>
              {getDateTimeString(this.props.data.dispensedAt, 'hh:mm a')}
            </Text>
            <View style={styles.priceView}>
              <Text style={[AppStyles.mediumRegularText]}>
                {this.props.data.product && this.props.data.product.title}
              </Text>
              <Text style={[AppStyles.mediumRegularText, AppStyles.darkText]}>
                {' (₹' +
                  (this.props.data.product &&
                    this.props.data.product.price &&
                    this.props.data.product.price.value) +
                  '/Litre)'}
              </Text>
            </View>
          </View>
          <View style={styles.paymentModeView}>
            <Text style={[AppStyles.mediumRegularText, AppStyles.darkText]}>
              <Text>{'Mode of Payment:   '}</Text>
              <Text style={AppStyles.mediumBoldText}>
                {this.props.data.paymentDetails &&
                  this.props.data.paymentDetails.mode}
              </Text>
            </Text>
          </View>
        </View>
        <View style={styles.fuelDetailsView}>
          <View style={styles.fuelPointView}>
            <View>
              <Text style={[AppStyles.titleBoldText, AppStyles.darkText]}>
                {this.props.data &&
                  this.props.data.dispensedQuantity &&
                  this.props.data.dispensedQuantity.toFixed(2) + ' L'}
              </Text>
            </View>
            <View style={styles.litrePointView}>
              <View>
                {this.props.data.paymentDetails.mode === 'FP' ? (
                  <Text style={[AppStyles.titleBoldText, AppStyles.darkText]}>
                    {(this.props.data.paymentDetails &&
                      this.props.data.paymentDetails.fuelPointRedeemed) + ' FP'}
                  </Text>
                ) : (
                  <Text style={[AppStyles.titleBoldText, AppStyles.darkText]}>
                    {'₹ ' +
                      (this.props.data.paymentDetails &&
                        this.props.data.paymentDetails.amountPaid &&
                        this.props.data.paymentDetails.amountPaid.value)}
                  </Text>
                )}
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

export default AgentDispensationListItem;
