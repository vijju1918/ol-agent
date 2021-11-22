/**
 * Copyright (c) 2018-present, Evolvier Technologies. All rights reserved.
 *
 */

'use strict';

import {StyleSheet} from 'react-native';
import {AppStyles, AppSizes, AppColors} from '@theme';

export default StyleSheet.create({
  contentView: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#FFFFFF',
    paddingTop: 10,
    paddingBottom: 10,
    width: AppStyles.windowSize.width,
  },
  listItemView: {
    marginLeft: AppSizes.padding,
    marginRight: AppSizes.padding,
    padding: 10,
    marginBottom: 5,
    justifyContent: 'center',
  },
  noItemsText: {
    textAlign: 'center',
    paddingVertical: 10,
    color: AppColors.textSecondary,
  },
});
