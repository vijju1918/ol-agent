/**
 * Copyright (c) 2018-present, Evolvier Technologies. All rights reserved.
 *
 */

'use strict';

import {StyleSheet} from 'react-native';
import {AppColors, AppSizes} from '@theme';

export default StyleSheet.create({
  locationAddMainView: {},
  locationAddView: {
    flexDirection: 'row',
    marginTop: 5,
  },
  locationAddDisplayView: {
    justifyContent: 'center',
    marginLeft: 20,
  },
  locationDisplayView: {
    justifyContent: 'center',
  },
  locationAddIconView: {
    justifyContent: 'center',
  },
  locationButtonView: {
    width: 40,
    height: 40,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: AppColors.brand.primary,
  },
  lcoationIcon: {
    fontSize: 25,
    color: AppColors.brand.secondary,
  },
  locationLableView: {
    marginBottom: 10,
    backgroundColor: AppColors.brand.accentSecondary,
    padding: AppSizes.padding,
  },
  saveButtonView: {
    alignItems: 'flex-end',
    marginTop: 10,
  },
  saveTouch: {
    backgroundColor: AppColors.brand.secondary,
    padding: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveText: {
    color: AppColors.brand.primary,
  },
  locationTitleView: {
    backgroundColor: AppColors.brand.secondary,
    paddingVertical: 10,
    paddingHorizontal: AppSizes.padding,
  },
  savedLocationListView: {
    paddingHorizontal: AppSizes.padding,
    paddingVertical: AppSizes.padding,
  },
  locationItemView: {
    backgroundColor: '#FFFFFF',
    borderColor: AppColors.border,
    marginBottom: 10,
  },
  flatlistView: {
    paddingHorizontal: AppSizes.padding,
    paddingBottom: 10,
  },
  locationSearchView: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  dividerLine: {
    marginVertical: 15,
  },
});
