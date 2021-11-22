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
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: AppColors.brand.secondary,
    paddingLeft: AppSizes.padding,
    paddingRight: AppSizes.padding,
    paddingVertical: 5,
  },
  notificationIconView: {
    justifyContent: 'center',
    padding: 5,
  },
  notificationIcon: {
    fontSize: 16,
  },
  infoTextView: {
    flex: 1,
    marginLeft: 5,
  },
  rewardListContentContainer: {
    paddingTop: 15,
  },
  promoView: {
    width: ((AppStyles.windowSize.width * 0.51) / 9) * 16,
    alignSelf: 'center',
  },
  bannerImage: {
    flex: 1,
    height: AppStyles.windowSize.width * 0.51,
    width: ((AppStyles.windowSize.width * 0.51) / 9) * 16,
    overflow: 'hidden',
    alignSelf: 'center',
  },
  rewardDetailsView: {
    marginTop: 10,
  },
  rewardPointsView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rewardPointLabelView: {
    flex: 1,
    marginRight: 10,
  },
  labelText: {
    fontSize: 22,
  },
  rewardsInfoTextView: {
    marginTop: 3,
  },
  dateAndTimeView: {
    marginTop: 5,
  },
  textSecondary: {
    color: AppColors.textSecondary,
  },
  horizontalLine: {
    backgroundColor: AppColors.brand.primary,
    marginHorizontal: AppSizes.padding,
    marginVertical: 15,
  },
  contentMainView: {
    flex: 1,
    padding: 15,
  },
  promoDescriptionText: {
    color: AppColors.textSecondary,
  },
  promoValidityText: {
    marginTop: 20,
  },
  loadMoreLoadingView: {
    marginVertical: 10,
  },
});
