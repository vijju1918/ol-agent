/**
 * Copyright (c) 2018-present, Evolvier Technologies. All rights reserved.
 *
 */

'use strict';

import React, {Component} from 'react';
import {View, Text} from 'react-native';

import {getDateTimeString} from '../../lib/utils';
import {AppStyles} from '@theme';
import styles from './styles';

import Image from '@components/Image';

class AgentMaterialDepositListItem extends Component {
  renderCustomer() {
    return (
      <View style={styles.contactDetailsView}>
        <View style={styles.contactAvatarView}>
          <Image
            style={styles.contactAvatar}
            source={{
              uri: this.props.data.contactImage,
            }}
          />
        </View>
        <View style={styles.contactNameAndTransferDateView}>
          <View style={styles.contactNameView}>
            <Text
              style={[
                AppStyles.regularBoldText,
                AppStyles.darkText,
                styles.name,
              ]}>
              {this.props.data.user.type}
            </Text>
          </View>
          <View style={styles.designationView}>
            <Text style={[AppStyles.regularText]}>
              {this.props.data.designation}
            </Text>
          </View>
        </View>
      </View>
    );
  }
  render() {
    return (
      <View style={styles.dispensationView}>
        <View style={styles.contactAndVendorDetailsView}>
          <View style={styles.contactNameView}>
            <Text
              style={[
                AppStyles.regularBoldText,
                AppStyles.darkText,
                styles.name,
              ]}>
              {this.props.data &&
                this.props.data.user &&
                this.props.data.user.name}
            </Text>
            <Text style={[AppStyles.mediumRegularText]}>
              {getDateTimeString(this.props.data.completedDate, 'hh:mm a')}
            </Text>
            <View style={styles.priceView}>
              <Text style={[AppStyles.mediumRegularText]}>
                {this.props.data.material && this.props.data.material.name}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.fuelDetailsView}>
          <View style={styles.fuelPointView}>
            <View>
              <Text style={[AppStyles.titleBoldText, AppStyles.darkText]}>
                {(this.props.data.dispensedQuantities &&
                  this.props.data.dispensedQuantities[0].value) +
                  ' ' +
                  (this.props.data.dispensedQuantities &&
                    this.props.data.dispensedQuantities[0].unit)}
              </Text>
            </View>
            <View style={styles.litrePointView}>
              <View>
                <Text style={[AppStyles.titleBoldText, AppStyles.darkText]}>
                  {(this.props.data.dispensedQuantities &&
                    this.props.data.dispensedQuantities[1].value) +
                    ' ' +
                    (this.props.data.dispensedQuantities &&
                      this.props.data.dispensedQuantities[1].unit)}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

export default AgentMaterialDepositListItem;
