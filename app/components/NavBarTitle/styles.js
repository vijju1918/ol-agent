/**
 * Copyright (c) 2018-present, Evolvier Technologies. All rights reserved.
 *
 */

'use strict';

import {StyleSheet, Platform} from 'react-native';
import {AppColors} from '@theme';

export default StyleSheet.create({
  mainView: {
    flexDirection: 'row',
  },
  subtitle: {
    alignSelf: Platform.OS === 'ios' ? 'center' : 'flex-start',
  },
  titleMargin: {
    marginLeft: Platform.OS === 'ios' ? 0 : 0,
  },
  navBarTitleText: {
    color: AppColors.brand.secondary,
  },
});
