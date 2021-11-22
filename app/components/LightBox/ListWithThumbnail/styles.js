/**
 * Copyright (c) 2018-present, Evolvier Technologies. All rights reserved.
 *
 */

'use strict';

import {StyleSheet, Platform} from 'react-native';
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
  itemImage: {
    width: 50,
    height: 10,
  },
  itemContent: {
    alignItems: 'center',
  },
  titleText: {
    marginLeft: 15,
  },
  vendorLogo: {
    width: AppStyles.windowSize.width * 0.1,
    height: AppStyles.windowSize.width * 0.1,
    borderRadius: AppStyles.windowSize.width * 0.1,
  },
  letterView: {
    backgroundColor: AppColors.brand.secondary,
    width: AppStyles.windowSize.width * 0.1,
    height: AppStyles.windowSize.width * 0.1,
    borderRadius: AppStyles.windowSize.width * 0.1,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: AppColors.brand.secondary,
  },
  titleLetterText: {
    marginTop: Platform.OS === 'ios' ? 5 : 0,
  },
});
