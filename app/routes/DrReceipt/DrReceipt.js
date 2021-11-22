/**
 * Copyright (c) 2018-present, Oleum. All rights reserved.
 *
 */

'use strict';

import React, {Component} from 'react';
import {View, ScrollView, Text} from 'react-native';
import {observer} from 'mobx-react';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import DetailsTable from '@components/DetailsTable';
// import Button from '@components/Button';
import QRScan from '@components/QRScan';
import TouchableOpacity from '@components/TouchableOpacity';

import {AppStyles} from '@theme';
import AppStrings from '@config/strings';
import styles from './styles';

import {DispenseRequest as DispenseRequestStore} from '@stores/DispenseRequests';

@observer
class DrReceipt extends Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.dispenseRequestStore = new DispenseRequestStore(this.props.data);
  }
  render() {
    return (
      <View style={AppStyles.containerWhite}>
        <ScrollView alwaysBounceVertical={false}>
          <View style={styles.infoView}>
            <View style={styles.iconMainView}>
              <MaterialCommunityIcons
                style={styles.buttonIcon}
                name={'check'}
                color={'white'}
              />
            </View>
            <View style={styles.infoMessageView}>
              <Text
                style={[
                  AppStyles.regularText,
                  styles.infoMessageText,
                  AppStyles.darkText,
                ]}>
                Dispense Request (DR) has been successfully generated.
              </Text>
            </View>
          </View>
          <View style={styles.QRView}>
            <QRScan referenceId={this.dispenseRequestStore.referenceId} />
          </View>
          <View style={styles.labelView}>
            <Text style={[AppStyles.labelText, AppStyles.darkText]}>
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
          <TouchableOpacity
            onPress={() => this.props.renderHome()}
            style={styles.doneTouch}>
            <Text style={AppStyles.regularBoldText}>{AppStrings.done}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default DrReceipt;
