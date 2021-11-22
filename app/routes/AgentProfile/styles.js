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
  buttonView: {
    marginBottom: AppSizes.padding,
  },
  profileImageMainView: {
    alignSelf: 'center',
    padding: 10,
    marginVertical: 10,
    marginBottom: 10,
  },
  profileImageView: {
    width: AppStyles.windowSize.width * 0.25,
    height: AppStyles.windowSize.width * 0.25,
    margin: 5,
  },
  profileDetailsView: {
    marginBottom: AppSizes.padding,
    alignItems: 'center',
  },
  buttonIcon: {
    fontSize: 20,
    color: '#FFFFFF',
  },
  buttonIconView: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: 30,
    height: 30,
    backgroundColor: AppColors.brand.primary,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: AppColors.background,
  },
  inputText: {
    color: AppColors.textPrimary,
  },
  labelText: {
    marginTop: 20,
  },
  roDetailsView: {
    marginVertical: 10,
  },
  contentFieldView: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: AppColors.border,
    paddingHorizontal: 20,
  },
  profileView: {
    backgroundColor: '#FFFFFF',
  },
  titleView: {
    backgroundColor: AppColors.brand.accentSecondary,
    paddingVertical: 10,
    paddingHorizontal: AppSizes.padding,
  },
  labeText: {
    color: AppColors.brand.primary,
  },
  sbuDetailsView: {
    padding: AppSizes.padding,
    backgroundColor: '#FFFFFF',
  },
  detailsInputView: {
    backgroundColor: '#FFFFFF',
    borderColor: AppColors.border,
  },
  sbuNameText: {
    marginBottom: 10,
  },
});
