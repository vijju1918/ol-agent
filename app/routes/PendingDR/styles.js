/**
 * Copyright (c) 2018-present, Oleum. All rights reserved.
 *
 */

'use strict';

import {StyleSheet, Platform} from 'react-native';
import {AppColors, AppSizes, AppStyles} from '@theme';

export default StyleSheet.create({
  drItemMainView: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    marginVertical: 10,
    borderRadius: 0,
    marginHorizontal: 10,
  },
  mrDrItemMainView: {
    flexDirection: 'row',
    backgroundColor: AppColors.brand.accentSecondary,
    marginVertical: 10,
    borderRadius: 0,
    marginHorizontal: 10,
  },
  drDataView: {
    flex: 5,
    margin: 3,
  },
  drValueView: {
    flex: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 3,
  },
  imageView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  vendorNameView: {
    flex: 4,
    justifyContent: 'center',
    marginLeft: 10,
  },
  vendorNameSubView: {
    marginTop: 5,
  },
  imageNameView: {
    flexDirection: 'row',
  },
  vendorMaterial: {
    width: AppStyles.windowSize.width * 0.15,
    height: AppStyles.windowSize.width * 0.13,
    margin: 5,
  },
  vendorLogo: {
    width: AppStyles.windowSize.width * 0.12,
    height: AppStyles.windowSize.width * 0.12,
    borderRadius: 100,
  },
  dateText: {
    marginTop: 5,
  },
  pendingDRContentContainerStyle: {
    // marginVertical: 5,
    paddingBottom: 50,
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: AppSizes.padding,
  },
  infoView: {
    paddingHorizontal: AppSizes.padding,
    paddingVertical: 10,
    backgroundColor: AppColors.brand.secondary,
  },
  letterView: {
    backgroundColor: AppColors.brand.secondary,
    height: AppStyles.windowSize.width * 0.12,
    width: AppStyles.windowSize.width * 0.12,
    borderRadius: AppStyles.windowSize.width * 0.1,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleLetterText: {
    marginTop: Platform.OS === 'ios' ? 5 : 0,
  },
  marginTopSmall: {
    marginTop: 3,
  },
});
