/**
 * Copyright (c) 2018-present, Oleum. All rights reserved.
 *
 */

'use strict';

import React, {Component} from 'react';
import {
  View,
  ScrollView,
  Text,
  FlatList,
  TextInput,
  Share,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {observer} from 'mobx-react';
import {showMessage} from 'react-native-flash-message';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CheckBox from 'react-native-checkbox-heaven';
import RazorpayCheckout from 'react-native-razorpay';
import moment from 'moment';

import Button from '@components/Button';
import PromotionDetailsHeader from '@components/PromotionDetailsHeader';
// import TermsAndConditions from '@components/TermsAndConditions';
import CorporateDetails from '@components/CorporateDetails';
import Criteria from '@components/Criteria';
import NavBarInfoButton from '@components/NavBarInfoButton';
import LoadingShadow from '@components/LoadingShadow';
import Image from '@components/Image';

import {AppColors, AppStyles} from '@theme';
import {AppStrings, AppResources, AppConstants, AppConfig} from '@config';
import styles from './styles';

import Config from '@stores/Config';
import Vehicles from '@stores/Vehicles';
import {Purchase} from '@stores/Purchases';
import AccountStore, {Profile as ProfileStore} from '@stores/Account';
import NewPromotion from '../../stores/Promotions/newPromotion';
import NewPromotions from '../../stores/Promotions/newIndex';
@observer
class PurchaseFuelPromoDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCriteriaId: this.initializeCriteriaId(
        props.promotion && props.promotion.segmentsData,
      ),
      promoExpired: false,
      donate: false,
      amount: this.initializeFuelAmount(
        props.promotion && props.promotion.segmentsData,
      ),
      purchaseToVehicle: props.isFromVehicleCan ? true : false,
    };
    this.purchase = new Purchase();
    this.promotion = props.promotion
      ? new NewPromotion(JSON.parse(JSON.stringify(props.promotion)))
      : new NewPromotion();
    if (props.referenceId) {
      this.promotion.referenceId = props.referenceId;
    }
    this.purchase.promotion.id = props.promotion && props.promotion.id;
    this.purchase.promotion.segmentId = this.initializePromotionSegmentId(
      props.promotion && props.promotion.segmentsData,
    );
    this.profile = new ProfileStore(
      JSON.parse(JSON.stringify(AccountStore.profile)),
    );
    this.purchase.recipientVehicle =
      props.vehicleInfo && props.vehicleInfo.id ? props.vehicleInfo : {};
  }

  /**
   * Initializing criteria id
   *
   * @param {Array} segmentsData
   * @return {String}
   * @memberof PurchaseFuelPromoDetails
   */
  initializeCriteriaId(segmentsData) {
    if (segmentsData && segmentsData.length) {
      return segmentsData[0].id;
    } else {
      return null;
    }
  }

  /**
   * Initialize fuel amount based on the selected criteria
   *
   * @return {Number}
   * @memberof PurchaseFuelPromoDetails
   */
  initializeFuelAmount(segmentsData) {
    let selectedCriteriaId =
      segmentsData && segmentsData.length ? segmentsData[0].id : '';
    let criteria = this.selectedCriteriaDetails(selectedCriteriaId);
    if (criteria) {
      if (criteria.minQuantity === criteria.maxQuantity) {
        return criteria.maxQuantity;
      } else {
        return criteria.minQuantity;
      }
    }
  }

  /**
   * Initialize promotion segment id based on the selected criteria
   *
   * @param {Object} segmentsData
   * @return {String}
   * @memberof PurchaseFuelPromoDetails
   */
  initializePromotionSegmentId(segmentsData) {
    let selectedCriteriaId =
      segmentsData && segmentsData.length ? segmentsData[0].id : '';
    let criteria = this.selectedCriteriaDetails(selectedCriteriaId);
    if (criteria) {
      return criteria.id;
    }
  }

  /**
   * Initialize required state data after 'getPromotionDetails' and there is no criteria selected yet.
   *
   * @memberof PurchaseFuelPromoDetails
   */
  initializeStateData() {
    const {selectedCriteriaId} = this.state;
    if (
      !selectedCriteriaId &&
      this.promotion &&
      this.promotion.segmentsData &&
      this.promotion.segmentsData.length
    ) {
      this.setState({
        selectedCriteriaId: this.initializeCriteriaId(
          this.promotion.segmentsData,
        ),
        amount: this.initializeFuelAmount(this.promotion.segmentsData),
      });
    }
  }

  /**
   * Initialize required purchase store data after 'getPromotionDetails'.
   *
   * @memberof PurchaseFuelPromoDetails
   */
  initializePurchaseStoreData() {
    if (!this.purchase.promotion.id) {
      this.purchase.promotion.id = this.promotion && this.promotion.id;
    }
    if (!this.purchase.promotion.segmentId) {
      this.purchase.promotion.segmentId = this.initializePromotionSegmentId(
        this.promotion && this.promotion.segmentsData,
      );
    }
  }

  /**
   * Get promotion details method call
   *
   * @param {boolean} [backgroundLoading=false]
   * @memberof PurchaseFuelPromoDetails
   */
  getPromotionDetails(backgroundLoading = false) {
    this.promotion
      .getPromotionDetails(backgroundLoading)
      .then(result => {
        this.promotion.reset();
        this.promotion.set(result, true);
        this.initializeStateData();
        this.initializePurchaseStoreData();
      })
      .catch(error => {
        if (!backgroundLoading) {
          showMessage({
            message:
              error && error.details && error.details.displayMessage
                ? error.details.displayMessage
                : 'Unable to load promotion details, try again later',
          });
        }
      });
  }

  componentDidMount() {
    if (
      this.promotion &&
      this.promotion.id &&
      this.promotion.title &&
      this.promotion.description
    ) {
      this.getPromotionDetails(true);
    } else {
      this.getPromotionDetails();
    }
  }

  componentWillMount() {
    this.checkExpiredPromotion();
    this.props.navigation.setParams({
      right: (
        <NavBarInfoButton
          onClick={this.props.onClickInfoButton.bind(this)}
          shareLink={this.shareData.bind(this)}
        />
      ),
    });
  }

  shareData() {
    return new Promise((resolve, reject) => {
      this.promotion
        .getPromotionUrl()
        .then(url => {
          resolve(AppStrings.promotionShareMessage.replace('<url>', url));
        })
        .catch(e => {
          reject(e);
        });
    });
  }

  _keyExtractor = item => item.id;

  /**
   * Return the criteria reward value info
   *
   * @param {Object} criteria Criteria item
   * @return {String}
   * @memberof PurchaseFuelPromoDetails
   */
  getCriteriaRewardValue(criteria) {
    if (criteria.isPercentage) {
      return criteria.reward + '% FP';
    } else {
      return criteria.reward + ' FP';
    }
  }

  renderCriteria(item) {
    return (
      <View style={styles.criteriaItemView}>
        <Criteria
          color1={AppColors.fuelColor1}
          color2={AppColors.fuelColor2}
          range={this.getRange(item)}
          reward={this.getCriteriaRewardValue(item)}
          selected={this.state.selectedCriteriaId === item.id ? true : false}
          onPress={() => this.setSelectedCriteria(item.id)}
          checkBox={true}
        />
      </View>
    );
  }

  getRange(item) {
    if (this.promotion && this.promotion.valueType) {
      if (item.minQuantity === item.maxQuantity) {
        return this.promotion.valueType.unit + ' ' + item.minQuantity;
      } else {
        return (
          this.promotion.valueType.unit +
          ' ' +
          item.minQuantity +
          ' - ' +
          this.promotion.valueType.unit +
          ' ' +
          item.maxQuantity
        );
      }
    }
  }

  /**
   * Set amount value on select a criteria
   *
   * @param {String} selectedCriteriaId
   * @memberof PurchaseFuelPromoDetails
   */
  setAmountValueOnSelectCriteria(selectedCriteriaId) {
    let criteria = this.selectedCriteriaDetails(selectedCriteriaId);
    if (criteria) {
      if (criteria.minQuantity === criteria.maxQuantity) {
        this.setState({
          amount: criteria.maxQuantity,
        });
      } else {
        this.setState({
          amount: criteria.minQuantity,
        });
      }
    }
  }

  setSelectedCriteria(id) {
    this.setState({
      selectedCriteriaId: id,
    });
    this.setAmountValueOnSelectCriteria(id);
    if (this.purchase.promotion) {
      this.purchase.promotion.segmentId = id;
    }
  }

  // viewNext() {
  //   if (this.state.selectedCriteriaId) {
  //     let criteria = this.props.promotion.segmentsData.find(
  //       item => item.id === this.state.selectedCriteriaId,
  //     );
  //     this.props.renderPaymentDetails({
  //       promotion: this.props.promotion,
  //       criteria: criteria,
  //       vehicleInfo: this.props.vehicleInfo,
  //       isFromVehicleCan: this.props.isFromVehicleCan ? true : false,
  //     });
  //   } else {
  //     showMessage({
  //       message: 'Please select a criteria to continue!',
  //     });
  //   }
  // }

  openRazorpay(purchase, onSucess, onError) {
    let value =
      purchase.amount.value +
      (purchase.amount.convenienceFee ? purchase.amount.convenienceFee : 0);
    let options = {
      description: this.promotion && this.promotion.title,
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
   * Promotions loading method call
   *
   * @memberof PurchaseFuelPromoDetails
   */
  loadPromotionsList() {
    NewPromotions.getPromotionsList({backgroundLoading: true});
  }

  completePurchase() {
    this.loading = false;
    this.state.fullPageLoading = true;
    this.purchase.completePurchase().then(data => {
      if (data) {
        this.loadPromotionsList();
        this.purchase.loading = false;
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

  viewNext() {
    let criteria = this.selectedCriteriaDetails(this.state.selectedCriteriaId);
    if (!this.state.selectedCriteriaId) {
      showMessage({
        message: 'Please select a criteria to continue!',
      });
    } else if (!this.state.amount) {
      showMessage({
        message: 'Please Enter the Amonut',
      });
    } else if (
      criteria &&
      (this.state.amount < criteria.minQuantity ||
        this.state.amount > criteria.maxQuantity)
    ) {
      showMessage({
        message: 'Please enter an amount within the selected range',
      });
    } else {
      this.loading = true;
      this.purchase.loading = true;
      this.purchase.amount.value = this.state.amount;
      this.purchase.amount.convenienceFee = this.getConvenientFee();
      this.purchase.vendorId =
        this.promotion && this.promotion.vendor && this.promotion.vendor._id;
      this.purchase.from = this.promotion && this.promotion.promotedBy;

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
              message: 'Unable to purchase promotion, try again later',
            });
          }
        })
        .catch(errorDetails => {
          showMessage({
            message:
              errorDetails &&
              errorDetails.details &&
              errorDetails.details.displayMessage
                ? errorDetails.details.displayMessage
                : 'Unable to purchase promotion, try again later',
          });
        });
    }
  }

  renderFooterView() {
    if (this.promotion && this.promotion.status === 'ACTIVE') {
      return (
        <View style={styles.waitingView}>
          <Text style={[AppStyles.titleText, AppStyles.whiteText]}>
            Waiting for Confirmation...
          </Text>
        </View>
      );
    } else {
      return (
        <View>
          <View style={styles.criteriaView}>
            <FlatList
              data={this.promotion && this.promotion.segmentsData}
              keyExtractor={this._keyExtractor}
              renderItem={({item}) => this.renderCriteria(item)}
              extraData={JSON.stringify({
                itemId: this.state.selectedCriteriaId,
              })}
            />
          </View>
        </View>
      );
    }
  }

  renderROPromoWarning() {
    let vendor = this.promotion && this.promotion.vendor;
    if (vendor) {
      if (vendor.role === AppConstants.userTypes.oleum) {
        return (
          <View style={styles.mrCanWaringView}>
            <View style={styles.canImageView}>
              <Image
                style={styles.mrCanImage}
                resizeMode={'stretch'}
                source={AppResources.mrCan}
              />
            </View>

            <View style={[AppStyles.flex1, styles.mrCanWarningContentView]}>
              <Text style={[AppStyles.regularBoldText, AppStyles.whiteText]}>
                You can dispense fuel using Oleum FP at any Oleum enabled fuel
                stations
              </Text>
            </View>
          </View>
        );
      } else {
        return (
          <View style={styles.mrCanWaringView}>
            <View style={styles.canImageView}>
              <Image
                style={styles.roCanImage}
                resizeMode={'stretch'}
                source={AppResources.addFuel}
              />
            </View>

            <View style={[AppStyles.flex1, styles.mrCanWarningContentView]}>
              <Text style={[AppStyles.regularBoldText, AppStyles.whiteText]}>
                {'You can dispense fuel using this FP only at ' +
                  vendor.title +
                  ', '}
                {vendor.address && vendor.address.street
                  ? vendor.address.street
                  : ''}
              </Text>
            </View>
          </View>
        );
      }
    }
  }

  /**
   * Selected criteria details
   *
   * @param {String} selectedCriteriaId
   * @return {Object}
   * @memberof PurchaseFuelPromoDetails
   */
  selectedCriteriaDetails(selectedCriteriaId) {
    const {promotion} = this.props;
    let segmentsData =
      this.promotion && this.promotion.segmentsData
        ? this.promotion.segmentsData
        : promotion && promotion.segmentsData
        ? promotion.segmentsData
        : null;
    let criteria =
      selectedCriteriaId &&
      segmentsData &&
      segmentsData.length &&
      segmentsData.find(item => item.id === selectedCriteriaId);
    return criteria;
  }

  /**
   * Enter amount label text
   *
   * @return {Component}
   * @memberof PurchaseFuelPromoDetails
   */
  renderEnterAmountLabel() {
    return (
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
    );
  }

  /**
   * Render price range
   *
   * @return {Component}
   * @memberof PurchaseFuelPromoDetails
   */
  renderPriceRange() {
    let criteria = this.selectedCriteriaDetails(this.state.selectedCriteriaId);
    if (criteria) {
      if (criteria.minQuantity === criteria.maxQuantity) {
        return null;
      } else {
        return (
          <View>
            <View style={styles.fpInputTitleView}>
              <Text style={[AppStyles.regularBoldText]}>
                How much FP you like to buy?
              </Text>
              <Text style={[AppStyles.smallText]}>
                {'Selected range ' +
                  '₹ ' +
                  criteria.minQuantity +
                  ' - ' +
                  '₹ ' +
                  criteria.maxQuantity}
              </Text>
            </View>
            {this.renderAmountTextInputField()}
          </View>
        );
      }
    }
  }

  /**
   * Render amount text input field
   *
   * @return {Component}
   * @memberof PurchaseFuelPromoDetails
   */
  renderAmountTextInputField() {
    let criteria = this.selectedCriteriaDetails(this.state.selectedCriteriaId);
    return (
      <View>
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
              style={[AppStyles.titleBoldText, styles.inputView]}
              // autoFocus={true}
              maxLength={10}
              value={String(this.state.amount)}
              onChangeText={amount => {
                let amountValue = amount.replace(/[^0-9]/gi, '');
                this.setState({
                  amount: Number(amountValue),
                });
              }}
              editable={
                criteria && criteria.minQuantity === criteria.maxQuantity
                  ? false
                  : true
              }
            />
          </View>
        </View>
      </View>
    );
  }

  /**
   * Calculate the reward FP amount when the reward is in percentage
   *
   * @param {Number} amount Amount entered
   * @param {Number} rewardPercentage Reward percentage value
   * @return {Number} Reward FP amount
   * @memberof PurchaseFuelPromoDetails
   */
  getPercentageRewardPoint(amount, rewardPercentage) {
    let percentageRewardPoint = 0;
    if (rewardPercentage && amount) {
      percentageRewardPoint = amount * (rewardPercentage / 100);
    }
    return Number(percentageRewardPoint.toFixed(2));
  }

  /**
   * Return the reward FP text when the reward is in percentage
   *
   * @param {Number} amount Amount entered
   * @param {Number} rewardPercentage Reward percentage value
   * @return {Text}
   * @memberof PurchaseFuelPromoDetails
   */
  percentageRewardPointsText(amount, rewardPercentage) {
    if (amount && rewardPercentage) {
      return (
        ' ' +
        (amount + this.getPercentageRewardPoint(rewardPercentage, amount)) +
        ' FP (' +
        rewardPercentage +
        '%)'
      );
    } else {
      return null;
    }
  }

  /**
   * Return the reward FP value
   *
   * @param {Object} criteria Selected criteria
   * @param {Number} amount Amount entered
   * @return {String}
   * @memberof PurchaseFuelPromoDetails
   */
  getRewardPointsValue(criteria, amount) {
    if (
      amount &&
      amount >= criteria.minQuantity &&
      amount <= criteria.maxQuantity
    ) {
      if (criteria.isPercentage) {
        return this.percentageRewardPointsText(amount, criteria.reward);
      } else {
        return ' ' + (amount + criteria.reward) + ' FP';
      }
    } else {
      if (criteria.isPercentage) {
        return this.percentageRewardPointsText(
          criteria.minQuantity,
          criteria.reward,
        );
      } else {
        return ' ' + (criteria.minQuantity + criteria.reward) + ' FP';
      }
    }
  }

  /**
   * Render fuel point reward section based on the amount
   *
   * @return {Component}
   * @memberof PurchaseFuelPromoDetails
   */
  renderRewardPoints() {
    const {amount} = this.state;
    let criteria = this.selectedCriteriaDetails(this.state.selectedCriteriaId);
    if (criteria && this.getRewardPointsValue(criteria, amount)) {
      return (
        <View style={styles.totalFPView}>
          <Text style={[AppStyles.regularText, AppStyles.darkText]}>
            <Text>You will get</Text>
            <Text style={[AppStyles.regularBoldText, AppStyles.darkText]}>
              {this.getRewardPointsValue(criteria, amount)}
            </Text>
          </Text>
        </View>
      );
    }
  }

  /**
   * Render total amount summary section
   *
   * @return {Component}
   * @memberof PurchaseFuelPromoDetails
   */
  renderTotalAmountSummarySection() {
    return (
      <View style={styles.totalAmountSummeryView}>
        {this.renderAmountView('Order Amount', this.state.amount)}
        <View style={styles.hline} />
        {this.renderAmountView('Convenience Fee', this.getConvenientFee())}
        <View style={styles.hline} />
        {this.renderAmountView(
          AppStrings.totalPayable,
          this.getTotalPayable(),
          true,
        )}
      </View>
    );
  }

  /**
   * Amount component used in total amount summary section
   *
   * @param {String} title Amount label
   * @param {Number} value Amount value
   * @param {Boolean} bold Label text bold or not flag
   * @return {*}
   * @memberof PurchaseFuelPromoDetails
   */
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

  /**
   * Calculate and return convenience fee based on the amount entered and actual convenience fee in the config store.
   *
   * @return {Number}
   * @memberof PurchaseFuelPromoDetails
   */
  getConvenientFee() {
    const {amount} = this.state;
    if (amount && amount > 0) {
      let value = amount * (Config.getConvenienceFee / 100);
      return Number(value.toFixed(2));
    }
  }

  /**
   * Calculate and return the total payable amount
   *
   * @return {Number}
   * @memberof PurchaseFuelPromoDetails
   */
  getTotalPayable() {
    const {amount} = this.state;
    if (
      amount &&
      this.getConvenientFee() &&
      amount > 0 &&
      this.getConvenientFee() > 0
    ) {
      return Number((amount + this.getConvenientFee()).toFixed(2));
    } else if (amount && amount > 0) {
      return Number(amount.toFixed(2));
    } else {
      return '00.00';
    }
  }

  /**
   * Action on enable or disable the checkbox
   *
   * @memberof PurchaseFuelPromoDetails
   */
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

  /**
   * Render checkbox for enable purchase fuel point purchase to vehicle
   *
   * @return {Component}
   * @memberof PurchaseFuelPromoDetails
   */
  renderPurchaseToVehicleCheckbox() {
    if (Vehicles.list && Vehicles.list.length) {
      return (
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
              labelStyle={[AppStyles.regularText, styles.checkboxLabelStyle]}
              label={'Purchase to vehicle'}
            />
          </View>
        </TouchableOpacity>
      );
    } else {
      return null;
    }
  }

  /**
   * Render vehicle list after enabled purchase to vehicle checkbox
   *
   * @return {Component}
   * @memberof PurchaseFuelPromoDetails
   */
  renderVehiclesList() {
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

  /**
   * Render selected vehicle
   *
   * @return {Component}
   * @memberof PurchaseFuelPromoDetails
   */
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

  /**
   * Action on click select vehicle
   * Open vehicle list lightBox
   *
   * @memberof PurchaseFuelPromoDetails
   */
  onPressSelectVehicle() {
    this.props.renderVehicleList({
      vehicleList: Vehicles.list.slice(),
      onPress: this.onSelectVehicle.bind(this),
    });
  }

  /**
   * Action on select vehicle
   *
   * @param {Object} vehicle Selected vehicle
   * @memberof PurchaseFuelPromoDetails
   */
  onSelectVehicle(vehicle) {
    this.purchase.recipientVehicle = vehicle;
  }

  /**
   * Render fuel purchase payment section
   *
   * @return {Component}
   * @memberof PurchaseFuelPromoDetails
   */
  renderFuelPurchaseAndPaymentView() {
    return (
      <View>
        {/* {this.renderEnterAmountLabel()} */}
        {this.renderPriceRange()}
        {this.renderRewardPoints()}
        {this.renderPurchaseToVehicleCheckbox()}
        {this.renderVehiclesList()}
        {this.renderTotalAmountSummarySection()}
      </View>
    );
  }

  renderPaymentLoading() {
    if (this.purchase.loading) {
      return (
        <View style={[styles.paymentLoading]}>
          <LoadingShadow />
        </View>
      );
    }
  }

  renderShareView() {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.shareMainView}
        onPress={() => this.onShare()}>
        <View style={styles.iconView}>
          <MaterialCommunityIcons
            style={styles.shareIcon}
            name="share-variant"
          />
        </View>
        <View style={styles.shareInfoView}>
          <Text style={[AppStyles.regularBoldText, AppStyles.whiteText]}>
            Share this promotion with your friends.
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

  onShare = () => {
    try {
      this.shareData().then(message => {
        Share.share({
          message: message,
        });
      });
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  renderPromoExpiredView() {
    if (this.state.promoExpired) {
      return (
        <View style={styles.expiredView}>
          <View style={styles.expireContentView}>
            <Text style={[AppStyles.titleBoldText]}>Promotion Expired</Text>
            <Text style={[AppStyles.regularText]}>Come back later</Text>
          </View>
        </View>
      );
    }
  }

  checkExpiredPromotion() {
    let date = moment()
      .utcOffset('+05:30')
      .format('YYYY-MM-DD hh:mm:ss');
    let endDate = this.promotion && this.promotion.endDate;
    var diffr = moment.duration(moment(endDate).diff(moment(date)));
    if (diffr < 0) {
      this.setExpiredPromotionValue();
    }
  }

  setExpiredPromotionValue() {
    this.setState({promoExpired: true});
  }

  render() {
    if (
      !this.state.fullPageLoading &&
      !this.promotion.getPromotionDetailsLoading
    ) {
      return (
        <View style={AppStyles.container}>
          <ScrollView
            alwaysBounceVertical={false}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollViewContentContainer}>
            <View style={styles.promoHeaderView}>
              <PromotionDetailsHeader
                promotionItems={this.promotion}
                endDate={this.promotion.endDate}
                // counter={10}
                onFinishCount={this.setExpiredPromotionValue.bind(this)}
              />
            </View>
            {this.renderShareView()}
            <View style={styles.labelTextView}>
              <Text style={[AppStyles.regularText]}>
                {this.promotion &&
                this.promotion.valueType &&
                this.promotion.valueType.perUnit
                  ? AppStrings.purchasePriceInfo.replace(
                      '<condition>',
                      'Per Unit',
                    )
                  : AppStrings.purchasePriceInfo.replace(
                      '<condition>',
                      'Flat Rate',
                    )}
              </Text>
            </View>
            {this.renderFooterView()}
            {this.renderFuelPurchaseAndPaymentView()}
            {this.renderROPromoWarning()}
            <View style={styles.promoByView}>
              <CorporateDetails
                corporateItems={this.promotion && this.promotion.promotedBy}
                componentTitle={AppStrings.promoBy}
              />
            </View>
            <View
              style={[AppStyles.horizontalLine, AppStyles.marginHorizontal]}
            />
            <View style={styles.promoByView}>
              <CorporateDetails
                corporateItems={this.promotion && this.promotion.vendor}
                componentTitle={AppStrings.vendor}
              />
            </View>
            {/* {this.purchase.loading ? (
              <View style={styles.loadingView}>
                <LoadingSmall color={AppColors.brand.primary} />
                <Text style={[AppStyles.cairoLabelText, AppStyles.darkText]}>
                  Initializing Payment...
                </Text>
              </View>
            ) : null} */}
          </ScrollView>
          <View style={styles.buttonView}>
            <Button
              buttonText={AppStrings.proceedToPay}
              onPress={() => this.viewNext()}
            />
          </View>
          {this.renderPaymentLoading()}
          {this.renderPromoExpiredView()}
        </View>
      );
    } else {
      return (
        <View style={[AppStyles.container]}>
          <LoadingShadow />
        </View>
      );
    }
  }
}

export default PurchaseFuelPromoDetails;
