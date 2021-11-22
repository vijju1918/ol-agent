/**
 * Copyright (c) 2018-present, Oleum. All rights reserved.
 *
 */

'use strict';

import React, {Component} from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import {observer} from 'mobx-react';

import AccountStore, {Profile as ProfileStore} from '@stores/Account';

import {getImageDisplayUri} from '../../lib/utils';

import {AppStyles} from '@theme';
import {AppResources} from '@config';
import styles from './styles';

import Image from '@components/Image';

@observer
class AgentProfile extends Component {
  constructor(props) {
    super(props);
    this.profile = new ProfileStore(
      JSON.parse(JSON.stringify(AccountStore.profile)),
    );
    this.state = {};
  }

  render() {
    return (
      <View style={[AppStyles.containerWhite, styles.mainView]}>
        <ScrollView
          alwaysBounceVertical={false}
          showsVerticalScrollIndicator={false}>
          <View style={styles.profileView}>
            <View style={styles.profileImageMainView}>
              <TouchableOpacity>
                <View>
                  <Image
                    style={[styles.profileImageView]}
                    source={getImageDisplayUri(
                      this.profile.profileImage
                        ? this.profile.profileImage.url
                        : null,
                      AppResources.noProfilePic,
                    )}
                  />
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.profileDetailsView}>
              <Text style={[AppStyles.regularBoldText, AppStyles.darkText]}>
                {this.profile.fullName}
              </Text>
              <Text
                style={[
                  AppStyles.mediumRegularText,
                  AppStyles.darkText,
                  AppStyles.textSpace,
                ]}>
                {AccountStore.user.number}
              </Text>
            </View>
          </View>
          <View style={styles.detailsInputView}>
            <View style={styles.titleView}>
              <Text
                style={[
                  AppStyles.labelText,
                  AppStyles.darkText,
                  styles.labeText,
                ]}>
                SBU Details
              </Text>
            </View>
            <View style={styles.sbuDetailsView}>
              <Text
                style={[
                  AppStyles.regularBoldText,
                  AppStyles.darkText,
                  styles.sbuNameText,
                ]}>
                {this.profile.sbu.title}
              </Text>
              <Text style={[AppStyles.regularText]}>
                {this.profile.sbu.address
                  ? this.profile.sbu.address.line1
                  : 'Location'}
              </Text>
              <Text style={[AppStyles.regularText]}>
                {this.profile.sbu.address
                  ? this.profile.sbu.address.line2
                  : 'Location'}
              </Text>
              <Text style={[AppStyles.regularText]}>
                {this.profile.sbu.address
                  ? this.profile.sbu.address.street
                  : 'Location'}
                {', '}
                {this.profile.sbu.address
                  ? this.profile.sbu.address.district
                  : 'Location'}
              </Text>
              <Text style={[AppStyles.regularText]}>
                {this.profile.sbu.address
                  ? this.profile.sbu.address.state
                  : 'Location'}
                {', '}
                {this.profile.sbu.address
                  ? this.profile.sbu.address.country
                  : 'Location'}
              </Text>
              <Text style={[AppStyles.regularText]}>
                {this.profile.sbu.address
                  ? this.profile.sbu.address.zip
                  : 'Location'}
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default AgentProfile;
