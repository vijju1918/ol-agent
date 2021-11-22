/**
 * Copyright (c) 2018-present, Evolvier Technologies. All rights reserved.
 *
 */

'use strict';

import {StyleSheet, Platform} from 'react-native';
import {AppColors} from '@theme';

export default StyleSheet.create({
  loadingMainView: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingContainerView: {
    width: 50,
    height: 50,
    backgroundColor: AppColors.brand.secondary,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: Platform.OS === 'ios' ? 4 : 0,
    paddingTop: Platform.OS === 'ios' ? 2 : 0,
  },
});
