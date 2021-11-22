/**
 * Copyright (c) 2018-present, Evolvier Technologies. All rights reserved.
 *
 */
'use strict';

import React, {Component} from 'react';

import {View, Text, Platform} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'; 
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import Communications from 'react-native-communications';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react';

import TouchableOpacity from '@components/TouchableOpacity';

import styles from './styles';
import {AppStyles} from '@theme';
import Promotions from '@stores/Promotions';

import DispenseRequestStore from '@stores/DispenseRequests';
import Notifications from '@stores/Notifications';

@observer
class NavbarRightIcons extends Component {
  renderActiveCount() {
    if (Promotions.active.length) {
      return (
        <View style={AppStyles.countView}>
          <Text
            style={
              Platform.OS === 'ios'
                ? [styles.customStyle, styles.countText]
                : [AppStyles.extraSmallBoldText, styles.countText]
            }>
            {Promotions.active.length}
          </Text>
        </View>
      );
    } else {
      return null;
    }
  }

  renderUnreadCount() {
    if (Notifications.getUnReadNotificatonCount >= 1) {
      return (
        <View style={AppStyles.countView}>
          <Text
            style={
              Platform.OS === 'ios'
                ? [styles.customStyle, styles.countText]
                : [AppStyles.extraSmallBoldText, styles.countText]
            }>
            {Notifications.getUnReadNotificatonCount}
          </Text>
        </View>
      );
    } else {
      return null;
    }
  }

  renderPendingDRCount() {
    if (DispenseRequestStore.sortedList.length) {
      return (
        <View style={AppStyles.countView}>
          <Text
            style={[
              AppStyles.extraSmallBoldText,
              AppStyles.darkText,
              styles.countText,
            ]}>
            {DispenseRequestStore.sortedList.length}
          </Text>
        </View>
      );
    }
  }

  onPressSupport() {
    Communications.phonecall('18004205566', true);
  }

  render() {
    if (this.props.page === 'home') {
      return (
        <View style={styles.buttonMainView}>
          <TouchableOpacity
            style={[AppStyles.buttonTouch, styles.mainView]}
            activeOpacity={1}
            onPress={() => this.onPressSupport()}>
            <View>
              <AntDesign style={AppStyles.navBarIcons} name="phone" />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={[AppStyles.buttonTouch, styles.mainView]}
            activeOpacity={1}
            onPress={() => this.props.viewNotification()}>
            <View>
              <SimpleLineIcons style={AppStyles.navBarIcons} name="bell" />
              {this.renderUnreadCount()}
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={[AppStyles.buttonTouch, styles.mainView]}
            activeOpacity={1}
            onPress={() => this.props.renderPendingDR()}>
            <View style={styles.centerAlign}>
              <SimpleLineIcons style={AppStyles.navBarIcons} name="event" />
              <Text style={[AppStyles.smallBoldText, AppStyles.whiteText]}>
                DR
              </Text>
              {this.renderPendingDRCount()}
            </View>
          </TouchableOpacity>
        </View>
      );
    } else if (this.props.page === 'offers') {
      return (
        <View style={styles.buttonMainView}>
          <TouchableOpacity
            style={[AppStyles.buttonTouch, styles.mainView]}
            activeOpacity={1}
            onPress={() => this.props.viewActive()}>
            <View>
              <Feather style={AppStyles.navBarIcons} name="bookmark" />
              {this.renderActiveCount()}
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={[AppStyles.buttonTouch, styles.mainView]}
            activeOpacity={1}
            onPress={() => this.props.viewFilterList()}>
            <View>
              <Feather style={AppStyles.navBarIcons} name="filter" />
            </View>
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <TouchableOpacity
          style={[AppStyles.buttonTouch, styles.mainView]}
          activeOpacity={1}
          onPress={() => this.props.viewFilterList()}>
          <MaterialCommunityIcons
            style={AppStyles.navBarIcons}
            name="sort-variant"
          />
        </TouchableOpacity>
      );
    }
  }
}

NavbarRightIcons.propTypes = {
  viewFilterList: PropTypes.func,
  page: PropTypes.string,
};

export default NavbarRightIcons;
