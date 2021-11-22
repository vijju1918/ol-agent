/**
 * Copyright (c) 2018-present, Oleum. All rights reserved.
 *
 */

'use strict';

import {observable} from 'mobx';

class CorporateProfile {
  @observable id;
  @observable employeeId;
  @observable email;
  @observable designation;

  constructor(data, isFromAPI = false) {
    this.set(data, isFromAPI);
  }

  set(data, isFromAPI = false) {
    if (data && isFromAPI) {
      this.id = data._id;
      this.employeeId = data.employeeId;
      this.email = data.email;
      this.designation = data.designation;
    } else if (data) {
      this.id = data.id;
      this.employeeId = data.employeeId;
      this.email = data.email;
      this.designation = data.designation;
    }
  }

  reset() {
    this.id = '';
    this.employeeId = '';
    this.email = '';
    this.designation = '';
  }
}

export default CorporateProfile;
