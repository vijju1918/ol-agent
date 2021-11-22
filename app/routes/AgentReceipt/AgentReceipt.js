/**
 * Copyright (c) 2018-present, Evolvier Technologies. All rights reserved.
 *
 */

'use strict';

import React, {Component} from 'react';
import {View, Text, ScrollView} from 'react-native';

import {AppStyles} from '@theme';
import AppStrings from '@config/strings';
import styles from './styles';

import Button from '@components/Button';
import DetailsTable from '@components/DetailsTable';
import OrderStatus from '@components/OrderStatus';

import {DispenseRequest as DispenseRequestStore} from '@stores/DispenseRequests';

class AgentReceipt extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.dispenseRequestStore = new DispenseRequestStore(this.props.data);
  }

  render() {
    return (
      <View style={AppStyles.container}>
        <ScrollView
          alwaysBounceVertical={false}
          showsVerticalScrollIndicator={false}>
          <View style={styles.orderStatusView}>
            <OrderStatus
              status={this.dispenseRequestStore.status}
              referenceId={this.dispenseRequestStore.referenceId}
            />
          </View>
          <View style={styles.labelView}>
            <Text style={[AppStyles.labelText, AppStyles.darkText]}>
              {AppStrings.details}
            </Text>
          </View>
          <View style={styles.detailsTableView}>
            <DetailsTable
              listData={
                this.dispenseRequestStore.type === 'MATERIAL'
                  ? this.dispenseRequestStore.materialDispensationDetails
                  : this.dispenseRequestStore.dispensationDetails
              }
            />
          </View>
        </ScrollView>
        <View style={styles.buttonView}>
          <Button
            buttonText={AppStrings.done}
            onPress={() => this.props.renderAgentHome()}
          />
        </View>
      </View>
    );
  }
}

export default AgentReceipt;
