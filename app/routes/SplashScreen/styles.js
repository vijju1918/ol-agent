/**
 * Copyright (c) 2018-present, Oleum. All rights reserved.
 *
 */

'use strict';

import {StyleSheet} from 'react-native';
import {AppStyles} from '@theme';

export default StyleSheet.create({
  containerSplashScreen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  appLogo: {
    height: AppStyles.windowSize.width * 0.1,
    width: AppStyles.windowSize.width * 0.5,
  },
  loading: {
    bottom: 100,
    position: 'absolute',
  },
  mrCanLogo: {
    width: 110,
    height: 110,
    marginBottom: 10,
  },
});
