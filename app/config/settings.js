/**
 * Copyright (c) 2018-present, Oleum. All rights reserved.
 *
 */

'use strict';

import Config from 'react-native-config';

const settings = {
  env: process.env.NODE_ENV,
  serverAddress: Config.SERVER_ADDRESS,
  serverPort: Config.SERVER_PORT,
  secureProtocol: Config.SECURE_PROTOCOL === 'true',
  oneSignalAppId: Config.ONESIGNAL_APP_ID,
  razorpay: {
    keyId: Config.RAZORPAY_KEY_ID,
  },
  google: {
    apiKey: Config.GOOGLE_API_KEY,
  },
  minimumFuelPointsForTransfer: 100
};

export default settings;
