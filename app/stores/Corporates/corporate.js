/**
 * Copyright (c) 2018-present, Oleum. All rights reserved.
 *
 */

'use strict';

import {observable, computed} from 'mobx';
import Account from '@stores/Account';
import Meteor from '@meteorrn/core';
import {persist} from 'mobx-persist';

class Corporate {
  @persist @observable id;
  @persist @observable canId;
  @persist @observable email;
  @persist @observable companyLogo;
  @persist('object') @observable location;
  @persist('object') @observable address;
  @persist @observable productId;
  @persist @observable industry;
  @persist @observable regNo;
  @persist @observable title;
  @persist @observable type;
  @persist @observable zoneId;
  @persist @observable role;
  @persist('list') @observable fpTransferList = [];
  @observable loading = false;
  @observable filter = '';
  @observable pagination = 1;
  @persist('object') @observable rating = {};

  constructor(data, isFromAPI = false) {
    this.set(data, isFromAPI);
  }

  set(data, isFromAPI = false) {
    if (data && isFromAPI) {
      this.id = data._id;
      this.canId = data.canId;
      this.companyLogo = data.corporateImage ? data.corporateImage.url : '';
      this.location = data.location;
      this.productId = data.productId;
      this.regNo = data.regNo;
      this.title = data.title;
      this.address = data.address;
      this.type = data.type;
      this.email = data.email;
      this.role = data.role;
      this.industry = data.industry;
      this.zoneId = data.zoneId;
      this.fpTransferList = data.fpTransferList;
      this.rating = data.rating;
    } else if (data) {
      this.id = data.data.id;
      this.canId = data.canId;
      this.companyLogo = data.companyLogo;
      this.location = data.location;
      this.productId = data.productId;
      this.regNo = data.regNo;
      this.address = data.address;
      this.title = data.title;
      this.type = data.type;
      this.industry = data.industry;
      this.role = data.role;
      this.zoneId = data.zoneId;
      this.email = data.email;
      this.fpTransferList = data.fpTransferList;
      this.rating = data.rating;
    }
  }

  reset() {
    this.id = '';
    this.fpTransferList = [];
    this.loading = false;
  }

  corporateListForFPTransfer = () => {
    this.loading = true;
    return new Promise((resolve, reject) => {
      Meteor.call(
        'getAllCorporateList',
        {
          user: {
            id: Account.user.endUserId,
            type: Account.user.type,
          },
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

  updateFilter = data => {
    this.pagination = 1;
    this.filter = data;
  };

  @computed
  get filteredCorporate() {
    let textExp = new RegExp(this.filter, 'i');
    return this.fpTransferList.filter(eachItem => {
      if (
        eachItem.title.match(textExp) ||
        eachItem.industry.match(textExp) ||
        eachItem.role.match(textExp)
      ) {
        return eachItem;
      }
      return false;
    });
  }
}

export default Corporate;
