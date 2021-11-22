/**
 * Copyright (c) 2018-present, Oleum. All rights reserved.
 *
 */
'use strict';

import React, {Component} from 'react';
import {View, Text, FlatList, StatusBar, Alert, Share} from 'react-native';
import {observer} from 'mobx-react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {showMessage} from 'react-native-flash-message';
import Dash from 'react-native-dash';
import {Actions} from 'react-native-router-flux';

import NavBarAddButton from '@components/NavBarAddButton';
import LoadingShadow from '@components/LoadingShadow';
import LoadingSmall from '@components/LoadingSmall';
import NoData from '@components/NoData';
import TouchableOpacity from '@components/TouchableOpacity';
import TouchableHighlight from '@components/TouchableHighlight';
import Image from '@components/Image';

import Vehicles from '@stores/Vehicles';
import {Dispensations} from '@stores/Dispensations';
import Account from '@stores/Account';

import {getDateTimeString} from '../../lib/utils';
import {AppColors, AppStyles} from '@theme';
import {AppResources, AppConstants} from '@config';
import styles from './styles';

@observer
class MyInvoices extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDispensationId: '',
      getDispensationFlag: true,
      showFooter: true,
      vehiclesData: [
        {id: AppConstants.invoiceType.allInvoices, title: 'All Invoices'},
      ],
    };
    this.dispensations = new Dispensations();
  }

  componentDidMount() {
    if (Account.connectionReady && Vehicles.ready) {
      this.initializeVehicleInfo();
    } else {
      this.timer = setInterval(() => {
        if (Account.connectionReady && Vehicles.ready) {
          this.initializeVehicleInfo();
          clearInterval(this.timer);
        }
      }, 500);
    }
  }

  initializeVehicleInfo() {
    if (Vehicles.list && Vehicles.list.length) {
      let vehicleData = this.state.vehiclesData;
      Vehicles.list.forEach(eachVehicle =>
        vehicleData.push(JSON.parse(JSON.stringify(eachVehicle))),
      );
      this.setState({vehiclesData: vehicleData});
      if (vehicleData[1]) {
        this.dispensations.updateVehicle(vehicleData[1]);
      } else {
        this.dispensations.updateVehicle(vehicleData[0]);
      }
      this.renderAddButton();
    }
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  renderAddButton() {
    if (
      this.dispensations.selectedVehicle &&
      this.dispensations.selectedVehicle.id &&
      this.dispensations.selectedVehicle.id !==
        AppConstants.invoiceType.allInvoices
    ) {
      this.props.navigation.setParams({
        right: (
          <NavBarAddButton
            onClick={() => {
              Actions.addInvoice({
                vehicleData: this.dispensations.selectedVehicle,
                addInvoice: true,
                dispensationsStoreData: this.dispensations,
              });
            }}
          />
        ),
      });
    } else {
      this.props.navigation.setParams({
        right: null,
      });
    }
  }

  onPressEditOption(dispensationItem) {
    Actions.addInvoice({
      dispensationData: dispensationItem,
      editInvoice: true,
      dispensationsStoreData: this.dispensations,
    });
  }

  onPressDeleteOption(dispensationId) {
    Alert.alert(
      'Delete Invoice',
      'Do you really want to delete this invoice?',
      [
        {
          text: 'No',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => this.deleteDispensation(dispensationId),
        },
      ],
      {cancelable: false},
    );
  }

  deleteDispensation(dispensationId) {
    this.dispensations
      .deleteDispense(dispensationId)
      .then(() => {
        this.setState({
          selectedDispensationId: '',
        });
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

  onPressViewMore(referenceId, isLocked = false, shareUrl) {
    this.props.renderInvoiceDetails({
      referenceId: referenceId,
      isLocked: isLocked,
      shareUrl: shareUrl,
      dispensationsStoreData: this.dispensations,
    });
  }

  onPressItem(item) {
    if (
      this.state.selectedDispensationId &&
      this.state.selectedDispensationId === item.id
    ) {
      this.setState({
        selectedDispensationId: '',
      });
    } else {
      this.setState({
        selectedDispensationId: item.id,
      });
    }
  }

  isItemSelected(item) {
    if (
      this.state.selectedDispensationId &&
      this.state.selectedDispensationId === item.id
    ) {
      return true;
    } else {
      return false;
    }
  }

  onPressShareOption = async url => {
    try {
      const result = await Share.share({
        message:
          'Hello, click the link for fuel dispensation invoice details\n' +
          url +
          '\n\nTrack your vehicle mileage and dispense fuel through Oleum Mobile App. Download Now!' +
          '\n\nPlay Store\nhttps://play.google.com/store/apps/details?id=com.oleumx.app&hl=en_IN \n\nAppStore\nhttps://apps.apple.com/in/app/oleum/id1472407892',
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  renderCommunityItem(item) {
    return (
      <View style={styles.itemMainView}>
        <View style={styles.iconAndStripView}>
          <View style={styles.verticalStrip}>
            <Dash
              style={
                !this.isItemSelected(item)
                  ? styles.dashedLineTwo
                  : styles.dashedLineTwoExpand
              }
              dashColor={AppColors.brand.secondary}
            />
          </View>
          <View style={styles.iconView}>
            <Image style={[styles.icon]} source={AppResources.appLogoDrop} />
          </View>
        </View>
        <View style={styles.detailsView}>
          <TouchableOpacity
            activeOpacity={0.5}
            style={styles.detailsTouch}
            onPress={() => this.onPressItem(item)}>
            <View style={styles.nameAndDateView}>
              <View style={styles.itemNameView}>
                <View style={AppStyles.row}>
                  <Text
                    style={[AppStyles.subTitleBoldText, AppStyles.darkText]}>
                    Refueling
                  </Text>
                  {item && !item.isLocked ? (
                    <MaterialCommunityIcons
                      style={styles.ownerIcon}
                      size={18}
                      name={'account'}
                    />
                  ) : null}
                </View>
                <View
                  style={
                    !this.isItemSelected(item)
                      ? styles.nonExpandedView
                      : styles.hidden
                  }>
                  <Text
                    style={[AppStyles.regularText, styles.textSecondary]}
                    numberOfLines={1}>
                    {item.sbu && item.sbu.name}
                  </Text>
                  <Text
                    style={[
                      AppStyles.regularText,
                      styles.textSecondary,
                      styles.kmText,
                    ]}>
                    {item.vehicleDetails && item.vehicleDetails.odometer
                      ? item.vehicleDetails.odometer + ' km'
                      : 'Odometer not recorded'}
                  </Text>
                </View>
                <View
                  style={
                    this.isItemSelected(item)
                      ? styles.expandedView
                      : styles.hidden
                  }>
                  {this.renderExpandedItem(
                    'map-marker',
                    item.sbu && item.sbu.name,
                  )}
                  {this.renderExpandedItem(
                    'fuel',
                    item.product && item.product.title,
                  )}
                  {this.renderExpandedItem(
                    'chart-bar',
                    item.dispensedQuantity + ' L',
                  )}
                  {this.renderExpandedItem(
                    'gauge',
                    item.vehicleDetails && item.vehicleDetails.odometer
                      ? item.vehicleDetails.odometer + ' km'
                      : 'Odometer not recorded',
                  )}
                </View>
              </View>
              <View style={styles.itemDateView}>
                <Text style={[AppStyles.regularText, AppStyles.darkText]}>
                  {getDateTimeString(item.dispensedAt, 'DD MMMM YYYY')}
                </Text>
                {item.paymentDetails && item.paymentDetails.mode === 'FP' ? (
                  <Text
                    style={[
                      AppStyles.regularText,
                      styles.costText,
                      styles.textSecondary,
                    ]}>
                    {(item.paymentDetails &&
                      item.paymentDetails.fuelPointRedeemed.toFixed(2)) + ' FP'}
                  </Text>
                ) : (
                  <Text
                    style={[
                      AppStyles.regularText,
                      styles.costText,
                      styles.textSecondary,
                    ]}>
                    {'₹ ' +
                      (item.paymentDetails &&
                        item.paymentDetails.amountPaid &&
                        item.paymentDetails.amountPaid.value.toFixed(2))}
                  </Text>
                )}
              </View>
            </View>
          </TouchableOpacity>
          <View
            style={
              this.isItemSelected(item) ? styles.optionsView : styles.hidden
            }>
            {this.renderOption('eye', () =>
              this.onPressViewMore(
                item && item.referenceId,
                item && item.isLocked,
                item && item.shareUrl,
              ),
            )}
            {this.renderOption('share-variant', () =>
              this.onPressShareOption(item.shareUrl),
            )}
            {item && !item.isLocked
              ? this.renderOption('pencil', () => this.onPressEditOption(item))
              : null}
            {item && !item.isLocked
              ? this.renderOption('delete', () =>
                  this.onPressDeleteOption(item && item.id),
                )
              : null}
          </View>
          <View
            style={
              !this.isItemSelected(item)
                ? [AppStyles.horizontalLine, styles.horizontalLine]
                : styles.hidden
            }
          />
        </View>
      </View>
    );
  }

  renderExpandedItem(icon, label) {
    return (
      <View style={styles.expandedItemMainView}>
        <View style={styles.expandedItemIconView}>
          <MaterialCommunityIcons size={18} name={icon} />
        </View>
        <Text
          style={[AppStyles.regularText, styles.textSecondary]}
          numberOfLines={1}>
          {label}
        </Text>
      </View>
    );
  }

  renderOption(icon, onPress) {
    return (
      <TouchableHighlight
        activeOpacity={1}
        underlayColor={AppColors.underlayYellow}
        style={styles.optionTouch}
        onPress={onPress}>
        <MaterialCommunityIcons size={20} name={icon} />
      </TouchableHighlight>
    );
  }

  renderFooter() {
    if (this.dispensations.isLoadingMore) {
      return (
        <View style={styles.loadMoreLoadingView}>
          <LoadingSmall />
        </View>
      );
    } else if (this.dispensations.list.length === 0 || this.state.showFooter) {
      return (
        <View>
          <View style={styles.itemMainView}>
            <View style={styles.iconAndStripView}>
              <View style={styles.verticalStrip}>
                <Dash
                  style={styles.dashedLineTwo}
                  dashColor={AppColors.brand.secondary}
                />
              </View>
              <View style={styles.iconView}>
                <Image
                  style={[styles.icon]}
                  source={AppResources.appLogoDrop}
                />
              </View>
            </View>
            <View style={styles.footerView}>
              <View style={styles.nameAndDateView}>
                <View style={styles.itemNameView}>
                  <Text style={[AppStyles.regularText]}>
                    {this.dispensations.list.length === 0
                      ? 'Dispense through Oleum and start monitoring your vehicle'
                      : 'Started monitoring your vehicle'}
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.welcomeMainView}>
            <View style={styles.welcomeIconView}>
              <Image style={[styles.icon]} source={AppResources.appLogoDrop} />
            </View>
            <View style={styles.welcomeTextView}>
              <Text style={[AppStyles.regularBoldText]}>Welcome to Oleum</Text>
            </View>
          </View>
        </View>
      );
    }
  }

  onPressVehicleItem(vehicle) {
    this.dispensations.updateVehicle(vehicle);
    this.renderAddButton();
  }

  onEndReached() {
    if (
      this.state.getDispensationFlag &&
      !this.dispensations.isLoadingMore &&
      this.dispensations &&
      this.dispensations.list &&
      this.dispensations.list.length >= 15
    ) {
      if (this.dispensations && this.dispensations.next) {
        this.dispensations
          .load(true)
          .then(result => {
            if (result && result.list && !result.list.length) {
              this.setState({getDispensationFlag: false, showFooter: true});
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
      } else {
        showMessage({
          message: 'Unable to load more data',
        });
      }
    }
  }

  renderLoading() {
    if (
      this.dispensations.getDispensationsLoading ||
      this.dispensations.deleteDispenseLoading
    ) {
      return (
        <View style={[styles.loadingContainer]}>
          <LoadingShadow text={'Updating'} />
        </View>
      );
    }
  }

  render() {
    if (
      Vehicles.list &&
      Vehicles.list.length &&
      Account.connectionReady &&
      Vehicles.ready
    ) {
      return (
        <View style={[AppStyles.containerWhite]}>
          <TouchableOpacity
            style={styles.infoView}
            onPress={() =>
              this.props.renderList({
                data: this.state.vehiclesData,
                onPress: this.onPressVehicleItem.bind(this),
              })
            }>
            <View style={styles.vehicleNameView}>
              <Text style={[AppStyles.regularBoldText, AppStyles.darkText]}>
                {this.dispensations.selectedVehicle &&
                this.dispensations.selectedVehicle.number
                  ? this.dispensations.selectedVehicle.number
                  : this.dispensations.selectedVehicle &&
                    this.dispensations.selectedVehicle.title
                  ? this.dispensations.selectedVehicle.title
                  : ''}
              </Text>
              <Text style={[AppStyles.regularText, styles.vehicleNameText]}>
                {this.dispensations.selectedVehicle &&
                  this.dispensations.selectedVehicle.manufacturer}{' '}
                {this.dispensations.selectedVehicle &&
                  this.dispensations.selectedVehicle.model}
              </Text>
            </View>
            <View style={styles.downIconView}>
              <MaterialCommunityIcons
                style={[styles.downIcon]}
                name="chevron-down"
              />
            </View>
          </TouchableOpacity>
          <View style={styles.listMainView}>
            <FlatList
              data={
                this.dispensations.list && this.dispensations.list.length
                  ? this.dispensations.list
                  : []
              }
              alwaysBounceVertical={false}
              extraData={
                this.dispensations.list && this.dispensations.list.length
                  ? JSON.stringify(this.dispensations.list)
                  : []
              }
              renderItem={({item, i}) => this.renderCommunityItem(item, i)}
              ListFooterComponent={this.renderFooter(
                this.dispensations.isLoadingMore,
              )}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.invoiceContentContainerStyle}
              keyExtractor={this._keyExtractor}
              bounces={true}
              onEndReachedThreshold={0.1}
              onEndReached={() => this.onEndReached()}
            />
          </View>
          {this.renderLoading()}
        </View>
      );
    } else if (!(Account.connectionReady && Vehicles.ready)) {
      return (
        <View style={AppStyles.container}>
          <LoadingShadow />
        </View>
      );
    } else {
      return (
        <View style={[AppStyles.container, AppStyles.containerCentered]}>
          <StatusBar
            backgroundColor={AppColors.statusBarBg}
            hidden={false}
            barStyle={AppColors.statusBarStyle}
          />
          <NoData
            image={AppResources.myCar}
            title={'No Vehicles!'}
            content={
              'Please add vehicles and dispense through Oleum to start monitoring your vehicle'
            }
          />
        </View>
      );
    }
  }
}

export default MyInvoices;
