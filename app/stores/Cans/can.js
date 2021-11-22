/**
 * Copyright (c) 2018-present, Oleum. All rights reserved.
 *
 */

'use strict';

import {observable, computed} from 'mobx';
import {persist} from 'mobx-persist';
import haversine from 'haversine';

import Corporates from '@stores/Corporates';
import Locations from '@stores/Locations';

class Can {
  @persist @observable id;
  @persist @observable vendorId;
  @persist @observable quantity = 0;
  @observable reservedQuantity = 0;
  @observable createdAt;
  @observable updatedAt;
  @persist('object') @observable user;
  @observable vendor;
  @persist @observable type;

  @computed
  get title() {
    let corporate = Corporates.list.find(item => item.id === this.vendorId);
    if (corporate) {
      return corporate.title;
    }
    return '';
  }

  @computed
  get rating() {
    let corporate = Corporates.list.find(item => item.id === this.vendorId);
    if (corporate) {
      return corporate.rating;
    }
    return '';
  }

  @computed
  get image() {
    let corporate = Corporates.list.find(item => item.id === this.vendorId);
    if (corporate) {
      return corporate.companyLogo;
    }
    return '';
  }

  @computed
  get lastUpdatedAt() {
    return this.updatedAt ? this.updatedAt : this.createdAt;
  }

  getLocation() {
    if (this.vendorId) {
      let corporate = Corporates.list.find(item => item.id === this.vendorId);
      if (corporate) {
        let corporateLocation = corporate.location;
        if (corporateLocation) {
          return corporateLocation;
        } else {
          return null;
        }
      }
    }
  }

  getDistance(location) {
    let userCurrentLocation = Locations.currentLocation;
    if (userCurrentLocation && location) {
      const start = {
        latitude: userCurrentLocation.coordinates[1],
        longitude: userCurrentLocation.coordinates[0],
      };
      const end = {
        latitude: location.coordinates[1],
        longitude: location.coordinates[0],
      };
      return haversine(start, end, {
        unit: 'km',
      });
    } else if (this.vendorId) {
      let corporate = Corporates.list.find(item => item.id === this.vendorId);
      if (corporate) {
        let corporateLocation = corporate.location;
        if (corporateLocation) {
          const start = {
            latitude: userCurrentLocation.coordinates[1],
            longitude: userCurrentLocation.coordinates[0],
          };
          const end = {
            latitude: corporateLocation.coordinates[1],
            longitude: corporateLocation.coordinates[0],
          };
          return haversine(start, end, {
            unit: 'km',
          });
        }
      }
      return '';
    } else {
      return '';
    }
  }

  constructor(data, isFromAPI = false) {
    this.set(data, isFromAPI);
  }

  set(data, isFromAPI = false) {
    if (data && isFromAPI) {
      this.id = data._id;
      this.createdAt = data.createdAt;
      this.updatedAt = data.updatedAt;
      this.vendorId = data.vendorId;
      this.quantity = data.quantity ? Number(data.quantity).toFixed(2) : 0;
      this.reservedQuantity = data.reservedQuantity;
      this.user = data.user;
      this.vendor = data.vendor;
      this.type = data.type;
    } else if (data) {
      this.id = data.id;
      this.createdAt = data.createdAt;
      this.updatedAt = data.updatedAt;
      this.vendorId = data.vendorId;
      this.quantity = data.quantity;
      this.reservedQuantity = data.reservedQuantity;
      this.user = data.user;
      this.vendor = data.vendor;
      this.type = data.type;
    }
  }

  reset() {
    this.vendorId = '';
    this.quantity = 0;
    this.reservedQuantity = 0;
    this.createdAt = '';
    this.updatedAt = '';
    this.type = '';
  }
}

export default Can;
