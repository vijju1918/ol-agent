/**
 * Copyright (c) 2018-present, Oleum. All rights reserved.
 *
 */

'use strict';

import {observable} from 'mobx';

class Product {
  @observable id;
  @observable title;
  @observable type;
  @observable createdBy = {};
  @observable description;
  @observable status;

  constructor(data, isFromAPI = false) {
    this.set(data, isFromAPI);
  }

  set(data, isFromAPI = false) {
    if (data && isFromAPI) {
      this.id = data._id;
      this.title = data.title;
      this.type = data.type;
      this.createdBy = data.createdBy;
      this.description = data.description;
      this.status = data.status;
    } else if (data) {
      this.id = data._id;
      this.title = data.title;
      this.type = data.type;
      this.createdBy = data.createdBy;
      this.description = data.description;
      this.status = data.status;
    }
  }

  reset() {
    this.id = null;
    this.name = null;
    this.description = null;
    this.vendorId = null;
    this.price = null;
  }
}

export default Product;
