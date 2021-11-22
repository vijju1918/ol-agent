/**
 * Copyright (c) 2018-present, Oleum. All rights reserved.
 *
 */

'use strict';

import {StyleSheet} from 'react-native';
import {AppColors} from '@theme';

export default StyleSheet.create({
  lightBoxBg: {
    position: 'absolute',
    right: 0,
    left: 0,
    top: 0,
    bottom: 0,
    backgroundColor: '#00000090',
  },
  titleView: {
    position: 'absolute',
    top: 10,
    right: 0,
    left: 0,
    zIndex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    marginTop: 30,
  },
  sliderView: {
    flex: 1,
  },
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
