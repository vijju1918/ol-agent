/**
 * Copyright (c) 2018-present, Oleum. All rights reserved.
 *
 */
'use strict';
import {observable, action} from 'mobx';
import Meteor from '@meteorrn/core';
import {persist} from 'mobx-persist';

import Vehicle from './vehicle';
import Account from '@stores/Account';
import Subscribe from '@lib/subscribe';
import Cans from '@stores/Cans';

class Vehicles {
  @persist('list', Vehicle) @observable list = [];
  @observable getVehicleLoading = false;
  subscription = new Subscribe();
  myVehicleCanSubscription = null;
  @observable ready = false;

  @action
  logout() {
    this.list = [];
    this.getVehicleLoading = [];
    this.subscription = new Subscribe();
    this.myVehicleCanSubscription = null;
    this.ready = false;
  }

  addAll = (data, isFromAPI = false) => {
    if (data) {
      this.removeAll();
      data.forEach(eachData => this.add(eachData, isFromAPI));
    }
  };

  removeAll = () => {
    this.list.replace([]);
  };

  add = (data, isFromAPI = false) => {
    let item = new Vehicle(data, isFromAPI);
    if (!this.list.find(listItem => listItem.id === item.id)) {
      this.list.push(JSON.parse(JSON.stringify(item)));
    }
  };

  load = () => {
    this.subscription.start('vehicles.list.mob', [
      Account.user.type,
      Account.user.endUserId,
    ]);

    if (!this.myVehicleCanSubscription) {
      this.myVehicleCanSubscription = this.subscription.onChange(
        'vehicles',
        {},
        results => {
          this.ready = true;
          this.addAll(results, true);
        },
      );
    }
  };

  removeVehicle = id => {
    this.removeVehicleLoading = true;
    return new Promise((resolve, reject) => {
      Meteor.call(
        'removeVehicle',
        {
          vehicleId: id,
          user: {
            id: Account.user.endUserId,
            type: Account.user.type,
          },
        },
        (err, data) => {
          if (!err) {
            this.removeVehicleLoading = false;
            resolve(data);
            setTimeout(() => {
              Cans.load();
            }, 100);
          } else {
            this.removeVehicleLoading = false;
            reject(err);
          }
        },
      );
    });
  };
}

export default new Vehicles();
export {Vehicle};
