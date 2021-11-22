/**
 * Copyright (c) 2018-present, Evolvier Technologies. All rights reserved.
 *
 */

'use strict';

import {StyleSheet} from 'react-native';
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
  vehicleNameText: {
    marginLeft: 5,
  },
  mileageDetailsMainView: {
    alignItems: 'center',
  },
  vehicleImageView: {
    marginTop: 25,
  },
  vehicleImage: {
    width: AppStyles.windowSize.width * 0.7,
    height: ((AppStyles.windowSize.width * 0.7) / 4) * 3,
  },
  mileageView: {
    alignItems: 'center',
  },
  mileageImage: {
    height: AppStyles.windowSize.width * 0.5,
    width: ((AppStyles.windowSize.width * 0.5) / 9) * 16,
  },
  labelText: {
    marginTop: 20,
  },
  valueText: {
    marginTop: 5,
  },
  viewMoreButtonView: {
    flex: 1,
    marginTop: 20,
    marginHorizontal: AppSizes.padding,
  },
  averageMileageInfoView: {
    marginHorizontal: AppSizes.padding,
    marginTop: 20,
  },
  mileageMeterView: {
    marginTop: 20,
    alignItems: 'center',
  },
  vehicleNameView: {
    flexDirection: 'row',
    flex: 5,
  },
  downIconView: {
    flex: 1,
    alignItems: 'flex-end',
  },
  downIcon: {
    fontSize: 25,
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
  dispensationDetailsView: {
    flex: 1,
    marginTop: 15,
  },
  dispensationsLabelView: {
    backgroundColor: AppColors.brand.accentSecondary,
    paddingVertical: 10,
    paddingTop: 13,
    marginBottom: 15,
    paddingHorizontal: AppSizes.padding,
  },
  listContentContainerStyle: {
    paddingVertical: 5,
    paddingHorizontal: AppSizes.padding,
  },
  dispensationItemMainView: {
    flexDirection: 'row',
    marginVertical: 5,
  },
  dispensationItemDetailsView: {
    flexDirection: 'row',
    flex: 1,
  },
  roAndOdometerView: {
    flex: 1,
  },
  odometerAndQuantityView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 3,
  },
  dispensationDateView: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  verticalSeparatorView: {
    borderWidth: 0.5,
    borderColor: '#000000',
    height: 15,
    marginHorizontal: 20,
  },
  horizontalLine: {
    marginVertical: 15,
    height: 1,
  },
  meterView: {
    alignItems: 'center',
    marginLeft: 10,
  },
});
