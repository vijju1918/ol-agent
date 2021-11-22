/**
 * Copyright (c) 2018-present, Oleum. All rights reserved.
 *
 */

'use strict';

import {StyleSheet} from 'react-native';
import {AppColors} from '@theme';

export default StyleSheet.create({
  imageView: {
    marginBottom: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 250,
    height: 250,
  },
  text: {
    backgroundColor: 'transparent',
    textAlign: 'center',
    paddingHorizontal: 16,
  },
  title: {
    color: AppColors.brand.primary,
    backgroundColor: 'transparent',
    textAlign: 'center',
    marginBottom: 16,
  },
  dataView: {
    backgroundColor: '#FFFFFF',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  defaultDotStyle: {
    backgroundColor: '#00000020',
  },
  activeDotStyle: {
    backgroundColor: AppColors.brand.primary,
  },
  ionicIconBgColor: {
    backgroundColor: 'transparent',
  },
  buttonView: {
    marginTop: 12,
  },
  buttonText: {
    color: AppColors.brand.primary,
  },
});
