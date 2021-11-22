/**
 * Copyright (c) 2018-present, Oleum. All rights reserved.
 *
 */

'use strict';

import React, {Component} from 'react';
import {View, Text, ScrollView} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Button from '@components/Button';
import DetailsTable from '@components/DetailsTable';
import {getDateTimeString} from '../../lib/utils';

import {AppStyles} from '@theme';
import AppStrings from '@config/strings';
import styles from './styles';
import {AppConstants} from '@config';

class ValuePromotionPaymentReceipt extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: ['a', 'b', 'c'],
    };
  }
  orderDetails() {
    let data = [];
    if (this.props.payment.amount) {
      if (this.props.payment.amount.convenienceFee) {
        data.push({
          name: 'Amount paid',
          value:
            '₹ ' +
            (this.props.payment.amount.value +
              this.props.payment.amount.convenienceFee),
        });
      } else {
        data.push({
          name: 'Amount paid',
          value: '₹ ' + this.props.payment.amount.value,
        });
      }
    }
    if (this.props.payment.quantity) {
      data.push({
        name: 'Fuel points purchased',
        value: this.props.payment.quantity.value + ' FP',
      });
    }

    if (
      this.props.payment.promotion &&
      this.props.payment.promotion.transactions
    ) {
      data.push({
        name: 'Promotion credits',
        value:
          this.props.payment.promotion.transactions.rewards[0].quantity + ' FP',
      });
    }
    if (
      this.props.payment.quantity &&
      this.props.payment.promotion &&
      this.props.payment.promotion.transactions
    ) {
      data.push({
        name: 'Total FP earned',
        value:
          this.props.payment.promotion.transactions.rewards[0].quantity +
          this.props.payment.quantity.value +
          ' FP',
      });
    }
    if (this.props.payment.vendor && this.props.payment.vendor.title) {
      data.push({
        name: 'Vendor',
        value: this.props.payment.vendor.title,
      });
    }

    if (this.props.payment.from && this.props.payment.from.title) {
      data.push({
        name: 'Paid to',
        value: this.props.payment.from.title,
      });
    }
    if (
      this.props.payment &&
      this.props.payment.to &&
      this.props.payment.to.type === AppConstants.vehicle
    ) {
      data.push({
        name: 'Vehicle',
        value: this.props.payment.to.title && this.props.payment.to.title,
      });
    }
    if (this.props.payment.promotion) {
      data.push({
        name: 'Promotion ref',
        value: this.props.payment.promotion.referenceId,
      });
    }
    if (this.props.payment.statusHistory) {
      let compeltedOn = this.props.payment.statusHistory.find(
        item => item.status === 'COMPLETED',
      );
      data.push({
        name: 'Completed on',
        value: getDateTimeString(compeltedOn.date, 'DD MMMM YYYY, hh:mm a'),
      });
    }
    return data;
  }

  renderHome() {
    this.props.renderHome();
  }

  render() {
    return (
      <View style={[AppStyles.container]}>
        <View style={styles.infoView}>
          <View style={styles.iconMainView}>
            <MaterialCommunityIcons style={styles.buttonIcon} name={'check'} />
          </View>
          <View style={styles.infoMessageView}>
            <Text
              style={[
                AppStyles.regularBoldText,
                styles.infoMessageText,
                AppStyles.darkText,
              ]}>
              {AppStrings.purchaseStatusInfo}
            </Text>
          </View>
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollViewContentContainer}>
          <View style={styles.labelView}>
            <Text style={[AppStyles.labelText, AppStyles.darkText]}>
              {AppStrings.orderDetails}
            </Text>
          </View>
          <View>
            <DetailsTable listData={this.orderDetails()} />
          </View>
          <View style={styles.labelView}>
            <Text style={[AppStyles.labelText, AppStyles.darkText]}>
              {AppStrings.paymentDetails}
            </Text>
          </View>
          <View style={styles.paymentDetailsView}>
            <View style={styles.paymentInfo}>
              <Text
                style={[
                  AppStyles.regularBoldText,
                  AppStyles.darkText,
                  styles.paymentInfoText,
                ]}>
                {AppStrings.paymentSuccessful}
              </Text>
            </View>
            <View style={styles.paymentMethodAndStatusView}>
              <Text style={[AppStyles.regularText, styles.paymentTextStyle]}>
                {AppStrings.paymentChannel}
                <Text style={[AppStyles.labelText, AppStyles.darkText]}>
                  {' ' + this.props.payment.payment.channel}
                </Text>
              </Text>
              <Text style={[AppStyles.regularText, styles.paymentTextStyle]}>
                {AppStrings.paymentMethod}
                <Text style={[AppStyles.labelText, AppStyles.darkText]}>
                  {this.props.payment.payment.paymentMethod}
                </Text>
              </Text>
              <Text style={[AppStyles.regularText, styles.paymentTextStyle]}>
                {AppStrings.paymentStatus}
                <Text style={[AppStyles.labelText, AppStyles.darkText]}>
                  {this.props.payment.payment.status}
                </Text>
              </Text>
              <Text style={[AppStyles.regularText, styles.paymentTextStyle]}>
                Reference Id:
                <Text style={[AppStyles.labelText, AppStyles.darkText]}>
                  {' ' + this.props.payment.payment.id}
                </Text>
              </Text>
            </View>
          </View>
        </ScrollView>
        <View style={styles.buttonView}>
          <Button
            onPress={() => this.renderHome()}
            buttonText={AppStrings.done}
          />
        </View>
      </View>
    );
  }
}

export default ValuePromotionPaymentReceipt;
