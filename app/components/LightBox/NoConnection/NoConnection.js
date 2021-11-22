import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import NetInfo from '@react-native-community/netinfo';

import {AppStyles} from '@theme';
import {AppResources} from '@config';
import styles from './styles';

import Image from '@components/Image';

export default class NoConnection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      animationRef: '',
    };
  }

  checkConnection() {
    NetInfo.fetch().then(state => {
      if (state.isConnected) {
        this.props.onBack();
      }
    });
  }

  render() {
    return (
      <View style={[AppStyles.lightBoxBg]}>
        <View style={[styles.lightBoxBg]}>
          <View style={styles.contentView}>
            <Image
              style={styles.noConnectionImage}
              source={AppResources.offline}
            />

            <Text
              style={[
                AppStyles.regularBoldText,
                AppStyles.darkText,
                AppStyles.textSpace,
              ]}>
              Oops! your connection seems off...
            </Text>
            <Text
              style={[
                AppStyles.regularText,
                AppStyles.darkText,
                styles.noConnectionText,
              ]}>
              Check your Internet Connection
            </Text>
            <TouchableOpacity
              activeOpacity={0.9}
              style={styles.tryAgainTouch}
              onPress={() => this.checkConnection()}>
              <Text
                style={[
                  AppStyles.regularBoldText,
                  AppStyles.darkText,
                  styles.tryText,
                ]}>
                Try Again
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}
