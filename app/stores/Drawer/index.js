/**
 * Copyright (c) 2018-present, Oleum. All rights reserved.
 *
 */
'use strict';

import {computed} from 'mobx';

import Account from '@stores/Account';
import {AppConstants} from '@config';
import {userDrawer, agentDrawer} from './routes';

class Drawer {
  @computed
  get content() {
    if (Account.user.currentRole === AppConstants.agent) {
      return agentDrawer;
    } else {
      return userDrawer;
    }
  }
}

export default new Drawer();
