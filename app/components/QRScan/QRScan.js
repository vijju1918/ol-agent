/**
 * Copyright (c) 2018-present, Evolvier Technologies. All rights reserved.
 *
 */
'use strict';

import React, {Component} from 'react';
import {View, Text} from 'react-native';
import QRCode from 'react-native-qrcode-svg';

import {AppStyles} from '@theme';
import styles from './styles';
import PropTypes from 'prop-types';

class QRScan extends Component {
  render() {
    return (
      <View>
        <View style={styles.qrScanView}>
          <QRCode value={this.props.referenceId} size={100} />
          <View style={[styles.idView]}>
            <Text style={[AppStyles.regularText]}>Reference Id</Text>
            <Text
              style={[
                AppStyles.titleBoldText,
                styles.referrenceIdText,
                AppStyles.darkText,
              ]}>
              {this.props.referenceId}
            </Text>
          </View>
          <Text style={[AppStyles.smallText, styles.helperText]}>
            Please show the QR code or reference Id at the collection point or
            fuel station
          </Text>
        </View>
      </View>
    );
  }
}

QRScan.propTypes = {
  referenceId: PropTypes.string.isRequired,
};

export default QRScan;
