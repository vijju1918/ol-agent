/**
 * Copyright (c) 2018-present, Oleum. All rights reserved.
 *
 */

'use strict';
import {StyleSheet} from 'react-native';
import {AppColors, AppSizes, AppStyles} from '@theme';

export default StyleSheet.create({
  buttonView: {
    marginHorizontal: AppSizes.padding,
    marginVertical: 10,
  },
  labelTextView: {
    marginHorizontal: AppSizes.padding,
    marginVertical: 15,
  },
  agreeCheckBoxview: {
    flexDirection: 'row',
    marginTop: 20,
  },
  agreementTextStyle: {
    marginLeft: 5,
  },
  termsAndConditionsView: {
    marginHorizontal: AppSizes.padding,
    // marginTop: 10,
    marginBottom: 10,
  },
  promoByView: {
    marginHorizontal: AppSizes.padding,
    marginVertical: 10,
  },
  promoHeaderView: {
    // marginHorizontal: AppSizes.padding,
  },
  criteriaView: {
    marginHorizontal: AppSizes.padding,
  },
  criteriaItemView: {
    marginBottom: 10,
  },
  uploadButtonView: {
    marginHorizontal: AppSizes.padding,
    marginTop: 10,
    marginVertical: 20,
    alignSelf: 'flex-start',
  },
  buttonTouch: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: AppSizes.borderRadius,
    borderColor: AppColors.border,
    borderWidth: 1,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: AppColors.brand.primary,
    marginTop: 10,
    marginBottom: 10,
  },
  scrollViewContentContainer: {
    paddingBottom: 30,
  },
  proofImage: {
    height: AppStyles.windowSize.width * 0.53,
    width: ((AppStyles.windowSize.width * 0.53) / 9) * 16,
    borderRadius: 5,
  },
  ImageView: {
    // marginTop: 10,
    marginBottom: 4,
    marginHorizontal: 10,
    alignSelf: 'center',
    zIndex: 1,
  },
  ImageViewInfoText: {
    marginBottom: 10,
  },
  waitingView: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: AppSizes.padding,
    backgroundColor: '#FF5722',
  },
});
