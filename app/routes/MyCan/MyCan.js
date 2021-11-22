/**
 * Copyright (c) 2018-present, Oleum. All rights reserved.
 *
 */

'use strict';

import React, {Component} from 'react';
import {View, FlatList, Text, TouchableOpacity} from 'react-native';
import {observer} from 'mobx-react';
import {toJS} from 'mobx';
import {createIconSetFromFontello} from 'react-native-vector-icons';
import {OpenMapDirections} from 'react-native-navigation-directions';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Header from '@components/Header';
import NoData from '@components/NoData';
import TouchableOpacityWrapper from '@components/TouchableOpacity';
import LoadingShadow from '@components/LoadingShadow';
import Image from '@components/Image';

import {
  getDateTimeString,
  fetchVehicleDetailsUsingVehicleId,
} from '../../lib/utils';
import {AppStyles} from '@theme';
import {AppResources, AppIconFonts, AppConstants} from '@config';
import styles from './styles';

import Account from '@stores/Account';
import Cans, {Can} from '@stores/Cans';
import Vehicles from '@stores/Vehicles';
import Corporates from '@stores/Corporates';

const Icon = createIconSetFromFontello(AppIconFonts);

@observer
class MyCan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPersonalCanTab: true,
      isVehicleCanTab: false,
    };
    this.can = new Can();
  }

  _keyExtractor = item => item.id;

  onPressCanItem(item) {
    this.props.viewCanTransactionsDetails({
      can: item,
    });
  }

  renderNewCanItem(item, isVehicleCan = false) {
    return (
      <View style={styles.canItemVieww}>
        {this.renderCanItemComponent(item, isVehicleCan)}
      </View>
    );
  }

  renderTransferControlButton(item) {
    if (
      Vehicles.list &&
      Vehicles.list.length &&
      item.user &&
      item.user.type !== 'vehicle'
    ) {
      return (
        <TouchableOpacityWrapper
          activeOpacity={0.5}
          onPress={() => this.props.renderTransferToVehicleCan({can: item})}>
          <View
            style={
              item.type === AppConstants.userTypes.oleum
                ? styles.drCanDispenseRequestView
                : styles.dispenseRequestView
            }>
            <Text
              style={
                item.type === AppConstants.userTypes.oleum
                  ? [AppStyles.mediumBoldText, AppStyles.whiteText]
                  : [AppStyles.mediumBoldText]
              }>
              Transfer
            </Text>
          </View>
        </TouchableOpacityWrapper>
      );
    }
  }

  getVehicleInfo(userData) {
    if (
      userData &&
      userData.id &&
      userData.type &&
      userData.type === AppConstants.vehicle &&
      Vehicles.list &&
      Vehicles.list.length
    ) {
      let vehicleInfo = fetchVehicleDetailsUsingVehicleId(
        Vehicles.list,
        userData.id,
      );
      return vehicleInfo;
    } else {
      return null;
    }
  }

  renderControlButtons(item, isVehicleCan = false) {
    return (
      <View style={styles.optionsView}>
        <TouchableOpacityWrapper
          activeOpacity={0.5}
          onPress={() =>
            this.props.renderAddFuel({
              vendorId: item && item.vendorId,
              vehicleInfo: this.getVehicleInfo(item && item.user),
              isFromVehicleCan: isVehicleCan,
            })
          }>
          <View
            style={
              item.type === AppConstants.userTypes.oleum
                ? styles.drCanDispenseRequestView
                : styles.dispenseRequestView
            }>
            <Text
              style={
                item.type === AppConstants.userTypes.oleum
                  ? [AppStyles.mediumBoldText, AppStyles.whiteText]
                  : [AppStyles.mediumBoldText]
              }>
              Refuel
            </Text>
          </View>
        </TouchableOpacityWrapper>
        <View style={styles.optionsSpacingView} />
        <TouchableOpacityWrapper
          activeOpacity={0.5}
          onPress={() =>
            this.props.viewDispenseRequest({
              vendorId: item && item.vendorId,
              canId: item && item.id,
              vehicleInfo: isVehicleCan
                ? this.getVehicleInfo(item && item.user)
                : null,
            })
          }>
          <View
            style={
              item.type === AppConstants.userTypes.oleum
                ? styles.drCanDispenseRequestView
                : styles.dispenseRequestView
            }>
            <Text
              style={
                item.type === AppConstants.userTypes.oleum
                  ? [AppStyles.mediumBoldText, AppStyles.whiteText]
                  : [AppStyles.mediumBoldText]
              }>
              Dispense
            </Text>
          </View>
        </TouchableOpacityWrapper>
        <View style={styles.optionsSpacingView} />
        {this.renderTransferControlButton(item)}
      </View>
    );
  }

  renderItemThumbnail(item) {
    if (item) {
      if (
        (item.vendor &&
          item.vendor.corporateImage &&
          item.vendor.corporateImage &&
          item.vendor.corporateImage.url) ||
        item.image
      ) {
        return (
          <View style={styles.canItemImageView}>
            <Image
              style={styles.canImage}
              source={
                item.vendor &&
                item.vendor.corporateImage &&
                item.vendor.corporateImage &&
                item.vendor.corporateImage.url
                  ? {
                      uri: item.vendor.corporateImage.url,
                    }
                  : item.image
                  ? {
                      uri: item.image,
                    }
                  : AppResources.noImage
              }
            />
          </View>
        );
      } else if ((item.vendor && item.vendor.title) || item.title) {
        return (
          <View style={styles.canItemImageView}>
            <View style={styles.letterView}>
              <Text
                style={[
                  AppStyles.titleBoldText,
                  AppStyles.upperCaseText,
                  styles.titleLetterText,
                ]}>
                {item.vendor && item.vendor.title
                  ? item.vendor.title
                      .match(/\b(\w)/g)
                      .join('')
                      .slice(0, 2)
                  : item.title
                  ? item.title
                      .match(/\b(\w)/g)
                      .join('')
                      .slice(0, 2)
                  : ''}
              </Text>
            </View>
          </View>
        );
      } else {
        return null;
      }
    }
  }

  renderRORating(item) {
    if (item.type !== AppConstants.userTypes.oleum) {
      if (
        (item.vendor && item.vendor.rating && item.vendor.rating.value > 0) ||
        (item.rating && item.rating.value > 0)
      ) {
        return (
          <View style={styles.ratingView}>
            <View style={[AppStyles.row, styles.starIconWrapper]}>
              <MaterialCommunityIcons style={styles.starIcon} name="star" />
              <Text style={[AppStyles.mediumBoldText]}>
                {item.vendor && item.vendor.rating && item.vendor.rating.value
                  ? item.vendor.rating.value.toFixed(1)
                  : item.rating && item.rating.value
                  ? item.rating.value.toFixed(1)
                  : 0}
              </Text>
            </View>

            <Text style={[AppStyles.smallText, styles.ratingCountText]}>
              {'( ' +
                (item.vendor && item.vendor.rating && item.vendor.rating.count
                  ? item.vendor &&
                    item.vendor.rating &&
                    item.vendor.rating.count
                  : item.rating && item.rating.count
                  ? item.rating.count
                  : 0) +
                ' )'}
            </Text>
          </View>
        );
      } else {
        return (
          <View style={[AppStyles.row, styles.starIconWrapper]}>
            <Text style={[AppStyles.mediumBoldText]}>{'Not Rated'}</Text>
          </View>
        );
      }
    } else {
      return null;
    }
  }

  renderCanItemComponent(item, isVehicleCan = false) {
    let vehicleInfo = fetchVehicleDetailsUsingVehicleId(
      Vehicles.list,
      item && item.user && item.user.id,
    );
    return (
      <View
        style={
          item.type === AppConstants.userTypes.oleum
            ? styles.mrCanItemMainView
            : styles.canItemMainView
        }>
        {this.renderItemThumbnail(item)}
        <View style={styles.canItemDetailsView}>
          <TouchableOpacityWrapper
            activeOpacity={0.5}
            onPress={() => this.onPressCanItem(item)}>
            <Text style={AppStyles.regularBoldText}>
              {isVehicleCan && vehicleInfo
                ? vehicleInfo.title
                  ? vehicleInfo.title
                  : vehicleInfo.number
                  ? vehicleInfo.number
                  : ''
                : item.vendor && item.vendor.title
                ? item.vendor.title
                : item.title
                ? item.title
                : ''}
            </Text>
            {isVehicleCan ? (
              <Text style={[AppStyles.mediumBoldText, styles.darkText]}>
                {item.vendor && item.vendor.title
                  ? item.vendor.title
                  : item.title
                  ? item.title
                  : ''}
              </Text>
            ) : null}
            {this.renderRORating(item)}
            <Text style={[AppStyles.mediumRegularText, styles.lastUpdatedText]}>
              Last updated
            </Text>
            <Text style={[AppStyles.mediumRegularText]}>
              {item.lastUpdatedAt
                ? getDateTimeString(item.lastUpdatedAt, 'DD MMMM YYYY, hh:mm a')
                : '---'}
            </Text>
          </TouchableOpacityWrapper>
          {this.renderControlButtons(item, isVehicleCan)}
        </View>
        <View style={styles.fpAndDistanceView}>
          <Text style={[AppStyles.regularBoldText]}>
            {Number(item.quantity).toFixed(2) + ' FP'}
          </Text>
          {item.type !== AppConstants.userTypes.oleum ? (
            <TouchableOpacityWrapper
              onPress={() => this.openDirectionsInMap(item)}>
              <Icon style={styles.navigationIcon} name={'oleum_route'} />
              <Text style={[AppStyles.regularText, styles.distanceText]}>
                {item.vendor &&
                item.vendor.location &&
                this.can.getDistance(item.vendor && item.vendor.location)
                  ? this.can
                      .getDistance(item.vendor && item.vendor.location)
                      .toFixed(2) + ' km'
                  : item.getDistance()
                  ? item.getDistance().toFixed(2) + ' km'
                  : ''}
              </Text>
            </TouchableOpacityWrapper>
          ) : null}
        </View>
      </View>
    );
  }

  openDirectionsInMap(item) {
    if (
      item.vendor &&
      item.vendor.location &&
      item.vendor.location.coordinates &&
      item.vendor.location.coordinates.length
    ) {
      const endPoint = {
        longitude: item.vendor.location.coordinates[0],
        latitude: item.vendor.location.coordinates[1],
      };
      OpenMapDirections(null, endPoint, 'd');
    } else if (item.getLocation()) {
      const endPoint = {
        longitude:
          item.getLocation().coordinates &&
          item.getLocation().coordinates.length &&
          item.getLocation().coordinates[0],
        latitude:
          item.getLocation().coordinates &&
          item.getLocation().coordinates.length &&
          item.getLocation().coordinates[1],
      };
      OpenMapDirections(null, endPoint, 'd');
    } else {
      return null;
    }
  }

  renderItemSeparator() {
    return <View style={[AppStyles.horizontalLine, styles.horizontalLine]} />;
  }

  onPressPersonalCanTab() {
    this.setState({
      isPersonalCanTab: true,
      isVehicleCanTab: false,
    });
  }

  onPressVehicleCanTab() {
    this.setState({
      isPersonalCanTab: false,
      isVehicleCanTab: true,
    });
  }

  renderTabView() {
    return (
      <View style={styles.tabView}>
        <TouchableOpacity
          activeOpacity={1}
          style={
            this.state.isPersonalCanTab
              ? styles.tabTouchSelected
              : styles.tabTouch
          }
          onPress={() => this.onPressPersonalCanTab()}>
          <Text style={AppStyles.regularBoldText}>Personal Can</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={1}
          style={
            this.state.isVehicleCanTab
              ? styles.tabTouchSelected
              : styles.tabTouch
          }
          onPress={() => this.onPressVehicleCanTab()}>
          <Text style={AppStyles.regularBoldText}>Vehicle Can</Text>
        </TouchableOpacity>
      </View>
    );
  }

  renderListView() {
    if (this.state.isPersonalCanTab) {
      if (Cans.myList.length && Corporates.list.length) {
        return (
          <View style={styles.flatListView}>
            <FlatList
              data={Cans.myList.slice()}
              keyExtractor={this._keyExtractor}
              renderItem={({item}) => this.renderNewCanItem(item)}
              ItemSeparatorComponent={() => this.renderItemSeparator()}
              contentContainerStyle={styles.listContentContainerStyle}
              extraData={toJS(Cans.myList)}
            />
          </View>
        );
      } else if (!(Account.connectionReady && Cans.ready && Corporates.ready)) {
        return (
          <View style={styles.container}>
            <LoadingShadow />
          </View>
        );
      } else {
        return (
          <View
            style={[
              AppStyles.container,
              AppStyles.containerCentered,
              styles.noDataView,
            ]}>
            <NoData
              image={AppResources.noCan}
              title={'No Can !'}
              content={'You have no Can. Please purchase Fuel Points'}
            />
          </View>
        );
      }
    } else if (this.state.isVehicleCanTab) {
      if (Cans.vehicleCanList.length && Corporates.list.length) {
        return (
          <View style={styles.flatListView}>
            <FlatList
              data={Cans.myVehicleCanList.slice()}
              keyExtractor={this._keyExtractor}
              renderItem={({item}) => this.renderNewCanItem(item, true)}
              ItemSeparatorComponent={() => this.renderItemSeparator()}
              contentContainerStyle={styles.listContentContainerStyle}
              extraData={Cans.myVehicleCanList.slice()}
            />
          </View>
        );
      } else if (!(Account.connectionReady && Cans.ready && Corporates.ready)) {
        return (
          <View style={styles.container}>
            <LoadingShadow />
          </View>
        );
      } else {
        return (
          <View
            style={[
              AppStyles.container,
              AppStyles.containerCentered,
              styles.noDataView,
            ]}>
            <NoData
              image={AppResources.noCan}
              title={'No Can !'}
              content={'You have no vehicle Can.'}
            />
          </View>
        );
      }
    } else {
      return (
        <View
          style={[
            AppStyles.container,
            AppStyles.containerCentered,
            styles.noDataView,
          ]}>
          <NoData
            image={AppResources.noCan}
            title={'No Can !'}
            content={'You have no Can. All of your Cans will be listed here'}
          />
        </View>
      );
    }
  }

  render() {
    return (
      <View style={AppStyles.container}>
        <View>
          <Header
            loading={
              !(
                Account.connectionReady &&
                Cans.ready &&
                Vehicles.ready &&
                Corporates.ready
              )
            }
            functionOne={this.props.viewDispenseRequest}
            isVehicleCan={this.state.isVehicleCanTab ? true : false}
            onClickAddFP={() =>
              this.props.viewAddFP({
                onPaymentCompleted: data => {
                  this.props.openPaymentRecept({
                    payment: data,
                  });
                },
              })
            }
          />
        </View>
        {this.renderTabView()}
        {this.renderListView()}
      </View>
    );
  }
}

export default MyCan;
