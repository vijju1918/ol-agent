/**
 * Copyright (c) 2018-present, Evolvier Technologies. All rights reserved.
 *
 */

'use strict';

import {StyleSheet} from 'react-native';
import {AppSizes} from '@theme';

export default StyleSheet.create({
  qrScanView: {
    paddingHorizontal: AppSizes.padding,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  referrenceIdText: {
    textAlign: 'center',
    fontSize: 25,
    marginTop: 5,
  },
  idView: {
    marginTop: 10,
    alignItems: 'center',
  },
  qrCodeText: {
    marginBottom: 15,
  },
  helperText: {
    marginTop: 10,
    textAlign: 'center',
    marginHorizontal: 20,
  },
});
