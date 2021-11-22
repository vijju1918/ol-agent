/**
 * Copyright (c) 2018-present, Oleum. All rights reserved.
 *
 */

'use strict';

import { create } from 'mobx-persist';
import Meteor, { Accounts } from '@meteorrn/core';
import AsyncStorage from '@react-native-async-storage/async-storage';

import settings from '@config/settings';
import Account from '@stores/Account';
import Cans from '@stores/Cans';
import Locations from '@stores/Locations';
import Corporates from '@stores/Corporates';
import Vehicles from '@stores/Vehicles';

const hydrate = create({
  storage: AsyncStorage,
  jsonify: true,
});

const loadLocalData = () => {
  return Promise.all([
    hydrate('account', Account),
    hydrate('vehicles', Vehicles),
    hydrate('corporates', Corporates),
    hydrate('cans', Cans),
    hydrate('locations', Locations),
  ]);
};

export const connect = () => {
  return new Promise((resolve, reject) => {
    let meteorURL;
    meteorURL =
      (settings.secureProtocol ? 'wss' : 'ws') +
      '://' +
      settings.serverAddress +
      (settings.serverPort ? ':' + settings.serverPort : '') +
      '/websocket';
    console.log('Connecting to Meteor port at ' + meteorURL);
    Meteor.connect(meteorURL);
    setTimeout(() => {
      console.warn(Meteor.status().connected)
    }, 1000)
    Meteor.ddp.on('connected', () => {
      Account.connectionReady = true;
    });

    Accounts.onLogin(() => {
      Account.initUserStore();
    });

    loadLocalData().then(() => {
      if (Account.user && Account.user.id) {
        resolve(true);
      } else {
        Account.getConnected()
          .then(() => {
            Account.isUserReady()
              .then(() => {
                resolve(true);
              })
              .catch(e => reject(e));
          })
          .catch(e => reject(e));
      }
    });
  });
};
