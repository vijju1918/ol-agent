/**
 * Copyright (c) 2018-present, Evolvier Technologies. All rights reserved.
 *
 */

'use strict';

import React, {Component} from 'react';
import {View, Text, ScrollView} from 'react-native';

import DetailsTable from '@components/DetailsTable';
import OrderStatus from '@components/OrderStatus';

import {AppStyles} from '@theme';
import AppStrings from '@config/strings';
import styles from './styles';
import {AppConstants} from '@config';

import {DispenseRequest as DispenseRequestStore} from '@stores/DispenseRequests';

class MyDispensationsHistoryDetails extends Component {
  constructor(props) {
    super(props);
    this.dispenseRequestStore = new DispenseRequestStore(
      this.props.dispensation,
    );
    this.state = {
      starCount: null,
      data: [],
    };
  }

  onStarRatingPress(rating) {
    this.setState({
      starCount: rating,
    });
  }

  render() {
    return (
      <View style={[AppStyles.containerWhite, styles.mainView]}>
        <ScrollView
          alwaysBounceVertical={false}
          showsVerticalScrollIndicator={false}>
          <View style={styles.statusAndRatingView}>
            <View style={styles.statusComponentView}>
              <OrderStatus
                status={this.dispenseRequestStore.status}
                referenceId={this.dispenseRequestStore.referenceId}
              />
            </View>
          </View>
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
          <View style={styles.detailsTableView}>
            <DetailsTable
              listData={
                this.dispenseRequestStore.type === AppConstants.material
                  ? this.dispenseRequestStore.materialDispensationDetails
                  : this.dispenseRequestStore.dispensationDetails
              }
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default MyDispensationsHistoryDetails;
