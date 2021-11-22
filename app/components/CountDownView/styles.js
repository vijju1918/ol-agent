/**
 * Copyright (c) 2018-present, Evolvier Technologies. All rights reserved.
 *
 */

'use strict';

import {StyleSheet} from 'react-native';
import {AppColors, AppSizes} from '@theme';

export default StyleSheet.create({
  counterView: {
    flexDirection: 'row',
    backgroundColor: AppColors.brand.primary,
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: AppSizes.padding,
  },
  separatorStyle: {
    color: AppColors.brand.secondary,
  },
  counterInfoView: {
    flex: 1,
  },
});
