/**
 * Copyright (c) 2018-present, Oleum. All rights reserved.
 *
 */

'use strict';

import React, {Component} from 'react';
import {View, Text, TextInput, TouchableOpacity, StatusBar} from 'react-native';

import {observer} from 'mobx-react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {showMessage} from 'react-native-flash-message';

import {AppStyles, AppColors} from '@theme';
import {AppStrings, AppResources} from '@config';
import styles from './styles';

import Button from '@components/Button';
import CanItem from '@components/CanItem';
import CorporateItem from '@components/CorporateItem';
import Loading from '@components/Loading';
import NoData from '@components/NoData';
import NavBarInfoButton from '@components/NavBarInfoButton';

import Cans from '@stores/Cans';
import Corporates from '@stores/Corporates';

import {Transfer as TransferStore} from '@stores/Transfers';

@observer
class DonateFuelPoints extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCan: {},
      showSelectedContact: false,
    };
    this.transferStore = new TransferStore();

    if (!this.transferStore.sendFromCan && Cans.myList.length) {
      this.transferStore.sendFromCan = Cans.myList.length
        ? Cans.myList[0]
        : null;
    }
  }

  componentDidMount() {
    this.props.renderIntro();
  }

  componentWillMount() {
    this.props.navigation.setParams({
      right: (
        <NavBarInfoButton onClick={this.props.onClickInfoButton.bind(this)} />
      ),
    });
  }

  onValueChange(value) {
    const thisCan = this.getSelectedCanDetails();
    value = Number(value);
    const maxQuantity = Number(thisCan.quantity);

    if (thisCan.quantity > 1) {
      if (maxQuantity >= 1 && value <= maxQuantity) {
        this.transferStore.quantity = Number(value);
      } else {
        showMessage({
          message: 'Please enter a value less than your can quantity',
        });
      }
    } else if (thisCan.quantity < 1) {
      showMessage({
        message: 'Insufficient Can balance, Pelase select another Can',
      });
    }
  }

  onPressSlectVendor() {
    this.props.renderCanList({
      canList: Cans.myList.slice(),
      onPress: this.onSelectCan.bind(this),
    });
  }

  onSelectCan(canItem) {
    this.transferStore.sendFromCan = canItem;
    this.transferStore.quantity = 1;
  }

  getSelectedCanDetails() {
    return Cans.myList.find(
      item => item.vendorId === this.transferStore.sendFromCan.vendorId,
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

  contactTransfer(item) {
    let corporate = Corporates.list.find(listItem => listItem.id === item._id);
    this.transferStore.selectedCorporate = corporate;
    this.setState({
      showSelectedContact: true,
    });
    this.props.onBack();
  }

  viewContacts() {
    this.props.renderContacts({
      contactTransfer: this.contactTransfer.bind(this),
    });
  }

  renderContact() {
    if (
      this.transferStore.selectedCorporate &&
      this.transferStore.selectedCorporate.title
    ) {
      return (
        <View style={styles.contactListView}>
          <View style={styles.contactCardMainView}>
            <View style={styles.contactCardView}>
              <CorporateItem corporate={this.transferStore.selectedCorporate} />
            </View>
            <View style={styles.textView}>
              <Text style={[AppStyles.regularBoldText, styles.changeText]}>
                Change
              </Text>
            </View>
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.contactListView}>
          <View style={styles.iconView}>
            <MaterialCommunityIcons
              style={[
                AppStyles.icons,
                {
                  color: AppColors.brand.secondary,
                },
              ]}
              name="plus"
            />
          </View>
          <Text style={[AppStyles.labelText, styles.selectContactTextStyle]}>
            {AppStrings.corporateListSelection}
          </Text>
        </View>
      );
    }
  }

  isNextEnabled() {
    const transfer = this.transferStore;
    if (
      transfer.sendFromCan.vendorId &&
      this.transferStore.selectedCorporate &&
      this.transferStore.selectedCorporate.title
    ) {
      if (
        transfer.quantity <= transfer.sendFromCan.quantity &&
        transfer.quantity > 0
      ) {
        return true;
      }
      return false;
    }
    return false;
  }

  validate() {
    if (
      this.transferStore.selectedCorporate &&
      this.transferStore.selectedCorporate.title
    ) {
      this.transferDetails();
    } else {
      showMessage({
        message: 'Please select corporate',
      });
    }
  }

  transferDetails() {
    const thisCan = this.getSelectedCanDetails();
    if (this.transferStore.quantity <= thisCan.quantity) {
      this.transferStore
        .transferFuelPointsToCorporate()
        .then(data => {
          if (data) {
            showMessage({
              message: 'Success',
            });
            this.props.renderTransferDetailsReceipt({
              data: data,
            });
            this.transferStore.loading = false;
          }
        })
        .catch(e => {
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
          <View style={styles.selectVendorMainView}>
            <View style={styles.vendorView}>
              <Text
                style={[AppStyles.cairoLabelMediumText, AppStyles.darkText]}>
                {AppStrings.selectVendor}
              </Text>
            </View>
            <View style={styles.vendorListAndPointsSelectView}>
              <View style={styles.vendorListView}>
                <TouchableOpacity onPress={() => this.onPressSlectVendor()}>
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
              <View style={AppStyles.horizontalLine} />
              <View style={styles.pointsSelectView}>
                <View style={styles.inputTextView}>
                  <Text style={[AppStyles.regularText, AppStyles.darkText]}>
                    {AppStrings.fpTransferInfo}
                  </Text>
                </View>
                <View style={[AppStyles.verticalLine, styles.seperator]} />
                <View style={styles.valueView}>
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
                  <View style={styles.inputUnderline} />
                </View>
                <View style={styles.unitView}>
                  <Text style={[AppStyles.regularText, AppStyles.darkText]}>
                    FP
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.transferToMainView}>
            <View style={styles.transferContactView}>
              <Text
                style={[AppStyles.cairoLabelMediumText, AppStyles.darkText]}>
                {'Donate to'}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.contactTouch}
              onPress={() => this.viewContacts()}
              activeOpacity={0.7}>
              {this.renderContact()}
            </TouchableOpacity>
          </View>
          <View style={styles.noteMainView}>
            <View style={styles.noteView}>
              <Text
                style={[AppStyles.cairoLabelMediumText, AppStyles.darkText]}>
                {AppStrings.note}
              </Text>
            </View>
            <View style={styles.noteInputView}>
              <TextInput
                placeholder={AppStrings.notePlaceholder}
                placeholderTextColor={AppColors.border}
                value={this.transferStore.note}
                onChangeText={note => {
                  this.transferStore.note = note;
                }}
                multiline={true}
              />
            </View>
          </View>
          <View style={styles.buttonView}>
            <Button
              buttonText={'DONATE'}
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

export default DonateFuelPoints;
