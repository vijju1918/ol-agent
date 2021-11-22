/**
 * Copyright (c) 2018-present, Evolvier Technologies. All rights reserved.
 *
 */

'use strict';

import React, {Component} from 'react';
import {View, TouchableOpacity, Text, TextInput} from 'react-native';
import {observer} from 'mobx-react';
import RazorpayCheckout from 'react-native-razorpay';
import {showMessage} from 'react-native-flash-message';

import LoadingSmall from '@components/LoadingSmall';
import Image from '@components/Image';

import styles from './styles';
import {AppStyles, AppColors} from '@theme';
import {AppResources, AppConfig} from '@config';

import {Purchase} from '@stores/Purchases';
import AccountStore, {Profile as ProfileStore} from '@stores/Account';
import Config from '@stores/Config';

@observer
class AddFP extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fuelPointAmount: 0,
    };
    this.purchase = new Purchase();
    this.profile = new ProfileStore(
      JSON.parse(JSON.stringify(AccountStore.profile)),
    );
  }

  /**
   * Check if the 'PAY NOW' button disabled or not.
   *
   * @return {Boolean}
   * @memberof AddFP
   */
  isPayNowButtonDisabled() {
    if (!this.state.fuelPointAmount || this.purchase.loading || this.loading) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * Calculate and return convenience fee based on the amount entered and actual convenience fee in the config store.
   *
   * @return {Number}
   * @memberof AddFP
   */
  getConvenientFee() {
    const {fuelPointAmount} = this.state;
    if (fuelPointAmount && fuelPointAmount > 0) {
      let value = fuelPointAmount * (Config.getConvenienceFee / 100);
      return Number(value.toFixed(2));
    }
  }

  /**
   * Complete purchase method call
   *
   * @memberof AddFP
   */
  completePurchase() {
    this.loading = false;
    this.purchase.completePurchase().then(data => {
      if (data) {
        this.purchase.loading = false;
        this.props.onBack();
        this.props.onPaymentCompleted(data);
      } else {
        this.purchase.loading = false;
        this.props.onBack();
        this.props.onPaymentCompleted();
      }
    });
  }

  /**
   * Cancel the purchase when the user cancel payment
   *
   * @memberof AddFP
   */
  cancelPurchase() {
    this.loading = false;
    this.purchase
      .cancelPurchase()
      .then(() => {
        this.purchase.loading = false;
      })
      .catch(() => {
        this.purchase.loading = false;
      });
  }

  /**
   * Open payment gateway
   *
   * @param {Object} purchase Purchase data
   * @param {Function} onSucess Call back function when success
   * @param {Function} onError Call back function when error occurs
   * @memberof AddFP
   */
  openRazorpay(purchase, onSucess, onError) {
    let value =
      purchase.amount.value +
      (purchase.amount.convenienceFee ? purchase.amount.convenienceFee : 0);
    let options = {
      currency: purchase.amount.unit,
      key: AppConfig.razorpay.keyId,
      amount: value * 100,
      order_id: purchase.payment.id,
      name: 'Payment',
      prefill: {
        name:
          this.profile && this.profile.fullName
            ? this.profile.fullName
            : undefined,
        email:
          this.profile && this.profile.email ? this.profile.email : undefined,
        contact:
          AccountStore && AccountStore.user && AccountStore.user.number
            ? AccountStore.user.number
            : undefined,
      },
      theme: {
        color: AppColors.brand.primary,
      },
    };
    RazorpayCheckout.open(options)
      .then(() => {
        onSucess();
      })
      .catch(error => {
        onError(error);
      });
  }

  /**
   * Action on 'PAY NOW' button click
   *
   * @memberof AddFP
   */
  onPressPayNow() {
    this.loading = true;
    this.purchase.loading = true;
    this.purchase.amount.value = this.state.fuelPointAmount;
    this.purchase.amount.convenienceFee = this.getConvenientFee();

    this.purchase
      .createPurchase()
      .then(data => {
        if (data) {
          this.purchase.set(data, true);
          if (this.purchase.payment.channel === 'razorpay') {
            this.openRazorpay(
              this.purchase,
              () => {
                this.completePurchase();
              },
              error => {
                this.cancelPurchase();
                this.props.onBack();
                showMessage({
                  message:
                    error && error.error && error.error.description
                      ? error.error.description
                      : 'Oops, Something went wrong. Please try again!',
                });
              },
            );
          }
        } else {
          showMessage({
            message: 'Oops, Something went wrong. Please try again!',
          });
        }
      })
      .catch(e => {
        showMessage({
          message: e,
        });
      });
  }

  /**
   * Render pay now button content
   *
   * @return {Component}
   * @memberof AddFP
   */
  renderPayNowButtonContent() {
    if (this.purchase.loading || this.loading) {
      return <LoadingSmall />;
    } else {
      return (
        <Text
          style={
            this.isPayNowButtonDisabled()
              ? [AppStyles.regularBoldText, AppStyles.whiteText]
              : [AppStyles.regularBoldText, AppStyles.darkText]
          }>
          PAY NOW
        </Text>
      );
    }
  }

  render() {
    return (
      <TouchableOpacity
        style={[AppStyles.lightBoxBg, styles.centerAligned]}
        activeOpacity={1}
        onPress={() => this.props.onBack()}>
        <TouchableOpacity
          style={styles.contentView}
          onPress={() => {}}
          activeOpacity={1}>
          <View style={styles.dataView}>
            <View style={styles.imageView}>
              <Image
                style={styles.logo}
                resizeMode={'contain'}
                source={AppResources.mrCan}
              />
            </View>
            <Text
              style={[
                AppStyles.regularText,
                AppStyles.darkText,
                AppStyles.textSpace,
              ]}>
              Please enter the fuel point you like to purchase
            </Text>
            <View style={styles.inputBoxView}>
              <View style={styles.inputView}>
                <TextInput
                  placeholder="Enter FP"
                  keyboardType={'numeric'}
                  placeholderTextColor={AppColors.navBarIcons}
                  style={[AppStyles.regularText, styles.input]}
                  maxLength={10}
                  onChangeText={value => {
                    let fuelPointAmount = value.replace(/[^0-9]/gi, '');
                    this.setState({
                      fuelPointAmount: Number(fuelPointAmount),
                    });
                  }}
                  value={
                    this.state.fuelPointAmount &&
                    String(this.state.fuelPointAmount)
                  }
                />
              </View>
            </View>
          </View>
          <View style={styles.footerTouch}>
            <TouchableOpacity
              activeOpacity={0.7}
              style={
                this.isPayNowButtonDisabled()
                  ? styles.buttonTouchDisabled
                  : styles.buttonTouch
              }
              onPress={() => this.onPressPayNow()}
              disabled={this.isPayNowButtonDisabled()}>
              {this.renderPayNowButtonContent()}
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </TouchableOpacity>
    );
  }
}

export default AddFP;
