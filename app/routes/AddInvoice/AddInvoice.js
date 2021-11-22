/**
 * Copyright (c) 2018-present, Oleum. All rights reserved.
 *
 */
'use strict';

import React, {Component} from 'react';
import {View, ScrollView, Text, TouchableOpacity} from 'react-native';
import {observer} from 'mobx-react';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment-timezone';
import {showMessage} from 'react-native-flash-message';

import Button from '@components/Button';
import CustomTextField from '@components/CustomTextField';
import CustomSelectField from '@components/CustomSelectField';
import SingleSelectList from '@components/SingleSelectList';
import LoadingShadow from '@components/LoadingShadow';

import {Dispensation} from '@stores/Dispensations';
import VehicleDetails from '@stores/VehicleDetails';
import Vehicles from '@stores/Vehicles';

import {AppStyles} from '@theme';
import AppStrings from '@config/strings';
import styles from './styles';
import {getDateTimeString} from '@lib/utils';

@observer
class AddInvoice extends Component {
  constructor(props) {
    super(props);
    if (props.addInvoice && props.vehicleData) {
      this.dispensation = new Dispensation(
        this.getAddInvoiceData(props.vehicleData),
        false,
        true,
      );
    } else if (props.editInvoice && props.dispensationData) {
      this.dispensation = new Dispensation(
        this.getEditInvoiceData(props.dispensationData),
        false,
        true,
      );
    } else {
      this.dispensation = new Dispensation();
    }
    this.state = {
      isDateTimePickerVisible: false,
      date: this.dispensation.dispensedAt ? this.dispensation.dispensedAt : '',
      selectedFuelType: {},
      fuelAmount: '',
      fuelQuantity: '',
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
    };
  }

  getAddInvoiceData(vehicleData) {
    return {
      vehicleId: vehicleData && vehicleData.id,
      fuelType: vehicleData && vehicleData.fuelTypeId,
      fuelTitle: this.getProductTitle(vehicleData && vehicleData.fuelTypeId),
      lastOdometer: vehicleData && vehicleData.odometer,
    };
  }

  getEditInvoiceData(dispensationData) {
    return {
      dispensationId: dispensationData.id,
      vehicleId:
        dispensationData &&
        dispensationData.vehicleDetails &&
        dispensationData.vehicleDetails.id,
      fuelType:
        dispensationData &&
        dispensationData.product &&
        dispensationData.product.type,
      fuelTitle:
        dispensationData &&
        dispensationData.product &&
        dispensationData.product.title,
      currentOdometer:
        dispensationData &&
        dispensationData.vehicleDetails &&
        dispensationData.vehicleDetails.odometer,
      lastOdometer:
        dispensationData &&
        dispensationData.vehicleDetails &&
        dispensationData.vehicleDetails.odometer,
      productPrice:
        dispensationData &&
        dispensationData.product &&
        dispensationData.product.price &&
        dispensationData.product.price.value,
      amount:
        dispensationData &&
        dispensationData.paymentDetails &&
        dispensationData.paymentDetails.amountPaid &&
        dispensationData.paymentDetails.amountPaid.value,
      quantity: dispensationData && dispensationData.dispensedQuantity,
      isFullTank: dispensationData && dispensationData.isFullTank,
      dispensedAt: dispensationData && dispensationData.dispensedAt,
      fuelStationTitle: dispensationData && dispensationData.sbu.name,
      fuelStationAddressText:
        dispensationData && dispensationData.sbu.addressText,
      fuelStationLocation: dispensationData && dispensationData.sbu.location,
    };
  }

  getProductTitle(fuelTypeId) {
    let matchedFuelType =
      VehicleDetails.vehicleInfo &&
      VehicleDetails.vehicleInfo.fuelTypes &&
      VehicleDetails.vehicleInfo.fuelTypes.length &&
      VehicleDetails.vehicleInfo.fuelTypes.find(
        eachItem => eachItem.id === fuelTypeId,
      );
    return matchedFuelType && matchedFuelType.title;
  }

  _showDateTimePicker = () =>
    this.setState({
      isDateTimePickerVisible: true,
    });

  _hideDateTimePicker = () =>
    this.setState({
      isDateTimePickerVisible: false,
    });

  _handleDateTimePicked = date => {
    if (
      moment(date)
        .tz(moment.tz.guess())
        .isAfter(moment(), 'date')
    ) {
      this._hideDateTimePicker();
      showMessage({
        message: 'Please select a valid date!',
      });
    } else if (moment(date).isSameOrAfter(moment(), 'hh:mm a')) {
      this._hideDateTimePicker();
      showMessage({
        message: 'Please select a valid time!',
      });
    } else {
      this._hideDateTimePicker();
      this.dispensation.dispensedAt = date;
    }
  };

  onChangeOdometerReading(odometerReading) {
    this.dispensation.currentOdometerReading = Number(odometerReading);
  }

  resetFuelQuantityAndAmount() {
    this.setState({
      fuelAmount: '',
      fuelQuantity: '',
    });
    this.dispensation.quantity = '';
    this.dispensation.amount = '';
  }

  onSelectFullTankOption(data) {
    if (data && data.id && data.id === 'yes') {
      this.dispensation.isFullTank = true;
    } else {
      this.dispensation.isFullTank = false;
    }
  }

  getTotalFuelAmount(fuelQuantity) {
    let totalFuelAmount = fuelQuantity * this.dispensation.productPrice;
    if (totalFuelAmount > 0) {
      this.dispensation.amount = totalFuelAmount.toFixed(2);
      return (fuelQuantity * this.dispensation.productPrice).toFixed(2);
    }
  }

  getTotalFuelQuantity(fuelAmount) {
    let totalFuelQuantity = fuelAmount / this.dispensation.productPrice;
    if (totalFuelQuantity > 0) {
      this.dispensation.quantity = totalFuelQuantity.toFixed(2);
      return (fuelAmount / this.dispensation.productPrice).toFixed(2);
    }
  }

  onChangeFuelLitrePrice(fuelLitrePrice) {
    this.resetFuelQuantityAndAmount();
    if (!Number(fuelLitrePrice) || Number(fuelLitrePrice) === 0) {
      showMessage({
        message: 'Please enter a valid fuel price',
      });
    }
    this.dispensation.productPrice = fuelLitrePrice;
  }

  onChangeFuelAmount(fuelAmount) {
    this.resetFuelQuantityAndAmount();
    this.dispensation.amount = fuelAmount;
    this.setState({
      fuelQuantity: this.getTotalFuelQuantity(fuelAmount),
    });
  }

  onChangeFuelQuantity(fuelQuantity) {
    this.resetFuelQuantityAndAmount();
    this.dispensation.quantity = fuelQuantity;
    this.setState({
      fuelAmount: this.getTotalFuelAmount(fuelQuantity),
    });
  }

  setFuelStationData(title, addressText, location) {
    this.dispensation.fuelStationTitle = title;
    this.dispensation.fuelStationAddressText = addressText;
    this.dispensation.fuelStationLocation = location;
  }

  updateVehicleDetails(selectedVehicleId) {
    if (selectedVehicleId) {
      if (Vehicles.list && Vehicles.list.length) {
        let matchedVehicleData = Vehicles.list.find(
          eachVehicle => eachVehicle.id === selectedVehicleId,
        );
        if (matchedVehicleData && matchedVehicleData.id) {
          this.props.dispensationsStoreData.updateVehicle(matchedVehicleData);
        }
      }
    }
  }

  onPressSave() {
    if (!this.dispensation.dispensedAt) {
      showMessage({
        message: 'Select date and time',
      });
    } else if (!this.dispensation.amount) {
      showMessage({
        message: 'Enter fuel amount',
      });
    } else if (!this.dispensation.quantity) {
      showMessage({
        message: 'Enter fuel quantity',
      });
    } else if (!this.dispensation.fuelStationTitle) {
      showMessage({
        message: 'Select fuel station',
      });
    } else {
      this.dispensation
        .addOrUpdateDispensation()
        .then(() => {
          if (
            this.props.isFromInvoiceDetails &&
            this.props.dispensationData &&
            this.props.dispensationData.referenceId
          ) {
            this.props.invoiceDetailsDispensationsStoreData.getDispensationDetails(
              this.props.dispensationData.referenceId,
            );
          }
          this.updateVehicleDetails(
            this.props.dispensationsStoreData &&
              this.props.dispensationsStoreData.selectedVehicle &&
              this.props.dispensationsStoreData.selectedVehicle.id,
          );
          this.props.dispensationsStoreData.load();
          this.props.onBack();
          if (this.props.addInvoice) {
            showMessage({
              message: 'Invoice added successfully',
            });
          } else {
            showMessage({
              message: 'Invoice updated successfully',
            });
          }
        })
        .catch(error =>
          showMessage({
            message:
              error && error.details && error.details.displayMessage
                ? error.details.displayMessage
                : 'Something went wrong, try again later',
          }),
        );
    }
  }

  renderLoading() {
    if (this.dispensation.addOrUpdateDispensationLoading) {
      return (
        <View style={[styles.container, styles.mainView]}>
          <LoadingShadow />
        </View>
      );
    }
  }

  render() {
    return (
      <View style={[AppStyles.containerWhite, styles.mainView]}>
        <ScrollView
          alwaysBounceVertical={false}
          showsVerticalScrollIndicator={false}>
          <View style={styles.infoView}>
            <Text style={[AppStyles.regularText, AppStyles.darkText]}>
              Add details of your vehicle
            </Text>
          </View>
          <View style={styles.detailsInputView}>
            <View style={[AppStyles.row, styles.inputView]}>
              <TouchableOpacity
                style={AppStyles.flex1}
                onPress={this._showDateTimePicker}>
                <CustomTextField
                  label={'Date and Time'}
                  placeholder={'Select date and time'}
                  value={getDateTimeString(
                    this.dispensation.dispensedAt,
                    'DD MMMM YYYY, hh:mm a',
                  )}
                  hideIcon={true}
                  disabled={true}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.inputView}>
              <CustomTextField
                label={'Odometer (Optional)'}
                // subLabel={'Last Odometer ' + '5000'}
                placeholder={'Enter odometer reading'}
                value={this.dispensation.currentOdometerReading}
                keyboardType={'number-pad'}
                onChangeText={odometerReading => {
                  this.onChangeOdometerReading(odometerReading);
                }}
              />
              {!this.props.editInvoice &&
              this.dispensation.lastOdometerReading &&
              this.dispensation.lastOdometerReading > 0 ? (
                <View>
                  <Text style={AppStyles.smallText}>
                    Last odometer reading :{' '}
                    {this.dispensation.lastOdometerReading + ' km'}
                  </Text>
                </View>
              ) : null}
            </View>
            <View style={styles.inputView}>
              <CustomSelectField
                label={'Fuel'}
                placeholder={'Select fuel'}
                disabled={true}
                value={this.dispensation.productTitle}
                onPress={() => {}}
              />
            </View>
            <View style={[AppStyles.row, styles.inputView]}>
              <CustomTextField
                label={'Price/L'}
                placeholder={'Price'}
                keyboardType={'number-pad'}
                value={this.dispensation.productPrice}
                onChangeText={fuelLitrePrice => {
                  this.onChangeFuelLitrePrice(fuelLitrePrice);
                }}
              />
              <View style={styles.inputSpacing} />
              <CustomTextField
                label={'Total cost (₹)'}
                placeholder={'Amount'}
                hideIcon={true}
                keyboardType={'number-pad'}
                disabled={
                  !this.dispensation.productPrice ||
                  Number(this.dispensation.productPrice) === 0
                    ? true
                    : false
                }
                value={
                  this.dispensation.amount
                    ? this.dispensation.amount
                    : this.state.fuelAmount
                    ? this.state.fuelAmount
                    : ''
                }
                onChangeText={fuelAmount => {
                  this.onChangeFuelAmount(fuelAmount);
                }}
              />
              <View style={styles.inputSpacing} />
              <CustomTextField
                label={'Quantity (L)'}
                placeholder={'Quantity'}
                hideIcon={true}
                keyboardType={'number-pad'}
                disabled={
                  !this.dispensation.productPrice ||
                  Number(this.dispensation.productPrice) === 0
                    ? true
                    : false
                }
                value={
                  this.dispensation.quantity
                    ? this.dispensation.quantity
                    : this.state.fuelQuantity
                    ? this.state.fuelQuantity
                    : ''
                }
                onChangeText={fuelQuantity => {
                  this.onChangeFuelQuantity(fuelQuantity);
                }}
              />
            </View>
            <View style={styles.inputView}>
              <SingleSelectList
                label={'Are you filling the tank (Optional)'}
                data={this.state.fullTankData}
                selectedData={
                  this.props.editInvoice
                    ? this.dispensation.isFullTank
                      ? {
                          id: 'yes',
                          name: 'Yes',
                        }
                      : {
                          id: 'no',
                          name: 'No',
                        }
                    : {}
                }
                onSelectOption={this.onSelectFullTankOption.bind(this)}
              />
            </View>
            <View style={styles.inputView}>
              <TouchableOpacity
                onPress={() =>
                  this.props.renderROSearch({
                    onPressFuelStationItem: (title, addressText, location) =>
                      this.setFuelStationData(title, addressText, location),
                  })
                }>
                <CustomTextField
                  label={'Gas station'}
                  placeholder={'Enter name of the gas station'}
                  disabled={true}
                  multiline={true}
                  value={
                    this.dispensation.fuelStationTitle +
                    this.dispensation.fuelStationAddressText
                  }
                />
              </TouchableOpacity>
            </View>
          </View>
          {this.renderLoading()}
        </ScrollView>
        <View style={styles.buttonView}>
          <Button
            buttonText={AppStrings.save}
            onPress={() => this.onPressSave()}
          />
        </View>
        <DateTimePicker
          // titleIOS={'Pick a time'}
          isVisible={this.state.isDateTimePickerVisible}
          value={new Date()}
          onConfirm={this._handleDateTimePicked}
          onCancel={this._hideDateTimePicker}
          mode={'datetime'}
          is24Hour={false}
          datePickerModeAndroid={'calendar'}
        />
      </View>
    );
  }
}

export default AddInvoice;
