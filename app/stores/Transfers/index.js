/**
 * Copyright (c) 2018-present, Oleum. All rights reserved.
 *
 */

'use strict';

import {observable, action, computed} from 'mobx';
import {_} from 'underscore';
import moment from 'moment-timezone';
import Meteor from '@meteorrn/core';

import Subscribe from '@lib/subscribe';

import Transfer from './transfer';
import Account from '@stores/Account';
import {AppConstants} from '@config';
import AppStrings from '@config/strings';

class Transfers {
  @observable list = [];
  @observable userRewardsList = [];
  @observable canTransfers = [];
  @observable getCanTransfersLoading = false;
  @observable getUserRewardsLoading = false;
  @observable transfersListLoading = false;
  @observable isLoadingMore = false;
  @observable rewardsNext = 0;
  subscription = new Subscribe();
  myTransferSubscription = null;

  @action
  logout() {
    this.list = [];
    this.canTransfers = [];
    this.userRewardsList = [];
    this.getCanTransfersLoading = false;
    this.getUserRewardsLoading = false;
    this.transfersListLoading = false;
    this.isLoadingMore = false;
    this.rewardsNext = 0;
    this.subscription = new Subscribe();
    this.myTransferSubscription = null;
  }

  @action
  reset() {
    this.list = [];
    this.canTransfers = [];
    this.userRewardsList = [];
    this.getCanTransfersLoading = false;
    this.getUserRewardsLoading = false;
    this.transfersListLoading = false;
    this.isLoadingMore = false;
    this.rewardsNext = 0;
  }

  addAll = (data, isFromAPI = false, loadMore = false) => {
    if (data) {
      if (!loadMore) {
        this.removeAll();
      }
      data.forEach(eachData => this.add(eachData, isFromAPI));
    }
  };

  removeAll = () => {
    this.list.replace([]);
  };

  add = (data, isFromAPI = false) => {
    let item = new Transfer(data, isFromAPI);
    if (!this.list.find(listItem => listItem.id === item.id)) {
      this.list.push(item);
    }
  };

  remove = id => {
    let newList = this.list.filter(item => item._id !== id);
    this.list.replace(newList);
  };

  addAllCanTransactions = (datas, isFromAPI = false) => {
    if (datas) {
      this.removeAllCanTransactions();
      datas.forEach(data => this.addCanTransaction(data, isFromAPI));
    }
  };

  removeAllCanTransactions = () => {
    this.canTransfers.replace([]);
  };

  addCanTransaction = (data, isFromAPI = false) => {
    let item = new Transfer(data, isFromAPI);
    if (!this.canTransfers.find(listItem => listItem.id === item.id)) {
      this.canTransfers.push(item);
    }
  };

  update = (id, data, isFromAPI = false) => {
    let transfer = JSON.parse(JSON.stringify(new Transfer(data, isFromAPI)));
    let selectedItem = this.list.find(item => item.id === id);
    selectedItem = Object.assign(selectedItem, transfer);
    return selectedItem;
  };

  load = (dataTypes, loadMore = false) => {
    if (loadMore) {
      this.isLoadingMore = true;
    } else {
      this.transfersListLoading = true;
    }
    return new Promise((resolve, reject) => {
      Meteor.call(
        'getTransferHistory',
        {
          users: [{id: Account.user.endUserId, type: Account.user.type}],
          types: dataTypes,
          next: loadMore ? this.next : 0,
        },
        (err, data) => {
          if (!err) {
            this.transfersListLoading = false;
            this.addAll(data && data.list, true, loadMore);
            this.isLoadingMore = false;
            this.next = data && data.next;
            resolve(data);
          } else {
            this.transfersListLoading = false;
            this.isLoadingMore = false;
            reject(err);
          }
        },
      );
    });
  };

  getCanTransfers = canId => {
    this.getCanTransfersLoading = true;
    return new Promise((resolve, reject) => {
      Meteor.call(
        'getCanTransfers',
        {
          canId: canId,
        },
        (err, data) => {
          if (!err) {
            this.getCanTransfersLoading = false;
            this.addAllCanTransactions(data, true);
            resolve(data);
          } else {
            this.getCanTransfersLoading = false;
            reject(err);
          }
        },
      );
    });
  };

  @computed
  get rewardList() {
    let rewards = this.list
      .slice()
      .filter(item => item.type === AppConstants.transferTypes.reward)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    return rewards;
  }

  @computed
  get transferList() {
    let transfer = this.list
      .slice()
      .filter(item => item.type === AppConstants.transferTypes.transfer)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .map(eachTransfer => {
        eachTransfer.createdDate = moment(eachTransfer.createdAt)
          .tz(moment.tz.guess())
          .startOf('day');
        return eachTransfer;
      });
    transfer = _.groupBy(transfer, 'createdDate');
    let returnTransferData = [];
    for (let key in transfer) {
      returnTransferData.push({
        title: key,
        data: transfer[key],
      });
    }
    return returnTransferData;
  }

  @computed
  get donationList() {
    let donation = this.list
      .slice()
      .filter(item => item.type === AppConstants.transferTypes.donate)
      .sort((a, b) => new Date(b.completedAt) - new Date(a.completedAt))
      .map(eachTransfer => {
        eachTransfer.createdAt = moment(eachTransfer.createdAt)
          .tz(moment.tz.guess())
          .startOf('day');
        return eachTransfer;
      });
    donation = _.groupBy(donation, 'createdAt');
    let returnDonationData = [];
    for (let key in donation) {
      returnDonationData.push({
        title: key,
        data: donation[key],
      });
    }
    return returnDonationData;
  }

  vendorTransferDetails(vendorId) {
    let transfers = this.list
      .slice()
      .filter(
        item =>
          item.sendFromCan.vendorId === vendorId &&
          item.status !== AppStrings.pending,
      )
      .sort((a, b) => new Date(b.completedAt) - new Date(a.completedAt))
      .map(eachTransfer => {
        eachTransfer.completedAtDate = moment(eachTransfer.completedAt)
          .tz(moment.tz.guess())
          .startOf('day');
        return eachTransfer;
      });

    transfers = _.groupBy(transfers, 'completedAtDate');
    let returnTransferData = [];
    for (let key in transfers) {
      returnTransferData.push({
        title: key,
        data: transfers[key],
      });
    }
    return returnTransferData;
  }

  canTransferData() {
    let transfers = this.canTransfers
      .filter(item => item.status !== AppStrings.pending)
      .sort((a, b) => new Date(b.completedAt) - new Date(a.completedAt))
      .map(eachTransfer => {
        eachTransfer.completedAtDate = moment(eachTransfer.completedAt)
          .tz(moment.tz.guess())
          .startOf('day');
        return eachTransfer;
      });

    transfers = _.groupBy(transfers, 'completedAtDate');
    let returnTransferData = [];
    for (let key in transfers) {
      returnTransferData.push({
        title: key,
        data: transfers[key],
      });
    }
    return returnTransferData;
  }

  @computed
  get allTransactions() {
    let allTransaction = this.list
      .slice()
      .sort((a, b) => new Date(b.completedAt) - new Date(a.completedAt))
      .map(eachItem => {
        eachItem.completedAtDate = moment(eachItem.createdAt)
          .tz(moment.tz.guess())
          .startOf('day');
        return eachItem;
      });
    allTransaction = _.groupBy(allTransaction, 'completedAtDate');
    let returnAllData = [];
    for (let key in allTransaction) {
      returnAllData.push({
        title: key,
        data: allTransaction[key],
      });
    }
    return returnAllData;
  }

  addAllUserRewards = (data, isFromAPI = false, loadMore = false) => {
    if (data && data.length) {
      if (!loadMore) {
        this.removeAllUserRewards();
      }
      data.forEach(eachData => this.addUserReward(eachData, isFromAPI));
    }
  };

  removeAllUserRewards = () => {
    this.userRewardsList.replace([]);
  };

  addUserReward = (data, isFromAPI = false) => {
    let item = new Transfer(data, isFromAPI);
    if (!this.userRewardsList.find(listItem => listItem.id === item.id)) {
      this.userRewardsList.push(JSON.parse(JSON.stringify(item)));
    }
  };

  getUserRewards = (loadMore = false) => {
    if (loadMore) {
      this.isLoadingMore = true;
    } else {
      this.getUserRewardsLoading = true;
    }
    return new Promise((resolve, reject) => {
      Meteor.call(
        'getUserRewards',
        {
          user: {
            id: Account.user.endUserId,
            type: Account.user.type,
          },
          next: loadMore ? this.rewardsNext : 0,
        },
        (err, data) => {
          if (!err) {
            this.getUserRewardsLoading = false;
            this.isLoadingMore = false;
            this.addAllUserRewards(data && data.list, true, loadMore);
            this.rewardsNext = data.next;
            resolve(data);
          } else {
            this.getUserRewardsLoading = false;
            this.isLoadingMore = false;
            reject(err);
          }
        },
      );
    });
  };
}
export default new Transfers();
export {Transfer};
