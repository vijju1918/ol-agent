/**
 * Copyright (c) 2018-present, Evolvier Technologies. All rights reserved.
 *
 */

'use strict';

import {StyleSheet} from 'react-native';

import {AppSizes, AppColors} from '@theme';

export default StyleSheet.create({
  labelView: {
    backgroundColor: AppColors.brand.accentSecondary,
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  noteContentView: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: AppColors.border,
    borderRadius: AppSizes.borderRadius,
    justifyContent: 'center',
    padding: 10,
  },
  detailsTableListView: {
    backgroundColor: '#FFFFFF',
  },
});
