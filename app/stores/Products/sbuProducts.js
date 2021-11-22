/**
 * Copyright (c) 2018-present, Oleum. All rights reserved.
 *
 */

'use strict';

import {observable} from 'mobx';
import Meteor from '@meteorrn/core';

import Account from '@stores/Account';

import {AppConstants} from '@config';

class Product {
  @observable id;
  @observable productId;
  @observable status;
  @observable user = {};
  @observable price = {};
  @observable title = '';
  @observable priceEditingFlag = false;
  @observable updateFuelPriceLoading = false;

  constructor(data, isFromAPI = false) {
    this.set(data, isFromAPI);
  }

  set(data, isFromAPI = false) {
    if (data && isFromAPI) {
      this.id = data._id;
      this.productId = data.productId;
      this.status = data.status;
      this.user = data.user;
      this.price = data.price;
      this.title = data.title;
    } else if (data) {
      this.id = data.id;
      this.productId = data.productId;
      this.status = data.status;
      this.user = data.user;
      this.price = data.price;
      this.title = data.title;
    }
  }

  reset() {
    this.id = null;
    this.productId = null;
    this.status = null;
    this.user = {};
    this.price = {};
    this.priceEditingFlag = false;
  }

  updateFuelPrice() {
    return new Promise((resolve, reject) => {
      this.updateFuelPriceLoading = true;
      Meteor.call(
        'updatePrice',
        {
          _id: this.productId,
          price:
            this.price && this.price.value ? Number(this.price.value) : null,
          user: {
            id:
              Account.profile && Account.profile.sbu && Account.profile.sbu.id,
            type: AppConstants.corporate,
          },
        },
        (err, result) => {
          if (err) {
            this.updateFuelPriceLoading = false;
            reject(err);
          } else {
            this.updateFuelPriceLoading = false;
            resolve(result);
          }
        },
      );
    });
  }
}

export default Product;
