/**
 * Copyright (c) 2018-present, Oleum. All rights reserved.
 *
 */

'use strict';

import {StyleSheet} from 'react-native';
import {AppColors, AppSizes, AppStyles} from '@theme';

export default StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  infoView: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: AppColors.brand.secondary,
    paddingLeft: AppSizes.padding,
    paddingRight: AppSizes.padding - 5,
    paddingVertical: 10,
  },
  infoTextView: {
    flex: 1,
  },
  filterView: {
    justifyContent: 'center',
  },
  filterIcon: {
    fontSize: 22,
  },
  filterTouch: {
    padding: 7,
    borderRadius: 50,
  },
  promoListContentContainer: {
    paddingTop: 15,
    paddingBottom: 40,
  },
  promoView: {
    height: AppStyles.windowSize.width * 0.51 + 65,
    width: ((AppStyles.windowSize.width * 0.51) / 9) * 16,
    alignSelf: 'center',
    marginBottom: 15,
  },
  bannerImage: {
    // flex: 1,
    height: AppStyles.windowSize.width * 0.51,
    width: ((AppStyles.windowSize.width * 0.51) / 9) * 16,
    overflow: 'hidden',
    alignSelf: 'center',
  },
  filterHeadingView: {
    padding: AppSizes.padding,
    flexDirection: 'row',
  },
  clearTouch: {
    flex: 1,
    alignItems: 'flex-end',
  },
  noResultView: {
    padding: AppSizes.padding,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
  imageLoadingView: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentMainView: {
    flex: 1,
    padding: 15,
  },
  promoDescriptionText: {
    color: AppColors.textSecondary,
  },
  validityMainView: {
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
  locationWarningView: {
    padding: 10,
    marginVertical: 15,
    backgroundColor: AppColors.red,
    marginHorizontal: 15,
    borderRadius: 5,
  },
});
