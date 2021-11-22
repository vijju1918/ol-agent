/**
 * Copyright (c) 2017-present, Oleum. All rights reserved.
 *
 */

'use strict';

import {observable, computed} from 'mobx';
import {persist} from 'mobx-persist';
import {format} from 'libphonenumber-js';

class User {
  @persist @observable id;
  @persist @observable endUserId;
  @persist @observable type = 'customer';
  @persist @observable currentRole;
  @persist @observable name;
  @persist @observable number = '';
  @persist('object') @observable country = {
    name: 'india',
    code: 'IN',
    dial_code: '+91',
  };

  constructor(user) {
    if (user) {
      this.id = user.id;
      this.endUserId = user.endUserId;
      this.name = user.name;
      this.number = user.number;
      this.country = user.country;
    }
  }

  update(user) {
    this.id = user._id || user.id ? user._id || user.id : null;
    this.endUserId =
      user.endUser && user.endUser.length ? user.endUser[0].id : null;
    this.name = user.profile.name;
    this.number = user.profile.number;
    this.country = user.profile.country;
  }

  @computed
  get numberFormat() {
    // if (this.country) {
    //   return new AsYouType(this.country.code).input(this.number); // eslint-disable-line new-cap
    // }
    return this.number;
  }

  @computed
  get internationalFormatNumber() {
    if (this.country && this.number) {
      return format(
        {
          country: this.country.code,
          phone: this.number,
        },
        'E.164',
      );
    }
    return this.number;
  }

  updateNumber = number => {
    if (this.country) {
      if (
        number &&
        this.numberFormat &&
        number.length < this.numberFormat.length
      ) {
        // this.number = this.number.slice(0, -1);
        this.number = number;
      } else {
        this.number = number && number.replace(/\D/g, '');
      }
    } else {
      this.number = number && number.replace(/\D/g, '');
    }
  };
}

export default User;
