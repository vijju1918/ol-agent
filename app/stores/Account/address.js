/**
 * Copyright (c) 2018-present, Oleum. All rights reserved.
 *
 */

'use strict';

import {observable} from 'mobx';
import {persist} from 'mobx-persist';

class Address {
  @persist @observable line1;
  @persist @observable line2;
  @persist @observable country;
  @persist @observable state;
  @persist @observable pincode;
  @persist @observable city;

  constructor(data, isFromAPI = false) {
    this.set(data, isFromAPI);
  }

  set(data, isFromAPI = false) {
    if (data && isFromAPI) {
      this.line1 = data.line1;
      this.line2 = data.line2;
      this.country = data.country;
      this.state = data.state;
      this.pincode = data.pincode;
      this.city = data.city;
    } else if (data) {
      this.id = data.id;
      this.line1 = data.line1;
      this.line2 = data.line2;
      this.country = data.country;
      this.state = data.state;
      this.pincode = data.pincode;
      this.city = data.city;
    }
  }

  reset() {
    this.id = '';
    this.line1 = '';
    this.line2 = '';
    this.country = '';
    this.state = '';
    this.pincode = '';
    this.city = '';
  }
}

export default Address;
