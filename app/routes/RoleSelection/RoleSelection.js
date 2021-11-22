/**
 * Copyright (c) 2018-present, Oleum. All rights reserved.
 *
 */

'use strict';

import React, {Component} from 'react';
import {View, Text, StatusBar} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import TouchableOpacity from '@components/TouchableOpacity';
import Image from '@components/Image';

import {AppStyles, AppColors} from '@theme';
import AppStrings from '@config/strings';
import styles from './styles';
import {AppConstants, AppResources} from '@config';
import Account from '@stores/Account';

class RoleSelection extends Component {
  agentProfile() {
    Account.user.currentRole = AppConstants.agent;
    this.props.onSelectAgent();
  }

  userProfile() {
    Account.user.currentRole = AppConstants.endUser;
    this.props.onSelectUser();
  }

  //Set fuel nozzle id to AsyncStorage
  setRoleToAsyncStorage(isAgent = false) {
    let userRole = isAgent ? AppConstants.agent : AppConstants.endUser;
    AsyncStorage.setItem(
      AppConstants.asyncStorageKeys.lastSelectedUserRole,
      userRole,
    );
  }

  render() {
    return (
      <View style={AppStyles.container}>
        <StatusBar
          backgroundColor={AppColors.statusBarBg}
          hidden={false}
          barStyle={AppColors.statusBarStyle}
        />
        <View style={styles.infoTextView}>
          <Text style={[AppStyles.regularText, styles.infoText]}>
            {AppStrings.roleSelectionInfo.replace(
              '<number>',
              Account.user.number,
            )}
          </Text>
        </View>
        <View style={styles.mainView}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.roleSelectionBox}
            onPress={() => {
              this.agentProfile();
              this.setRoleToAsyncStorage(true);
            }}>
            <View style={styles.iconView}>
              <Image style={styles.buttonImage} source={AppResources.agent} />
            </View>
            <Text
              style={[
                AppStyles.cairoLabelText,
                AppStyles.darkText,
                styles.tagnameText,
              ]}>
              {AppStrings.agentUpperCase}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            style={[styles.roleSelectionBox, styles.verticalGap]}
            onPress={() => {
              this.userProfile();
              this.setRoleToAsyncStorage();
            }}>
            <View style={styles.iconView}>
              <Image
                style={styles.buttonImage}
                source={AppResources.customer}
              />
            </View>
            <Text
              style={[
                AppStyles.cairoLabelText,
                AppStyles.darkText,
                styles.tagnameText,
              ]}>
              {AppStrings.customerUpperCase}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default RoleSelection;
