/**
 * Copyright (c) 2018-present, Evolvier Technologies. All rights reserved.
 *
 */

'use strict';

import {StyleSheet} from 'react-native';
import {AppColors, AppSizes} from '@theme';

export default StyleSheet.create({
  lightBoxBg: {
    flex: 1,
    justifyContent: 'center',
  },
  contentView: {
    backgroundColor: AppColors.brand.secondary,
    padding: AppSizes.padding,
    alignItems: 'center',
    marginHorizontal: 15,
  },
  noConnectionImage: {
    width: 200,
    height: 200,
  },
  noConnectionText: {
    color: '#00000090',
    marginTop: 5,
  },
  tryAgainTouch: {
    borderWidth: 1,
    borderColor: '#FFFFFF30',
    padding: 10,
    marginVertical: 15,
    paddingHorizontal: 60,
    backgroundColor: AppColors.brand.primary,
  },
  tryText: {
    color: AppColors.brand.secondary,
  },
});
