/**
 * Copyright (c) 2018-present, Evolvier Technologies. All rights reserved.
 *
 */

'use strict';
import {StyleSheet} from 'react-native';

import {AppSizes, AppColors, AppStyles} from '@theme';

export default StyleSheet.create({
  mainView: {
    // marginHorizontal: AppSizes.padding,
  },
  dispensationsView: {
    flexDirection: 'row',
    marginBottom: 15,
    backgroundColor: '#FFFFFF',
    marginHorizontal: AppSizes.padding,
  },
  corporateDetailsView: {
    flex: 2.5,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  fuelDetailsView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  vendorNameView: {
    justifyContent: 'center',
    marginLeft: 10,
  },
  logoAndNameView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  vendorLogo: {
    width: AppStyles.windowSize.width * 0.11,
    height: AppStyles.windowSize.width * 0.11,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
  },
  typeLogo: {
    width: AppStyles.windowSize.width * 0.1,
    height: AppStyles.windowSize.width * 0.1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
  },
  buttonIcon: {
    fontSize: 32,
  },
  fuelPointView: {
    marginVertical: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  vendorImageView: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  litrePointView: {
    marginTop: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: AppSizes.padding,
  },
  dispensationContentContainerStyle: {
    paddingVertical: 10,
  },
  sectionHeaderView: {
    backgroundColor: AppColors.brand.accentSecondary,
    paddingVertical: 10,
    paddingHorizontal: AppSizes.padding,
    marginBottom: 15,
  },
  cancelText: {
    color: AppColors.darkGray,
    marginTop: 10,
    marginLeft: 5,
  },
  infoView: {
    backgroundColor: AppColors.brand.secondary,
    paddingVertical: 10,
    paddingHorizontal: AppSizes.padding,
  },
  letterView: {
    backgroundColor: AppColors.brand.secondary,
    width: AppStyles.windowSize.width * 0.1,
    height: AppStyles.windowSize.width * 0.1,
    borderRadius: 100,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  line: {
    marginBottom: 15,
  },
  unitText: {
    marginLeft: 3,
  },
  marginTopSmall: {
    marginTop: 3,
  },
});
