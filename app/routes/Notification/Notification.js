/**
 * Copyright (c) 2018-present, Oleum. All rights reserved.
 *
 */

'use strict';

import React, { Component } from 'react';
import { View, FlatList, Text, StatusBar } from 'react-native';
import { observer } from 'mobx-react';

import Notifications from '@stores/Notifications';
import { getDateTimeString } from '@lib/utils';
import NoData from '@components/NoData';

import { AppStyles, AppColors } from '@theme';
import { AppResources } from '@config';
import styles from './styles';

@observer
class Notification extends Component {
  constructor(props) {
    super(props);

    this.state = {};
    Notifications.markAllNotificationsRead().then(data => {
      if (data) {
        console.log('marked as read');
      } else {
        console.log('marked as read failed');
      }
    });
  }

  renderItemSeperator() {
    return (
      <View style={[AppStyles.horizontalLine, AppStyles.marginHorizontal]} />
    );
  }

  _keyExtractor = item => item.id;

  getNotificationDateTime(item) {
    let date = item.statusHistory.find(
      statusItems => statusItems.status === 'CREATED',
    );
    if (date) {
      return getDateTimeString(date.date, 'DD MMMM YYYY, hh:mm a');
    } else {
      return null;
    }
  }

  renderNotifications(item) {
    return (
      <View style={styles.notificationItem}>
        <Text style={AppStyles.regularBoldText}>
          {item.displayPayload.title}
        </Text>
        <Text style={[AppStyles.regularText, AppStyles.textSpace]}>
          {item.pushPayload.message}
        </Text>
        <Text style={[AppStyles.smallText, styles.dateText]}>
          {this.getNotificationDateTime(item)}
        </Text>
      </View>
    );
  }

  render() {
    if (Notifications.notificationList.length) {
      return (
        <View>
          <FlatList
            alwaysBounceVertical={false}
            data={Notifications.notificationList}
            renderItem={({ item }) => this.renderNotifications(item)}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.sbuRatingContentContainerStyle}
            keyExtractor={this._keyExtractor}
            ItemSeparatorComponent={() => this.renderItemSeperator()}
          />
        </View>
      );
    } else {
      return (
        <View style={[styles.center]}>
          <StatusBar
            backgroundColor={AppColors.statusBarBg}
            hidden={false}
            barStyle={AppColors.statusBarStyle}
          />
          <NoData
            image={AppResources.noNotification}
            title={'No Notifications !'}
            content={'You have no notifications'}
          />
        </View>
      );
    }
  }
}

export default Notification;
