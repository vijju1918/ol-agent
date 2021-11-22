/**
 * Copyright (c) 2018-present, Oleum. All rights reserved.
 *
 */

'use strict';

import {StyleSheet} from 'react-native';

import {AppSizes, AppColors} from '@theme';

export default StyleSheet.create({
  infoTextView: {
    backgroundColor: AppColors.brand.secondary,
    paddingHorizontal: AppSizes.padding,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  roleSelectionBox: {
    padding: AppSizes.padding,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  verticalGap: {
    marginTop: 10,
  },
  iconView: {
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  roleTextView: {
    flex: 1.5,
    justifyContent: 'center',
    padding: 10,
  },
  buttonIcon: {
    fontSize: 30,
    color: AppColors.brand.primary,
  },
  mainView: {
    flex: 1,
    marginHorizontal: AppSizes.padding,
    justifyContent: 'center',
  },
  infoText: {
    textAlign: 'center',
  },
  buttonImage: {
    width: 100,
    height: 100,
  },
  tagnameText: {
    marginTop: 10,
  },
});
