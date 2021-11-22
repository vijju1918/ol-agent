/**
 * Copyright (c) 2018-present, Oleum. All rights reserved.
 *
 */

'use strict';

import {observable, computed} from 'mobx';
import Meteor from '@meteorrn/core';

import Segment from './segment';
import Locations from '@stores/Locations';
import Account from '@stores/Account';

class NewPromotion {
  @observable id;
  @observable referenceId;
  @observable title;
  @observable description;
  @observable startDate;
  @observable endDate;
  @observable type;
  @observable valueType;
  @observable segmentsData;
  @observable vendor;
  @observable bannerImage = {};
  @observable status;
  @observable createdAt;
  @observable proofImage;
  @observable promotedBy;
  @observable getPromotionDetailsBackgroundLoading = false;
  @observable getPromotionDetailsLoading = false;

  constructor(data, isFromAPI = false) {
    this.set(data, isFromAPI);
  }

  set(data, isFromAPI = false) {
    if (data && isFromAPI) {
      this.id = data._id;
      this.title = data.title;
      this.referenceId = data.referenceId;
      this.description = data.description;
      this.startDate = data.startDate;
      this.endDate = data.endDate;
      this.type = data.type;
      this.valueType = data.valueType;
      if (data.segments && data.segments.length) {
        if (!this.segmentsData) {
          this.segmentsData = [];
        }
        data.segments &&
          data.segments.length &&
          data.segments.forEach(item =>
            this.segmentsData.push(new Segment(item, isFromAPI)),
          );
      }
      this.vendor = data.vendor;
      this.bannerImage = data.bannerImage ? data.bannerImage : undefined;
      this.status = data.status;
      this.createdAt = data.createdAt;
      this.promotedBy = data.promotedBy;
    } else if (data) {
      this.id = data.id;
      this.title = data.title;
      this.referenceId = data.referenceId;
      this.description = data.description;
      this.startDate = data.startDate;
      this.endDate = data.endDate;
      this.type = data.type;
      this.valueType = data.valueType;
      this.segmentsData = [];
      data.segmentsData &&
        data.segmentsData.length &&
        data.segmentsData.forEach(item =>
          this.segmentsData.push(new Segment(item, isFromAPI)),
        );
      this.vendor = data.vendor;
      this.bannerImage = data.bannerImage ? data.bannerImage : undefined;
      this.status = data.status;
      this.createdAt = data.createdAt;
      this.promotedBy = data.promotedBy;
    }
  }

  reset() {
    this.id = '';
    this.title = '';
    this.referenceId = '';
    this.description = '';
    this.startDate = '';
    this.endDate = '';
    this.type = '';
    this.valueType = {};
    if (this.segmentsData && this.segmentsData.length > 0) {
      this.segmentsData.splice(0, this.segmentsData.length);
    }
    this.vendor = '';
    this.bannerImage = {};
    this.status = '';
    this.createdAt = '';
    this.promotedBy = '';
    this.getPromotionDetailsBackgroundLoading = false;
    this.getPromotionDetailsLoading = false;
  }

  @computed
  get bannerImageUrl() {
    if (this.bannerImage) {
      return this.bannerImage.url;
    }
    return '';
  }

  getPromotionUrl = () => {
    return new Promise((resolve, reject) => {
      Meteor.call(
        'getPromotionUrl',
        {
          _id: this.id,
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

  /**
   * Return location details for 'getPromotion' method
   *
   * @return {Object}
   * @memberof NewPromotion
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

  getPromotionDetails = (backgroundLoading = false) => {
    if (backgroundLoading) {
      this.getPromotionDetailsBackgroundLoading = true;
    } else {
      this.getPromotionDetailsLoading = true;
    }
    return new Promise((resolve, reject) => {
      Meteor.call(
        'getPromotion',
        {
          user: {id: Account.user.endUserId, type: Account.user.type},
          location: this.locationDataForPromotionList(),
          referenceId: this.referenceId,
        },
        (err, data) => {
          if (!err) {
            this.getPromotionDetailsBackgroundLoading = false;
            this.getPromotionDetailsLoading = false;
            resolve(data);
          } else {
            this.getPromotionDetailsBackgroundLoading = false;
            this.getPromotionDetailsLoading = false;
            reject(err);
          }
        },
      );
    });
  };
}

export default NewPromotion;
