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
  detailsTableView: {
    backgroundColor: '#FFFFFF',
  },
  titleView: {
    backgroundColor: AppColors.brand.accentSecondary,
    paddingHorizontal: AppSizes.padding,
    paddingVertical: 10,
  },
});
