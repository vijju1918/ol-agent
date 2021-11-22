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
    backgroundColor: AppColors.brand.accent,
  },
  infoMessageText: {
    margin: AppSizes.padding,
  },
  detailsTableView: {},
  referrenceIdText: {
    marginBottom: 10,
    textAlign: 'center',
  },
  viewROButtonView: {
    alignItems: 'center',
    marginBottom: 20,
    marginHorizontal: AppSizes.padding,
  },
  buttonTouch: {
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: AppColors.brand.secondary,
    borderWidth: 1,
    paddingHorizontal: 50,
    backgroundColor: AppColors.brand.secondary,
  },
  buttonText: {
    marginVertical: 10,
  },
  labeText: {
    marginTop: AppSizes.padding,
    marginLeft: AppSizes.padding,
    marginBottom: AppSizes.padding,
  },
  titleView: {
    backgroundColor: AppColors.brand.accentSecondary,
  },
  criteriaItemView: {
    marginBottom: 10,
    marginHorizontal: AppSizes.padding,
  },
  criteriaFlatList: {
    marginTop: 10,
  },
  detailsTableListView: {
    backgroundColor: '#FFFFFF',
  },
  helperText: {
    margin: AppSizes.padding,
  },
  infoView: {
    backgroundColor: AppColors.brand.secondary,
    paddingHorizontal: AppSizes.padding,
    paddingVertical: 10,
    marginBottom: 20,
  },
});
