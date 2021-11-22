/**
 * Copyright (c) 2018-present, Oleum. All rights reserved.
 *
 */

'use strict';

import {StyleSheet} from 'react-native';
import {AppSizes, AppColors} from '@theme';

export default StyleSheet.create({
  labelView: {
    marginTop: 5,
    backgroundColor: AppColors.brand.accentSecondary,
    paddingHorizontal: AppSizes.padding,
    paddingVertical: 10,
  },
  labelTextView: {
    paddingHorizontal: AppSizes.padding,
    paddingVertical: 10,
    backgroundColor: AppColors.brand.accentSecondary,
  },
  agentDetailsView: {
    marginHorizontal: AppSizes.padding,
    flexDirection: 'row',
    paddingVertical: AppSizes.padding,
  },
  agentImageView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  profilePicImage: {
    width: 50,
    height: 50,
  },
  agentNameAndDesignationView: {
    padding: AppSizes.padding,
    justifyContent: 'center',
  },
  productDetailsView: {
    padding: AppSizes.padding,
  },
  productNameView: {
    marginTop: 10,
    flexDirection: 'row',
  },
  productValueView: {
    flexDirection: 'row',
    marginTop: 5,
  },
  fuelPointView: {
    flex: 1,
    alignItems: 'flex-end',
  },
  quantityView: {
    flex: 1,
    alignItems: 'center',
  },
  productView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  textAlignRight: {
    textAlign: 'right',
  },
  orderDetailsView: {
    flexDirection: 'row',
    borderColor: AppColors.border,
    borderRadius: 6,
    borderWidth: 1,
  },
  quantitiesView: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    marginVertical: 10,
  },
  typeView: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    marginVertical: 10,
  },
  valueView: {
    marginTop: 10,
    justifyContent: 'flex-start',
  },
  materialView: {
    marginTop: 10,
    justifyContent: 'flex-start',
  },
  detailsTableView: {
    marginTop: 5,
  },
  otpButtonView: {
    alignItems: 'center',
    marginTop: 10,
    marginVertical: 20,
  },
  buttonTouch: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: AppSizes.borderRadius,
    borderColor: AppColors.border,
    borderWidth: 1,
    paddingHorizontal: 50,
  },
  buttonText: {
    color: AppColors.brand.secondary,
    marginTop: 10,
    marginBottom: 10,
  },
  otpInputView: {
    alignItems: 'center',
    marginVertical: 10,
    marginHorizontal: 5,
  },
  buttonView: {
    marginHorizontal: AppSizes.padding,
    marginVertical: 10,
  },
  containerStyle: {
    marginTop: 30,
  },
  codeInputStyle: {
    borderWidth: 1.5,
  },
  infoView: {
    backgroundColor: AppColors.brand.secondary,
    paddingHorizontal: AppSizes.padding,
    paddingVertical: 10,
  },
  vehicleNumberView: {
    marginTop: 15,
    marginBottom: 15,
    marginHorizontal: AppSizes.padding,
    alignItems: 'center',
  },
  horizontalLine: {
    marginBottom: -5,
    backgroundColor: AppColors.border,
    marginHorizontal: AppSizes.padding,
  },
});
