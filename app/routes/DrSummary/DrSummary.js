/**
 * Copyright (c) 2018-present, Oleum. All rights reserved.
 *
 */

'use strict';

import React, {Component} from 'react';
import {View, Text, ScrollView} from 'react-native';
import {observer} from 'mobx-react';
import {showMessage} from 'react-native-flash-message';

import {AppStyles} from '@theme';
import AppStrings from '@config/strings';
import styles from './styles';

import DetailsTable from '@components/DetailsTable';
import Button from '@components/Button';
import Loading from '@components/Loading';

import {DispenseRequest as DispenseRequestStore} from '@stores/DispenseRequests';

@observer
class DrSummary extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    DispenseRequestStore.loading = false;
    this.dispenseRequestStore = this.props.data;
  }

  onPressSubmit() {
    this.dispenseRequestStore
      .sumbitDispenseRequest()
      .then(data => {
        if (data) {
          DispenseRequestStore.loading = false;
          this.props.renderReceipt({
            data: new DispenseRequestStore(data, true),
          });
        }
      })
      .catch(error => {
        DispenseRequestStore.loading = false;
        showMessage({
          message:
            error && error.details && error.details.displayMessage
              ? error.details.displayMessage
              : 'Sorry, could not complete this request now. Please try later',
        });
      });
  }

  render() {
    if (DispenseRequestStore.loading) {
      return (
        <View style={AppStyles.container}>
          <Loading />
        </View>
      );
    } else {
      return (
        <View style={AppStyles.containerWhite}>
          <ScrollView alwaysBounceVertical={false}>
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
                listData={this.dispenseRequestStore.dispensationDetails}
              />
            </View>
          </ScrollView>
          <View style={styles.buttonView}>
            <Button
              onPress={() => this.onPressSubmit()}
              buttonText={AppStrings.submit}
              touchDelayTime={3000}
            />
          </View>
        </View>
      );
    }
  }
}

export default DrSummary;
