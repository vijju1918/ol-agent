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

import {AppConstants} from '@config';

import Purchase from './purchase';
import Account from '@stores/Account';

class Purchases {
  @observable list = [];
  @observable vehicleFuelPurchases = [];
  subscription = new Subscribe();
  myPurchaseSubscription = null;
  @observable userFuelPurchaseListLoading = false;
  @observable userFuelPurchaseListBackgroundLoading = false;
  @observable vehiclesFuelPurchaseListLoading = false;
  @observable vehiclesFuelPurchaseListBackgroundLoading = false;
  @observable userFuelPurchaseLoadMore = false;
  @observable isLoadingMore = false;
  @observable userFuelPurchaseNext = null;
  @observable next = null;

  @action
  logout() {
    this.list = [];
    this.vehicleFuelPurchases = [];
    this.subscription = new Subscribe();
    this.myPurchaseSubscription = null;
    this.userFuelPurchaseListLoading = false;
    this.vehiclesFuelPurchaseListLoading = false;
    this.userFuelPurchaseLoadMore = false;
    this.isLoadingMore = false;
    this.userFuelPurchaseNext = 0;
    this.next = 0;
  }

  @action
  reset() {
    this.list = [];
    this.vehicleFuelPurchases = [];
    this.userFuelPurchaseNext = 0;
    this.next = 0;
    this.userFuelPurchaseListLoading = false;
    this.vehiclesFuelPurchaseListLoading = false;
    this.userFuelPurchaseLoadMore = false;
    this.isLoadingMore = false;
  }

  @action
  resetVehicleFuelPurchaseDetails() {
    this.list = [];
    this.userFuelPurchaseNext = 0;
    this.userFuelPurchaseListLoading = false;
    this.userFuelPurchaseLoadMore = false;
  }

  @action
  resetUserFuelPurchaseDetails() {
    this.vehicleFuelPurchases = [];
    this.next = 0;
    this.vehiclesFuelPurchaseListLoading = false;
    this.isLoadingMore = false;
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
    let item = new Purchase(data, isFromAPI);
    if (!this.list.find(listItem => listItem.id === item.id)) {
      this.list.push(item);
    }
  };

  remove = id => {
    let newList = this.list.filter(item => item._id !== id);
    this.list.replace(newList);
  };

  update = (id, data, isFromAPI = false) => {
    let purchase = JSON.parse(JSON.stringify(new Purchase(data, isFromAPI)));
    let selectedItem = this.list.find(item => item.id === id);
    selectedItem = Object.assign(selectedItem, purchase);
    return selectedItem;
  };

  geUserFuelPurchases = (loadMore = false, backgroundLoading = false) => {
    if (loadMore) {
      this.userFuelPurchaseLoadMore = true;
    } else if (backgroundLoading) {
      this.userFuelPurchaseListBackgroundLoading = true;
    } else {
      this.userFuelPurchaseListLoading = true;
    }
    return new Promise((resolve, reject) => {
      Meteor.call(
        'getPurchaseHistory',
        {
          users: [{id: Account.user.endUserId, type: Account.user.type}],
          next: loadMore ? this.userFuelPurchaseNext : 0,
        },
        (err, data) => {
          if (!err) {
            this.userFuelPurchaseListLoading = false;
            this.addAll(data && data.list, true, loadMore);
            this.userFuelPurchaseLoadMore = false;
            this.userFuelPurchaseListBackgroundLoading = false;
            this.userFuelPurchaseNext = data && data.next;
            resolve(data);
          } else {
            this.userFuelPurchaseListLoading = false;
            this.userFuelPurchaseLoadMore = false;
            this.userFuelPurchaseListBackgroundLoading = false;
            reject(err);
          }
        },
      );
    });
  };

  @computed
  get purchaseList() {
    let purchases = this.list
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .map(eachPurchase => {
        eachPurchase.createdDate = moment(eachPurchase.createdAt)
          .tz(moment.tz.guess())
          .startOf('day');
        return eachPurchase;
      });
    purchases = _.groupBy(purchases, 'createdDate');
    let returnPurchasesData = [];
    for (let key in purchases) {
      returnPurchasesData.push({
        title: key,
        data: purchases[key],
      });
    }
    return returnPurchasesData;
  }

  addVehicleFuelPurchase = (data, isFromAPI = false) => {
    let item = new Purchase(data, isFromAPI);
    if (!this.vehicleFuelPurchases.find(listItem => listItem.id === item.id)) {
      this.vehicleFuelPurchases.push(item);
    }
  };

  addAllVehicleFuelPurchases = (data, isFromAPI = false, loadMore = false) => {
    if (data) {
      if (!loadMore) {
        this.removeAllVehicleFuelPurchases();
      }
      data.forEach(eachData =>
        this.addVehicleFuelPurchase(eachData, isFromAPI),
      );
    }
  };

  removeAllVehicleFuelPurchases = () => {
    this.vehicleFuelPurchases.replace([]);
  };

  geVehiclesFuelPurchases = (
    vehicles,
    loadMore = false,
    backgroundLoading = false,
  ) => {
    let vehiclesData =
      vehicles &&
      vehicles.length &&
      vehicles.map(eachVehicle => {
        return {id: eachVehicle.id, type: AppConstants.vehicle};
      });
    if (loadMore) {
      this.isLoadingMore = true;
    } else if (backgroundLoading) {
      this.vehiclesFuelPurchaseListBackgroundLoading = true;
    } else {
      this.vehiclesFuelPurchaseListLoading = true;
    }
    return new Promise((resolve, reject) => {
      Meteor.call(
        'getPurchaseHistory',
        {
          users: vehiclesData,
          next: loadMore ? this.next : 0,
        },
        (err, data) => {
          if (!err) {
            this.vehiclesFuelPurchaseListLoading = false;
            this.addAllVehicleFuelPurchases(data && data.list, true, loadMore);
            this.isLoadingMore = false;
            this.vehiclesFuelPurchaseListBackgroundLoading = false;
            this.next = data && data.next;
            resolve(data);
          } else {
            this.vehiclesFuelPurchaseListLoading = false;
            this.isLoadingMore = false;
            this.vehiclesFuelPurchaseListBackgroundLoading = false;
            reject(err);
          }
        },
      );
    });
  };

  @computed
  get vehiclesFuelPurchaseList() {
    let purchases = this.vehicleFuelPurchases
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .map(eachPurchase => {
        eachPurchase.createdDate = moment(eachPurchase.createdAt)
          .tz(moment.tz.guess())
          .startOf('day');
        return eachPurchase;
      });
    purchases = _.groupBy(purchases, 'createdDate');
    let returnPurchasesData = [];
    for (let key in purchases) {
      returnPurchasesData.push({
        title: key,
        data: purchases[key],
      });
    }
    return returnPurchasesData;
  }
}

export default new Purchases();
export {Purchase};
