/**
 * Copyright (c) 2018-present, Oleum. All rights reserved.
 *
 */

'use strict';

import React, {Component} from 'react';
import {observer} from 'mobx-react';
import {
  View,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import CheckBox from 'react-native-checkbox-heaven';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import RazorpayCheckout from 'react-native-razorpay';
import {showMessage} from 'react-native-flash-message';

import {AppColors, AppStyles} from '@theme';
import {AppStrings, AppConfig} from '@config';
import styles from './styles';

import LoadingSmall from '@components/LoadingSmall';
import Loading from '@components/Loading';
import Button from '@components/Button';

import {Purchase} from '@stores/Purchases';
import Config from '@stores/Config';
import AccountStore, {Profile as ProfileStore} from '@stores/Account';

import Vehicles from '@stores/Vehicles';

@observer
class ValuePromotionPaymentDetails extends Component {
  constructor(props) {
    super(props);
    this.purchase = new Purchase();
    this.purchase.promotion.id = this.props.promotion.promotionId;
    this.purchase.promotion.segmentId = this.props.criteria.id;
    this.profile = new ProfileStore(
      JSON.parse(JSON.stringify(AccountStore.profile)),
    );
    this.state = {
      amount:
        this.props.criteria.minQuantity === this.props.criteria.maxQuantity
          ? this.props.criteria.maxQuantity
          : this.props.criteria.minQuantity,
      index: '',
      value: '',
      fullPageLoading: false,
      purchaseToVehicle: this.props.isFromVehicleCan ? true : false,
    };
    this.purchase.recipientVehicle =
      this.props.vehicleInfo && this.props.vehicleInfo.id
        ? this.props.vehicleInfo
        : {};
  }

  componentWillUnmount() {
    Keyboard.dismiss();
  }

  onSelect(index, value) {
    this.setState({
      index: index,
      value: value,
    });
  }

  handleOnChange() {
    this.setState({
      purchaseToVehicle: !this.state.purchaseToVehicle,
    });
    if (!this.state.purchaseToVehicle && Vehicles.list.length) {
      this.purchase.recipientVehicle = Vehicles.list[0];
    } else {
      this.purchase.recipientVehicle = {};
    }
  }

  openRazorpay(purchase, onSucess, onError) {
    let value =
      purchase.amount.value +
      (purchase.amount.convenienceFee ? purchase.amount.convenienceFee : 0);
    let options = {
      description: this.props.promotion.title,
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

  validateAmount() {
    Keyboard.dismiss();
    if (!this.state.amount) {
      showMessage({
        message: 'Please Enter the Amonut',
      });
    } else if (
      this.state.amount < this.props.criteria.minQuantity ||
      this.state.amount > this.props.criteria.maxQuantity
    ) {
      showMessage({
        message: 'Please enter an amount within the selected range',
      });
    } else {
      this.loading = true;
      this.purchase.loading = true;
      this.purchase.amount.value = this.state.amount;
      this.purchase.amount.convenienceFee = this.getConvenientFee();
      this.purchase.vendorId = this.props.promotion.vendorId;
      this.purchase.from = this.props.promotion.createdBy;

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
  }

  completePurchase() {
    this.loading = false;
    this.state.fullPageLoading = true;
    this.purchase.completePurchase().then(data => {
      if (data) {
        this.purchase.loading = false;
        this.props.promotion.isAgrementChecked = false;
        this.props.openPaymentRecept({
          payment: data,
        });
      } else {
        this.purchase.loading = false;
        this.props.openPaymentRecept();
      }
    });
  }

  /**
   * Cancel the purchase when the user cancel payment
   *
   * @memberof ValuePromotionPaymentDetails
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

  renderPriceRange() {
    if (this.props.criteria.minQuantity === this.props.criteria.maxQuantity) {
      return null;
    } else {
      return (
        <Text style={[AppStyles.regularText, styles.titleInfoText]}>
          {'Selected range ' +
            '₹ ' +
            this.props.criteria.minQuantity +
            ' - ' +
            '₹ ' +
            this.props.criteria.maxQuantity}
        </Text>
      );
    }
  }

  getConvenientFee() {
    if (this.state.amount && this.state.amount > 0) {
      let value = this.state.amount * (Config.getConvenienceFee / 100);
      return Number(value.toFixed(2));
    }
  }

  getTotalPayable() {
    if (
      this.state.amount &&
      this.getConvenientFee() &&
      this.state.amount > 0 &&
      this.getConvenientFee() > 0
    ) {
      return Number((this.state.amount + this.getConvenientFee()).toFixed(2));
    } else if (this.state.amount && this.state.amount > 0) {
      return Number(this.state.amount.toFixed(2));
    } else {
      return '00.00';
    }
  }

  renderAmountView(title, value, bold) {
    return (
      <View style={AppStyles.row}>
        <View style={[AppStyles.flex1, styles.nameView]}>
          <Text
            style={
              bold
                ? [AppStyles.regularBoldText, AppStyles.darkText]
                : [AppStyles.regularText]
            }>
            {title}
          </Text>
        </View>
        <View style={[AppStyles.flex1, styles.valueView]}>
          <Text
            style={
              bold
                ? [AppStyles.regularBoldText, AppStyles.darkText]
                : [AppStyles.regularText]
            }>
            {value ? '₹ ' + value : '00.00'}
          </Text>
        </View>
      </View>
    );
  }

  renderVehicles() {
    const {purchaseToVehicle} = this.state;
    if (purchaseToVehicle) {
      return (
        <View style={styles.selectVehicleMainView}>
          <View style={styles.vehicleListMainView}>
            <TouchableOpacity
              onPress={() => this.onPressSelectVehicle()}
              disabled={this.props.isFromVehicleCan ? true : false}>
              <View style={styles.vehicleListView}>
                <View style={styles.vehicleItemView}>
                  {this.renderSelectedVehicle()}
                </View>
                <View style={styles.downIconView}>
                  <MaterialCommunityIcons
                    style={[AppStyles.icons]}
                    name="chevron-down"
                  />
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  }

  renderSelectedVehicle() {
    return (
      <View>
        <Text style={[AppStyles.regularBoldText, AppStyles.darkText]}>
          {this.purchase.recipientVehicle &&
            this.purchase.recipientVehicle.title}
        </Text>
      </View>
    );
  }

  onPressSelectVehicle() {
    this.props.renderVehicleList({
      vehicleList: Vehicles.list.slice(),
      onPress: this.onSelectVehicle.bind(this),
    });
  }

  onSelectVehicle(vehicle) {
    this.purchase.recipientVehicle = vehicle;
  }

  renderRewardPoints() {
    if (
      this.state.amount &&
      this.state.amount >= this.props.criteria.minQuantity &&
      this.state.amount <= this.props.criteria.maxQuantity
    ) {
      return (
        <View style={styles.totalFPView}>
          <Text style={[AppStyles.regularText, AppStyles.darkText]}>
            <Text>You will get</Text>
            <Text style={[AppStyles.regularBoldText, AppStyles.darkText]}>
              {' ' + (this.state.amount + this.props.criteria.reward) + ' FP'}
            </Text>
          </Text>
        </View>
      );
    } else {
      return (
        <View style={styles.totalFPView}>
          <Text style={[AppStyles.regularText, AppStyles.darkText]}>
            <Text>You will get</Text>
            <Text style={[AppStyles.regularBoldText, AppStyles.darkText]}>
              {' ' +
                (this.props.criteria.minQuantity + this.props.criteria.reward) +
                ' FP'}
            </Text>
          </Text>
        </View>
      );
    }
  }

  render() {
    if (!this.state.fullPageLoading) {
      return (
        <View style={[AppStyles.container]}>
          <ScrollView
            alwaysBounceVertical={false}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollViewContentContainer}>
            <View style={styles.dataContentView}>
              <View style={styles.infoView}>
                <Text
                  style={[
                    AppStyles.regularText,
                    AppStyles.darkText,
                    styles.titleInfoText,
                  ]}>
                  Enter the amount
                </Text>
              </View>

              {this.renderPriceRange()}
              <View style={styles.rupeeEnterBoxView}>
                <View style={styles.rupeeSymbolView}>
                  <MaterialCommunityIcons
                    style={styles.buttonIcon}
                    name="currency-inr"
                  />
                </View>
                <View style={styles.rupeeInputView}>
                  <TextInput
                    placeholder="Enter amount"
                    keyboardType={'numeric'}
                    placeholderTextColor={AppColors.navBarIcons}
                    style={[AppStyles.regularText, styles.inputView]}
                    autoFocus={true}
                    maxLength={10}
                    value={String(this.state.amount)}
                    onChangeText={amount => {
                      let amountValue = amount.replace(/[^0-9]/gi, '');
                      this.setState({
                        amount: Number(amountValue),
                      });
                    }}
                    editable={
                      this.props.criteria.minQuantity ===
                      this.props.criteria.maxQuantity
                        ? false
                        : true
                    }
                  />
                </View>
              </View>
              {this.renderRewardPoints()}
              {Vehicles.list && Vehicles.list.length ? (
                <TouchableOpacity
                  onPress={() => this.handleOnChange()}
                  disabled={this.props.isFromVehicleCan ? true : false}>
                  <View style={styles.vehicleCheckBoxView}>
                    <CheckBox
                      iconSize={25}
                      iconName="matMix"
                      checked={this.state.purchaseToVehicle}
                      checkedColor={AppColors.brand.secondary}
                      uncheckedColor={AppColors.border}
                      onChange={this.handleOnChange.bind(this)}
                      disabled={this.props.isFromVehicleCan ? true : false}
                      disabledColor={AppColors.brand.secondary}
                      labelStyle={[
                        AppStyles.regularText,
                        styles.checkboxLabelStyle,
                      ]}
                      label={'Purchase to vehicle'}
                    />
                  </View>
                </TouchableOpacity>
              ) : null}
              {this.renderVehicles()}
              <View style={styles.totalAmountSummeryView}>
                {this.renderAmountView('Order Amount', this.state.amount)}
                <View style={styles.hline} />
                {this.renderAmountView(
                  'Convenience Fee',
                  this.getConvenientFee(),
                )}
                <View style={styles.hline} />
                {this.renderAmountView(
                  AppStrings.totalPayable,
                  this.getTotalPayable(),
                  true,
                )}
              </View>
              <View style={styles.buttonView}>
                <Button
                  disabled={this.purchase.loading}
                  buttonText={AppStrings.payNow}
                  onPress={() => this.validateAmount()}
                />
              </View>
            </View>
            {this.purchase.loading ? (
              <View style={styles.loadingView}>
                <LoadingSmall color={AppColors.brand.primary} />
                <Text style={[AppStyles.cairoLabelText, AppStyles.darkText]}>
                  Initializing Payment...
                </Text>
              </View>
            ) : null}
          </ScrollView>
        </View>
      );
    } else {
      return (
        <View style={[AppStyles.container]}>
          <Loading />
        </View>
      );
    }
  }
}

export default ValuePromotionPaymentDetails;
