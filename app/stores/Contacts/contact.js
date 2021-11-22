/**
 * Copyright (c) 2018-present, Oleum. All rights reserved.
 *
 */

'use strict';

import {observable, action} from 'mobx';

class Contact {
  @observable key;
  @observable user;
  @observable name;
  @observable phoneNumber;
  @observable picture;
  @observable localPicture;

  constructor(contact) {
    this.name = contact.name;
    this.user = contact.user;
    this.phoneNumber = contact.formattedPhoneNumber;
    this.picture = contact.picture;
    this.localPicture = contact.localPicture;
  }
  @action
  set(contact) {
    this.name = contact.name;
    this.phoneNumber = contact.phoneNumber;
    this.user = contact.user;
    this.picture = contact.picture;
    this.localPicture = contact.localPicture;
  }
  @action
  reset() {
    this.user = '';
    this.name = '';
    this.phoneNumber = '';
    this.picture = '';
    this.localPicture = '';
  }
}

export default Contact;
