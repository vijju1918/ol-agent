/**
 * Copyright (c) 2018-present, Evolvier Technologies. All rights reserved.
 *
 */

'use strict';

import {StyleSheet, Platform} from 'react-native';
import {AppStyles, AppSizes, AppColors} from '@theme';

export default StyleSheet.create({
  contentView: {
    position: 'absolute',
    backgroundColor: '#FFFFFF',
    width: AppStyles.windowSize.width - 30,
    borderRadius: 10,
  },
  centerAligned: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  dataView: {
    paddingTop: 5,
    paddingBottom: 25,
    paddingLeft: AppSizes.padding,
    paddingRight: AppSizes.padding,
  },
  imageView: {
    alignItems: 'center',
    marginBottom: 10,
  },
  logo: {
    height: AppStyles.windowSize.width * 0.3,
    width: AppStyles.windowSize.width * 0.3,
  },
  buttonTouch: {
    paddingHorizontal: AppSizes.padding,
    height: 45,
    backgroundColor: AppColors.brand.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginHorizontal: AppSizes.padding,
  },
  buttonTouchDisabled: {
    paddingHorizontal: AppSizes.padding,
    height: 45,
    backgroundColor: AppColors.border,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginHorizontal: AppSizes.padding,
  },
  footerTouch: {
    flexDirection: 'row',
    marginBottom: 30,
  },
  inputBoxView: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    borderRadius: 0,
    borderColor: AppColors.brand.secondary,
    borderWidth: 1,
    marginTop: 10,
  },
  inputView: {
    alignSelf: 'stretch',
    flex: 1,
    paddingVertical: Platform.OS === 'ios' ? 10 : 0,
  },
  input: {
    paddingTop: Platform.OS === 'ios' ? 5 : 10,
  },
});
