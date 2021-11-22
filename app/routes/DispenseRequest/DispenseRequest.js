/**
 * Copyright (c) 2018-present, Oleum. All rights reserved.
 *
 */

'use strict';

import React, {Component} from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StatusBar,
  FlatList,
  Keyboard,
  ActivityIndicator,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {observer} from 'mobx-react';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment-timezone';
import getSymbolFromCurrency from 'currency-symbol-map';
import {showMessage} from 'react-native-flash-message';

import {AppColors, AppStyles} from '@theme';
import AppStrings from '@config/strings';
import styles from './styles';
import {AppConstants, AppResources} from '@config';
import {
  getDateTimeString,
  fetchVehicleDetailsUsingVehicleId,
} from '../../lib/utils';

import CanItem from '@components/CanItem';
import ROListItem from '@components/ROListItem';
import NoData from '@components/NoData';
import Button from '@components/Button';
import LoadingSmall from '@components/LoadingSmall';
import LoadingShadow from '@components/LoadingShadow';
import NavBarInfoButton from '@components/NavBarInfoButton';

import Account from '@stores/Account';
import {DispenseRequest as DispenseRequestStore} from '@stores/DispenseRequests';
import Cans from '@stores/Cans';
import Vehicles from '@stores/Vehicles';

@observer
class DispenseRequest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDateTimePickerVisible: false,
      selectedValue: {},
      noFPBalance: false,
    };

    this.dispenseRequestStore = new DispenseRequestStore();
    this.canShownCanBalanceError = true;
  }

  componentDidMount() {
    // this.props.renderIntro();
    // this.dispenseRequestStore.updateSbuList().then(sbuList => {
    //   if (sbuList && sbuList.length) {
    //     this.initializeVendorAndCanAndVehicle();
    //   }
    // });
    this.updateSbuList();
    if (this.props.canId && this.props.vendorId) {
      this.dispenseRequestStore.canId = this.props.canId;
      this.dispenseRequestStore.vendorId = this.props.vendorId;
      if (this.props.vehicleInfo) {
        this.dispenseRequestStore.dispensationVehicle = this.props.vehicleInfo;
      }
    }
    if (Account.connectionReady && Cans.ready && Vehicles.ready) {
      this.initializeVendorAndCanAndVehicle();
    } else {
      this.timer = setInterval(() => {
        if (Account.connectionReady && Cans.ready && Vehicles.ready) {
          this.initializeVendorAndCanAndVehicle();
          clearInterval(this.timer);
        }
      }, 500);
    }
  }

  updateSbuList() {
    this.dispenseRequestStore.userCurrentLocation().then(() => {
      this.dispenseRequestStore.updateSbuList();
    });
  }

  componentWillMount() {
    this.props.navigation.setParams({
      right: (
        <NavBarInfoButton onClick={this.props.onClickInfoButton.bind(this)} />
      ),
    });
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  navigationNext() {
    if (
      this.dispenseRequestStore.valueType !==
      AppConstants.quantityType.fuelPoint
    ) {
      if (this.dispenseRequestStore.value < 1) {
        showMessage({
          message: 'Sorry, minimum purchase limit is 1 litre',
        });
      } else if (this.dispenseRequestStore.isCanHasSufficientBalance) {
        this.goNextValidation();
      } else {
        showMessage({
          message: 'Insufficient Can balance. Please select another Can',
        });
      }
    } else if (
      this.dispenseRequestStore.valueType ===
      AppConstants.quantityType.fuelPoint
    ) {
      if (this.dispenseRequestStore.value < 50) {
        showMessage({
          message: 'Sorry, minimum purchase limit is 50 FP',
        });
      } else if (this.dispenseRequestStore.isCanHasSufficientBalance) {
        this.goNextValidation();
      } else {
        showMessage({
          message: 'Please enter a value less than your can quantity',
        });
      }
    } else {
      this.goNextValidation();
    }
  }

  validate() {
    this.navigationNext();
    Keyboard.dismiss();
  }

  isNextEnabled() {
    const dispenseRequest = this.dispenseRequestStore;
    if (
      dispenseRequest.selectedCanDetails &&
      dispenseRequest.selectedProductDetails
    ) {
      if (dispenseRequest.isCanHasSufficientBalance) {
        return true;
      }
      return false;
    }
    return false;
  }

  goNextValidation() {
    this.props.onRightPressed({
      data: this.dispenseRequestStore,
    });
  }

  // productList() {
  //   return this.dispenseRequestStore.selectedCanProducts;
  // }

  onValueChange(value) {
    this.dispenseRequestStore.value = value;
    if (
      this.dispenseRequestStore.valueType ===
        AppConstants.quantityType.fuelPoint &&
      this.canShownCanBalanceError
    ) {
      if (Number(value) < 50) {
        showMessage({
          message: 'Sorry, minimum purchase limit is 50 FP',
        });
      } else if (!this.dispenseRequestStore.isCanHasSufficientBalance) {
        showMessage({
          message: 'Please enter a value less than your can quantity',
        });
        this.canShownCanBalanceError = false;
      }
    } else if (
      this.dispenseRequestStore.valueType === AppConstants.quantityType.fuel &&
      this.canShownCanBalanceError
    ) {
      if (!this.dispenseRequestStore.isCanHasSufficientBalance) {
        showMessage({
          message: 'Please enter a value less than your can quantity',
        });
        this.canShownCanBalanceError = false;
      }
    } else if (this.dispenseRequestStore.isCanHasSufficientBalance) {
      this.canShownCanBalanceError = true;
    }
  }

  getPriceToDisplay(product) {
    if (product.minPrice === product.maxPrice) {
      return getSymbolFromCurrency(product.unit) + ' ' + product.maxPrice;
    } else {
      return (
        getSymbolFromCurrency(product.unit) +
        ' ' +
        product.minPrice +
        '- ' +
        getSymbolFromCurrency(product.unit) +
        ' ' +
        product.maxPrice
      );
    }
  }

  _keyExtractor = item => item._id;

  productItem(item, index) {
    return (
      <TouchableOpacity
        style={
          item.id === this.dispenseRequestStore.selectedProductDetails.id
            ? styles.productSelectView
            : styles.productView
        }
        key={index}
        onPress={() => this.onSelectProduct(item)}
        activeOpacity={0.9}>
        <Text style={[AppStyles.regularBoldText, styles.productNameText]}>
          {item.title}
        </Text>
        <Text style={[AppStyles.regularBoldText, styles.productPriceText]}>
          {this.getPriceToDisplay(item) + '*'}
        </Text>
      </TouchableOpacity>
    );
  }

  onSelectProduct(product) {
    this.dispenseRequestStore.product = product;
  }

  renderROListItem(item, index) {
    return (
      <View key={index}>
        <ROListItem
          data={item}
          slectedProductSBUPrice={this.dispenseRequestStore.slectedProductSBUPrice(
            item._id,
          )}
          slectedQuantityFP={this.dispenseRequestStore.slectedQuantityFP(
            item._id,
          )}
          slectedQuantityFPUnit={this.dispenseRequestStore.slectedQuantityFPUnit()}
          distance={this.dispenseRequestStore.getdistance(item.location)}
          showNavIcon={false}
        />
      </View>
    );
  }

  onSelectTypePress(item) {
    this.dispenseRequestStore.valueType = item.value;
    this.dispenseRequestStore.valueUnit = item.unit;
    if (
      this.dispenseRequestStore.valueType ===
      AppConstants.quantityType.fuelPoint
    ) {
      this.dispenseRequestStore.value = 50;
    } else {
      this.dispenseRequestStore.value = 1;
    }
  }
  _showDateTimePicker = () =>
    this.setState({
      isDateTimePickerVisible: true,
    });

  _handleDatePicked = date => {
    if (
      moment(date)
        .tz(moment.tz.guess())
        .isSameOrAfter(moment(), 'date')
    ) {
      this.dispenseRequestStore.dispensationDate = date;
      this._hideDateTimePicker();
    } else {
      this._hideDateTimePicker();
      showMessage({
        message: 'Please enter a future date!',
      });
    }
  };

  _hideDateTimePicker = () =>
    this.setState({
      isDateTimePickerVisible: false,
    });

  onPressSelectVendor() {
    this.props.renderCanList({
      canList: this.dispenseRequestStore.getAllCans.slice(),
      onPress: this.onSelectCan.bind(this),
    });
  }

  onSelectCan(canItem) {
    this.dispenseRequestStore.product = {};
    this.dispenseRequestStore.canId = canItem.id;
    this.dispenseRequestStore.vendorId = canItem.vendorId;
    if (this.isVehicleCanSelected()) {
      this.dispenseRequestStore.dispensationVehicle = {};
    } else {
      this.dispenseRequestStore.dispensationVehicle =
        Vehicles.list && Vehicles.list.length && Vehicles.list[0];
    }
    this.updateSbuList();
  }

  getSelectedCanDetails() {
    return this.dispenseRequestStore.selectedCanDetails;
  }

  initializeVendorAndCanAndVehicle() {
    if (this.props.canId && this.props.vendorId) {
      this.dispenseRequestStore.initializeVendorAndCanAndVehicle(true);
    } else {
      this.dispenseRequestStore.initializeVendorAndCanAndVehicle();
    }
  }

  getSelectedVehicleCanTitle(vehicleId) {
    let vehicleInfo = fetchVehicleDetailsUsingVehicleId(
      Vehicles.list,
      vehicleId,
    );
    if (vehicleInfo) {
      if (vehicleInfo.title) {
        return vehicleInfo.title;
      } else if (vehicleInfo.number) {
        return vehicleInfo.number;
      } else {
        return '';
      }
    } else {
      return '';
    }
  }

  renderSelectedCan() {
    const thisCan = this.getSelectedCanDetails();
    if (thisCan) {
      if (this.isVehicleCanSelected()) {
        return (
          <CanItem
            name={this.getSelectedVehicleCanTitle(
              thisCan && thisCan.user && thisCan.user.id,
            )}
            subTitle={thisCan.title}
            image={this.dispenseRequestStore.vendorLogo}
            points={Number(thisCan.quantity)}
          />
        );
      } else {
        return (
          <CanItem
            name={thisCan.title}
            image={this.dispenseRequestStore.vendorLogo}
            points={Number(thisCan.quantity)}
          />
        );
      }
    } else {
      return null;
    }
  }

  renderSelectedValue() {
    this.state.selectedValue = AppConstants.fuelTypes.find(
      item => item.value === this.dispenseRequestStore.valueType,
    );
    if (this.state.selectedValue) {
      return this.state.selectedValue.title;
    }
    return '';
  }

  searchLocation() {
    this.props.renderSelectLocation({
      data: this.dispenseRequestStore,
    });
  }

  renderunit() {
    if (
      this.dispenseRequestStore.valueType ===
      AppConstants.quantityType.fuelPoint
    ) {
      return 'FP';
    } else {
      return 'Litre';
    }
  }

  filterSBU(filterItem) {
    this.dispenseRequestStore.filter = filterItem.value;
  }

  itemSeparatorComponent() {
    return <View style={[AppStyles.horizontalLine, styles.divideLine]} />;
  }

  renderNearbyFuelStations() {
    if (
      this.dispenseRequestStore.fetchUserCurrentLocationLoading ||
      this.dispenseRequestStore.loading
    ) {
      return (
        <View style={styles.loadingView}>
          <LoadingSmall color={AppColors.brand.primary} />
        </View>
      );
    } else if (
      this.dispenseRequestStore.sortedSbulist &&
      this.dispenseRequestStore.sortedSbulist.length
    ) {
      return (
        <FlatList
          data={this.dispenseRequestStore.sortedSbulist}
          extraData={JSON.stringify({
            filter: this.dispenseRequestStore.filter,
            value: this.dispenseRequestStore.getValue,
            valueType: this.dispenseRequestStore.valueType,
            product: this.dispenseRequestStore.selectedProductDetails,
            list: this.dispenseRequestStore.sortedSbulist,
          })}
          renderItem={({item}) => this.renderROListItem(item)}
          ItemSeparatorComponent={() => this.itemSeparatorComponent()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.promoContentContainerStyle}
          keyExtractor={this._keyExtractor}
          bounces={true}
        />
      );
    } else {
      return (
        <View style={styles.noNearByView}>
          <Text style={[AppStyles.regularBoldText, AppStyles.darkText]}>
            No Nearby Fuel Stations
          </Text>
        </View>
      );
    }
  }

  isVehicleCanSelected() {
    let selectedCan = this.dispenseRequestStore.selectedCanDetails;
    if (
      selectedCan &&
      selectedCan.user &&
      selectedCan.user.type === AppConstants.vehicle
    ) {
      return true;
    } else {
      return false;
    }
  }

  renderVehicles() {
    if (!this.isVehicleCanSelected()) {
      return (
        <View style={styles.selectVehicleMainView}>
          <View style={styles.selectVehicleLabelView}>
            <Text
              style={[
                AppStyles.regularLightText,
                AppStyles.darkText,
                styles.labelText,
              ]}>
              Select Vehicle
            </Text>
          </View>
          <View style={styles.selectVehicleView}>
            <View style={styles.vehicleListMainView}>
              <TouchableOpacity onPress={() => this.onPressSelectVehicle()}>
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
        </View>
      );
    }
  }

  renderSelectedVehicle() {
    return (
      <View>
        <Text style={[AppStyles.regularBoldText, AppStyles.darkText]}>
          {this.dispenseRequestStore.dispensationVehicle &&
            this.dispenseRequestStore.dispensationVehicle.title}
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
    this.dispenseRequestStore.product = {};
    this.dispenseRequestStore.dispensationVehicle = vehicle;
  }

  renderFilter() {
    if (this.dispenseRequestStore.filterdSbulist.length > 1) {
      return (
        <TouchableOpacity
          style={styles.roListFilterIconView}
          onPress={() =>
            this.props.renderList({
              data: AppConstants.sbuFilter,
              onPress: this.filterSBU.bind(this),
            })
          }>
          <MaterialCommunityIcons style={AppStyles.icons} name="sort-variant" />
        </TouchableOpacity>
      );
    } else {
      return null;
    }
  }

  render() {
    if (!(Account.connectionReady && Cans.ready && Vehicles.ready)) {
      return (
        <View style={AppStyles.container}>
          <LoadingShadow />
        </View>
      );
    } else if (!Cans.myList.length && !Cans.myVehicleCanList.length) {
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
            content={'Purchase Fuel Points to create new dispense request'}
          />
        </View>
      );
    } else if (!Vehicles.list.length) {
      return (
        <View style={[styles.center]}>
          <StatusBar
            backgroundColor={AppColors.statusBarBg}
            hidden={false}
            barStyle={AppColors.statusBarStyle}
          />
          <NoData
            image={AppResources.myCar}
            title={'No Vehicles !'}
            content={'Add a vehicle to create new dispense request'}
          />
        </View>
      );
    } else {
      return (
        <View style={AppStyles.container}>
          <ScrollView
            alwaysBounceVertical={false}
            showsVerticalScrollIndicator={false}>
            <View style={styles.infoView}>
              <View style={styles.infoTextView}>
                <Text style={[AppStyles.regularText, AppStyles.darkText]}>
                  Create your fuel dispense request
                </Text>
              </View>
              <ActivityIndicator
                animating={
                  !(Account.connectionReady && Cans.ready && Vehicles.ready)
                }
                size="small"
                color={AppColors.brand.accentSecondary}
              />
            </View>
            <StatusBar
              backgroundColor={AppColors.statusBarBg}
              hidden={false}
              barStyle={AppColors.statusBarStyle}
            />
            <View style={styles.controlView}>
              <View style={styles.locationDateView}>
                {/* <View style={styles.locationView}>
                  <Text
                    style={[
                      AppStyles.regularLightText,
                      AppStyles.darkText,
                      styles.labelText,
                    ]}>
                    {AppStrings.searchLocation}
                  </Text>
                  <TouchableOpacity onPress={() => this.searchLocation()}>
                    <View style={styles.locationContentView}>
                      <View style={styles.locationTextView}>
                        <Text
                          style={[
                            styles.locationTex,
                            AppStyles.regularBoldText,
                          ]}
                          numberOfLines={1}>
                          {this.dispenseRequestStore.location
                            ? this.dispenseRequestStore.location.name
                            : 'Search Location'}
                        </Text>
                      </View>
                      <View style={styles.locationIconView}>
                        <MaterialCommunityIcons
                          style={[AppStyles.icons]}
                          name="arrow-right"
                        />
                      </View>
                    </View>
                  </TouchableOpacity>
                </View> */}
                <View style={styles.dateView}>
                  <Text
                    style={[
                      AppStyles.regularLightText,
                      AppStyles.darkText,
                      styles.labelText,
                    ]}>
                    {AppStrings.selectDate}
                  </Text>
                  <TouchableOpacity onPress={this._showDateTimePicker}>
                    <View style={styles.locationContentView}>
                      <View style={styles.locationTextView}>
                        <Text
                          style={[
                            styles.locationTex,
                            AppStyles.regularBoldText,
                          ]}
                          numberOfLines={1}>
                          {getDateTimeString(
                            this.dispenseRequestStore.dispensationDate,
                            'dddd, DD MMM',
                          )}
                        </Text>
                      </View>
                      <View style={styles.locationIconView}>
                        <MaterialCommunityIcons
                          style={[AppStyles.icons]}
                          name="calendar"
                        />
                      </View>
                      <DateTimePicker
                        isVisible={this.state.isDateTimePickerVisible}
                        onConfirm={this._handleDatePicked}
                        onCancel={this._hideDateTimePicker}
                        datePickerModeAndroid={'calendar'}
                      />
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
              <View>
                <View style={styles.vendorView}>
                  <Text
                    style={[
                      AppStyles.regularLightText,
                      AppStyles.darkText,
                      styles.labelText,
                    ]}>
                    {AppStrings.selectVendor}
                  </Text>
                  <View style={styles.canListSelectTouch}>
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
                {this.renderVehicles()}
                {/* <View style={styles.productListView}>
            <View>
              <View style={styles.productTitleView}>
                <Text
                  style={[
                    AppStyles.regularLightText,
                    AppStyles.darkText,
                    styles.labelText,
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
                {this.productList().map((a, i) => this.productItem(a, i))}
              </ScrollView>
            </View>
          </View> */}
                <View style={styles.controlSectionMainView}>
                  <View style={styles.controlLabelView}>
                    <TouchableOpacity
                      style={styles.typeSelectTouch}
                      disabled={true}
                      onPress={() =>
                        this.props.renderList({
                          data: AppConstants.fuelTypes,
                          onPress: this.onSelectTypePress.bind(this),
                        })
                      }>
                      <View style={styles.typeTextView}>
                        <Text style={AppStyles.regularText}>
                          {this.renderSelectedValue()}
                        </Text>
                      </View>
                      {/* <View style={styles.typeIconView}>
                  <MaterialCommunityIcons
                    style={[AppStyles.icons]}
                    name="chevron-down"
                  />
                </View> */}
                    </TouchableOpacity>
                  </View>
                  {/* <View style={[AppStyles.verticalLine, styles.seperator]} /> */}
                  <View style={styles.controlButtonView}>
                    <View style={styles.countInputView}>
                      <TextInput
                        style={[AppStyles.titleBoldText, styles.inputField]}
                        placeholder={String(this.dispenseRequestStore.value)}
                        underlineColorAndroid={'transparent'}
                        value={String(this.dispenseRequestStore.value)}
                        maxLength={7}
                        onChangeText={value => {
                          this.onValueChange(value);
                        }}
                        keyboardType={'numeric'}
                      />
                      <View style={styles.inputUnderline} />
                    </View>
                    <View style={styles.iconView}>
                      <Text style={AppStyles.regularText}>
                        {this.renderunit()}
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={styles.line} />
                <View style={styles.roListView}>
                  <View style={styles.roListHeaderView}>
                    <View style={styles.roListHeadingView}>
                      <Text
                        style={[AppStyles.regularBoldText, AppStyles.darkText]}>
                        Fuel Stations
                      </Text>
                    </View>
                    {/* {this.renderFilter()} */}
                  </View>
                  {this.dispenseRequestStore.selectedCanDetails &&
                  this.dispenseRequestStore.selectedCanDetails.type ===
                    AppConstants.userTypes.oleum ? (
                    <View style={styles.locationSearchView}>
                      <TouchableOpacity
                        activeOpacity={0.5}
                        onPress={() => this.searchLocation()}>
                        <View style={styles.locationSearchContentView}>
                          <View style={styles.locationTextView}>
                            <Text
                              style={[AppStyles.smallText]}
                              numberOfLines={1}>
                              {'Search by location...'}
                            </Text>
                            <Text
                              style={[
                                styles.locationTex,
                                AppStyles.regularBoldText,
                              ]}
                              numberOfLines={1}>
                              {this.dispenseRequestStore &&
                                this.dispenseRequestStore.location &&
                                this.dispenseRequestStore.location.name}
                            </Text>
                          </View>
                          <View style={styles.locationIconView}>
                            <MaterialCommunityIcons
                              style={[AppStyles.icons, styles.searchIcon]}
                              name="map-search"
                            />
                          </View>
                        </View>
                      </TouchableOpacity>
                    </View>
                  ) : null}
                  <View style={AppStyles.paddingHorizontal}>
                    {this.renderNearbyFuelStations()}
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
          <View style={styles.buttonView}>
            <Button buttonText={'NEXT'} onPress={() => this.validate()} />
          </View>
        </View>
      );
    }
  }
}

export default DispenseRequest;
