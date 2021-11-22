/**
 * Copyright (c) 2018-present, Oleum. All rights reserved.
 *
 */

'use strict';

import {StyleSheet} from 'react-native';

import {AppSizes, AppColors} from '@theme';

export default StyleSheet.create({
  sectionHeaderView: {
    backgroundColor: AppColors.brand.accentSecondary,
    paddingHorizontal: AppSizes.padding,
    paddingVertical: 10,
  },
  rowItemView: {
    flex: 3,
    flexDirection: 'row',
    padding: AppSizes.padding,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  buttonIcon: {
    fontSize: 32,
  },
  buttonSmallIcon: {
    fontSize: 16,
  },
  buttonStatusIconView: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: AppColors.brand.secondary,
    borderRadius: 100,
    padding: 5,
  },
  iconViewSend: {
    padding: AppSizes.padding,
    borderRadius: 38,
    borderColor: AppColors.brand.primary,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  transactionDetailsTextView: {
    flex: 2.5,
    flexDirection: 'column',
    marginHorizontal: 10,
  },
  contentTextStyleview: {
    // marginBottom: 5,
  },
  fuelPointsView: {
    flex: 1.5,
    flexDirection: 'column',
    marginHorizontal: 10,
    alignItems: 'flex-end',
  },
  iconViewReceive: {
    padding: AppSizes.padding,
    borderRadius: 38,
    borderColor: AppColors.brand.accent,
    borderWidth: 1,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  canDetailsView: {
    backgroundColor: AppColors.brand.secondary,
    margin: 10,
  },
  listHeaderView: {
    backgroundColor: AppColors.brand.secondary,
  },
  contentView: {
    alignItems: 'center',
    marginTop: 10,
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  detailsICon: {
    color: '#000000',
  },
  fuelPointTextView: {
    fontSize: 16,
  },
  loadingView: {
    paddingVertical: 50,
  },
});
