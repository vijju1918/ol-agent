/**
 * Copyright (c) 2018-present, Oleum. All rights reserved.
 *
 */
'use strict';

import {observable} from 'mobx';

class Segment {
  @observable id;
  @observable actionType;
  @observable url;
  @observable minDuration;
  @observable description;
  @observable reward;
  @observable perUnit;
  @observable minQuantity;
  @observable maxQuantity;
  @observable actionStatus = false;
  @observable isPercentage = false;

  constructor(data, isFromAPI = false) {
    this.set(data, isFromAPI);
  }

  set(data, isFromAPI = false) {
    if (data && isFromAPI) {
      this.id = data.id;
      this.actionType = data.actionType;
      this.url = data.url;
      this.minDuration = data.minDuration;
      this.description = data.description;
      this.reward = data.reward;
      this.perUnit = data.perUnit;
      this.minQuantity = data.minQuantity;
      this.maxQuantity = data.maxQuantity;
      this.actionStatus = data.actionStatus;
      if (data.isPercentage) {
        this.isPercentage = data.isPercentage;
      }
    } else {
      this.id = data.id;
      this.actionType = data.actionType;
      this.url = data.url;
      this.minDuration = data.minDuration;
      this.description = data.description;
      this.reward = data.reward;
      this.perUnit = data.perUnit;
      this.minQuantity = data.minQuantity;
      this.maxQuantity = data.maxQuantity;
      this.actionStatus = data.actionStatus;
      if (data.isPercentage) {
        this.isPercentage = data.isPercentage;
      }
    }
  }

  reset() {
    this.id = '';
    this.actionType = '';
    this.url = '';
    this.minDuration = '';
    this.description = '';
    this.reward = '';
    this.perUnit = '';
    this.minQuantity = '';
    this.maxQuantity = '';
    this.actionStatus = '';
  }
}

export default Segment;
