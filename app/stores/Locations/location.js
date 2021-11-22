/**
 * Copyright (c) 2018-present, Oleum. All rights reserved.
 *
 */

'use strict';

import {observable} from 'mobx';
import Meteor from '@meteorrn/core';

import Account from '@stores/Account';

class Location {
  @observable id;
  @observable address;
  @observable label;
  @observable name;
  @observable latitude;
  @observable longitude;
  @observable currentLocation = {};
  @observable savedLocations = [];

  constructor(data, isFromAPI = false) {
    this.set(data, isFromAPI);
  }

  set(data, isFromAPI = false) {
    if (data && isFromAPI) {
      this.id = data._id;
      this.address = data.address;
      this.name = data.name;
      this.coordinates = data.coordinates;
      this.currentLocation = data.currentLocation;
    } else if (data) {
      this.id = data._id;
      this.address = data.address;
      this.name = data.name;
      this.coordinates = data.coordinates;
      this.currentLocation = data.currentLocation;
    }
  }

  reset() {
    this.id = '';
    this.address = '';
    this.name = '';
    this.label = '';
    this.currentLocation = {};
    this.latitude = '';
    this.longitude = '';
  }

  addSavedLocation = () => {
    this.loading = true;
    return new Promise(resolve => {
      Meteor.call(
        'addSavedLocation',
        {
          user: {
            id: Account.user.endUserId,
            type: Account.user.type,
          },
          label: this.label,
          name: this.name,
          address: this.address,
          coordinates: {
            latitude: this.latitude,
            longitude: this.longitude,
          },
        },
        (err, data) => {
          if (!err) {
            resolve(data);
          } else {
            resolve(false);
          }
        },
      );
    });
  };

  removeSavedLocation = label => {
    this.loading = true;
    return new Promise(resolve => {
      Meteor.call(
        'removeSavedLocation',
        {
          user: {
            id: Account.user.endUserId,
            type: Account.user.type,
          },
          label: label,
        },
        (err, data) => {
          if (!err) {
            resolve(data);
          } else {
            resolve(false);
          }
        },
      );
    });
  };
}

export default Location;
