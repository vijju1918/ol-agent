/**
 * Copyright (c) 2018-present, Oleum. All rights reserved.
 *
 */

'use strict';

import React, {Component} from 'react';

import {View, Text, ScrollView} from 'react-native';

import DetailsTable from '@components/DetailsTable';
import OrderStatus from '@components/OrderStatus';
import Button from '@components/Button';

import {AppStyles} from '@theme';
import AppStrings from '@config/strings';
import styles from './styles';

class ValuePromoReceipt extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [
        {
          one: 'material',
        },
        'vendor',
        'hdgjhdg',
        'bbdh',
      ],
    };
  }

  _keyExtractor = item => item.one;

  render() {
    return (
      <View style={AppStyles.containerWhite}>
        <ScrollView
          alwaysBounceVertical={false}
          showsVerticalScrollIndicator={false}>
          <View style={styles.promoTitleView}>
            <Text style={[AppStyles.regularBoldText, AppStyles.darkText]}>
              Promotion Title
            </Text>
          </View>
          <View style={styles.statusView}>
            <View style={styles.statusComponentView}>
              <OrderStatus status={'COMPLETED'} referenceId={'afedsd123'} />
            </View>
          </View>
          <View style={styles.labelView}>
            <Text style={[AppStyles.labelText, AppStyles.darkText]}>
              {AppStrings.orderDetails}
            </Text>
          </View>
          <View style={styles.detailsTableView}>
            <DetailsTable listData={this.state.data} />
          </View>
        </ScrollView>
        <View style={styles.buttonView}>
          <Button
            buttonText={AppStrings.done}
            onPress={() => this.props.renderHome()}
          />
        </View>
      </View>
    );
  }
}

export default ValuePromoReceipt;
