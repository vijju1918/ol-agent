/**
 * Copyright (c) 2018-present, Evolvier Technologies. All rights reserved.
 *
 */

'use strict';

import {StyleSheet} from 'react-native';
import {AppColors, AppSizes, AppStyles} from '@theme';

export default StyleSheet.create({
  labelView: {
    marginBottom: 10,
  },
  promoHeaderView: {},
  promoTitleMainView: {
    flexDirection: 'row',
    marginHorizontal: AppSizes.padding,
    marginVertical: AppSizes.padding,
  },
  promoIdView: {
    flex: 1,
    alignItems: 'flex-end',
  },
  summaryMainView: {
    marginVertical: 10,
  },
  summaryView: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: AppColors.border,
    borderRadius: AppSizes.borderRadius,
  },
  rewardsView: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  vendorDetailsView: {
    flexDirection: 'row',
    padding: 7,
  },
  vendorLogo: {
    width: AppStyles.windowSize.width * 0.075,
    height: AppStyles.windowSize.width * 0.075,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  vendorTopImageView: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginLeft: 10,
  },
  vendorNameView: {
    justifyContent: 'center',
    marginLeft: 5,
  },
  buttonView: {
    marginVertical: 10,
  },
  buttonTouch: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red',
    borderRadius: 25,
  },
  buttonText: {
    color: '#FFFFFF',
    marginTop: 15,
    marginBottom: 15,
  },
  promotionByTextView: {
    marginTop: AppSizes.padding,
  },
  promotionVendorView: {
    marginVertical: AppSizes.padding,
  },
  vendorImageView: {
    width: AppStyles.windowSize.width * 0.3,
    height: AppStyles.windowSize.width * 0.3,
    padding: AppSizes.padding,
    borderWidth: 1,
    borderColor: AppColors.navBarIcons,
  },
  agreeCheckBoxview: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  agreementTextStyle: {
    marginLeft: 5,
  },
  scrollViewContentContainer: {
    paddingBottom: 30,
  },
  clickLinkMainView: {
    flexDirection: 'row',
    backgroundColor: AppColors.brand.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    paddingHorizontal: 10,
    // borderRadius: 5,
    padding: 10,
  },
  watchVideoMainView: {
    flexDirection: 'row',
    backgroundColor: AppColors.brand.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    paddingHorizontal: 10,
    padding: 10,
  },
  otherActionMainView: {
    flexDirection: 'row',
    backgroundColor: AppColors.brand.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    paddingHorizontal: 10,
    padding: 10,
  },
  buttonIcon: {
    fontSize: 40,
    marginBottom: 6,
    color: AppColors.brand.primary,
  },
  actionIconView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  promoInfoView: {
    justifyContent: 'center',
    marginLeft: 10,
    marginVertical: 5,
    flexWrap: 'wrap',
  },
  navIconView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  termsAndConditionsView: {
    marginHorizontal: AppSizes.padding,
    marginTop: 20,
    marginBottom: 10,
  },
  actionsView: {
    marginHorizontal: AppSizes.padding,
    marginTop: 15,
  },
  promoByView: {
    marginHorizontal: AppSizes.padding,
    marginVertical: 10,
  },
  donateView: {
    flex: 1,
    backgroundColor: AppColors.brand.accentDark,
    flexDirection: 'row',
    padding: AppSizes.padding,
  },
  donateIconView: {
    marginTop: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  donateTextView: {
    marginLeft: AppSizes.padding,
    flex: 1,
  },
  donateCheckBoxView: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
});
