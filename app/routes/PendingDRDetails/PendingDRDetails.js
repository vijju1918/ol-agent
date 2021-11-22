/**
 * Copyright (c) 2018-present, Oleum. All rights reserved.
 *
 */

'use strict';

import React, {Component} from 'react';
import {View, ScrollView, Text} from 'react-native';
import {observer} from 'mobx-react';

import AppStrings from '@config/strings';
import {AppStyles, AppColors} from '@theme';
import styles from './styles';
import {AppConstants} from '@config';

import DetailsTable from '@components/DetailsTable';
import QRScan from '@components/QRScan';
import Criteria from '@components/Criteria';

@observer
class PendingDRDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.dispenseRequestStore = this.props.drRequest;
  }
  viewNext() {
    this.props.renderROList({
      data: this.dispenseRequestStore,
    });
  }

  renderCriteria() {
    if (
      this.dispenseRequestStore.type === AppConstants.material &&
      this.dispenseRequestStore.status === AppConstants.promotionStatus.pending
    ) {
      return (
        <View>
          <View style={styles.titleView}>
            <Text
              style={[
                AppStyles.labelText,
                AppStyles.darkText,
                styles.labeText,
              ]}>
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
          <DetailsTable listData={this.dispenseRequestStore.materialSegments} />
        </View>
      );
    } else {
      return null;
    }
  }

  _keyExtractor = item => item.reward;
  renderCriteriaItem(item) {
    return (
      <View style={styles.criteriaItemView}>
        <Criteria
          color1={AppColors.materialColor1}
          color2={AppColors.materialColor2}
          range={
            item.minQuantity +
            ' ' +
            this.dispenseRequestStore.material.unit +
            ' - ' +
            item.maxQuantity +
            ' ' +
            this.dispenseRequestStore.material.unit
          }
          reward={item.reward + ' FP'}
        />
      </View>
    );
  }

  render() {
    return (
      <View style={AppStyles.containerWhite}>
        <ScrollView
          alwaysBounceVertical={false}
          showsVerticalScrollIndicator={false}>
          <View style={styles.detailsTableView}>
            <View style={styles.infoView}>
              <Text style={[AppStyles.regularText, AppStyles.darkText]}>
                Request Details
              </Text>
            </View>
            <QRScan referenceId={this.dispenseRequestStore.referenceId} />
            <View style={styles.titleView}>
              <Text
                style={[
                  AppStyles.labelText,
                  AppStyles.darkText,
                  styles.labeText,
                ]}>
                {AppStrings.details}
              </Text>
            </View>
            <View style={styles.detailsTableListView}>
              <DetailsTable
                listData={
                  this.dispenseRequestStore.type === AppConstants.material
                    ? this.dispenseRequestStore.materialDispensationDetails
                    : this.dispenseRequestStore.dispensationDetails
                }
              />
            </View>
            {this.renderCriteria()}
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default PendingDRDetails;
