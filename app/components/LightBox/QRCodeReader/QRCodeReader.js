/**
 * Copyright (c) 2018-present, Oleum. All rights reserved.
 *
 */

'use strict';

import React, {Component} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import PropTypes from 'prop-types';
import LoadingSmall from '@components/LoadingSmall';

import styles from './styles';
import {AppStyles} from '@theme';

class QRCodeReader extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  onSuccess(e) {
    this.props.qrData(e.data);
    this.props.onBack();
  }

  render() {
    return (
      <View style={styles.lightBoxBg}>
        <StatusBar hidden={true} />
        <View style={styles.loadingView}>
          <LoadingSmall color={'#FFFFFF'} />
        </View>
        <View style={styles.header}>
          <SafeAreaView>
            <Text style={[AppStyles.regularText, styles.backText]}>
              Scan QR code
            </Text>
          </SafeAreaView>
        </View>
        <TouchableOpacity
          style={styles.footerTouch}
          onPress={() => this.props.onBack()}>
          <Text style={[AppStyles.regularBoldText, styles.backText]}>Back</Text>
        </TouchableOpacity>
        <View style={styles.scannerView}>
          <QRCodeScanner
            cameraStyle={styles.cameraStyleView}
            onRead={this.onSuccess.bind(this)}
            showMarker={true}
            fadeIn={true}
            markerStyle={styles.markerStyleView}
          />
        </View>
      </View>
    );
  }
}

QRCodeReader.propTypes = {
  qrData: PropTypes.func.isRequired,
};

export default QRCodeReader;
