/**
 * Copyright (c) 2018-present, Oleum. All rights reserved.
 *
 */

'use strict';

import {observable, computed} from 'mobx';
import Meteor from '@meteorrn/core';

import {getDateTimeString} from '../../lib/utils';

import AppStrings from '@config/strings';
import {AppConstants} from '@config';

import Account from '@stores/Account';
import Corporates from '@stores/Corporates';
import Contacts from '@stores/Contacts';
import Cans from '@stores/Cans';

class Transfer {
  @observable id;
  @observable referenceId;
  @observable sendFrom = {};
  @observable sendFromCan = Cans.myList.length ? Cans.myList[0] : {};
  @observable sendTo = {};
  @observable sendToCan = {};
  @observable recipientVehicle = {};
  @observable type;
  @observable quantity = 1;
  @observable status;
  @observable note;
  @observable createdAt;
  @observable completedAt;
  @observable loading = false;
  @observable statusHistory;
  @observable selectedCorporate = {};
  @observable promotionDetails = {};

  constructor(data, isFromAPI = false) {
    this.set(data, isFromAPI);
  }

  set(data, isFromAPI = false) {
    if (data && isFromAPI) {
      this.id = data._id;
      this.referenceId = data.referenceId;
      this.sendFrom = data.from;
      this.sendFromCan = data.from ? data.from.can : undefined;
      this.sendTo = data.to;
      this.sendToCan = data.to ? data.to.can : undefined;
      this.type = data.type;
      this.quantity = data.quantity;
      this.status = data.status;
      this.note = data.note;
      this.createdAt = data.createdAt;
      this.completedAt = data.completedAt;
      this.statusHistory = data.statusHistory;
      this.selectedCorporate = data.selectedCorporate;
      this.promotionDetails = data.promotion;
    } else if (data) {
      this.id = data.id;
      this.referenceId = data.referenceId;
      this.sendFrom = data.sendFrom;
      this.sendFromCan = data.sendFromCan;
      this.sendTo = data.sendTo;
      this.sendToCan = data.sendToCan;
      this.type = data.type;
      this.quantity = data.quantity;
      this.status = data.status;
      this.note = data.note;
      this.createdAt = data.createdAt;
      this.completedAt = data.completedAt;
      this.statusHistory = data.statusHistory;
      this.selectedCorporate = data.selectedCorporate;
    }
  }

  reset() {
    this.id = '';
    this.referenceId = '';
    this.sendFrom = {};
    this.sendFromCan = Cans.myList.length ? Cans.myList[0] : {};
    this.sendTo = {};
    this.sendToCan = {};
    this.recipientVehicle = {};
    this.type = '';
    this.quantity = 1;
    this.status = '';
    this.note = '';
    this.createdAt = '';
    this.completedAt = '';
    this.loading = false;
    this.statusHistory = [];
    this.selectedCorporate = {};
    this.promotionDetails = {};
  }

  @computed
  get vendorLogo() {
    let corporate = Corporates.list.find(
      item => this.sendFromCan && item.id === this.sendFromCan.vendorId,
    );
    if (corporate) {
      return corporate.companyLogo;
    }
    return '';
  }

  @computed
  get vendorName() {
    let corporate = Corporates.list.find(
      item => this.sendFromCan && item.id === this.sendFromCan.vendorId,
    );
    if (corporate) {
      return corporate.title;
    }
    return '';
  }

  @computed
  get receiverName() {
    let name = Contacts.list.find(
      item => Number(item.phoneNumber) === Number(this.sendTo.number),
    );
    if (name) {
      return name.name;
    }
    return this.sendTo.number;
  }

  @computed
  get senderName() {
    let name = Contacts.list.find(
      item => Number(item.phoneNumber) === Number(this.sendFrom.number),
    );
    if (name) {
      return name.name;
    }
    return this.sendFrom.number;
  }

  @computed
  get promotedBy() {
    let corporate = Corporates.list.find(item => item.id === this.sendFrom.id);
    if (corporate) {
      return corporate.title;
    }
    return '';
  }

  @computed
  get corporateName() {
    let corporate = Corporates.list.find(item => item.id === this.sendTo.id);
    if (corporate) {
      return corporate.title;
    }
    return '';
  }

  getSenderName() {
    if (this.sendFrom.type !== 'corporate') {
      if (this.sendFrom.id === Account.user.endUserId) {
        return 'Me';
      } else {
        return this.senderName;
      }
    } else {
      let corporate = Corporates.list.find(
        corporateItem => corporateItem.id === this.sendFrom.id,
      );
      if (corporate) {
        return corporate.title;
      }
      return 'Corporate';
    }
  }

  @computed
  get transferSummary() {
    let data = [];
    if (this.referenceId) {
      data.push({
        name: 'Reference Id',
        value: this.referenceId,
      });
    }
    if (this.sendFromCan.vendorId) {
      data.push({
        name: 'Vendor',
        value: this.vendorName,
      });
    }
    if (this.statusHistory) {
      let date = this.statusHistory.find(item => item.status === 'PENDING');
      data.push({
        name: 'Transfer Date',
        value: getDateTimeString(date.date, 'DD MMMM YYYY, hh:mm a'),
      });
    }
    if (this.sendFrom.id) {
      data.push({
        name: 'Transferred From',
        value: this.getSenderName(),
      });
    }
    if (this.sendFrom.number) {
      data.push({
        name: 'Phone Number',
        value: this.sendFrom.number,
      });
    }
    if (this.sendTo.type === AppStrings.customerSmall) {
      data.push({
        name: 'Transferred To',
        value:
          this.sendTo.id === Account.user.endUserId ? 'Me' : this.receiverName,
      });
    }
    if (this.sendTo.type === AppStrings.customerSmall && this.sendTo.number) {
      data.push({
        name: 'Phone Number',
        value: this.sendTo.number,
      });
    }
    if (this.sendTo.type === AppStrings.corporate) {
      data.push({
        name: 'Transferred To',
        value: this.corporateName,
      });
    }
    if (this.sendTo.type === AppConstants.vehicle) {
      data.push({
        name: 'Transferred To',
        value: this.sendTo.vehicleNumber,
      });
    }
    if (this.quantity) {
      data.push({
        name: 'Fuel Points',
        value: this.quantity + ' FP',
      });
    }
    if (this.status) {
      data.push({
        name: 'Status',
        value: this.status,
      });
    }
    if (this.statusHistory) {
      let date = this.statusHistory.find(item => item.status === 'COMPLETED');
      if (date) {
        data.push({
          name: 'Completed On',
          value: getDateTimeString(date.date, 'DD MMMM YYYY, hh:mm a'),
        });
      }
      //  else {
      //   return '';
      // }
    }
    if (this.note) {
      data.push({
        name: 'Transfer Note',
        value: this.note,
      });
    }
    return data;
  }

  get params() {
    return {
      userId: Account.user.endUserId,
      userType: Account.user.type,
      toUser: {
        id: this.recipientVehicle.id && this.recipientVehicle.id,
        type: this.recipientVehicle.id && AppConstants.vehicle,
        number: this.sendTo.phoneNumber && String(this.sendTo.phoneNumber),
        vehicleNumber:
          this.recipientVehicle.number && this.recipientVehicle.number,
      },
      vendorId: this.sendFromCan.vendorId,
      quantity: Number(this.quantity),
      note: this.note,
    };
  }

  get corporateParams() {
    return {
      user: {
        id: Account.user.endUserId,
        type: Account.user.type,
      },
      to: String(this.selectedCorporate.id),
      vendorId: this.sendFromCan.vendorId,
      quantity: Number(this.quantity),
      note: this.note,
    };
  }

  transferFuelPoints = () => {
    this.loading = true;
    return new Promise((resolve, reject) => {
      Meteor.call('transferFuelPoints', this.params, (err, data) => {
        if (!err) {
          this.reset();
          resolve(data);
        } else {
          reject(err);
        }
      });
    });
  };

  transferFuelPointsToCorporate = () => {
    return new Promise((resolve, reject) => {
      Meteor.call('donateFuelPoints', this.corporateParams, (err, data) => {
        if (!err) {
          this.reset();
          resolve(data);
        } else {
          reject(err);
        }
      });
    });
  };
}

export default Transfer;
