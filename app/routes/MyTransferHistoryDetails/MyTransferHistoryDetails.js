/**
 * Copyright (c) 2018-present, Evolvier Technologies. All rights reserved.
 *
 */

'use strict';

import React, {Component} from 'react';
import {View, Text, ScrollView} from 'react-native';

import {Transfer} from '@stores/Transfers';
import Account from '@stores/Account';
import {observer} from 'mobx-react';

import DetailsTable from '@components/DetailsTable';
import OrderStatus from '@components/OrderStatus';
import {AppStyles} from '@theme';
import AppStrings from '@config/strings';
import styles from './styles';

@observer
class MyTransferHistoryDetails extends Component {
  constructor(props) {
    super(props);
    this.transfer = new Transfer(this.props.transferItem);
    this.state = {};
  }

  render() {
    return (
      <View style={[AppStyles.containerWhite, styles.mainView]}>
        <ScrollView
          alwaysBounceVertical={false}
          showsVerticalScrollIndicator={false}>
          <View style={styles.statusView}>
            <View style={styles.statusComponentView}>
              <OrderStatus
                status={this.transfer.status}
                referenceId={this.transfer.referenceId}
                iconName={
                  this.transfer.sendFrom.id === Account.user.endUserId
                    ? 'arrow-collapse-up'
                    : 'arrow-collapse-down'
                }
              />
            </View>
          </View>
          <View style={styles.detailsTableView}>
            <View style={styles.labelView}>
              <Text style={[AppStyles.labelText, AppStyles.darkText]}>
                {AppStrings.summary}
              </Text>
            </View>
            <View style={styles.detailsTableListView}>
              <DetailsTable listData={this.transfer.transferSummary} />
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default MyTransferHistoryDetails;
