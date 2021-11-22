/**
 * Copyright (c) 2018-present, Evolvier Technologies. All rights reserved.
 *
 */

'use strict';

import {StyleSheet} from 'react-native';

import {AppColors, AppStyles} from '@theme';

export default StyleSheet.create({
  cameraStyleView: {
    height: AppStyles.windowSize.height,
    width: AppStyles.windowSize.width,
  },
  markerStyleView: {
    borderWidth: 5,
    borderColor: AppColors.brand.secondary,
    borderRadius: 20,
  },
  lightBoxBg: {
    position: 'absolute',
    right: 0,
    left: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: AppColors.brand.primary,
  },
  header: {
    position: 'absolute',
    right: 0,
    left: 0,
    top: 0,
    zIndex: 1,
    backgroundColor: AppColors.brand.secondary,
  },
  footerTouch: {
    position: 'absolute',
    bottom: 40,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: AppColors.brand.secondary,
    backgroundColor: AppColors.brand.secondary,
    zIndex: 1,
  },
  backText: {
    color: 'black',
    marginHorizontal: 20,
    marginVertical: 10,
  },
  loadingView: {
    position: 'absolute',
    right: 0,
    left: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
