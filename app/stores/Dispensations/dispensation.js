/**
 * Copyright (c) 2018-present, Oleum. All rights reserved.
 *
 */

'use strict';

import {observable, computed} from 'mobx';
import Meteor from '@meteorrn/core';

import Account, {User} from '@stores/Account';
import Products from '@stores/Products';
import Dispensations from '@stores/Dispensations';

import {AppConstants} from '@config';
import {getDateTimeString} from '../../lib/utils';

class Dispensation {
  @observable id;
  @observable referenceId;
  @observable vehicleNumber;
  @observable vehicleId;
  @observable sbuProductId;
  @observable productId;
  @observable productTitle;
  @observable productType;
  @observable productPrice;
  @observable quantity;
  @observable amount;
  @observable fuelNozzleId;
  @observable currentOdometerReading = null;
  @observable lastOdometerReading = null;
  @observable paymentModeId;
  @observable isFullTank = false;
  @observable addFuelDispensationLoading = false;
  @observable addOrUpdateDispensationLoading = false;
  @observable vehicleDetails = {};
  @observable sbu = {};
  @observable agent = {};
  @observable product = {};
  @observable dispensedQuantity;
  @observable paymentDetails = {};
  @observable dispensedAt;
  @observable promotionId;
  @observable promotionType;
  @observable shareUrl;
  @observable isPhoneNumberExist = false;
  @observable userData = {};
  @observable createdAt = '';
  @observable fuelStationTitle = '';
  @observable fuelStationAddressText = '';
  @observable fuelStationLocation = {};
  @observable can = {};
  user = new User();

  constructor(data, isFromAPI = false, addOrEditInvoice = false) {
    this.set(data, isFromAPI, addOrEditInvoice);
  }

  set(data, isFromAPI = false, addOrEditInvoice = false) {
    if (data && isFromAPI) {
      this.id = data._id;
      this.referenceId = data.referenceId;
      this.vehicleNumber =
        data.vehicleDetails && data.vehicleDetails.number
          ? data.vehicleDetails.number
          : '';
      this.updateNumber(this.getModifiedPhoneNumber(data && data.phoneNumber));
      this.vehicleDetails = data.vehicleDetails ? data.vehicleDetails : '';
      this.sbu = data.sbu ? data.sbu : {};
      this.agent = data.agent ? data.agent : {};
      this.product = data.product ? data.product : {};
      this.dispensedQuantity = data.dispensedQuantity
        ? data.dispensedQuantity
        : '';
      this.paymentDetails = data.paymentDetails ? data.paymentDetails : {};
      this.dispensedAt = data.dispensedAt ? data.dispensedAt : '';
      this.isPhoneNumberExist = data.phoneNumber ? true : false;
      this.isFullTank = data.isFullTank;
      this.isLocked = data.isLocked;
      this.shareUrl = data.shareUrl ? data.shareUrl : '';
      this.userData = data.user ? data.user : {};
      this.createdAt = data.createdAt ? data.createdAt : '';
      this.currentOdometerReading = data.odometer ? data.odometer : null;
      // this.promotionId =
      //   data.promotion && data.promotion.id ? data.promotion.id : '';
      // this.promotionType =
      //   data.promotion && data.promotion.type ? data.promotion.type : '';
    } else if (data && addOrEditInvoice) {
      this.id = data.dispensationId;
      this.vehicleId = data.vehicleId;
      this.productTitle = data.fuelTitle;
      this.productType = data.fuelType;
      this.currentOdometerReading = data.currentOdometer;
      this.lastOdometerReading = data.lastOdometer;
      this.productPrice = data.productPrice;
      this.amount = data.amount;
      this.quantity = data.quantity;
      this.isFullTank = data.isFullTank ? data.isFullTank : false;
      this.dispensedAt = data.dispensedAt ? data.dispensedAt : new Date();
      this.fuelStationTitle = data.fuelStationTitle
        ? data.fuelStationTitle
        : '';
      this.fuelStationAddressText = data.fuelStationAddressText
        ? data.fuelStationAddressText
        : '';
      this.fuelStationLocation = data.fuelStationLocation
        ? data.fuelStationLocation
        : {};
    } else if (data) {
      this.id = data._id;
      this.referenceId = data.referenceId;
      this.vehicleNumber =
        data.vehicleDetails && data.vehicleDetails.number
          ? data.vehicleDetails.number
          : '';
      this.sbuProductId = this.getSbuProductId(
        data && data.vehicleDetails && data.vehicleDetails.fuelType,
      );
      this.productId = this.getProductId(
        data && data.vehicleDetails && data.vehicleDetails.fuelType,
      );
      this.productType =
        data && data.vehicleDetails && data.vehicleDetails.fuelType;
      this.updateNumber(
        this.getModifiedPhoneNumber(data && data.user && data.user.number),
      );
      this.quantity = data.dispensedQuantity;
      this.amount =
        data.paymentDetails &&
        data.paymentDetails.totalAmount &&
        data.paymentDetails.totalAmount.value;
      this.isFullTank = data.isFullTank;
      this.fuelNozzleId = data.agent && data.agent.nozzleId;
      this.lastOdometerReading =
        data.vehicleDetails && data.vehicleDetails.odometer
          ? data.vehicleDetails.odometer
          : null;
      this.paymentModeId = data.paymentDetails && data.paymentDetails.mode;
      this.dispensedAt = data.dispensedAt ? data.dispensedAt : '';
      this.promotionId =
        data.promotion && data.promotion.id ? data.promotion.id : '';
      this.promotionType =
        data.promotion && data.promotion.type ? data.promotion.type : '';
      this.isPhoneNumberExist = data.user && data.user.number ? true : false;
      this.currentOdometerReading = data.currentOdometerReading
        ? data.currentOdometerReading
        : null;
    } else {
      this.dispensedAt = new Date();
    }
  }

  reset() {
    this.id = '';
    this.referenceId = '';
    this.vehicleNumber = '';
    this.vehicleId = '';
    this.customerNumber = '';
    this.sbuProductId = '';
    this.productId = '';
    this.productTitle = '';
    this.productType = '';
    this.productPrice = '';
    this.quantity = '';
    this.amount = '';
    this.fuelNozzleId = '';
    this.currentOdometerReading = '';
    this.lastOdometerReading = '';
    this.isFullTank = false;
    this.paymentModeId = '';
    this.vehicleDetails = {};
    this.sbu = {};
    this.agent = {};
    this.product = {};
    this.dispensedQuantity = '';
    this.paymentDetails = {};
    this.dispensedAt = '';
    this.promotionId = '';
    this.promotionType = '';
    this.isPhoneNumberExist = false;
    this.isLocked = '';
    this.shareUrl = '';
    this.userData = {};
    this.createdAt = '';
    this.fuelStationTitle = '';
    this.fuelStationAddressText = '';
    this.fuelStationLocation = {};
    this.can = {};
  }

  getSbuProductId(fuelType) {
    let matchedProduct = this.getMatchedProduct(fuelType);
    if (matchedProduct) {
      return matchedProduct.id;
    } else {
      return null;
    }
  }

  getProductId(fuelType) {
    let matchedProduct = this.getMatchedProduct(fuelType);
    if (matchedProduct) {
      return matchedProduct.productId;
    } else {
      return null;
    }
  }

  getMatchedProduct(fuelType) {
    if (
      Products.sbuAndProductLinkedList &&
      Products.sbuAndProductLinkedList.length
    ) {
      return Products.sbuAndProductLinkedList.find(
        item =>
          item.productData &&
          item.productData.type &&
          item.productData.type === fuelType,
      );
    }
  }

  getModifiedPhoneNumber(number) {
    if (number && this.user.country && this.user.country.dial_code) {
      let modifiedPhoneNumber = number.replace(this.user.country.dial_code, '');
      return modifiedPhoneNumber;
    }
  }

  updateNumber(number) {
    this.user.updateNumber(number);
  }

  @computed
  get numberFormat() {
    // if (this.country) {
    //   return new AsYouType(this.country.code).input(this.number); // eslint-disable-line new-cap
    // }
    return this.user.number;
  }

  @computed
  get internationalFormatNumber() {
    return this.user.internationalFormatNumber;
  }

  @computed
  get getActiveCommunityPromotions() {
    let activeCommunityPromotions =
      Dispensations.activeCommunityPromotions &&
      Dispensations.activeCommunityPromotions.length &&
      Dispensations.activeCommunityPromotions.map(item => {
        return {
          id: item._id,
          type: item.type,
          title: item.claimedBy && item.claimedBy.title,
          subTitle: item.title,
          image: item.claimedBy && item.claimedBy.image,
        };
      });
    return activeCommunityPromotions;
  }

  addFuelDispenseRecord = () => {
    this.addFuelDispensationLoading = true;
    return new Promise((resolve, reject) => {
      Meteor.call(
        'dispenseFuel',
        {
          vehicleNumber: this.vehicleNumber,
          can:
            this.can && this.can._id && this.can.vendorId
              ? {
                  id: this.can && this.can._id,
                  vendorId: this.can && this.can.vendorId,
                }
              : undefined,
          customerNumber: this.internationalFormatNumber,
          odometer: this.currentOdometerReading,
          agentDetails: {
            id: Account.user.endUserId,
            type: Account.user.type,
            nozzleId: this.fuelNozzleId && this.fuelNozzleId.toString(),
          },
          sbu: {
            id:
              Account.profile && Account.profile.sbu && Account.profile.sbu.id,
            type: AppConstants.corporate,
          },
          productId: this.productId,
          sbuProductId: this.sbuProductId,
          quantity: this.quantity
            ? {value: Number(this.quantity), unit: 'Litre', type: 'fuel'}
            : this.amount
            ? {value: Number(this.amount), unit: 'INR', type: 'amount'}
            : null,
          isFullTank: this.isFullTank ? true : false,
          paymentMode: this.paymentModeId,
          promotion: this.promotionId
            ? {
                id: this.promotionId,
                type: this.promotionType,
              }
            : undefined,
        },
        (err, data) => {
          if (!err) {
            this.addFuelDispensationLoading = false;
            resolve(data);
          } else {
            this.addFuelDispensationLoading = false;
            reject(err);
          }
        },
      );
    });
  };

  getPaymentModeTitle() {
    let matchedData =
      Dispensations.paymentModes &&
      Dispensations.paymentModes.length &&
      Dispensations.paymentModes.find(
        eachItem => eachItem.id === this.paymentModeId,
      );
    return matchedData && matchedData.title;
  }

  getCommunityTitle() {
    let matchedData =
      this.getActiveCommunityPromotions &&
      this.getActiveCommunityPromotions.length &&
      this.getActiveCommunityPromotions.find(
        eachItem => eachItem.id === this.promotionId,
      );
    return matchedData && matchedData.title;
  }

  @computed
  get newDispensationDetails() {
    let data = [];
    if (this.referenceId) {
      data.push({
        name: 'Reference Id',
        value: this.referenceId,
      });
    }
    if (this.vehicleNumber) {
      data.push({
        name: 'Vehicle Number',
        value: this.vehicleNumber,
      });
    }
    if (this.quantity) {
      data.push({
        name: 'Fuel Quantity',
        value: this.quantity + 'L',
      });
    }
    if (this.amount) {
      data.push({
        name: 'Fuel Amount',
        value: '₹' + this.amount,
      });
    }
    if (this.isFullTank) {
      data.push({
        name: 'Full Tank',
        value: 'Yes',
      });
    }
    if (this.fuelNozzleId) {
      data.push({
        name: 'Nozzle Id',
        value: this.fuelNozzleId,
      });
    }
    if (this.lastOdometerReading) {
      data.push({
        name: 'Odometer Reading',
        value: this.lastOdometerReading + ' km',
      });
    }
    if (this.promotionId) {
      data.push({
        name: 'Community',
        value: this.getCommunityTitle(),
      });
    }
    if (this.paymentModeId) {
      data.push({
        name: 'Payment Mode',
        value: this.getPaymentModeTitle(),
      });
    }
    if (this.dispensedAt) {
      data.push({
        name: 'Dispensed On',
        value: getDateTimeString(this.dispensedAt, 'DD MMMM YYYY, hh:mm a'),
      });
    }
    return data;
  }

  addOrUpdateDispensation = () => {
    this.addOrUpdateDispensationLoading = true;
    return new Promise((resolve, reject) => {
      Meteor.call(
        'addOrUpdateDispensation',
        {
          id: this.id,
          user: {id: Account.user.endUserId, type: Account.user.type},
          dispensedAt: new Date(this.dispensedAt),
          vehicleDetails: {
            id: this.vehicleId,
            odometer: this.currentOdometerReading,
          },
          product: {
            title: this.productTitle,
            type: this.productType,
            price: {value: Number(this.productPrice), unit: 'INR'},
          },
          dispensedQuantity: Number(this.quantity),
          isFullTank: this.isFullTank,
          paymentDetails: {
            amountPaid: {value: Number(this.amount), unit: 'INR'},
            totalAmount: {value: Number(this.amount), unit: 'INR'},
          },
          sbu: {
            name: this.fuelStationTitle,
            addressText: this.fuelStationAddressText,
            location: this.fuelStationLocation,
          },
        },
        (err, data) => {
          if (!err) {
            this.addOrUpdateDispensationLoading = false;
            resolve(data);
          } else {
            this.addOrUpdateDispensationLoading = false;
            reject(err);
          }
        },
      );
    });
  };
}

export default Dispensation;
