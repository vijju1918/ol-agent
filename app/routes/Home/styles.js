/**
 * Copyright (c) 2018-present, Oleum. All rights reserved.
 *
 */

'use strict';

import {StyleSheet} from 'react-native';
import {AppSizes, AppStyles, AppColors} from '@theme';

export default StyleSheet.create({
  activePromosView: {
    backgroundColor: AppColors.valueColor2,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  activePromoInfoView: {
    flex: 7,
    marginLeft: 5,
  },
  iconView: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  buttonIcon: {
    fontSize: 30,
    color: 'white',
  },
  newPromoLabel: {
    marginLeft: AppSizes.padding,
  },
  scrollViewProductListContentContainer: {
    paddingLeft: AppSizes.padding,
  },
  promoView: {
    height: AppStyles.windowSize.width * 0.5,
    width: ((AppStyles.windowSize.width * 0.5) / 9) * 16,
    backgroundColor: AppColors.xtralightGray,
    marginRight: 10,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: AppColors.xtralightGray,
  },
  rpromoView: {
    height: AppStyles.windowSize.width * 0.4,
    width: ((AppStyles.windowSize.width * 0.4) / 9) * 16,
    backgroundColor: AppColors.xtralightGray,
    marginRight: 10,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  recommendedPromoLabel: {
    marginLeft: AppSizes.padding,
  },
  allPromoLabel: {
    margin: AppSizes.padding,
  },
  allPromoView: {
    height: AppStyles.windowSize.width * 0.53,
    width: ((AppStyles.windowSize.width * 0.53) / 9) * 16,
    backgroundColor: AppColors.xtralightGray,
    alignSelf: 'center',
    marginBottom: 10,
    borderRadius: 5,
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
  contentMainView: {
    flex: 1,
    padding: 10,
  },
  promoIcon: {
    fontSize: 80,
    color: '#FFFFFF50',
  },
  bannerImage: {
    flex: 1,
    height: AppStyles.windowSize.width * 0.5,
    width: ((AppStyles.windowSize.width * 0.5) / 9) * 16,
    borderRadius: 5,
    overflow: 'hidden',
    alignSelf: 'center',
  },
  bannerImageRec: {
    flex: 1,
    height: AppStyles.windowSize.width * 0.4,
    width: ((AppStyles.windowSize.width * 0.4) / 9) * 16,
    borderRadius: 5,
    overflow: 'hidden',
    alignSelf: 'center',
  },
  bannerImageAll: {
    flex: 1,
    height: AppStyles.windowSize.width * 0.53,
    width: ((AppStyles.windowSize.width * 0.53) / 9) * 16,
    borderRadius: 5,
    overflow: 'hidden',
    alignSelf: 'center',
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginTop: 70,
  },
  promoMainView: {
    marginTop: 10,
  },
  recommendedPromotionBgView: {
    backgroundColor: AppColors.red,
    paddingVertical: 10,
  },
  loadingView: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    marginTop: 15,
  },
  filterHeadingView: {
    padding: AppSizes.padding,
    flexDirection: 'row',
  },
  clearTouch: {
    flex: 1,
    alignItems: 'flex-end',
  },
  filterTextView: {
    flex: 3,
  },
  clearText: {
    color: AppColors.brand.secondary,
  },
  noResultView: {
    padding: AppSizes.padding,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
  absolute: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  justify: {
    justifyContent: 'center',
  },
  homeContentView: {
    // marginTop: 10,
    // marginBottom: 10,
  },
  itemMainView: {
    alignItems: 'center',
    justifyContent: 'center',
    width: AppStyles.windowSize.width * 0.305,
    height: AppStyles.windowSize.width * 0.305,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    marginBottom: 10,
  },
  tileTouch: {
    height: AppStyles.windowSize.width * 0.3,
    width: AppStyles.windowSize.width * 0.3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tileIcon: {
    fontSize: AppStyles.windowSize.width * 0.15,
  },
  labelText: {
    marginTop: 10,
  },
  roListView: {
    marginHorizontal: AppSizes.padding,
    marginTop: 15,
    marginBottom: 50,
  },
  horizontalLine: {
    backgroundColor: AppColors.brand.primary,
    marginTop: 5,
    marginBottom: 5,
  },
  infoView: {
    backgroundColor: AppColors.brand.secondary,
  },
  itemImage: {
    height: AppStyles.windowSize.width * 0.22,
    width: AppStyles.windowSize.width * 0.22,
    borderRadius: AppStyles.windowSize.width * 0.22,
  },
  homeItemContentContainerStyle: {
    paddingTop: 5,
    paddingBottom: 100,
  },
  headerView: {
    justifyContent: 'center',
  },
  homeLoadingView: {
    position: 'absolute',
    right: AppSizes.padding,
  },
});
