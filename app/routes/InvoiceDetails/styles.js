/**
 * Copyright (c) 2018-present, Evolvier Technologies. All rights reserved.
 *
 */

'use strict';

import {StyleSheet, Platform} from 'react-native';
import {AppStyles, AppSizes, AppColors} from '@theme';

export default StyleSheet.create({
  mainView: {
    // marginHorizontal: AppSizes.padding
  },
  textSecondary: {
    color: AppColors.textSecondary,
  },
  infoView: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: AppColors.brand.secondary,
    paddingHorizontal: AppSizes.padding,
    paddingVertical: 10,
  },
  titleAndOwnerView: {
    marginBottom: 3,
    alignItems: 'center',
  },
  textMargin: {
    marginLeft: 5,
  },
  odometerAndMileageView: {
    flexDirection: 'row',
    marginTop: 3,
  },
  odometerView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mileageView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  hidden: {
    display: 'none',
  },
  optionsMainView: {
    flexDirection: 'row',
    backgroundColor: AppColors.brand.secondary,
    paddingLeft: AppSizes.padding,
    paddingRight: 10,
    marginTop: 3,
    paddingVertical: 5,
    alignItems: 'center',
  },
  dateAndTimeView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionsView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  optionTouch: {
    borderRadius: 50,
    marginLeft: 15,
    padding: 5,
  },
  bannerImageView: {
    marginTop: 15,
  },
  bannerImage: {
    flex: 1,
    height: AppStyles.windowSize.width * 0.51,
    width: ((AppStyles.windowSize.width * 0.51) / 9) * 16,
    overflow: 'hidden',
    alignSelf: 'center',
  },
  roDetailsView: {
    flex: 1,
    marginTop: 15,
    alignItems: 'center',
  },
  roImageView: {
    width: AppStyles.windowSize.width * 0.18,
    height: AppStyles.windowSize.width * 0.18,
    borderRadius: AppStyles.windowSize.width * 0.18,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: AppColors.brand.secondary,
  },
  roImage: {
    backgroundColor: AppColors.brand.secondary,
    width: AppStyles.windowSize.width * 0.18,
    height: AppStyles.windowSize.width * 0.18,
    borderRadius: AppStyles.windowSize.width * 0.18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  letterView: {
    backgroundColor: AppColors.brand.secondary,
    width: AppStyles.windowSize.width * 0.18,
    height: AppStyles.windowSize.width * 0.18,
    borderRadius: AppStyles.windowSize.width * 0.18,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleLetterText: {
    marginTop: Platform.OS === 'ios' ? 5 : 0,
    fontSize: 24,
  },
  roNameView: {
    paddingHorizontal: 15,
    marginTop: 5,
    alignItems: 'center',
  },
  invoiceDetailsView: {
    marginHorizontal: AppSizes.padding,
    marginTop: 20,
    marginBottom: 40,
  },
  invoiceItemMainView: {
    flex: 1,
  },
  invoiceItemView: {
    flexDirection: 'row',
    flex: 1,
  },
  invoiceItemValueView: {
    flex: 1,
    alignItems: 'flex-end',
    marginLeft: 10,
  },
  horizontalLine: {
    backgroundColor: AppColors.brand.primary,
    marginVertical: 7,
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF50',
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
});
