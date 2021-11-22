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
  infoView: {
    backgroundColor: AppColors.brand.secondary,
    paddingHorizontal: AppSizes.padding,
    paddingVertical: 10,
  },
  buttonTouch: {
    marginTop: 5,
    alignItems: 'center',
    backgroundColor: AppColors.brand.secondary,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  saveButtonView: {
    marginBottom: 10,
    marginTop: 10,
    marginHorizontal: AppSizes.padding,
  },
  inputMainView: {
    marginHorizontal: AppSizes.padding,
  },
  inputView: {
    marginTop: 10,
  },
  inputText: {
    color: AppColors.textPrimary,
  },
  moreInputView: {
    marginTop: -10,
  },
  detailsInputView: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: AppSizes.padding,
  },
  addImageView: {
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addImageTouch: {
    backgroundColor: '#00000020',
    alignSelf: 'center',
  },
  imageAndIconView: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  addVehiclePlaceholderImage: {
    width: AppStyles.windowSize.width * 0.7,
    height: ((AppStyles.windowSize.width * 0.7) / 4) * 3,
  },
  addVehicleImage: {
    height: 100,
    width: 100,
  },
  addPhotoText: {
    marginTop: 10,
  },
  addIconView: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    height: 25,
    width: 25,
    borderRadius: 25,
    backgroundColor: AppColors.brand.secondary,
  },
  addIcon: {
    color: AppColors.whiteIcon,
    fontSize: 16,
    padding: 4,
  },
  warningMessageView: {
    backgroundColor: AppColors.brand.accentSecondary,
    padding: 10,
  },
  changeNumberText: {
    color: AppColors.brand.primary,
  },
  changeNumberTouch: {
    backgroundColor: AppColors.brand.secondary,
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
});
