/**
 * Copyright (c) 2018-present, Oleum. All rights reserved.
 *
 */

'use strict';

import {observable, computed} from 'mobx';
import {persist} from 'mobx-persist';
import Meteor from '@meteorrn/core';

import Account from '@stores/Account';
import Address from './address';
import Locations from '@stores/Locations';

class Profile {
  @persist @observable id;
  @persist('object') @observable profileImage;
  @persist @observable fullName;
  @persist @observable email;
  @persist @observable phoneNumber;
  @persist('object', Address) @observable address = new Address();
  @persist('list') @observable corporate = [];
  @persist('object') @observable sbu = {};
  @persist('list') @observable sbuProducts = [];
  @persist('list') @observable types = [];
  @persist @observable loading;
  @persist @observable isDSMOnline;
  @persist @observable isMCAOnline;
  @persist('list') @observable savedLocations;
  @persist('object') @observable location;
  @persist('object') @observable locationDetails;
  @persist @observable isAbleToUpdatePrice = false;
  @persist('object') @observable licenseImage = {};
  @persist @observable licenseNumber = '';

  constructor(data, isFromAPI = false) {
    this.set(data, isFromAPI);
  }

  set(data, isFromAPI = false) {
    if (data && isFromAPI) {
      this.id = data._id;
      this.fullName = data.name;
      this.profileImage = data.image;
      this.isDSMOnline = data.isDSMOnline;
      this.isMCAOnline = data.isMCAOnline;
      this.sbu = data.sub ? data.sub : null;
      this.sbuProducts =
        data.subProducts && data.subProducts.length
          ? data.subProducts.map(product => {
              product.id = product._id;
              return product;
            })
          : [];
      this.types = data.types ? data.types : [];
      this.email = data.email;
      this.phoneNumber = data.phoneNumber;
      if (data.address) {
        this.address.set(data.address);
      }
      this.corporate = data.corporate ? data.corporate : [];
      this.savedLocations = data.savedLocations;
      this.location = data.location;
      this.locationDetails = data.locationDetails;
      this.licenseImage = data.licenseImage;
      this.licenseNumber = data.licenseNumber;
      this.isAbleToUpdatePrice = data.isAbleToUpdatePrice;
    } else if (data) {
      this.id = data.id;
      this.fullName = data.fullName;
      this.profileImage = data.profileImage;
      this.email = data.email;
      this.sbu = data.sbu;
      this.sbuProducts =
        data.subProducts && data.subProducts.length ? data.subProducts : [];
      this.isMCAOnline = data.isMCAOnline;
      this.isDSMOnline = data.isDSMOnline;
      this.types = data.types;
      this.phoneNumber = data.phoneNumber;
      if (data.address) {
        this.address.set(data.address);
      }
      this.corporate = data.corporate;
      this.savedLocations = data.savedLocations;
      this.location = data.location;
      this.locationDetails = data.locationDetails;
      this.licenseImage = data.licenseImage;
      this.licenseNumber = data.licenseNumber;
      this.isAbleToUpdatePrice = data.isAbleToUpdatePrice;
    }
  }

  reset() {
    this.id = '';
    this.fullName = '';
    this.profileImage = '';
    this.email = '';
    this.phoneNumber = null;
    this.address = {};
    this.corporate = [];
    this.loading = false;
    this.sbu = {};
    this.sbuProducts = [];
    this.types = [];
    this.isDSMOnline = false;
    this.isMCAOnline = false;
    this.savedLocations = [];
    this.location = {};
    this.locationDetails = {};
    this.licenseImage = {};
    this.licenseNumber = '';
  }

  setLocationDetails(data) {
    if (this && !this.location) {
      Locations.currentLocation = {
        coordinates: data.location.coordinates,
        google: data.locationDetails.google,
        toSearch: data.locationDetails.toSearch,
      };
    }
    this.location = data.location;
    this.locationDetails = data.locationDetails;
  }

  userProfileUpdation = () => {
    this.loading = true;
    return new Promise((resolve, reject) => {
      Meteor.call(
        'updateProfile',
        {
          user: {
            id: Account.user.endUserId,
            type: Account.user.type,
          },
          data: {
            name: this.fullName,
            email: this.email ? this.email : undefined,
            address: this.address,
          },
          location: this.location
            ? JSON.parse(JSON.stringify(this.location))
            : undefined,
          locationDetails: this.locationDetails
            ? JSON.parse(JSON.stringify(this.locationDetails))
            : undefined,
          licenseNumber: this.licenseNumber,
        },
        (err, data) => {
          if (!err) {
            this.reset();
            resolve(data);
          } else {
            reject(err);
          }
        },
      );
    });
  };

  @computed
  get isDSM() {
    if (this.types.find(item => item === 'DSM')) {
      return true;
    } else {
      return false;
    }
  }

  @computed
  get isMCA() {
    if (this.types.find(item => item === 'MCA')) {
      return true;
    } else {
      return false;
    }
  }

  @computed
  get isMCADSM() {
    if (this.types.find(item => item === 'DSM' && item === 'MCA')) {
      return true;
    } else {
      return false;
    }
  }

  goDSMOnlineRequest = () => {
    this.loading = true;
    return new Promise((resolve, reject) => {
      Meteor.call(
        'updateDSMStatus',
        {
          user: {
            id: Account.user.endUserId,
            type: Account.user.type,
          },
          isOnline: !this.isDSMOnline,
        },
        (err, data) => {
          if (!err) {
            resolve(data);
          } else {
            reject(err);
          }
        },
      );
    });
  };

  goMCAOnlineRequest = () => {
    this.loading = true;
    return new Promise((resolve, reject) => {
      Meteor.call(
        'updateMCAStatus',
        {
          user: {
            id: Account.user.endUserId,
            type: Account.user.type,
          },
          isOnline: !this.isMCAOnline,
        },
        (err, data) => {
          if (!err) {
            resolve(data);
          } else {
            reject(err);
          }
        },
      );
    });
  };
}

export default Profile;
