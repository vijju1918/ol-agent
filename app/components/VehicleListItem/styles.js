/**
 * Copyright (c) 2018-present, Evolvier Technologies. All rights reserved.
 *
 */

'use strict';

import {StyleSheet} from 'react-native';
import {AppColors, AppStyles} from '@theme';

export default StyleSheet.create({
  vehicleItemView: {
    flexDirection: 'row',
    paddingVertical: 10,
  },
  vehicleLogoView: {
    flex: 1,
  },
  vehicleLogo: {
    width: AppStyles.windowSize.width * 0.12,
    height: AppStyles.windowSize.width * 0.12,
    borderRadius: AppStyles.windowSize.width * 0.12,
    overflow: 'hidden',
  },
  vehicleLogoIconView: {
    width: AppStyles.windowSize.width * 0.12,
    height: AppStyles.windowSize.width * 0.12,
    borderRadius: AppStyles.windowSize.width * 0.12,
    borderWidth: 1.5,
    borderColor: AppColors.brand.primary,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  vehicleDetailsView: {
    flex: 4,
    justifyContent: 'center',
  },
  modelText: {
    marginTop: 5,
  },
  mileageView: {
    alignItems: 'center',
  },
  gpsMainView: {
    justifyContent: 'flex-start',
    marginRight: 5,
    marginTop: 5,
  },
  gpsView: {
    width: 35,
    height: 35,
    borderRadius: 35,
    borderColor: AppColors.brand.primary,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  active: {
    opacity: 1,
    color: AppColors.brand.secondary,
  },
  inActive: {
    opacity: 0.2,
  },
  icons: {
    padding: 5,
    color: AppColors.brand.secondary,
    fontSize: 31,
  },
});
