/**
 * Copyright (c) 2018-present, Oleum. All rights reserved.
 *
 */

'use strict';

import {StyleSheet, Platform} from 'react-native';
import {AppColors, AppSizes} from '@theme';

export default StyleSheet.create({
  infoView: {
    backgroundColor: AppColors.brand.secondary,
    paddingHorizontal: AppSizes.padding,
    paddingVertical: 10,
  },
  inputView: {
    borderWidth: 1,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  inputWrapperView: {
    marginTop: 10,
  },
  itemTypeTextView: {
    justifyContent: 'center',
  },
  buttonView: {
    flex: 1.9,
    paddingHorizontal: 5,
    alignItems: 'flex-end',
    marginVertical: 10,
  },
  inputContainerStyle: {
    marginTop: -35,
    paddingBottom: 0,
    marginHorizontal: 5,
  },
  loadingView: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    paddingHorizontal: AppSizes.padding,
  },
  updateTouch: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: AppColors.brand.secondary,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  updateTouchDisabled: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: AppColors.gray,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  updateLoadingTouch: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: AppColors.brand.secondary,
    padding: Platform.OS === 'ios' ? 8.5 : 8.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  updateText: {
    marginTop: Platform.OS === 'ios' ? 3 : 0,
  },
  disabledText: {
    marginTop: Platform.OS === 'ios' ? 3 : 0,
    color: '#00000050',
  },
  warningView: {
    backgroundColor: AppColors.brand.accentSecondary,
    paddingHorizontal: AppSizes.padding,
    paddingVertical: 5,
  },
});
