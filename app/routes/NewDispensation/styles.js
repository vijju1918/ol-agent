/**
 * Copyright (c) 2018-present, Oleum. All rights reserved.
 *
 */

'use strict';

import {StyleSheet} from 'react-native';
import {AppColors, AppSizes, AppStyles} from '@theme';

export default StyleSheet.create({
  infoView: {
    backgroundColor: AppColors.brand.secondary,
    paddingHorizontal: AppSizes.padding,
    paddingVertical: 10,
  },
  buttonView: {
    marginBottom: AppSizes.padding,
    marginTop: 30,
    marginHorizontal: AppSizes.padding,
  },
  inputView: {
    marginTop: 10,
  },
  inputText: {
    color: AppColors.textPrimary,
  },
  detailsInputView: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: AppSizes.padding,
  },
  canView: {
    alignItems: 'flex-start',
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: AppColors.brand.accentSecondary,
  },
  canSelectionView: {
    marginHorizontal: AppSizes.padding,
    marginTop: 10,
  },
  cansView: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 10,
    flexWrap: 'wrap',
  },
  canItemView: {
    // flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: AppColors.border,
    // justifyContent: 'center',
    width: AppStyles.windowSize.width * 0.4444,
    marginRight: 5,
    marginBottom: 5,
  },
  canItemSelectedView: {
    // flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: AppColors.brand.primary,
    backgroundColor: AppColors.brand.accentSecondary,
    // justifyContent: 'center',
    width: AppStyles.windowSize.width * 0.4444,
    marginRight: 5,
    marginBottom: 5,
  },
  canItemsSeparatorView: {
    width: 10,
  },
  textSpacing: {
    marginTop: 5,
  },
  mrCanImage: {
    width: 40,
    height: 40,
  },
  mrCanView: {
    marginRight: 10,
  },
});
