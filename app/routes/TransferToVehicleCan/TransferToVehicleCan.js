/**
 * Copyright (c) 2018-present, Oleum. All rights reserved.
 *
 */

'use strict';

import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';

import {observer} from 'mobx-react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {showMessage} from 'react-native-flash-message';

import TouchableOpacity from '@components/TouchableOpacity';

import {AppStyles, AppColors} from '@theme';
import {AppStrings, AppResources} from '@config';
import styles from './styles';

import Button from '@components/Button';
import CanItem from '@components/CanItem';
import Loading from '@components/Loading';
import NoData from '@components/NoData';

import Cans from '@stores/Cans';
import {Transfer as TransferStore} from '@stores/Transfers';
import Vehicles from '@stores/Vehicles';

@observer
class TransferToVehicleCan extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedCan: {},
      showSelectedContact: false,
    };
    this.transferStore = new TransferStore();

    this.transferStore.sendFromCan = props.can
      ? props.can
      : Cans.myList.length
      ? Cans.myList[0]
      : null;
  }

  componentDidMount() {
    this.initializeVehicleData();
  }

  initializeVehicleData() {
    if (Vehicles.list && Vehicles.list.length) {
      this.transferStore.recipientVehicle = Vehicles.list[0];
    }
  }

  onValueChange(value) {
    const thisCan = this.getSelectedCanDetails();
    value = Number(value);
    const maxQuantity = Number(thisCan.quantity);

    if (value === 0) {
      showMessage({
        message: 'Please enter a value grater than zero',
      });
      this.transferStore.quantity = Number(value);
    } else if (thisCan.quantity > 1) {
      if (maxQuantity >= 1 && value <= maxQuantity) {
        this.transferStore.quantity = Number(value);
      } else {
        showMessage({
          message: 'Please enter a value less than your can quantity',
        });
      }
    } else if (thisCan.quantity < 1) {
      showMessage({
        message: 'Insufficient Can balance, Please select another Can',
      });
    }
  }

  onPressSelectVendor() {
    this.props.renderCanList({
      canList: Cans.myList.slice(),
      onPress: this.onSelectCan.bind(this),
    });
  }

  onSelectCan(canItem) {
    this.transferStore.sendFromCan = canItem;
    this.transferStore.quantity = 1;
  }

  onPressSelectVehicle() {
    this.props.renderVehicleList({
      vehicleList: Vehicles.list.slice(),
      onPress: this.onSelectVehicle.bind(this),
    });
  }

  onSelectVehicle(vehicle) {
    this.transferStore.recipientVehicle = vehicle;
    this.transferStore.quantity = 1;
  }

  getSelectedCanDetails() {
    return Cans.myList.find(
      item =>
        item.id &&
        item.vendorId &&
        this.transferStore.sendFromCan &&
        this.transferStore.sendFromCan.id &&
        this.transferStore.sendFromCan.vendorId &&
        item.vendorId === this.transferStore.sendFromCan.vendorId &&
        item.id === this.transferStore.sendFromCan.id,
    );
  }

  renderSelectedCan() {
    const thisCan = this.getSelectedCanDetails();
    if (thisCan) {
      return (
        <CanItem
          name={thisCan.title}
          image={this.transferStore.vendorLogo}
          points={Number(thisCan.quantity)}
        />
      );
    } else {
      return null;
    }
  }

  renderSelectedVehicle() {
    return (
      <View>
        <Text style={[AppStyles.titleBoldText, AppStyles.darkText]}>
          {this.transferStore.recipientVehicle &&
            this.transferStore.recipientVehicle.title}
        </Text>
      </View>
    );
  }

  isNextEnabled() {
    const transfer = this.transferStore;
    const thisCan = this.getSelectedCanDetails();
    if (transfer.sendFromCan.vendorId && this.transferStore.recipientVehicle) {
      if (
        thisCan &&
        thisCan.quantity &&
        transfer.quantity <= thisCan.quantity &&
        transfer.quantity > 0
      ) {
        return true;
      }
      return false;
    }
    return false;
  }

  validate() {
    if (this.transferStore.sendFromCan && this.transferStore.recipientVehicle) {
      this.transferDetails();
    } else if (this.transferStore.sendFromCan) {
      showMessage({
        message: 'Please select Vendor',
      });
    } else {
      showMessage({
        message: 'Please select Vehicle',
      });
    }
  }

  transferDetails() {
    const thisCan = this.getSelectedCanDetails();
    const transferValue = Number(this.transferStore.quantity);
    const canQuantity = Number(thisCan.quantity);

    if (transferValue <= canQuantity) {
      this.transferStore
        .transferFuelPoints()
        .then(data => {
          if (data) {
            this.props.renderTransferDetailsReceipt({
              data: data,
            });
            this.transferStore.loading = false;
          }
        })
        .catch(e => {
          this.transferStore.loading = false;
          showMessage({
            message: e.reason,
          });
        });
    } else {
      showMessage({
        message: 'Please enter a value less than your can quantity',
      });
    }
  }

  render() {
    if (!this.transferStore.loading && Cans.myList.length) {
      return (
        <View style={AppStyles.container}>
          <ScrollView>
            <KeyboardAvoidingView
              behavior="position"
              keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 20}>
              <View style={styles.labelView}>
                <Text style={[AppStyles.regularBoldText, AppStyles.darkText]}>
                  {AppStrings.selectPersonalCan}
                </Text>
              </View>
              <View style={styles.selectVendorMainView}>
                <View style={styles.vendorListAndPointsSelectView}>
                  <View style={styles.vendorListView}>
                    <TouchableOpacity
                      onPress={() => this.onPressSelectVendor()}>
                      <View style={styles.canListView}>
                        <View style={styles.canItemView}>
                          {this.renderSelectedCan()}
                        </View>
                        <View style={styles.canIconView}>
                          <MaterialCommunityIcons
                            style={[AppStyles.icons]}
                            name="chevron-down"
                          />
                        </View>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              <View style={styles.labelView}>
                <Text style={[AppStyles.regularBoldText, AppStyles.darkText]}>
                  {AppStrings.transferTo}
                </Text>
              </View>
              <View style={styles.selectVendorMainView}>
                <View style={styles.vendorListAndPointsSelectView}>
                  <View style={styles.vendorListView}>
                    <TouchableOpacity
                      onPress={() => this.onPressSelectVehicle()}>
                      <View style={styles.canListView}>
                        <View style={styles.vehicleItemView}>
                          {this.renderSelectedVehicle()}
                        </View>
                        <View style={styles.canIconView}>
                          <MaterialCommunityIcons
                            style={[AppStyles.icons]}
                            name="chevron-down"
                          />
                        </View>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              <View style={styles.pointsSelectView}>
                <View style={styles.inputTextView}>
                  <Text style={[AppStyles.regularText, AppStyles.darkText]}>
                    Enter Fuel Point
                  </Text>
                </View>
                <View style={styles.valueView}>
                  <View style={[AppStyles.row, styles.valueInputView]}>
                    <TextInput
                      style={[AppStyles.titleBoldText, styles.textInput]}
                      placeholder={''}
                      underlineColorAndroid={'transparent'}
                      value={String(this.transferStore.quantity)}
                      maxLength={7}
                      onChangeText={value => {
                        this.onValueChange(value);
                      }}
                      keyboardType={'numeric'}
                      autofocus={true}
                    />
                    <View style={styles.unitView}>
                      <Text
                        style={[AppStyles.regularBoldText, AppStyles.darkText]}>
                        FP
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </KeyboardAvoidingView>
          </ScrollView>
          <View style={styles.buttonView}>
            <Button
              buttonText={AppStrings.transferUpperCase}
              onPress={() => this.validate()}
              disabled={!this.isNextEnabled()}
            />
          </View>
        </View>
      );
    } else if (this.transferStore.loading) {
      return (
        <View style={AppStyles.container}>
          <Loading />
        </View>
      );
    } else {
      return (
        <View style={[styles.center]}>
          <StatusBar
            backgroundColor={AppColors.statusBarBg}
            hidden={false}
            barStyle={AppColors.statusBarStyle}
          />
          <NoData
            image={AppResources.noCan}
            title={'No Can !'}
            content={'You have no Can. Please purchase Fuel Points'}
          />
        </View>
      );
    }
  }
}

export default TransferToVehicleCan;
