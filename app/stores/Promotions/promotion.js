/**
 * Copyright (c) 2018-present, Oleum. All rights reserved.
 *
 */

'use strict';

import {observable, computed} from 'mobx';
import Meteor from '@meteorrn/core';

import Segment from './segment';

import Corporates from '@stores/Corporates';
import Account from '@stores/Account';
import Promotions from '@stores/Promotions';

import {AppConstants} from '@config';

class Promotion {
  @observable id;
  @observable referenceId;
  @observable promotionId;
  @observable title;
  @observable description;
  @observable startDate;
  @observable endDate;
  @observable termsAndConditions;
  @observable type;
  @observable materialType;
  @observable approvalEnabled;
  @observable valueType;
  @observable redeemType;
  @observable segmentsData;
  @observable vendorId;
  @observable createdBy;
  @observable isAgrementChecked = false;
  @observable bannerImage = {};
  @observable status;
  @observable statusHistory;
  @observable createdAt;
  @observable proofImage;
  @observable loading = false;
  @observable isDonateEnabled = false;
  @observable ratingStatus;
  @observable userRating;
  @observable stakeHolders;
  @observable donationCorporates = [];

  constructor(data, isFromAPI = false) {
    this.set(data, isFromAPI);
  }

  set(data, isFromAPI = false) {
    if (data && isFromAPI) {
      this.id = data._id;
      this.promotionId = data.promotionId ? data.promotionId : data._id;
      this.title = data.title;
      this.referenceId = data.referenceId;
      this.description = data.description;
      this.startDate = data.startDate;
      this.endDate = data.endDate;
      this.termsAndConditions = data.termsAndConditions;
      this.type = data.type;
      this.ratingStatus = data.rating;
      this.statusHistory = data.statusHistory;
      this.userRating = data.ratingStatus;
      this.materialType = data.materialType;
      this.approvalEnabled = data.approvalEnabled;
      this.valueType = data.valueType;
      this.redeemType = data.redeemType;
      if (data.segments && data.segments.length) {
        if (!this.segmentsData) {
          this.segmentsData = [];
        }
        data.segments.forEach(item =>
          this.segmentsData.push(new Segment(item, isFromAPI)),
        );
      }
      this.vendorId = data.can ? data.can.vendorId : undefined;
      this.createdBy = data.createdBy;
      this.bannerImage = data.bannerImage ? data.bannerImage : undefined;
      this.status = data.status;
      this.createdAt = data.createdAt;
      this.proofImage =
        data.proofImages && data.proofImages.length
          ? data.proofImages[0]
          : undefined;
      this.stakeHolders = data.stakeHolders;
      this.donationCorporates = data.donationCorporates;
    } else if (data) {
      this.id = data.id;
      this.promotionId = data.promotionId;
      this.title = data.title;
      this.referenceId = data.referenceId;
      this.description = data.description;
      this.startDate = data.startDate;
      this.endDate = data.endDate;
      this.termsAndConditions = data.termsAndConditions;
      this.type = data.type;
      this.ratingStatus = data.ratingStatus;
      this.statusHistory = data.statusHistory;
      this.userRating = data.userRating;
      this.materialType = data.materialType;
      this.approvalEnabled = data.approvalEnabled;
      this.valueType = data.valueType;
      this.redeemType = data.redeemType;
      this.segmentsData = [];
      data.segments.forEach(item =>
        this.segmentsData.push(new Segment(item, isFromAPI)),
      );
      this.vendorId = data.vendorId;
      this.createdBy = data.createdBy;
      this.bannerImage = data.bannerImage ? data.bannerImage : undefined;
      this.status = data.status;
      this.createdAt = data.createdAt;
      this.proofImage = data.proofImage;
      this.stakeHolders = data.stakeHolders;
      this.donationCorporates = data.donationCorporates;
    } else {
      this.materialType = {};
      this.approvalEnabled = false;
      this.valueType = {};
      this.segmentsData = [];
      this.createdBy = {};
      this.bannerImage = {};
      this.stakeHolders = [];
      this.donationCorporates = [];
    }
  }

  reset() {
    this.id = '';
    this.title = '';
    this.referenceId = '';
    this.description = '';
    this.startDate = '';
    this.endDate = '';
    this.isAgrementChecked = false;
    this.termsAndConditions = '';
    this.type = '';
    this.materialType = {};
    this.approvalEnabled = '';
    this.valueType = {};
    this.redeemType = '';
    if (this.segmentsData.length > 0) {
      this.segmentsData.splice(0, this.segmentsData.length);
    }
    this.vendorId = '';
    this.createdBy = {};
    this.bannerImage = {};
    this.status = '';
    this.createdAt = '';
    this.ratingStatus = '';
    this.userRating = '';
    this.statusHistory = '';
    this.stakeHolders = [];
    this.donationCorporates = [];
  }

  @computed
  get segments() {
    let activePromotion = Promotions.activeList.find(
      promotion => promotion.promotionId === this.promotionId,
    );
    if (activePromotion) {
      return activePromotion.segmentsData;
    }
    return this.segmentsData;
  }

  @computed
  get vendor() {
    let vendor = Corporates.get(this.vendorId);
    if (vendor) {
      return vendor;
    }
    return {};
  }

  @computed
  get by() {
    if (this.createdBy && this.createdBy.type === AppConstants.corporate) {
      let by = Corporates.get(this.createdBy.id);
      if (by) {
        return by;
      } else {
        return {};
      }
    } else {
      return {};
    }
  }

  @computed
  get bannerImageUrl() {
    if (this.bannerImage) {
      return this.bannerImage.url;
    }
    return '';
  }

  updateActionStatus(item) {
    return this.redeemActionPromotion(item.id);
  }

  redeemActionPromotion = id => {
    return new Promise((resolve, reject) => {
      Meteor.call(
        'redeemActionPromotion',
        {
          actionId: id,
          promotionId: this.promotionId,
          userId: Account.user.endUserId,
          userType: Account.user.type,
          isDonateEnabled: this.isDonateEnabled,
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

  redeemMaterialPromotion = () => {
    this.loading = true;
    return new Promise((resolve, reject) => {
      Meteor.call(
        'redeemMaterialPromotion',
        {
          promotionId: this.promotionId,
          userId: Account.user.endUserId,
          userType: Account.user.type,
          isDonateEnabled: this.isDonateEnabled,
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

  redeemValuePromotion = id => {
    return new Promise((resolve, reject) => {
      Meteor.call(
        'claimValuePromotion',
        {
          segmentId: id,
          promotionId: this.promotionId,
          userId: Account.user.endUserId,
          userType: Account.user.type,
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

  updatePromoRating = () => {
    return new Promise((resolve, reject) => {
      Meteor.call(
        'updatePromotionRating',
        {
          _id: this.id,
          status: this.userRating,
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

export default Promotion;
