/**
 * Copyright (c) 2018-present, Oleum. All rights reserved.
 *
 */

'use strict';

import {StyleSheet} from 'react-native';
import {AppColors, AppSizes, AppStyles} from '@theme';

export default StyleSheet.create({
  mainView: {
    // marginHorizontal: AppSizes.padding
  },
  profileInfoView: {
    backgroundColor: AppColors.brand.secondary,
    paddingHorizontal: AppSizes.padding,
    paddingVertical: 10,
  },
  buttonView: {
    marginBottom: AppSizes.padding,
    marginTop: 20,
    marginHorizontal: AppSizes.padding,
  },
  profileImageMainView: {
    alignSelf: 'center',
    padding: 10,
    marginTop: 10,
  },
  profileImageView: {
    width: AppStyles.windowSize.width * 0.25,
    height: AppStyles.windowSize.width * 0.25,
    margin: 5,
    borderRadius: 100,
  },
  licenseImageView: {
    width: AppStyles.windowSize.width * 0.9,
    height: ((AppStyles.windowSize.width * 0.9) / 4) * 3,
    marginHorizontal: AppSizes.padding,
    // backgroundColor: "#00000010"
  },
  profileDetailsView: {
    // marginBottom: AppSizes.padding,
  },
  buttonIcon: {
    fontSize: 20,
    color: '#FFFFFF',
  },
  buttonDarkIcon: {
    fontSize: 20,
    color: AppColors.brand.secondary,
  },
  buttonDarkView: {
    width: 20,
    height: 20,
    backgroundColor: AppColors.brand.secondary,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
    marginBottom: 5,
  },
  buttonIconView: {
    position: 'absolute',
    right: 5,
    bottom: 5,
    width: 30,
    height: 30,
    backgroundColor: AppColors.brand.secondary,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: AppColors.background,
  },
  inputText: {
    color: AppColors.textPrimary,
  },
  profileNameView: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  detailsInputView: {
    backgroundColor: '#FFFFFF',
    // marginHorizontal: AppSizes.padding,
    // padding: 10,
    // borderWidth: 1,
    // borderRadius: 5,
    // borderColor: AppColors.border,
  },
  labelView: {
    marginTop: 10,
    marginBottom: 20,
    paddingHorizontal: AppSizes.padding,
    paddingVertical: 10,
    backgroundColor: AppColors.brand.accentSecondary,
  },
  locationView: {
    marginTop: 30,
  },
  licenseView: {
    // backgroundColor: "red",
    alignItems: 'center',
  },
  inputContainerStyle: {
    marginTop: -10,
    paddingBottom: 0,
  },
});
