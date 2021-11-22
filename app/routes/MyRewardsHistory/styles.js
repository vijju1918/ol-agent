/**
 * Copyright (c) 2018-present, Oleum. All rights reserved.
 *
 */

'use strict';

import {StyleSheet} from 'react-native';
import {AppColors, AppSizes, AppStyles} from '@theme';

export default StyleSheet.create({
  promoItemMainView: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: AppSizes.padding,
  },
  buttonIcon: {
    fontSize: 30,
    marginBottom: 6,
    color: AppColors.brand.primary,
  },
  promoDataView: {
    flex: 4,
  },
  promoValueView: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 5,
  },
  promoTitleView: {
    flex: 4,
    justifyContent: 'center',
  },
  imageNameView: {
    flexDirection: 'row',
  },
  statusText: {
    marginTop: 10,
  },
  promoContentContainerStyle: {
    marginVertical: 5,
  },
  vendorLogo: {
    width: AppStyles.windowSize.width * 0.08,
    height: AppStyles.windowSize.width * 0.08,
    borderRadius: 100,
    marginVertical: 5,
    marginRight: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: AppColors.border,
  },
  vendorView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  dateText: {
    marginBottom: 5,
    marginTop: 5,
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: AppSizes.padding,
  },
  sectionHeaderView: {
    backgroundColor: AppColors.brand.accentSecondary,
    paddingVertical: 10,
    paddingHorizontal: AppSizes.padding,
    marginBottom: 15,
  },
  infoView: {
    backgroundColor: AppColors.brand.secondary,
    paddingVertical: 10,
    paddingHorizontal: AppSizes.padding,
  },
  line: {
    marginVertical: 15,
  },
});
