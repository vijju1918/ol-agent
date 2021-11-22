/**
 * Copyright (c) 2018-present, Oleum. All rights reserved.
 *
 */

'use strict';

import React, {Component} from 'react';
import {View, FlatList, Text, StatusBar} from 'react-native';
import {observer} from 'mobx-react';

import {AppStyles, AppColors} from '@theme';
import styles from './styles';
import {
  getDateTimeString,
  fetchVehicleDetailsUsingVehicleId,
} from '../../lib/utils';
import {AppConstants, AppResources} from '@config';
import NoData from '@components/NoData';
import TouchableOpacity from '@components/TouchableOpacity';
import Image from '@components/Image';

import DispenseRequestStore from '@stores/DispenseRequests';
import Vehicles from '@stores/Vehicles';
import Cans from '@stores/Cans';

@observer
class PendingDR extends Component {
  onPressViewDetails(data) {
    this.props.renderPendingDRDetails({
      drRequest: data,
    });
  }

  getVehicleTitle(item) {
    if (item.dispensationVehicle && item.dispensationVehicle.id) {
      let vehicleId = item.dispensationVehicle && item.dispensationVehicle.id;
      let vehicleInfo = fetchVehicleDetailsUsingVehicleId(
        Vehicles.list,
        vehicleId,
      );
      return vehicleInfo && vehicleInfo.title ? vehicleInfo.title : '';
    } else {
      return item.corporateTitle;
    }
  }

  renderPendingDRItem(item) {
    let can = Cans.myList.filter(eachItem => eachItem.id === item.can.id);
    if (
      item.type === AppConstants.drType.material &&
      item.status === AppConstants.promotionStatus.pending
    ) {
      return (
        <TouchableOpacity
          style={
            can && can.length && can[0].type === AppConstants.userTypes.oleum
              ? styles.mrDrItemMainView
              : styles.drItemMainView
          }
          activeOpacity={0.5}
          onPress={() => this.onPressViewDetails(item)}>
          <View style={styles.drDataView}>
            <View style={styles.imageNameView}>
              <View style={styles.imageView}>
                <Image
                  style={[styles.vendorMaterial]}
                  resizeMode={'center'}
                  source={{
                    uri:
                      'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcT4692lsY_FGn9NhHPis0BVdovCkaqDbDSn4vZLbtqX0dbGay9W&usqp=CAU',
                  }}
                />
              </View>
              <View style={styles.vendorNameView}>
                <Text style={[AppStyles.regularBoldText, AppStyles.darkText]}>
                  {item.material.name}
                </Text>
                <Text style={[AppStyles.regularText, AppStyles.darkText]}>
                  Material Deposit
                </Text>
                <Text style={[AppStyles.mediumRegularText, styles.dateText]}>
                  {getDateTimeString(item.validity, 'DD MMMM YYYY')}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.drValueView} />
        </TouchableOpacity>
      );
    } else if (
      item.type === AppConstants.drType.fuel &&
      item.status === AppConstants.promotionStatus.pending
    ) {
      return (
        <TouchableOpacity
          style={
            can && can.length && can[0].type === AppConstants.userTypes.oleum
              ? styles.mrDrItemMainView
              : styles.drItemMainView
          }
          activeOpacity={0.5}
          onPress={() => this.onPressViewDetails(item)}>
          <View style={styles.drDataView}>
            <View style={styles.imageNameView}>
              {item.vendorLogo ? (
                <View style={styles.imageView}>
                  <Image
                    style={[styles.vendorLogo]}
                    source={
                      item.vendorLogo
                        ? {
                            uri: item.vendorLogo,
                          }
                        : AppResources.noImage
                    }
                  />
                </View>
              ) : (
                <View style={styles.imageView}>
                  <View style={styles.letterView}>
                    <Text
                      style={[
                        AppStyles.titleBoldText,
                        AppStyles.upperCaseText,
                        styles.titleLetterText,
                      ]}>
                      {item.corporateTitle
                        .match(/\b(\w)/g)
                        .join('')
                        .slice(0, 2)}
                    </Text>
                  </View>
                </View>
              )}
              <View style={styles.vendorNameView}>
                <Text
                  numberOfLines={1}
                  style={[AppStyles.regularBoldText, AppStyles.darkText]}>
                  {this.getVehicleTitle(item)}
                </Text>
                {item.dispensationVehicle && item.dispensationVehicle.id ? (
                  <Text
                    numberOfLines={1}
                    style={[
                      AppStyles.mediumBoldText,
                      AppStyles.darkText,
                      styles.dateText,
                    ]}>
                    {item.corporateTitle}
                  </Text>
                ) : null}
                <Text style={[AppStyles.mediumRegularText, styles.dateText]}>
                  {getDateTimeString(item.validity, 'DD MMMM YYYY')}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.drValueView}>
            <Text style={[AppStyles.titleBoldText]}>{item.value}</Text>
            <Text style={[AppStyles.regularText]}>{item.valueUnit}</Text>
          </View>
        </TouchableOpacity>
      );
    } else {
      return null;
    }
  }

  ItemSeparatorComponent() {
    return (
      <View style={[AppStyles.horizontalLine, AppStyles.marginHorizontal]} />
    );
  }

  _keyExtractor = item => item.id;

  render() {
    if (DispenseRequestStore.sortedList.length) {
      return (
        <View style={AppStyles.container}>
          <View style={styles.infoView}>
            <Text style={[AppStyles.regularText, AppStyles.darkText]}>
              Pending Dispense & Deposit Requests
            </Text>
          </View>
          <View style={styles.flatListVeiw}>
            <FlatList
              data={DispenseRequestStore.sortedList.slice()}
              alwaysBounceVertical={false}
              extraData={DispenseRequestStore.sortedList.slice()}
              renderItem={({item, i}) => this.renderPendingDRItem(item, i)}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.pendingDRContentContainerStyle}
              keyExtractor={this._keyExtractor}
              ItemSeparatorComponent={() => this.ItemSeparatorComponent()}
              bounces={true}
            />
          </View>
        </View>
      );
    } else {
      return (
        <View style={[AppStyles.container, styles.center]}>
          <StatusBar
            backgroundColor={AppColors.statusBarBg}
            hidden={false}
            barStyle={AppColors.statusBarStyle}
          />
          <NoData
            image={AppResources.noDR}
            title={'No Dispense or Deposit Requests'}
            content={'You have no pending dispense or deposit requests.'}
          />
        </View>
      );
    }
  }
}

export default PendingDR;
