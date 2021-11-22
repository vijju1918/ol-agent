/**
 * Copyright (c) 2018-present, Oleum. All rights reserved.
 *
 */

'use strict';

import {StyleSheet} from 'react-native';
import {AppColors, AppSizes, AppStyles} from '@theme';

export default StyleSheet.create({
  hidden: {
    display: 'none',
  },
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  infoView: {
    flexDirection: 'row',
    backgroundColor: AppColors.brand.secondary,
    paddingHorizontal: AppSizes.padding,
    paddingVertical: 10,
  },
  infoTextView: {
    flex: 1,
  },
  promoListContentContainer: {
    paddingTop: 10,
    paddingBottom: 40,
  },
  promoView: {
    height: AppStyles.windowSize.width * 0.53 + 65,
    width: ((AppStyles.windowSize.width * 0.53) / 9) * 16,
    alignSelf: 'center',
    marginBottom: 15,
  },
  promoViewSmall: {
    alignSelf: 'center',
    marginBottom: 15,
    overflow: 'hidden',
  },
  mrCanItemView: {
    height: AppStyles.windowSize.width * 0.53 + 65,
    width: ((AppStyles.windowSize.width * 0.53) / 9) * 16,
    alignSelf: 'center',
    marginBottom: 15,
  },
  bannerImage: {
    flex: 1,
    height: AppStyles.windowSize.width * 0.53,
    width: ((AppStyles.windowSize.width * 0.53) / 9) * 16,
    overflow: 'hidden',
    alignSelf: 'center',
  },
  bannerImageSmall: {
    flex: 1,
    height: AppStyles.windowSize.width * 0.53,
    width: ((AppStyles.windowSize.width * 0.53) / 9) * 16,
    overflow: 'hidden',
    alignSelf: 'center',
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
  validityMainView: {
    backgroundColor: 'white',
    paddingVertical: 10,
  },
  validityMainSmallView: {
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  validityMainNoImageView: {
    backgroundColor: 'white',
    paddingVertical: 10,
  },
  availButtonView: {},
  availTouch: {
    alignSelf: 'flex-end',
    backgroundColor: AppColors.brand.secondary,
    padding: 8,
    paddingHorizontal: 12,
  },
  validityView: {
    justifyContent: 'center',
  },
  horizontalLine: {
    marginVertical: 5,
    height: 0.5,
  },
  mrCanPromoListContentContainer: {
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 15,
  },
  mrCanPromoVerticalListContentContainer: {
    paddingTop: 10,
  },
  horizontalPromoItemSeparator: {
    width: 10,
  },
  drCanListView: {
    backgroundColor: AppColors.brand.primary,
    paddingVertical: 10,
    marginBottom: 15,
  },
  roPromoListContentContainer: {
    paddingBottom: 40,
  },
  locationWarningView: {
    padding: 10,
    marginVertical: 15,
    backgroundColor: AppColors.red,
    marginHorizontal: 15,
    borderRadius: 5,
  },
  loadingSmallView: {
    // backgroundColor:"red",
    position: 'absolute',
    top: 30,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingContentView: {
    backgroundColor: AppColors.brand.primary,
    borderRadius: 100,
    padding: 5,
  },
});
