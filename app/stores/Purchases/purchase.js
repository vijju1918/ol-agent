/**
 * Copyright (c) 2018-present, Oleum. All rights reserved.
 *
 */

'use strict';

import {observable, computed} from 'mobx';
import {Platform} from 'react-native';
import Meteor from '@meteorrn/core';

import {AppConstants} from '@config';

import Corporates from '@stores/Corporates';
import Account from '@stores/Account';
import Locations from '@stores/Locations';

class Purchase {
  @observable id;
  @observable referenceId;
  @observable from = {};
  @observable to = {
    id: Account.user.endUserId,
    type: Account.user.type,
  };
  @observable recipientVehicle = {};
  @observable vendorId;
  @observable quantity = {};
  @observable payment = {};
  @observable promotion = {};
  @observable status;
  @observable createdAt;
  @observable completedAt;
  @observable status;
  @observable loading;
  @observable amount = {
    value: '',
    convenienceFee: '',
    unit: 'INR',
    type: 'CURRENCY',
  };
  @observable vehicleDetails = {};

  constructor(data, isFromAPI = false) {
    this.set(data, isFromAPI);
  }

  set(data, isFromAPI = false) {
    if (data && isFromAPI) {
      this.id = data._id;
      this.referenceId = data.referenceId;
      this.from = data.from;
      this.to = data.to;
      this.vendorId = data.vendorId;
      this.quantity = data.quantity;
      this.payment = data.payment;
      this.promotion = data.promotion;
      this.status = data.status;
      this.createdAt = data.createdAt;
      this.completedAt = data.completedAt;
      this.status = data.status;
      this.loading = data.loading;
      this.amount = data.amount;
      this.vehicleDetails = data.vehicleDetails && data.vehicleDetails;
    } else if (data) {
      this.id = data.id;
      this.referenceId = data.referenceId;
      this.from = data.from;
      this.to = data.to;
      this.vendorId = data.vendorId;
      this.quantity = data.quantity;
      this.payment = data.payment;
      this.promotion = data.promotion;
      this.status = data.status;
      this.createdAt = data.createdAt;
      this.completedAt = data.completedAt;
      this.status = data.status;
      this.loading = data.loading;
      this.amount = data.amount;
    }
  }

  reset() {
    this.id = '';
    this.referenceId = '';
    this.from = {};
    this.to = {};
    this.recipientVehicle = {};
    this.vendorId = '';
    this.quantity = '';
    this.payment = {};
    this.promotion = {};
    this.status = '';
    this.createdAt = '';
    this.completedAt = '';
    this.status = '';
    this.loading = '';
  }

  @computed
  get vendor() {
    let vendor = Corporates.get(this.vendorId);
    if (vendor) {
      return vendor;
    }
    return {};
  }

  /**
   * Return location details
   *
   * @return {Object}
   * @memberof Purchase
   */
  locationDataForPromotionList() {
    let currentLocation = Locations.currentLocation;
    let coordinatesData = {};
    if (
      currentLocation &&
      currentLocation.coordinates &&
      currentLocation.coordinates.length
    ) {
      coordinatesData = {
        longitude: currentLocation.coordinates[0],
        latitude: currentLocation.coordinates[1],
      };
    }
    let locationData = {
      coordinates: coordinatesData,
      toSearch: currentLocation && currentLocation.toSearch,
      google: currentLocation && currentLocation.google,
    };
    return locationData;
  }

  /**
   * Update promotion data for 'createPurchase'
   * Add location data to promotion data
   *
   * @return {Object} Updated promotion data
   * @memberof Purchase
   */
  promotionDataForCreatePurchase() {
    let promotionData = JSON.parse(JSON.stringify(this.promotion));
    if (this.locationDataForPromotionList()) {
      promotionData.location = this.locationDataForPromotionList();
    }
    return promotionData;
  }

  createPurchase = () => {
    this.loading = true;
    return new Promise((resolve, reject) => {
      Meteor.call(
        'createPurchase',
        {
          userId:
            this.recipientVehicle && this.recipientVehicle.id
              ? this.recipientVehicle.id
              : this.to.id,
          userType:
            this.recipientVehicle && this.recipientVehicle.id
              ? AppConstants.vehicle
              : this.to.type,
          vendorId: this.vendorId ? this.vendorId : undefined,
          from: this.from && this.from.id ? this.from : undefined,
          amount: this.amount,
          promotion:
            this.promotion && this.promotion.id
              ? this.promotionDataForCreatePurchase()
              : undefined,
          platform: Platform.OS,
        },
        (err, data) => {
          this.loading = false;
          if (!err) {
            resolve(data);
          } else {
            reject(err);
          }
        },
      );
    });
  };

  completePurchase = () => {
    this.loading = true;
    return new Promise(resolve => {
      Meteor.call(
        'completePurchase',
        {
          referenceId: this.referenceId,
        },
        (err, data) => {
          this.loading = false;
          if (!err) {
            resolve(data);
          } else {
            resolve(false);
          }
        },
      );
    });
  };

  cancelPurchase = () => {
    this.loading = true;
    return new Promise(resolve => {
      Meteor.call(
        'cancelPurchase',
        {
          referenceId: this.referenceId,
        },
        (err, data) => {
          this.loading = false;
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

export default Purchase;
