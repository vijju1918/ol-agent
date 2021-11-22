/**
 * Copyright (c) 2018-present, Evolvier Technologies. All rights reserved.
 *
 */

'use strict';

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import {observer} from 'mobx-react';
import {showMessage} from 'react-native-flash-message';
import AsyncStorage from '@react-native-async-storage/async-storage';

import CustomTextField from '@components/CustomTextField';
import CustomSelectField from '@components/CustomSelectField';
import SingleSelectList from '@components/SingleSelectList';
import LoadingShadow from '@components/LoadingShadow';

import Button from '@components/Button';
import styles from './styles';
import {AppStyles} from '@theme';
import AppStrings from '@config/strings';
import {isValidVehicleNumber} from '@lib/utils';
import {AppConstants} from '@config';

import DispenseRequestList, {
  DispenseRequest as DispenseRequestStore,
} from '@stores/DispenseRequests';
import Products from '@stores/Products';

@observer
class DispenseRecord extends Component {
  constructor(props) {
    super(props);

    this.state = {
      quantity: this.props.defaultValue,
      vehicleNumber: this.props.defaultVehicleNumber,
      isFullTank: false,
      fuelNozzleId: '',
      odometer: '',
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
      selectedProduct:
        this.productList(Products.sbuAndProductLinkedList) &&
        this.productList(Products.sbuAndProductLinkedList).length
          ? this.productList(Products.sbuAndProductLinkedList)[0]
          : {},
      productList: [
        {
          id: 0,
          title: 'Normal Petrol',
          price: '85',
        },
        {
          id: 1,
          title: 'Speed',
          price: '85',
        },
        {
          id: 2,
          title: 'Xtra Premium',
          price: '85',
        },
      ],
    };
    this.dispenseRequestStore = new DispenseRequestStore(props.data);
  }

  componentDidMount() {
    this.getLastFuelDispensedNozzleId();
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
          this.setState({fuelNozzleId: Number(result)});
        }
      })
      .finally(() => this.setState({lastFuelDispensedNozzleIdLoader: false}));
  };

  //Set fuel nozzle id to AsyncStorage
  setFuelNozzleIdToAsyncStorage() {
    if (this.state.fuelNozzleId) {
      let fuelNozzleId = this.state.fuelNozzleId.toString();
      AsyncStorage.setItem(
        AppConstants.asyncStorageKeys.lastFuelDispensedNozzleId,
        fuelNozzleId,
      );
    }
  }

  onPressCompleteRequest() {
    if (!this.state.quantity) {
      showMessage({
        message: 'Add fuel quantity',
      });
    } else if (
      this.state.quantity &&
      this.props.fuelQuantityValue &&
      this.state.quantity > this.props.fuelQuantityValue
    ) {
      showMessage({
        message: 'Please enter a value less than the requested quantity ',
      });
    } else if (!this.state.vehicleNumber) {
      showMessage({
        message: 'Add vehicle number',
      });
    } else if (!isValidVehicleNumber(this.state.vehicleNumber)) {
      showMessage({
        message: 'Invalid registration number',
      });
    } else if (!this.state.fuelNozzleId) {
      showMessage({
        message: 'Select one fuel nozzle',
      });
    } else {
      this.setFuelNozzleIdToAsyncStorage();
      this.props.onPressOK(
        this.state.quantity,
        this.state.vehicleNumber,
        this.state.isFullTank,
        this.state.fuelNozzleId,
        this.state.odometer,
        this.state.selectedProduct,
      );
      this.props.onBack();
    }
  }

  onChangeRegistrationNumber(number) {
    this.setState({vehicleNumber: number});
  }

  onSelectFullTankOption(data) {
    if (data && data.id && data.id === 'yes') {
      this.setState({isFullTank: true});
    } else {
      this.setState({isFullTank: false});
    }
  }

  onPressFuelNozzleItem(nozzleItem) {
    this.setState({fuelNozzleId: nozzleItem && nozzleItem.id});
  }

  onChangeOdometerReading(odometerReading) {
    this.setState({odometer: odometerReading});
  }

  getSelectedItemTitle(data, selectedId) {
    let matchedData =
      data && data.length && data.find(eachItem => eachItem.id === selectedId);
    return matchedData && matchedData.title;
  }

  isPriceValueValid(price) {
    const pattern = new RegExp(/^((\d{0,10}\.\d{0,2})|(\d{0,10}))$/g);
    if (price) {
      return pattern.test(price);
    }
  }

  showLoading() {
    if (this.state.lastFuelDispensedNozzleIdLoader) {
      return <LoadingShadow />;
    }
  }

  productItem(item, index) {
    return (
      <TouchableOpacity
        style={
          this.state.selectedProduct &&
          this.state.selectedProduct._id === item._id
            ? styles.productSelectView
            : styles.productView
        }
        key={index}
        onPress={() => this.onSelectProduct(item)}
        activeOpacity={0.9}>
        <Text style={[AppStyles.regularBoldText, styles.productNameText]}>
          {item.title}
        </Text>
      </TouchableOpacity>
    );
  }

  onSelectProduct(product) {
    this.setState({
      selectedProduct: product,
    });
  }

  productList(data) {
    if (data && data.length) {
      if (this.props.defaultVehicleFuelType) {
        return data.filter(
          item =>
            item.productData &&
            item.productData.type &&
            item.productData.type === this.props.defaultVehicleFuelType,
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
      <View style={AppStyles.container}>
        <ScrollView
          alwaysBounceVertical={false}
          showsVerticalScrollIndicator={false}>
          <View style={styles.infoView}>
            <Text style={[AppStyles.regularText, AppStyles.darkText]}>
              Add details this dispensation
            </Text>
          </View>
          <View style={styles.inputDetailsView}>
            <View style={styles.detailsInputView}>
              <View style={styles.inputView}>
                <CustomTextField
                  label={'Fuel points (FP)'}
                  placeholder={'Enter the fuel points '}
                  keyboardType="numeric"
                  autoFocus={true}
                  value={this.state.quantity}
                  onChangeText={value => {
                    if (!value || this.isPriceValueValid(Number(value))) {
                      this.setState({
                        quantity: value,
                      });
                    } else {
                      this.forceUpdate();
                    }
                  }}
                />
              </View>
              <View style={styles.inputView}>
                <CustomTextField
                  label={'Registration Number'}
                  placeholder={'Enter registration number'}
                  value={this.state.vehicleNumber}
                  autoCapitalize={'characters'}
                  onChangeText={regNumber =>
                    this.onChangeRegistrationNumber(regNumber)
                  }
                  disabled={!!this.props.defaultVehicleNumber}
                />
              </View>
              <View style={styles.inputView}>
                <SingleSelectList
                  label={'Are you filling the tank'}
                  data={this.state.fullTankData}
                  onSelectOption={this.onSelectFullTankOption.bind(this)}
                />
              </View>
              <View style={styles.inputView}>
                <CustomTextField
                  label={'Odometer reading (Optional)'}
                  placeholder={'Enter odometer reading'}
                  keyboardType="numeric"
                  value={this.state.odometer}
                  onChangeText={odometerReading => {
                    this.onChangeOdometerReading(odometerReading);
                  }}
                />
              </View>
              <View style={styles.inputView}>
                <CustomSelectField
                  label={'Fuel nozzle'}
                  placeholder={'Select fuel nozzle'}
                  value={this.getSelectedItemTitle(
                    DispenseRequestList.nozzles,
                    this.state.fuelNozzleId,
                  )}
                  onPress={() =>
                    this.props.renderList({
                      data: DispenseRequestList.nozzles,
                      onPress: this.onPressFuelNozzleItem.bind(this),
                    })
                  }
                />
              </View>
            </View>
          </View>
          <View style={styles.productListView}>
            <View style={styles.productTitleView}>
              <Text
                style={[
                  AppStyles.regularLightText,
                  AppStyles.darkText,
                  styles.selectLabelText,
                ]}>
                Select Product
              </Text>
            </View>
            <ScrollView
              automaticallyAdjustContentInsets={true}
              alwaysBounceVertical={false}
              horizontal={true}
              contentContainerStyle={
                styles.scrollViewProductListContentContainer
              }
              showsHorizontalScrollIndicator={false}>
              {this.productList(Products.sbuAndProductLinkedList).map((a, i) =>
                this.productItem(a, i),
              )}
            </ScrollView>
          </View>
        </ScrollView>
        <View style={styles.buttonView}>
          <Button
            buttonText={AppStrings.completeOrder}
            onPress={() => this.onPressCompleteRequest()}
          />
        </View>
        {this.showLoading()}
      </View>
    );
  }
}

DispenseRecord.propTypes = {
  onPressOK: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
  defaultValue: PropTypes.string.isRequired,
};

export default DispenseRecord;
