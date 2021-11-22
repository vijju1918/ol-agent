/**
 * Copyright (c) 2018-present, Oleum. All rights reserved.
 *
 */
'use strict';

import {observable, action, computed} from 'mobx';
import {persist} from 'mobx-persist';

import Can from './can';
import Account from '@stores/Account';
import Products from '@stores/Products';
import Subscribe from '@lib/subscribe';
import Vehicles from '@stores/Vehicles';

import {AppConstants} from '@config';
import {sortOleumTypeCansFirst} from '@lib/utils';

class Cans {
  @persist('list', Can) @observable list = [];
  @persist('list', Can) @observable vehicleCanList = [];
  @persist @observable total = 0;
  @observable ready = false;
  subscription = new Subscribe();
  myCanSubscription = null;

  @action
  reset() {
    this.list = [];
  }

  @action
  logout() {
    this.list = [];
    this.vehicleCanList = [];
    this.total = 0;
    this.subscription = new Subscribe();
    this.myCanSubscription = null;
    this.ready = false;
  }

  @computed
  get myList() {
    let sortedList = this.list.sort(
      (a, b) => new Date(b.lastUpdatedAt) - new Date(a.lastUpdatedAt),
    );
    return sortOleumTypeCansFirst(sortedList);
  }

  @computed
  get myVehicleCanList() {
    let sortedList =
      this.vehicleCanList &&
      this.vehicleCanList.length &&
      this.vehicleCanList.sort(
        (a, b) => new Date(b.lastUpdatedAt) - new Date(a.lastUpdatedAt),
      );
    return sortOleumTypeCansFirst(sortedList);
  }

  @computed
  get drList() {
    return this.list
      .filter(
        can =>
          Products.getProducts(can.vendorId) &&
          Products.getProducts(can.vendorId).length,
      )
      .sort((a, b) => new Date(b.lastUpdatedAt) - new Date(a.lastUpdatedAt));
  }

  @computed
  get totalQuantity() {
    let total = 0;
    this.list.forEach(can => {
      if (can.quantity) {
        total += Number(can.quantity);
      }
    });
    if (total) {
      return Number(total).toFixed(2);
    } else {
      return 0;
    }
  }

  @computed
  get totalVehicleCanQuantity() {
    let total = 0;
    this.myVehicleCanList.forEach(can => {
      if (can.quantity) {
        total += Number(can.quantity);
      }
    });
    if (total) {
      return Number(total).toFixed(2);
    } else {
      return 0;
    }
  }

  addCanList(searchId) {
    let dataReturn = this.list.find(item => item.id === searchId);
    return dataReturn;
  }

  add = (data, isFromAPI = false) => {
    let item = new Can(data, isFromAPI);
    if (!this.list.find(listItem => listItem.id === item.id)) {
      this.list.push(item);
    }
  };

  addAll = (datas, isFromAPI = false) => {
    if (datas) {
      let userCans =
        datas &&
        datas.length &&
        datas.filter(
          item => item.user && item.user.type === AppConstants.endUser,
        );
      this.removeAll();
      userCans.forEach(data => this.add(data, isFromAPI));
    }
  };

  remove = id => {
    let newList = this.list.filter(item => item._id !== id);
    this.list.replace(newList);
  };

  removeAll = () => {
    this.list.replace([]);
  };

  addVehicleCan = (data, isFromAPI = false) => {
    let item = new Can(data, isFromAPI);
    if (!this.vehicleCanList.find(listItem => listItem.id === item.id)) {
      this.vehicleCanList.push(item);
    }
  };

  addVehicleCansAll = (data, isFromAPI = false) => {
    if (data) {
      let vehicleCans =
        data &&
        data.length &&
        data.filter(
          item => item.user && item.user.type === AppConstants.vehicle,
        );
      this.removeAllVehicleCans();
      vehicleCans.forEach(eachData => this.addVehicleCan(eachData, isFromAPI));
    }
  };

  removeAllVehicleCans = () => {
    this.vehicleCanList.replace([]);
  };

  updateTotal(results) {
    if (Vehicles.ready) {
      let canTotal = 0;
      results.forEach(can => {
        if (can.quantity) {
          canTotal += Number(can.quantity);
        }
      });
      this.total = canTotal;
    }
  }

  load = () => {
    this.subscription.start('cans.list.mob', [
      Account.user.type,
      Account.user.endUserId,
      Vehicles.list && Vehicles.list.length,
    ]);

    if (!this.myCanSubscription) {
      this.myCanSubscription = this.subscription.onChange(
        'cans',
        {},
        results => {
          this.ready = true;
          this.updateTotal(results);
          this.addAll(results, true);
          this.addVehicleCansAll(results, true);
        },
      );
    }
  };
}

export default new Cans();
export {Can};
