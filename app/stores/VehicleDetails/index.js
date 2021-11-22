/**
 * Copyright (c) 2018-present, Oleum. All rights reserved.
 *
 */
'use strict';
import {observable} from 'mobx';
import Meteor from '@meteorrn/core';

class VehicleDetails {
  @observable vehicleInfo = {};
  @observable getVehicleDetailsLoading = false;

  removeAll = () => {
    this.vehicleInfo = {};
  };

  addResult = data => {
    this.vehicleInfo = data;
  };

  loadVehiclesInfo = () => {
    this.getVehicleDetailsLoading = true;
    return new Promise((resolve, reject) => {
      Meteor.call('loadVehiclesInfo', {}, (err, data) => {
        if (!err) {
          this.getVehicleDetailsLoading = false;
          this.addResult(data);
          resolve(data);
        } else {
          this.getVehicleDetailsLoading = false;
          reject(err);
        }
      });
    });
  };
}

export default new VehicleDetails();
