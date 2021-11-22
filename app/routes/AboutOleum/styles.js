/**
 * Copyright (c) 2018-present, Oleum. All rights reserved.
 *
 */

'use strict';

import {StyleSheet} from 'react-native';
import {AppStyles, AppColors, AppSizes} from '@theme';

export default StyleSheet.create({
  aboutMainView: {
    flex: 1,
  },
  appLogo: {
    height: 100,
    width: AppStyles.windowSize.width * 0.5,
    borderColor: AppColors.brand.primary,
  },
  footerView: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    alignItems: 'center',
    marginHorizontal: AppSizes.padding,
  },
  aboutItemView: {
    marginHorizontal: AppSizes.padding,
    marginVertical: 20,
    marginTop: 30,
  },
  line: {
    marginVertical: 10,
  },
  imageView: {
    marginHorizontal: AppSizes.padding,
    alignItems: 'center',
  },
  iconImage: {
    height: 45,
    width: 45,
  },
  socialView: {
    marginHorizontal: 15,
    marginTop: 30,
  },
  iconView: {
    marginTop: 20,
  },
});
