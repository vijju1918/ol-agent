/**
 * Copyright (c) 2018-present, Evolvier Technologies. All rights reserved.
 *
 */

'use strict';

import {StyleSheet} from 'react-native';
import {AppColors, AppSizes} from '@theme';

export default StyleSheet.create({
  locationAddMainView: {
    backgroundColor: AppColors.brand.secondary,
    paddingHorizontal: AppSizes.padding,
    paddingVertical: 10,
    paddingBottom: 10,
  },
  locationLableView: {
    marginTop: 10,
  },
  savedLocationListView: {},
  locationItemView: {
    backgroundColor: '#FFFFFF',
  },
  flatlistView: {
    marginTop: 20,
    paddingHorizontal: AppSizes.padding,
  },
  locationSearchView: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: AppColors.primary,
  },
  line: {
    marginVertical: 15,
  },
  labelView: {
    backgroundColor: AppColors.brand.accentSecondary,
    paddingVertical: 10,
    paddingHorizontal: AppSizes.padding,
  },
  buttonIcon: {
    fontSize: 28,
  },
  iconView: {
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    paddingHorizontal: 5,
  },
});
