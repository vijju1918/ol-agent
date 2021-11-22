/**
 * Copyright (c) 2018-present, Evolvier Technologies. All rights reserved.
 *
 */

'use strict';

import React, {Component} from 'react';
import {View, Text, ScrollView, SectionList, StatusBar} from 'react-native';
import {observer} from 'mobx-react';
import {getDateTimeString} from '@lib/utils';

import TouchableOpacity from '@components/TouchableOpacity';
import Image from '@components/Image';

import {AppConstants, AppResources} from '@config';
import {AppStyles, AppColors} from '@theme';
import styles from './styles';
import NoData from '@components/NoData';

import DispenseRequestList from '@stores/DispenseRequests';

@observer
class MyDispensationsHistory extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  _keyExtractor = item => item.id;

  onPressViewDetails(data) {
    this.props.renderDispensationsHistoryDetails({
      dispensation: data,
    });
  }

  getVehicleTitle(item) {
    if (item.dispensationVehicle && item.dispensationVehicle.id) {
      return item.dispensationVehicle.number;
    } else {
      return item.corporateTitle;
    }
  }

  renderHeader(item) {
    if (item.type === AppConstants.material) {
      return (
        <View style={styles.logoAndNameView}>
          {item.vendorLogo ? (
            <View style={styles.vendorImageView}>
              <View style={styles.vendorLogo}>
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
            </View>
          ) : (
            <View style={styles.vendorImageView}>
              <View style={styles.letterView}>
                <Text
                  style={[AppStyles.titleBoldText, AppStyles.upperCaseText]}>
                  {item.corporateTitle
                    .match(/\b(\w)/g)
                    .join('')
                    .slice(0, 2)}
                </Text>
              </View>
            </View>
          )}
          <View style={styles.vendorNameView}>
            <Text style={[AppStyles.regularText, AppStyles.darkText]}>
              Material Deposit
            </Text>
            <Text style={[AppStyles.regularText, AppStyles.darkText]}>
              {item.material.name}
            </Text>
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.logoAndNameView}>
          {item.vendorLogo ? (
            <View style={styles.vendorImageView}>
              <View style={styles.vendorLogo}>
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
            </View>
          ) : (
            <View style={styles.vendorImageView}>
              <View style={styles.letterView}>
                <Text
                  style={[AppStyles.titleBoldText, AppStyles.upperCaseText]}>
                  {item.corporateTitle
                    .match(/\b(\w)/g)
                    .join('')
                    .slice(0, 2)}
                </Text>
              </View>
            </View>
          )}
          <View style={styles.vendorNameView}>
            <Text style={[AppStyles.regularBoldText, AppStyles.darkText]}>
              {this.getVehicleTitle(item)}
            </Text>
            {item.dispensationVehicle && item.dispensationVehicle.id ? (
              <Text
                style={[
                  AppStyles.mediumBoldText,
                  AppStyles.darkText,
                  styles.marginTopSmall,
                ]}>
                {item.corporateTitle}
              </Text>
            ) : null}
            <Text
              style={[
                AppStyles.regularText,
                AppStyles.darkText,
                styles.marginTopSmall,
              ]}>
              {item.productName}
            </Text>
          </View>
        </View>
      );
    }
  }

  renderRODetails(item) {
    if (item.status === AppConstants.promotionStatus.completed) {
      return (
        <View style={styles.logoAndNameView}>
          {item.vendorLogo ? (
            <View style={styles.vendorImageView}>
              <View style={styles.vendorLogo}>
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
            </View>
          ) : (
            <View style={styles.vendorImageView}>
              <View style={styles.letterView}>
                <Text
                  style={[AppStyles.titleBoldText, AppStyles.upperCaseText]}>
                  {item.corporateTitle
                    .match(/\b(\w)/g)
                    .join('')
                    .slice(0, 2)}
                </Text>
              </View>
            </View>
          )}
          <View style={styles.vendorNameView}>
            <Text style={[AppStyles.regularText, AppStyles.darkText]}>
              {item.corporateTitle}
            </Text>
          </View>
        </View>
      );
    } else {
      return (
        <View>
          <Text style={[AppStyles.regularBoldText, styles.cancelText]}>
            {item.status}
          </Text>
        </View>
      );
    }
  }

  renderSectionHeader(date) {
    return (
      <View style={styles.sectionHeaderView}>
        <Text style={[AppStyles.labelText, AppStyles.darkText]}>
          {getDateTimeString(date.title, 'DD MMMM YYYY')}
        </Text>
      </View>
    );
  }

  renderRow(item) {
    return (
      <View>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => this.onPressViewDetails(item)}>
          <View style={styles.dispensationsView}>
            <View style={styles.corporateDetailsView}>
              {this.renderHeader(item)}
            </View>
            <View style={styles.fuelDetailsView}>
              <View style={[AppStyles.row, styles.litrePointView]}>
                <View>
                  <Text style={[AppStyles.titleBoldText, AppStyles.darkText]}>
                    {item.dispensedQuantities
                      ? item.dispensedQuantities[0].value
                      : null}
                  </Text>
                </View>
                <View>
                  <Text
                    style={[
                      AppStyles.regularText,
                      AppStyles.darkText,
                      styles.unitText,
                    ]}>
                    {item.dispensedQuantities
                      ? item.dispensedQuantities[0].unit
                      : null}
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.fuelDetailsView}>
              <View style={[AppStyles.row, styles.fuelPointView]}>
                <View>
                  <Text style={[AppStyles.titleBoldText, AppStyles.darkText]}>
                    {item.dispensedQuantities
                      ? item.dispensedQuantities[1].value
                      : null}
                  </Text>
                </View>
                <View>
                  <Text
                    style={[
                      AppStyles.regularText,
                      AppStyles.darkText,
                      styles.unitText,
                    ]}>
                    {item.dispensedQuantities
                      ? item.dispensedQuantities[1].unit
                      : null}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  itemSeparatorComponent() {
    return (
      <View
        style={[
          AppStyles.horizontalLine,
          AppStyles.marginHorizontal,
          styles.line,
        ]}
      />
    );
  }

  render() {
    if (DispenseRequestList.completedList.length) {
      return (
        <View style={[AppStyles.container, styles.mainView]}>
          <View style={styles.infoView}>
            <Text style={AppStyles.regularText}>
              Your dispensations & deposits
            </Text>
          </View>
          <ScrollView
            alwaysBounceVertical={false}
            showsVerticalScrollIndicator={false}>
            <SectionList
              renderItem={({item}) => this.renderRow(item, this)}
              renderSectionHeader={({section}) =>
                this.renderSectionHeader(section)
              }
              keyExtractor={this._keyExtractor}
              sections={DispenseRequestList.completedList}
              showsVerticalScrollIndicator={false}
              ItemSeparatorComponent={() => this.itemSeparatorComponent()}
            />
          </ScrollView>
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
            image={AppResources.noHistory}
            title={'No Dispense or Deposit History'}
            content={'You have no history of dispense or deposit requests.'}
          />
        </View>
      );
    }
  }
}

export default MyDispensationsHistory;
