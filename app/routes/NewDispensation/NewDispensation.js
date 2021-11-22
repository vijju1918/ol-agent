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
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import {observer} from 'mobx-react';
import {showMessage} from 'react-native-flash-message';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Button from '@components/Button';
import CustomTextField from '@components/CustomTextField';
import CustomSelectField from '@components/CustomSelectField';
import SingleSelectList from '@components/SingleSelectList';
import LoadingShadow from '@components/LoadingShadow';
import Image from '@components/Image';

import Dispensations, {Dispensation} from '@stores/Dispensations';
import Products from '@stores/Products';

import {AppStyles} from '@theme';
import AppStrings from '@config/strings';
import styles from './styles';
import {AppConstants, AppResources} from '@config';

@observer
class NewDispensation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      updatedNumber: '',
      selectedFuelType: this.getSelectedFuelType(),
      fullTankData: [
        {
          id: 'yes',
          name: 'Yes',
        },
        {
          id: 'no',
          name: 'No',
        },
      ],
      lastFuelDispensedNozzleIdLoader: true,
    };
    this.dispensation = new Dispensation(props.data);
    this.initializePaymentMode();
    this.initializeCan();
  }

  componentDidMount() {
    this.initializePaymentMode();
    this.getLastFuelDispensedNozzleId();
    this.initializeCan();
  }

  //Initialize fuel type
  initializePaymentMode() {
    if (
      !this.dispensation.paymentModeId &&
      Dispensations.paymentModes &&
      Dispensations.paymentModes.length
    ) {
      let fuelPointFuelType = Dispensations.paymentModes.find(
        item => item.id === AppConstants.paymentModes.fuelPoint,
      );
      if (fuelPointFuelType && fuelPointFuelType.id) {
        this.dispensation.paymentModeId =
          fuelPointFuelType && fuelPointFuelType.id;
      }
    }
  }

  //Initialize can
  initializeCan() {
    if (
      (!this.dispensation.can || !this.dispensation.can._id) &&
      Dispensations.cans &&
      Dispensations.cans.length
    ) {
      this.dispensation.can = Dispensations.cans[0];
    }
  }

  //Return nozzle id from AsyncStorage
  nozzleIdFromAsyncStorage = async () => {
    let fuelNozzleId = '';
    try {
      fuelNozzleId = await AsyncStorage.getItem(
        AppConstants.asyncStorageKeys.lastFuelDispensedNozzleId,
      );
    } catch (error) {
      console.log(error.message);
    }
    return fuelNozzleId;
  };

  //Return last fuel dispensed nozzle id
  getLastFuelDispensedNozzleId = async () => {
    this.setState({lastFuelDispensedNozzleIdLoader: true});
    await this.nozzleIdFromAsyncStorage()
      .then(result => {
        if (result) {
          this.dispensation.fuelNozzleId = Number(result);
        }
      })
      .finally(() => this.setState({lastFuelDispensedNozzleIdLoader: false}));
  };

  getSelectedFuelType() {
    if (
      Products.sbuAndProductLinkedList &&
      Products.sbuAndProductLinkedList.length
    ) {
      if (
        this.props.data &&
        this.props.data.vehicleDetails &&
        this.props.data.vehicleDetails.fuelType
      ) {
        return Products.sbuAndProductLinkedList.find(
          item =>
            item.productData &&
            item.productData.type &&
            item.productData.type === this.props.data.vehicleDetails.fuelType,
        );
      } else {
        return null;
      }
    } else {
      return null;
    }
  }

  getTotalFuelAmount(fuelQuantity) {
    let selectedFuelPrice =
      this.state.selectedFuelType &&
      this.state.selectedFuelType.price &&
      this.state.selectedFuelType.price.value;
    let totalFuelAmount = fuelQuantity * selectedFuelPrice;
    if (totalFuelAmount > 0) {
      return (fuelQuantity * selectedFuelPrice).toFixed(2);
    }
  }

  getTotalFuelQuantity(fuelAmount) {
    let selectedFuelPrice =
      this.state.selectedFuelType &&
      this.state.selectedFuelType.price &&
      this.state.selectedFuelType.price.value;
    let totalFuelQuantity = fuelAmount / selectedFuelPrice;
    if (totalFuelQuantity > 0) {
      return (fuelAmount / selectedFuelPrice).toFixed(2);
    }
  }

  resetFuelQuantityAndAmount() {
    this.setState({
      fuelAmount: '',
      fuelQuantity: '',
    });
    this.dispensation.quantity = '';
    this.dispensation.amount = '';
  }

  onChangeRegistrationNumber(number) {
    this.dispensation.vehicleNumber = number;
  }

  onChangeMobileNumber(mobNumber) {
    this.dispensation.customerNumber = mobNumber;
  }

  onChangeFuelQuantity(fuelQuantity) {
    this.resetFuelQuantityAndAmount();
    this.dispensation.quantity = fuelQuantity;
    this.setState({
      fuelAmount: this.getTotalFuelAmount(fuelQuantity),
    });
  }

  onChangeFuelAmount(fuelAmount) {
    this.resetFuelQuantityAndAmount();
    this.dispensation.amount = fuelAmount;
    this.setState({
      fuelQuantity: this.getTotalFuelQuantity(fuelAmount),
    });
  }

  onChangeOdometerReading(odometerReading) {
    this.dispensation.currentOdometerReading = Number(
      odometerReading.replace(/[^0-9 ]/gi, ''),
    );
    this.forceUpdate();
  }

  onPressFuelTypeItem(fuelType) {
    this.resetFuelQuantityAndAmount();
    this.setState({
      selectedFuelType: fuelType,
    });
    this.dispensation.sbuProductId = fuelType && fuelType.id;
    this.dispensation.productId = fuelType && fuelType.productId;
  }

  onPressFuelNozzleItem(nozzleItem) {
    this.dispensation.fuelNozzleId = nozzleItem && nozzleItem.id;
  }

  onPressCommunityPromotionItem(communityPromotion) {
    this.dispensation.promotionId = communityPromotion && communityPromotion.id;
    this.dispensation.promotionType =
      communityPromotion && communityPromotion.type;
  }

  onPressPaymentModeItem(paymentMode) {
    this.dispensation.paymentModeId = paymentMode && paymentMode.id;
  }

  onSelectFullTankOption(data) {
    if (data && data.id && data.id === 'yes') {
      this.dispensation.isFullTank = true;
    } else {
      this.dispensation.isFullTank = false;
    }
  }

  checkFPBalance() {
    if (
      this.dispensation.can &&
      this.dispensation.can.quantity &&
      this.dispensation.amount &&
      this.dispensation.amount > this.dispensation.can.quantity
    ) {
      return true;
    } else if (
      this.dispensation.can &&
      this.dispensation.can.quantity &&
      this.state.fuelAmount &&
      this.state.fuelAmount > this.dispensation.can.quantity
    ) {
      return true;
    } else {
      return false;
    }
  }

  isPhoneNumberValid() {
    if (
      this.dispensation.numberFormat &&
      this.dispensation.numberFormat.length &&
      this.dispensation.numberFormat.length === 10 &&
      this.dispensation.numberFormat.indexOf('0') !== 0
    ) {
      return true;
    } else {
      return false;
    }
  }

  //Set fuel nozzle id to AsyncStorage
  setFuelNozzleIdToAsyncStorage() {
    if (this.dispensation.fuelNozzleId) {
      let fuelNozzleId = this.dispensation.fuelNozzleId.toString();
      AsyncStorage.setItem(
        AppConstants.asyncStorageKeys.lastFuelDispensedNozzleId,
        fuelNozzleId,
      );
    }
  }

  onPressSave() {
    const {renderReceipt} = this.props;
    if (!this.dispensation.vehicleNumber) {
      showMessage({
        message: 'Add vehicle number',
      });
    } else if (
      !this.dispensation.isPhoneNumberExist &&
      !this.isPhoneNumberValid()
    ) {
      showMessage({
        message: 'Please enter a valid phone number',
      });
    } else if (!this.dispensation.sbuProductId) {
      showMessage({
        message: 'Select fuel type',
      });
    } else if (!this.dispensation.quantity && !this.dispensation.amount) {
      showMessage({
        message: 'Enter fuel quantity or amount',
      });
    } else if (!this.dispensation.fuelNozzleId) {
      showMessage({
        message: 'Select fuel nozzle',
      });
    } else if (!this.dispensation.paymentModeId) {
      showMessage({
        message: 'Select a payment mode',
      });
    } else if (
      this.dispensation.paymentModeId === AppConstants.paymentModes.fuelPoint &&
      this.checkFPBalance()
    ) {
      showMessage({
        message: 'Insufficient Fuel Points',
      });
    } else if (
      this.dispensation.lastOdometerReading &&
      this.dispensation.lastOdometerReading > 0 &&
      this.dispensation.currentOdometerReading &&
      this.dispensation.currentOdometerReading > 0 &&
      this.dispensation.currentOdometerReading <=
        this.dispensation.lastOdometerReading
    ) {
      showMessage({
        message:
          'Your last odometer reading is ' +
          this.dispensation.lastOdometerReading +
          ' , please add current order meter reading',
      });
    } else {
      this.dispensation
        .addFuelDispenseRecord()
        .then(data => {
          showMessage({
            message: 'Dispensation added successfully',
          });
          this.setFuelNozzleIdToAsyncStorage();
          renderReceipt({data: data});
        })
        .catch(error => {
          showMessage({
            message:
              error && error.details && error.details.displayMessage
                ? error.details.displayMessage
                : 'Something went wrong, try again later',
          });
        });
    }
  }

  getSelectedItemTitle(data, selectedId) {
    let matchedData =
      data && data.length && data.find(eachItem => eachItem.id === selectedId);
    return matchedData && matchedData.title;
  }

  showLoading() {
    if (
      this.dispensation.addFuelDispensationLoading ||
      this.state.lastFuelDispensedNozzleIdLoader
    ) {
      return <LoadingShadow />;
    }
  }

  isFuelQuantityOrAmountValid(data) {
    const pattern = new RegExp(/^((\d{0,6}\.\d{0,2})|(\d{0,6}))$/g);
    if (data) {
      return pattern.test(data);
    }
  }

  onSelectCan(can) {
    this.dispensation.can = can;
  }

  renderCanItemView(can) {
    return (
      <TouchableOpacity
        activeOpacity={0.5}
        disabled={
          this.dispensation.can && this.dispensation.can._id === can._id
            ? true
            : false
        }
        style={
          this.dispensation.can && this.dispensation.can._id === can._id
            ? [AppStyles.row, styles.canItemSelectedView]
            : [AppStyles.row, styles.canItemView]
        }
        onPress={() => this.onSelectCan(can)}>
        {this.renderMrCanIconView(can)}
        <View>
          {can && can.vendor && can.vendor.title ? (
            <Text style={AppStyles.regularText}>{can.vendor.title}</Text>
          ) : null}
          {can && can.quantity ? (
            <Text style={[AppStyles.titleBoldText, styles.textSpacing]}>
              {can.quantity} FP
            </Text>
          ) : null}
        </View>
      </TouchableOpacity>
    );
  }
  renderMrCanIconView(can) {
    if (can.type === AppConstants.userTypes.oleum) {
      return (
        <View style={styles.mrCanView}>
          <Image style={[styles.mrCanImage]} source={AppResources.mrCan} />
        </View>
      );
    }
  }

  renderCanView() {
    if (Dispensations.cans && Dispensations.cans.length) {
      return (
        <View style={styles.canSelectionView}>
          <Text style={AppStyles.regularText}>Select Can</Text>
          <View style={styles.cansView}>
            {Dispensations.cans.map(item => this.renderCanItemView(item))}
          </View>
        </View>
      );
    } else {
      return null;
    }
  }

  productList(data) {
    if (data && data.length) {
      if (this.dispensation.productType) {
        return data.filter(
          item =>
            item.productData &&
            item.productData.type &&
            item.productData.type === this.dispensation.productType,
        );
      } else {
        return data;
      }
    } else {
      return [];
    }
  }

  render() {
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : ''}
        keyboardVerticalOffset={100}
        style={[AppStyles.containerWhite, styles.mainView]}>
        <ScrollView
          alwaysBounceVertical={false}
          showsVerticalScrollIndicator={false}>
          <View style={styles.infoView}>
            <Text style={[AppStyles.regularText, AppStyles.darkText]}>
              Add details of vehicle
            </Text>
          </View>
          {this.renderCanView()}
          <View style={styles.detailsInputView}>
            <View style={styles.inputView}>
              <CustomTextField
                disabled={true}
                label={'Registration Number'}
                placeholder={'Enter registration number'}
                value={this.dispensation.vehicleNumber}
                autoCapitalize={'characters'}
                onChangeText={regNumber => {
                  this.onChangeRegistrationNumber(regNumber);
                }}
              />
            </View>
            {!this.dispensation.isPhoneNumberExist ? (
              <View style={styles.inputView}>
                <CustomTextField
                  label={'Customer mobile Number'}
                  placeholder={'Enter customer mobile number'}
                  leftAccessory={'+91'}
                  keyboardType={'number-pad'}
                  value={this.dispensation.numberFormat}
                  extraData={this.state.updatedNumber}
                  onChangeText={mobNumber => {
                    this.dispensation.updateNumber(mobNumber);
                    this.setState({updatedNumber: mobNumber});
                  }}
                  maxLength={10}
                />
              </View>
            ) : null}
            <View style={styles.inputView}>
              <CustomSelectField
                label={'Product Type'}
                placeholder={'Select fuel type'}
                value={this.getSelectedItemTitle(
                  this.productList(Products.sbuAndProductLinkedList),
                  this.dispensation.sbuProductId,
                )}
                onPress={() =>
                  this.props.renderList({
                    data: this.productList(Products.sbuAndProductLinkedList),
                    onPress: this.onPressFuelTypeItem.bind(this),
                  })
                }
              />
            </View>
            <View style={styles.inputView}>
              <CustomTextField
                label={'Fuel quantity (L)'}
                placeholder={'Enter fuel quantity'}
                keyboardType={'number-pad'}
                disabled={!this.dispensation.sbuProductId ? true : false}
                value={
                  this.dispensation.quantity
                    ? this.dispensation.quantity
                    : this.state.fuelQuantity
                    ? this.state.fuelQuantity
                    : ''
                }
                onChangeText={fuelQuantity => {
                  if (
                    !fuelQuantity ||
                    this.isFuelQuantityOrAmountValid(fuelQuantity)
                  ) {
                    this.onChangeFuelQuantity(fuelQuantity);
                  } else {
                    this.forceUpdate();
                  }
                }}
              />
            </View>
            <View style={styles.inputView}>
              <CustomTextField
                label={'Fuel amount (₹)'}
                placeholder={'Enter fuel amount'}
                keyboardType={'number-pad'}
                disabled={!this.dispensation.sbuProductId ? true : false}
                value={
                  this.dispensation.amount
                    ? this.dispensation.amount
                    : this.state.fuelAmount
                    ? this.state.fuelAmount
                    : ''
                }
                onChangeText={fuelAmount => {
                  if (
                    !fuelAmount ||
                    this.isFuelQuantityOrAmountValid(fuelAmount)
                  ) {
                    this.onChangeFuelAmount(fuelAmount);
                  } else {
                    this.forceUpdate();
                  }
                }}
              />
            </View>
            <View style={styles.inputView}>
              <CustomSelectField
                label={'Payment Mode'}
                placeholder={'Select payment mode'}
                value={this.getSelectedItemTitle(
                  Dispensations.paymentModes,
                  this.dispensation.paymentModeId,
                )}
                onPress={() =>
                  this.props.renderList({
                    data: Dispensations.paymentModes,
                    onPress: this.onPressPaymentModeItem.bind(this),
                  })
                }
              />
            </View>
            <View style={styles.inputView}>
              <CustomTextField
                label={'Odometer reading (Optional)'}
                placeholder={'Enter odometer reading'}
                maxLength={7}
                value={this.dispensation.currentOdometerReading}
                keyboardType={'number-pad'}
                onChangeText={odometerReading => {
                  this.onChangeOdometerReading(odometerReading);
                }}
              />
              {this.dispensation.lastOdometerReading &&
              this.dispensation.lastOdometerReading > 0 ? (
                <View>
                  <Text>
                    Last odometer reading :{' '}
                    {this.dispensation.lastOdometerReading}
                  </Text>
                </View>
              ) : null}
            </View>
            <View style={styles.inputView}>
              <SingleSelectList
                label={'Are you filling the tank'}
                data={this.state.fullTankData}
                onSelectOption={this.onSelectFullTankOption.bind(this)}
              />
            </View>
            <View style={styles.inputView}>
              <CustomSelectField
                label={'Fuel nozzle'}
                placeholder={'Select fuel nozzle'}
                value={this.getSelectedItemTitle(
                  Dispensations.nozzles,
                  this.dispensation.fuelNozzleId,
                )}
                onPress={() =>
                  this.props.renderList({
                    data: Dispensations.nozzles,
                    onPress: this.onPressFuelNozzleItem.bind(this),
                  })
                }
              />
            </View>
            {this.dispensation.getActiveCommunityPromotions.length ? (
              <View style={styles.inputView}>
                <CustomSelectField
                  label={'Community (Optional)'}
                  placeholder={'Select community'}
                  value={this.getSelectedItemTitle(
                    this.dispensation.getActiveCommunityPromotions,
                    this.dispensation.promotionId,
                  )}
                  onPress={() =>
                    this.props.renderListWithThumbnail({
                      data: this.dispensation.getActiveCommunityPromotions,
                      onPress: this.onPressCommunityPromotionItem.bind(this),
                    })
                  }
                />
              </View>
            ) : null}
          </View>
          <View style={styles.buttonView}>
            <Button
              buttonText={AppStrings.save}
              onPress={() => this.onPressSave()}
            />
          </View>
        </ScrollView>
        {this.showLoading()}
      </KeyboardAvoidingView>
    );
  }
}

export default NewDispensation;
