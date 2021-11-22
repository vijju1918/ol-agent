/**
 * Copyright (c) 2018-present, Evolvier Technologies. All rights reserved.
 *
 */

'use strict';

import {StyleSheet} from 'react-native';
import {AppColors, AppSizes, AppStyles} from '@theme';

export default StyleSheet.create({
  promoView: {
    height: (AppStyles.windowSize.width / 16) * 9,
    width: AppStyles.windowSize.width,
    alignSelf: 'center',
  },
  promotionTitleTextView: {
    marginTop: AppSizes.padding,
    marginHorizontal: AppSizes.padding,
  },
  descriptionView: {
    marginHorizontal: AppSizes.padding,
    marginTop: 5,
    marginBottom: 15,
  },
  promoDescriptionTextStyle: {
    color: AppColors.textSecondary,
  },
  validityAndTCView: {
    marginVertical: AppSizes.padding,
    flex: 2.5,
    marginLeft: 20,
    marginTop: 30,
  },
  termsTextStyle: {
    marginBottom: 7,
    color: AppColors.brand.secondary,
  },
  promotionImage: {
    height: (AppStyles.windowSize.width / 16) * 9,
    width: AppStyles.windowSize.width,
    alignSelf: 'center',
  },
  validityAndIconView: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  vendorLogo: {
    width: AppStyles.windowSize.width * 0.18,
    height: AppStyles.windowSize.width * 0.18,
    marginVertical: 10,
  },
  promoAndLogoView: {
    marginTop: 5,
    flex: 1,
  },
  logoView: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: 5,
  },
  validityView: {
    padding: 15,
    justifyContent: 'center',
    backgroundColor: AppColors.brand.accentSecondary,
  },
  referenceIdText: {
    color: AppColors.textSecondary,
    marginVertical: 3,
  },
  buttonIcon: {
    fontSize: 100,
    color: '#FFFFFF50',
  },
  noImageView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    marginBottom: 5,
  },
  counterView: {
    flexDirection: 'row',
    backgroundColor: AppColors.brand.primary,
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: AppSizes.padding,
  },
  separatorStyle: {
    color: AppColors.brand.secondary,
  },
  counterInfoView: {
    flex: 1,
  },
});
