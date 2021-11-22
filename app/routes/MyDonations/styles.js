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
    borderRadius: 6,
    borderWidth: 1,
    borderColor: AppColors.border,
    padding: AppSizes.paddingSml,
    marginBottom: AppSizes.padding,
    marginHorizontal: AppSizes.padding,
    backgroundColor: '#FFFFFF',
  },
  contactAndVendorDetailsView: {
    flex: 2.5,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  contactDetailsView: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  contactAvatar: {
    width: AppStyles.windowSize.width * 0.14,
    height: AppStyles.windowSize.width * 0.14,
    borderRadius: 5,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contactNameAndTransferDateView: {
    justifyContent: 'center',
    marginLeft: 5,
  },
  name: {
    marginRight: 65,
    marginBottom: 5,
  },
  vendorDetailsView: {
    flexDirection: 'row',
  },
  vendorLogo: {
    width: AppStyles.windowSize.width * 0.075,
    height: AppStyles.windowSize.width * 0.075,
    borderRadius: 2,
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
  fuelPointView: {
    alignItems: 'center',
  },
  transferContentContainerStyle: {
    paddingVertical: 10,
  },
  sectionHeaderView: {
    backgroundColor: AppColors.background,
    padding: AppSizes.padding,
  },
  vendorNameText: {
    marginRight: 50,
  },
});
