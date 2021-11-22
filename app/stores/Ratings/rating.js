/**
 * Copyright (c) 2018-present, Oleum. All rights reserved.
 *
 */

'use strict';

import {observable} from 'mobx';
import Meteor from '@meteorrn/core';

class Rating {
  @observable id;
  @observable type;
  @observable referenceId;
  @observable status;
  @observable statusHistory;
  @observable userRating = 1;
  @observable from;
  @observable to;

  constructor(data, isFromAPI = false) {
    this.set(data, isFromAPI);
  }

  set(data, isFromAPI = false) {
    if (data && isFromAPI) {
      this.id = data._id;
      this.type = data.type;
      this.referenceId = data.referenceId;
      this.status = data.status;
      this.statusHistory = data.statusHistory;
      this.from = data.from;
      this.to = data.to;
      this.userRating = data.rating;
    } else if (data) {
      this.id = data.id;
      this.type = data.type;
      this.referenceId = data.referenceId;
      this.status = data.status;
      this.statusHistory = data.statusHistory;
      this.from = data.from;
      this.to = data.to;
      this.userRating = data.userRating;
    }
  }

  reset() {
    this.id = '';
    this.type = '';
    this.referenceId = '';
    this.status = '';
    this.statusHistory = '';
  }

  sumbitSBUrating = () => {
    return new Promise((resolve, reject) => {
      Meteor.call(
        'rateSBU',
        {
          _id: this.id,
          rating: this.userRating,
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

  skipSBUrating = () => {
    return new Promise((resolve, reject) => {
      Meteor.call(
        'skipRating',
        {
          _id: this.id,
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
}

export default Rating;
