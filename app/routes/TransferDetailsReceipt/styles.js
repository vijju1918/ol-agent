/**
 * Copyright (c) 2018-present, Oleum. All rights reserved.
 *
 */

'use strict';

import {StyleSheet} from 'react-native';
import {AppSizes, AppColors} from '@theme';

export default StyleSheet.create({
  buttonView: {
    marginHorizontal: AppSizes.padding,
    marginBottom: AppSizes.padding,
  },
  infoMessageView: {
    backgroundColor: AppColors.brand.secondary,
  },
  infoMessageViewPending: {
    backgroundColor: AppColors.brand.secondary,
  },
  infoMessageText: {
    margin: AppSizes.padding,
  },
  detailsTableView: {
    backgroundColor: '#FFFFFF',
  },
  referrenceIdText: {
    marginBottom: 10,
    textAlign: 'center',
  },
});
