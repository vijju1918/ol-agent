/**
 * Copyright (c) 2018-present, Oleum. All rights reserved.
 *
 */

'use strict';

import {StyleSheet} from 'react-native';
import {AppSizes, AppColors, AppStyles} from '@theme';

export default StyleSheet.create({
  transfersView: {
    flexDirection: 'row',
    padding: AppSizes.paddingSml,
    backgroundColor: '#FFFFFF',
  },
  contactAndVendorDetailsView: {
    flex: 2.5,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  contactDetailsView: {
    flexDirection: 'row',
  },
  contactAvatar: {
    width: AppStyles.windowSize.width * 0.14,
    height: AppStyles.windowSize.width * 0.14,
    borderRadius: 100,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contactNameAndTransferDateView: {
    justifyContent: 'center',
    marginLeft: 5,
  },
  name: {
    marginBottom: 5,
    fontSize: 15,
  },
  vendorDetailsView: {
    flexDirection: 'row',
    marginVertical: 15,
  },
  vendorLogo: {
    width: AppStyles.windowSize.width * 0.075,
    height: AppStyles.windowSize.width * 0.075,
    borderRadius: 100,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: AppColors.border,
  },
  vendorImageView: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginLeft: 10,
  },
  vendorNameView: {
    justifyContent: 'center',
    marginLeft: 5,
  },
  fuelDetailsView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonIcon: {
    fontSize: 30,
    marginBottom: 5,
    color: AppColors.brand.secondary,
  },
  fuelPointView: {
    alignItems: 'center',
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: AppSizes.padding,
  },
  sectionHeaderView: {
    backgroundColor: AppColors.brand.accentSecondary,
    padding: AppSizes.padding,
    marginBottom: 10,
  },
  vendorNameText: {
    marginRight: 50,
  },
  infoView: {
    backgroundColor: AppColors.brand.secondary,
    paddingVertical: 10,
    paddingHorizontal: AppSizes.padding,
  },
  line: {
    marginVertical: 10,
  },
  letterView: {
    backgroundColor: AppColors.brand.secondary,
    width: AppStyles.windowSize.width * 0.12,
    height: AppStyles.windowSize.width * 0.12,
    borderRadius: 100,
    margin: 5,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  transferListContentContainerStyle: {
    paddingBottom: 50,
  },
});
