/**
 * Copyright (c) 2018-present, Oleum. All rights reserved.
 *
 */

'use strict';

import {StyleSheet} from 'react-native';
import {AppColors, AppSizes, AppStyles} from '@theme';

export default StyleSheet.create({
  loginBgImage: {
    opacity: 0.95,
  },
  logoTopView: {
    alignItems: 'center',
    height: AppStyles.windowSize.height * 0.6,
    justifyContent: 'flex-end',
    paddingBottom: 30,
  },
  tagLine: {
    color: AppColors.brand.secondary,
    marginTop: 10,
    marginLeft: AppSizes.padding + 10,
    marginRight: AppSizes.padding + 10,
    textAlign: 'center',
    fontSize: 18,
  },
  tagInfoLine: {
    color: AppColors.brand.secondary,
    marginTop: 10,
    marginLeft: AppSizes.padding + 30,
    marginRight: AppSizes.padding + 30,
    textAlign: 'center',
  },
  otpInputView: {
    alignItems: 'center',
    paddingBottom: 10,
  },
  actionText: {
    // marginTop: 20,
    // marginBottom: 20,
    marginRight: 5,
  },
  actionButtonView: {
    alignItems: 'center',
    // backgroundColor: "yellow",
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  actionTouch: {
    // marginTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  changeNumberTouch: {
    marginTop: 10,
    // paddingTop:10,
    // backgroundColor: "red"
  },
  actionBoldText: {
    color: AppColors.brand.primary,
  },
  signInButtonView: {
    marginTop: 10,
    marginLeft: AppSizes.padding,
    marginRight: AppSizes.padding,
    marginBottom: 10,
  },
  counter: {
    marginLeft: 10,
    color: AppColors.drawerIcons,
  },
  buttonIcon: {
    fontSize: 40,
    color: '#FFFFFF',
  },
  codeInputStyle: {
    borderWidth: 1.5,
    color: AppColors.brand.primary,
    fontSize: 18,
  },
  containerStyle: {
    marginTop: 30,
  },
  imageView: {
    borderWidth: 1,
    borderColor: '#FFFFFF',
    borderRadius: 100,
    marginBottom: 10,
  },
  autoFetchingOTPView: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: AppColors.brand.secondary,
    alignItems: 'flex-start',
    flexDirection: 'row',
    padding: AppSizes.padding,
  },
  otpFetchingText: {
    marginLeft: 10,
  },
  mrCanLogo: {
    width: 110,
    height: 110,
    marginBottom: 10,
  },
});
