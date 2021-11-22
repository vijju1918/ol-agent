/**
 * Copyright (c) 2018-present, Oleum. All rights reserved.
 *
 */

'use strict';

import {observable, action, computed} from 'mobx';

import Subscribe from '@lib/subscribe';

import Rating from './rating';
import Account from '@stores/Account';

class Ratings {
  @observable list = [];
  subscription = new Subscribe();
  myRatingSubscription = null;

  @action
  logout() {
    this.list = [];
    this.subscription = new Subscribe();
    this.myRatingSubscription = null;
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
    let item = new Rating(data, isFromAPI);
    if (!this.list.find(listItem => listItem.id === item.id)) {
      this.list.push(item);
    }
  };

  remove = id => {
    let newList = this.list.filter(item => item._id !== id);
    this.list.replace(newList);
  };

  update = (id, data, isFromAPI = false) => {
    let rating = JSON.parse(JSON.stringify(new Rating(data, isFromAPI)));
    let selectedItem = this.list.find(item => item.id === id);
    selectedItem = Object.assign(selectedItem, rating);
    return selectedItem;
  };

  load = () => {
    if (Account.user && Account.user.endUserId && Account.user.type) {
      this.subscription.start('ratings.list', [
        Account.user.type,
        Account.user.endUserId,
      ]);

      if (!this.myRatingSubscription) {
        this.myRatingSubscription = this.subscription.onChange(
          'ratings',
          {},
          results => {
            this.addAll(results, true);
          },
        );
      }
    }
  };

  @computed
  get checkRatingStatus() {
    let pedingList = this.list.find(item => item.status === 'PENDING');
    return pedingList;
  }

  @computed
  get completedRatings() {
    let completedList = this.list.filter(item => item.status === 'COMPLETED');
    return completedList;
  }
}

export default new Ratings();
export {Rating};
