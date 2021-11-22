/**
 * Copyright (c) 2018-present, Evolvier Technologies. All rights reserved.
 *
 */

'use strict';

import {StyleSheet} from 'react-native';

import {AppSizes, AppColors} from '@theme';

export default StyleSheet.create({
  ratingView: {
    padding: AppSizes.padding,
    justifyContent: 'center',
  },
  starAlignmentAndSizeView: {
    marginHorizontal: 50,
    marginVertical: 20,
  },
  submitButtonView: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: AppColors.border,
    borderRadius: 5,
    marginLeft: 100,
    marginRight: 100,
  },
  submitTextView: {
    marginVertical: AppSizes.padding,
    color: AppColors.brand.secondary,
  },
  detailsTableView: {
    marginVertical: AppSizes.padding,
  },
  labeText: {
    marginTop: AppSizes.padding,
    marginLeft: AppSizes.padding,
    marginBottom: AppSizes.padding,
  },
  titleView: {
    backgroundColor: AppColors.brand.accentSecondary,
  },
});
