/**
 * Copyright (c) 2018-present, Oleum. All rights reserved.
 *
 */
'use strict';

import {observable, action, computed} from 'mobx';
import Meteor from '@meteorrn/core';
import {_} from 'underscore';
import moment from 'moment-timezone';

import Subscribe from '@lib/subscribe';

import DispenseRequest from './dispenseRequest';
import Account from '@stores/Account';

import {AppConstants} from '@config';

class DispenseRequestList {
  @observable list = [];
  @observable materialDepositList = [];
  @observable agentList = [];
  @observable nozzles = [];
  @observable dispenseRequest = new DispenseRequest();
  @observable getAgentMaterialDepositsLoading = false;
  @observable isLoadingMore = false;
  @observable materialDepositsNext = null;
  subscription = new Subscribe();
  myDispenseSubscription = null;
  myAgentDispenseSubscription = null;

  @action
  logout() {
    this.list = [];
    this.materialDepositList = [];
    this.agentList = [];
    this.subscription = new Subscribe();
    this.myDispenseSubscription = null;
    this.myAgentDispenseSubscription = null;
  }

  @action
  reset() {
    this.list = [];
    this.materialDepositList = [];
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
    let item = new DispenseRequest(data, isFromAPI);
    if (!this.list.find(listItem => listItem.id === item.id)) {
      this.list.push(item);
    }
  };

  addAgentAll = (datas, isFromAPI = false) => {
    if (datas) {
      this.removeAgentAll();
      datas.forEach(data => this.addAgent(data, isFromAPI));
    }
  };

  removeAgentAll = () => {
    this.agentList.replace([]);
  };

  addAgent = (data, isFromAPI = false) => {
    let item = new DispenseRequest(data, isFromAPI);
    if (!this.agentList.find(listItem => listItem.id === item.id)) {
      this.agentList.push(item);
    }
  };

  addAllMaterialDeposits = (data, isFromAPI = false, loadMore = false) => {
    if (data && data.list && data.list.length) {
      if (!loadMore) {
        this.removeAllMaterialDeposits();
      }
      data.list.forEach(eachData =>
        this.addMaterialDeposit(eachData, isFromAPI),
      );
    }
  };

  removeAllMaterialDeposits = () => {
    this.materialDepositList.replace([]);
  };

  addMaterialDeposit = (data, isFromAPI = false) => {
    let item = new DispenseRequest(data, isFromAPI);
    if (!this.materialDepositList.find(listItem => listItem.id === item.id)) {
      this.materialDepositList.push(item);
    }
  };

  remove = id => {
    let newList = this.list.filter(item => item._id !== id);
    this.list.replace(newList);
  };

  update = (id, data, isFromAPI = false) => {
    let dispenseRequest = JSON.parse(
      JSON.stringify(new DispenseRequest(data, isFromAPI)),
    );
    let selectedItem = this.list.find(item => item.id === id);
    selectedItem = Object.assign(selectedItem, dispenseRequest);
    return selectedItem;
  };

  load = () => {
    if (Account.user && Account.user.endUserId && Account.user.type) {
      this.subscription.start('dispenseRequests.list', [
        Account.user.type,
        Account.user.endUserId,
      ]);

      if (!this.myDispenseSubscription) {
        this.myDispenseSubscription = this.subscription.onChange(
          'dispenseRequests',
          {
            'user.id': Account.user.endUserId,
            'user.type': Account.user.type,
          },
          results => {
            this.addAll(results, true);
          },
        );
        this.myAgentDispenseSubscription = this.subscription.onChange(
          'dispenseRequests',
          {
            'agent.id': Account.user.endUserId,
            'agent.type': Account.user.type,
          },
          results => {
            this.addAgentAll(results, true);
          },
        );
      }
    }
    // this.dispenseRequest.userCurrentLocation();
  };

  // @computed
  // get sortedList() {
  //   return this.list.sort(function(a, b) {
  //     if (a.requestDate > b.requestDate) {
  //       return -1;
  //     }
  //     if (a.requestDate < b.requestDate) {
  //       return 1;
  //     }
  //     return 0;
  //   });
  // }

  @computed
  get sortedList() {
    return this.list
      .filter(item => item.status === AppConstants.promotionStatus.pending)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  @computed
  get completedList() {
    let dispensations = this.list
      .filter(
        item =>
          item.status === AppConstants.promotionStatus.completed ||
          item.status === AppConstants.promotionStatus.canceled,
      )
      .sort((a, b) => new Date(b.completedAt) - new Date(a.completedAt))
      .map(eachDispensation => {
        eachDispensation.completedDate = moment(eachDispensation.completedAt)
          .tz(moment.tz.guess())
          .startOf('day');
        return eachDispensation;
      });
    dispensations = _.groupBy(dispensations, 'completedDate');
    let returnDispensationData = [];
    for (let key in dispensations) {
      returnDispensationData.push({
        title: key,
        data: dispensations[key],
      });
    }
    return returnDispensationData;
  }

  @computed
  get agentDispenseList() {
    let dispensations = this.agentList
      .filter(item => item.status === AppConstants.promotionStatus.completed)
      .sort((a, b) => new Date(b.completedAt) - new Date(a.completedAt))
      .map(eachDispensation => {
        eachDispensation.completedDate = moment(eachDispensation.completedAt)
          .tz(moment.tz.guess())
          .startOf('day');
        return eachDispensation;
      });
    dispensations = _.groupBy(dispensations, 'completedDate');
    let returnDispensationData = [];
    for (let key in dispensations) {
      returnDispensationData.push({
        title: key,
        data: dispensations[key],
      });
    }
    return returnDispensationData;
  }

  setResultData(data) {
    this.nozzles =
      data && data.nozzles && data.nozzles.length ? data.nozzles : [];
  }

  getDispenseRequest = referenceId => {
    return new Promise(resolve => {
      Meteor.call(
        'fetchDispenseRequest',
        {
          referenceId: referenceId,
          user: {
            id: Account.user.endUserId,
            type: Account.user.type,
          },
          sbu: {
            id:
              Account.profile && Account.profile.sbu && Account.profile.sbu.id,
            type: AppConstants.corporate,
          },
        },
        (err, data) => {
          if (!err) {
            this.setResultData(data);
            resolve(data);
          } else {
            resolve(false);
          }
        },
      );
    });
  };

  @computed
  get agentMaterialDeposits() {
    let deposits =
      this.materialDepositList &&
      this.materialDepositList.length &&
      this.materialDepositList
        .sort((a, b) => new Date(b.completedAt) - new Date(a.completedAt))
        .map(eachDeposit => {
          eachDeposit.completedDate = moment(eachDeposit.completedAt)
            .tz(moment.tz.guess())
            .startOf('day');
          return eachDeposit;
        });
    deposits = _.groupBy(deposits, 'completedDate');
    let returnDispensationData = [];
    for (let key in deposits) {
      returnDispensationData.push({
        title: key,
        data: deposits[key],
      });
    }
    return returnDispensationData;
  }

  loadAgentMaterialDeposits = (loadMore = false) => {
    if (loadMore) {
      this.isLoadingMore = true;
    } else {
      this.getAgentMaterialDepositsLoading = true;
    }
    return new Promise((resolve, reject) => {
      Meteor.call(
        'getAgentMaterialDeposits',
        {
          agent: {
            id: Account.user && Account.user.endUserId,
            type: Account.user && Account.user.type,
          },
          sbu: {
            id:
              Account.profile && Account.profile.sbu && Account.profile.sbu.id,
            type: AppConstants.corporate,
          },
          next: this.materialDepositsNext,
        },
        (err, data) => {
          if (!err) {
            this.getAgentMaterialDepositsLoading = false;
            this.isLoadingMore = false;
            this.addAllMaterialDeposits(data, true, loadMore);
            this.materialDepositsNext = data && data.next;
            resolve(data);
          } else {
            this.getAgentMaterialDepositsLoading = false;
            this.isLoadingMore = false;
            reject(err);
          }
        },
      );
    });
  };
}

export default new DispenseRequestList();
export {DispenseRequest, DispenseRequestList};
