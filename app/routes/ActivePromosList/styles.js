/**
 * Copyright (c) 2018-present, Evolvier Technologies. All rights reserved.
 *
 */

'use strict';

import {StyleSheet} from 'react-native';
import {AppStyles, AppSizes, AppColors} from '@theme';

export default StyleSheet.create({
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
  allPromoView: {
    height: AppStyles.windowSize.width * 0.53,
    width: ((AppStyles.windowSize.width * 0.53) / 9) * 16,
    backgroundColor: AppColors.xtralightGray,
    alignSelf: 'center',
    marginBottom: 10,
    borderRadius: 5,
  },
  bannerImageAll: {
    flex: 1,
    height: AppStyles.windowSize.width * 0.53,
    width: ((AppStyles.windowSize.width * 0.53) / 9) * 16,
    borderRadius: 5,
    overflow: 'hidden',
    alignSelf: 'center',
  },
  scrollViewProductListContentContainer: {
    paddingTop: 10,
  },
  contentMainView: {
    flex: 1,
    padding: 10,
  },
  promoIcon: {
    fontSize: 80,
    color: '#FFFFFF50',
  },
  promoTitleText: {
    color: '#FFFFFF',
  },
  promoDescriptionText: {
    color: '#FFFFFF',
  },
  validityDateView: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    backgroundColor: AppColors.brand.accent,
    paddingHorizontal: 3,
    paddingVertical: 1,
    borderRadius: 1,
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
  },
});
