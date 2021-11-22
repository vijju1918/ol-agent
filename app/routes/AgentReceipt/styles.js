/**
 * Copyright (c) 2018-present, Evolvier Technologies. All rights reserved.
 *
 */

'use strict';

import {StyleSheet} from 'react-native';
import {AppSizes, AppColors} from '@theme';

export default StyleSheet.create({
  orderStatusView: {
    borderColor: AppColors.border,
    borderRadius: 5,
  },
  labelView: {
    backgroundColor: AppColors.lightGray,
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  detailsTableView: {
    marginTop: 5,
    marginBottom: 10,
  },
  buttonView: {
    marginHorizontal: AppSizes.padding,
    marginBottom: 10,
  },
});
