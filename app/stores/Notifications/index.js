/**
 * Copyright (c) 2018-present, Oleum. All rights reserved.
 *
 */

'use strict';

import { observable, action, computed } from 'mobx';
import Meteor from '@meteorrn/core';

import Subscribe from '@lib/subscribe';

import Notification from './notification';
import Account from '@stores/Account';

class Notifications {
  @observable list = [];
  subscription = new Subscribe();
  myNotificationSubscription = null;

  @action
  logout() {
    this.list = [];
    this.subscription = new Subscribe();
    this.myNotificationSubscription = null;
  }

  @action
  reset() {
    this.list = [];
  }

  addAll = (datas, isFromAPI = false) => {
    if (datas) {
      this.removeAll();
      datas.forEach(data => this.add(data, isFromAPI));
    }
  };

  removeAll = () => {
    this.list.replace([]);
  };

  add = (data, isFromAPI = false) => {
    let item = new Notification(data, isFromAPI);
    if (!this.list.find(listItem => listItem.id === item.id)) {
      this.list.push(item);
    }
  };

  remove = id => {
    let newList = this.list.filter(item => item._id !== id);
    this.list.replace(newList);
  };

  update = (id, data, isFromAPI = false) => {
    let rating = JSON.parse(JSON.stringify(new Notification(data, isFromAPI)));
    let selectedItem = this.list.find(item => item.id === id);
    selectedItem = Object.assign(selectedItem, rating);
    return selectedItem;
  };

  load = () => {
    if (Account.user && Account.user.endUserId && Account.user.type) {
      this.subscription.start('notifications.list', [
        Account.user.type,
        Account.user.endUserId,
      ]);

      if (!this.myNotificationSubscription) {
        this.myNotificationSubscription = this.subscription.onChange(
          'notifications',
          {},
          results => {
            this.addAll(results, true);
          },
        );
      }
    }
  };

  getDate(item) {
    let createdDate = item.statusHistory.find(
      statusItems => statusItems.status === 'CREATED',
    );
    return createdDate.date;
  }

  @computed
  get notificationList() {

    const currentRole = Account.user ? Account.user.type : null;
    const filteredNotifications = this.list.filter(
      eachNotification =>
        (currentRole === 'customer' &&
          eachNotification.receiverRoles &&
          eachNotification.receiverRoles.includes('PUB')) ||
        (currentRole === 'agent' &&
          eachNotification.receiverRoles &&
          eachNotification.receiverRoles.includes('DSM')),
    );
    return filteredNotifications.sort(
      (a, b) => this.getDate(b) - this.getDate(a),
    );
  }

  @computed
  get getUnReadNotificatonCount() {
    const currentRole = Account.user ? Account.user.currentRole : null;
    let totalCount = 0;
    this.list.forEach(eachNotification => {
      if (
        (currentRole === 'customer' &&
          eachNotification.receiverRoles &&
          eachNotification.receiverRoles.includes('PUB')) ||
        (currentRole === 'agent' &&
          eachNotification.receiverRoles &&
          eachNotification.receiverRoles.includes('DSM'))
      ) {
        const selectedReceivers = eachNotification.receivers.filter(
          eachReceiver =>
            eachReceiver.id === Account.user.endUserId && !eachReceiver.isRead,
        );
        if (selectedReceivers && selectedReceivers.length) {
          totalCount = totalCount + selectedReceivers.length;
        }
      }
    });
    return totalCount;
  }

  markAllNotificationsRead() {
    return new Promise((resolve, reject) => {
      Meteor.call(
        'markAllNotificationasRead',
        {
          user: {
            id: Account.user.endUserId,
            type: Account.user.type,
          },
        },
        (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        },
      );
    });
  }
}

export default new Notifications();
export { Notification };
