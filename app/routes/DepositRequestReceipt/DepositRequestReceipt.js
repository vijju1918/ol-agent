/**
 * Copyright (c) 2018-present, Oleum. All rights reserved.
 *
 */

'use strict';

import React, {Component} from 'react';
import {View, Text, ScrollView} from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Button from '@components/Button';
import QRScan from '@components/QRScan';
import DetailsTable from '@components/DetailsTable';

import {AppStyles} from '@theme';
import AppStrings from '@config/strings';
import styles from './styles';

import {DispenseRequest as DispenseRequestStore} from '@stores/DispenseRequests';

class DepositRequestReceipt extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.dispenseRequestStore = new DispenseRequestStore(
      this.props.depositDetails,
    );
  }

  viewFunction() {
    this.props.renderViewHome();
  }

  render() {
    return (
      <View style={AppStyles.containerWhite}>
        <ScrollView
          alwaysBounceVertical={false}
          showsVerticalScrollIndicator={false}>
          <View style={styles.infoView}>
            <View style={styles.iconMainView}>
              <MaterialCommunityIcons
                style={styles.buttonIcon}
                name={'check'}
                color={'black'}
              />
            </View>
            <View style={styles.infoMessageView}>
              <Text
                style={[
                  AppStyles.regularBoldText,
                  styles.infoMessageText,
                  AppStyles.darkText,
                ]}>
                {AppStrings.depositRequestStatus}
              </Text>
            </View>
          </View>
          <View style={styles.qrView}>
            <QRScan referenceId={this.props.depositDetails.referenceId} />
          </View>
          <View style={styles.mainView}>
            <View style={styles.labelView}>
              <Text style={[AppStyles.labelText, AppStyles.darkText]}>
                {AppStrings.summary}
              </Text>
            </View>
            <View style={styles.detailsTableView}>
              <DetailsTable
                listData={this.dispenseRequestStore.materialDispensationDetails}
              />
            </View>
            <View style={styles.labelView}>
              <Text style={[AppStyles.labelText, AppStyles.darkText]}>
                {this.dispenseRequestStore.material.perUnit
                  ? AppStrings.materialRangeInfoText.replace(
                      '<condition>',
                      'Per Unit',
                    )
                  : AppStrings.materialRangeInfoText.replace(
                      '<condition>',
                      'Flat Rate',
                    )}
              </Text>
            </View>
            <View style={styles.detailsTableView}>
              <DetailsTable
                listData={this.dispenseRequestStore.materialSegments}
              />
            </View>
          </View>
        </ScrollView>
        <View style={styles.buttonView}>
          <Button
            buttonText={AppStrings.done}
            onPress={() => this.viewFunction()}
          />
        </View>
      </View>
    );
  }
}

export default DepositRequestReceipt;
