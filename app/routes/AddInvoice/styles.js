/**
 * Copyright (c) 2018-present, Oleum. All rights reserved.
 *
 */

'use strict';

import {StyleSheet} from 'react-native';
import {AppColors, AppSizes} from '@theme';

export default StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#FFFFFF50',
  },
  infoView: {
    backgroundColor: AppColors.brand.secondary,
    paddingHorizontal: AppSizes.padding,
    paddingVertical: 10,
  },
  buttonView: {
    marginBottom: 10,
    marginTop: 10,
    marginHorizontal: AppSizes.padding,
  },
  inputView: {
    marginTop: 10,
  },
  inputSpacing: {
    width: 20,
  },
  inputText: {
    color: AppColors.textPrimary,
  },
  detailsInputView: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: AppSizes.padding,
    marginTop: 5,
  },
});
