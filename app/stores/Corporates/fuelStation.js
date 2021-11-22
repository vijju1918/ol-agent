/**
 * Copyright (c) 2018-present, Oleum. All rights reserved.
 *
 */
'use strict';

import {observable} from 'mobx';

class FuelStation {
  @observable id;
  @observable title;
  @observable addressText;
  @observable type;
  @observable ratingValue;
  @observable ratingCount;
  @observable location;
  @observable price;

  constructor(data, isFromAPI = false) {
    this.set(data, isFromAPI);
  }

  set(data, isFromAPI = false) {
    if (data && isFromAPI) {
      this.id = data._id
        ? data._id
        : data.googlePlaceId
        ? data.googlePlaceId
        : '';
      this.title = data.title;
      this.addressText = data.googleAddress;
      this.type = data.type;
      this.ratingValue =
        data.type && data.googleRating
          ? data.googleRating
          : data.rating && data.rating.value
          ? data.rating.value
          : 0;
      this.ratingCount =
        data.type && data.googleRatingCount
          ? data.googleRatingCount
          : data.rating && data.rating.count
          ? data.rating.count
          : 0;
      this.price = data.price;
      this.location = data.location;
    }
  }

  reset() {
    this.id = '';
    this.title = '';
    this.addressText = '';
    this.type = '';
    this.ratingValue = '';
    this.ratingCount = '';
    this.price = '';
    this.location = '';
  }
}

export default FuelStation;
