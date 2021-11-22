/**
 * Copyright (c) 2018-present, Oleum. All rights reserved.
 *
 */

'use strict';

import {StyleSheet} from 'react-native';
import {AppColors, AppSizes, AppStyles} from '@theme';

export default StyleSheet.create({
  promoByView: {
    marginHorizontal: AppSizes.padding,
    marginVertical: 10,
  },
  labelTextView: {
    marginHorizontal: AppSizes.padding,
    marginVertical: AppSizes.padding,
  },
  buttonView: {
    marginHorizontal: AppSizes.padding,
    marginVertical: 10,
  },
  termsAndConditionsView: {
    marginHorizontal: AppSizes.padding,
    marginTop: 10,
    marginBottom: 10,
  },
  criteriaView: {
    marginHorizontal: AppSizes.padding,
  },
  criteriaItemView: {
    marginBottom: 10,
  },
  viewCollectionPointButtonView: {
    marginHorizontal: AppSizes.padding,
    marginTop: 10,
    marginVertical: 10,
    alignSelf: 'center',
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
    marginTop: 10,
    marginBottom: 10,
  },
  materialImageAndLabelview: {
    marginHorizontal: AppSizes.padding,
    flexDirection: 'row',
    marginTop: 15,
  },
  materialImage: {
    width: AppStyles.windowSize.width * 0.13,
    height: AppStyles.windowSize.width * 0.13,
  },
  materialLabelview: {
    marginLeft: 10,
    justifyContent: 'center',
  },
  rangeAndRewardsTextStyle: {
    marginVertical: 5,
  },
  scrollViewContentContainer: {
    paddingBottom: 30,
  },
  waitingView: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: AppSizes.padding,
    backgroundColor: '#FF5722',
  },
  donateView: {
    flex: 1,
    backgroundColor: AppColors.brand.accentDark,
    flexDirection: 'row',
    padding: AppSizes.padding,
  },
  donateIconView: {
    marginTop: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  donateTextView: {
    marginLeft: AppSizes.padding,
    flex: 1,
  },
  donateCheckBoxView: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
});
