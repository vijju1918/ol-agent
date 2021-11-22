/**
 * Copyright (c) 2018-present, Evolvier Technologies. All rights reserved.
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
    marginVertical: AppSizes.padding,
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
    borderRadius: AppStyles.windowSize.width * 0.07,
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
  },
  vendorDetailsView: {
    flexDirection: 'row',
  },
  vendorLogo: {
    width: AppStyles.windowSize.width * 0.075,
    height: AppStyles.windowSize.width * 0.075,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
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
  },
  fuelPointView: {
    alignItems: 'center',
  },
});
