/**
 * Copyright (c) 2018-present, Oleum. All rights reserved.
 *
 */

'use strict';

import {StyleSheet, Platform} from 'react-native';
import {AppColors, AppSizes, AppStyles} from '@theme';

export default StyleSheet.create({
  logoTopView: {
    paddingTop: 10,
    alignItems: 'center',
    height: AppStyles.windowSize.height * 0.6,
    justifyContent: 'flex-end',
    paddingBottom: 30,
  },
  selectContryView: {
    marginTop: 15,
  },
  selectCountryTouch: {
    flexDirection: 'row',
  },
  countryNameView: {
    flex: 5,
  },
  dropIconView: {
    flex: 1,
    alignItems: 'flex-end',
  },
  contryName: {
    marginBottom: 10,
  },
  input: {
    borderColor: '#00000050',
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
  numberInputView: {
    flexDirection: 'row',
  },
  loginInputView: {
    flex: 8,
  },
  contryCodeView: {
    flex: 2,
    justifyContent: 'center',
    marginRight: 10,
  },
  inputMainView: {
    marginLeft: AppSizes.padding + 10,
    marginRight: AppSizes.padding + 10,
    marginTop: 30,
  },
  appName: {
    fontSize: 30,
    color: '#FFFFFF',
  },
  tagLine: {
    color: AppColors.brand.secondary,
    marginLeft: AppSizes.padding + 10,
    marginRight: AppSizes.padding + 10,
    textAlign: 'center',
    fontSize: 18,
  },
  tagInfoLine: {
    color: AppColors.brand.secondary,
    marginTop: 10,
    marginLeft: AppSizes.padding + 10,
    marginRight: AppSizes.padding + 10,
    textAlign: 'center',
  },
  signInButtonView: {
    marginTop: 30,
    marginLeft: AppSizes.padding + 10,
    marginRight: AppSizes.padding + 10,
    marginBottom: 10,
  },
  footerView: {
    alignItems: 'center',
    marginHorizontal: AppSizes.padding + 10,
    marginBottom: 20,
  },
  tcView: {
    color: AppColors.brand.primary,
    textDecorationLine: 'underline',
    padding: 5,
  },
  loadingView: {
    zIndex: 1000,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  imageView: {
    borderWidth: 1,
    borderColor: '#FFFFFF',
    borderRadius: 100,
    marginBottom: 10,
  },
  mrCanLogo: {
    width: 110,
    height: 110,
    marginBottom: 10,
  },
  loginBgImage: {},
});
