/**
 * Copyright (c) 2018-present, Oleum. All rights reserved.
 *
 */

'use strict';

import {StyleSheet} from 'react-native';
import {AppColors, AppSizes} from '@theme';

export default StyleSheet.create({
  scrollViewContentContainer: {
    paddingBottom: 20,
  },
  infoView: {
    flexDirection: 'row',
    backgroundColor: AppColors.brand.secondary,
    alignItems: 'center',
    paddingVertical: 10,
  },
  infoMessageText: {
    margin: AppSizes.padding,
  },
  iconMainView: {
    marginLeft: 10,
    borderWidth: 1,
    height: 40,
    width: 40,
    borderRadius: 20,
    borderColor: AppColors.brand.primary,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonIcon: {
    fontSize: 30,
  },
  labelView: {
    backgroundColor: AppColors.brand.accentSecondary,
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  paymentDetailsView: {
    marginHorizontal: AppSizes.padding,
  },
  amountShownView: {
    flexDirection: 'row',
    padding: AppSizes.padding,
  },
  amountPaidTextStyle: {
    flex: 1,
    alignSelf: 'flex-start',
  },
  paymentInfo: {
    marginVertical: 10,
  },
  paymentInfoText: {
    fontSize: 18,
    marginVertical: 10,
  },
  paymentTextStyle: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  buttonView: {
    marginHorizontal: AppSizes.padding,
    marginVertical: AppSizes.padding,
  },
});
