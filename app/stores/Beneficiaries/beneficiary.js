/**
 * Copyright (c) 2018-present, Oleum. All rights reserved.
 *
 */

'use strict';

import {observable} from 'mobx';

class Beneficiary {
  @observable id;
  @observable corporate = {};
  @observable user = {};
  @observable fuelPoints;
  @observable vehicleNumber;
  @observable promotions = [];
  @observable communityTitle;
  @observable totalQuantity;

  constructor(data, isFromAPI = false) {
    this.set(data, isFromAPI);
  }

  set(data, isFromAPI = false) {
    if (data && isFromAPI) {
      this.id = data._id;
      this.corporate = data.corporate;
      this.user = data.user;
      this.fuelPoints = data.totalTransferred;
      this.vehicleNumber = data.vehicleNumber;
      this.promotions = data.promotions;
      this.communityTitle = data.title;
      this.totalQuantity = data.totalQuantity;
    } else if (data) {
      // this.id = data._id;
      // this.corporate = data.corporate;
      // this.user = data.user;
      // this.fuelPoints = data.totalTransferred;
      // this.vehicleNumber = data.vehicleNumber;
    }
  }

  reset() {
    this.id = '';
    this.corporate = {};
    this.user = {};
    this.fuelPoints = '';
    this.vehicleNumber = '';
    this.promotions = [];
    this.communityTitle = '';
    this.totalQuantity = '';
  }
}

export default Beneficiary;
