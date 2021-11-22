'use strict';

import React, {Component} from 'react';

import {View, ScrollView, Text} from 'react-native';
import {observer} from 'mobx-react';

import {AppStyles} from '@theme';
import AppStrings from '@config/strings';
import styles from './styles';
import {AppConstants} from '@config';

import {Transfer as TransferStore} from '@stores/Transfers';

import DetailsTable from '@components/DetailsTable';
import Button from '@components/Button';

@observer
class TransferDetailsReceipt extends Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.transfersStore = new TransferStore(this.props.data, true);
  }
  transferCompletion() {
    this.props.renderHome();
  }
  render() {
    return (
      <View style={AppStyles.container}>
        <ScrollView alwaysBounceVertical={false}>
          <View
            style={
              this.transfersStore.status ===
              AppConstants.promotionStatus.pending
                ? styles.infoMessageViewPending
                : styles.infoMessageView
            }>
            <Text
              style={[
                AppStyles.regularBoldText,
                styles.infoMessageText,
                AppStyles.darkText,
              ]}>
              {this.transfersStore.status ===
              AppConstants.promotionStatus.pending
                ? 'Your Transfer is pending'
                : 'Fuel Point Transfered Successfully.'}
            </Text>
          </View>
          <View style={styles.detailsTableView}>
            <DetailsTable listData={this.transfersStore.transferSummary} />
          </View>
        </ScrollView>
        <View style={styles.buttonView}>
          <Button
            onPress={() => this.transferCompletion()}
            buttonText={AppStrings.done}
          />
        </View>
      </View>
    );
  }
}

export default TransferDetailsReceipt;
