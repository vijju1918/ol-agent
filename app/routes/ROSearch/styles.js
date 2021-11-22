/**
 * Copyright (c) 2018-present, Evolvier Technologies. All rights reserved.
 *
 */

'use strict';

import {StyleSheet, Platform} from 'react-native';
import {AppStyles, AppSizes, AppColors} from '@theme';
import DeviceInfo from 'react-native-device-info';

export default StyleSheet.create({
  mainView: {
    backgroundColor: '#000000',
  },
  contentView: {
    position: 'absolute',
    bottom: 0,
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    width: AppStyles.windowSize.width,
  },
  roItemView: {
    marginVertical: 10,
    marginHorizontal: AppSizes.padding,
  },
  searchbarView: {
    flexDirection: 'row',
    backgroundColor: AppColors.brand.primary,
    alignItems: 'center',
    justifyContent: 'center',
    height:
      Platform.OS === 'ios'
        ? DeviceInfo.getModel() === 'iPhone X'
          ? 90
          : 60
        : 58,
    paddingTop: DeviceInfo.getModel() === 'iPhone X' ? 30 : 0,
    borderBottomWidth: 1,
    borderColor: AppColors.inputUnderline,
    ...Platform.select({
      ios: {},
      android: {},
    }),
  },
  searchView: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    marginRight: 10,
    marginLeft: 10,
    alignSelf: 'center',
    ...Platform.select({
      ios: {
        height: 35,
      },
      android: {
        height: 45,
      },
    }),
  },
  input: {
    backgroundColor: 'transparent',
    marginLeft: 10,
    marginRight: 10,
    color: '#000000',
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        height: 35,
      },
      android: {
        height: 45,
      },
    }),
  },
  backButtonTouch: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF50',
  },
});
