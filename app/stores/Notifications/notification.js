/**
 * Copyright (c) 2018-present, Oleum. All rights reserved.
 *
 */

'use strict';

import {observable} from 'mobx';

class Notification {
  @observable id;
  @observable displayPayload;
  @observable statusHistory;
  @observable receivers;
  @observable pushPayload;
  @observable receiverRoles;

  constructor(data, isFromAPI = false) {
    this.set(data, isFromAPI);
  }

  set(data, isFromAPI = false) {
    if (data && isFromAPI) {
      this.id = data._id;
      this.displayPayload = data.displayPayload;
      this.pushPayload = data.pushPayload;
      this.statusHistory = data.statusHistory;
      this.receivers = data.receivers;
      this.receiverRoles = data.receiverRoles;
    } else if (data) {
      this.id = data.id;
      this.displayPayload = data.displayPayload;
      this.pushPayload = data.pushPayload;
      this.statusHistory = data.statusHistory;
      this.receivers = data.receivers;
      this.receiverRoles = data.receiverRoles;
    }
  }

  reset() {
    this.id = '';
    this.displayPayload = '';
    this.pushPayload = '';
    this.statusHistory = '';
    this.receivers = '';
    this.receiverRoles = '';
  }
}

export default Notification;
