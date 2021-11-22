/**
 * Copyright (c) 2018-present, Evolvier Technologies. All rights reserved.
 *
 */

'use strict';

import {StyleSheet} from 'react-native';
import {AppSizes, AppStyles} from '@theme';

export default StyleSheet.create({
  dispensationView: {
    flexDirection: 'row',
    paddingHorizontal: AppSizes.padding,
    backgroundColor: '#FFFFFF',
  },
  contactAndVendorDetailsView: {
    flex: 3,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  contactDetailsView: {
    flexDirection: 'row',
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
    alignItems: 'center',
  },
  transferDateView: {
    marginTop: 5,
  },
  priceAndApproxFuelView: {
    marginTop: 5,
    marginBottom: 5,
  },
  priceView: {
    flexDirection: 'row',
    marginTop: 10,
  },
  fuelDetailsView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fuelPointView: {
    alignItems: 'center',
  },
  litrePointView: {
    marginVertical: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusText: {
    marginTop: 10,
  },
  contactNameView: {
    justifyContent: 'center',
    paddingTop: 5,
    marginBottom: 10,
  },
});
