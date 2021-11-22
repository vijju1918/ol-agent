/**
 * Copyright (c) 2018-present, Oleum. All rights reserved.
 *
 */

'use strict';
import {StyleSheet, Platform} from 'react-native';
import {AppColors, AppSizes} from '@theme';

export default StyleSheet.create({
  buttonView: {
    marginHorizontal: AppSizes.padding,
    marginVertical: 10,
  },
  labelTextView: {
    marginHorizontal: AppSizes.padding,
    marginVertical: 15,
  },
  agreeCheckBoxview: {
    flexDirection: 'row',
    marginTop: 20,
  },
  agreementTextStyle: {
    marginLeft: 5,
  },
  termsAndConditionsView: {
    marginHorizontal: AppSizes.padding,
    marginTop: 10,
    marginBottom: 10,
  },
  promoByView: {
    marginHorizontal: AppSizes.padding,
    marginVertical: 10,
  },
  promoHeaderView: {},
  criteriaView: {
    marginHorizontal: AppSizes.padding,
  },
  criteriaItemView: {
    marginBottom: 10,
  },
  uploadButtonView: {
    marginHorizontal: AppSizes.padding,
    marginTop: 10,
    marginVertical: 20,
    alignSelf: 'flex-start',
  },
  buttonTouch: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: AppSizes.borderRadius,
    borderColor: AppColors.border,
    borderWidth: 1,
    paddingHorizontal: 20,
  },
  buttonText: {
    marginTop: 10,
    marginBottom: 10,
  },
  mrCanImage: {
    width: 65,
    height: 65,
  },
  roCanImage: {
    width: 60,
    height: 60,
  },
  mrCanWaringView: {
    flexDirection: 'row',
    backgroundColor: 'black',
    borderWidth: 5,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderColor: AppColors.brand.secondary,
    borderStyle: 'dashed',
    paddingVertical: 10,
    paddingHorizontal: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  canImageView: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  mrCanWarningContentView: {
    marginLeft: 15,
  },
  infoView: {
    backgroundColor: AppColors.brand.accentSecondary,
  },
  titleInfoText: {
    // padding: AppSizes.padding,
    // marginHorizontal: AppSizes.padding,
  },
  rupeeEnterBoxView: {
    flexDirection: 'row',
    paddingHorizontal: AppSizes.padding,
    borderRadius: 0,
    borderColor: AppColors.border,
    borderWidth: 1,
    marginHorizontal: AppSizes.padding,
  },
  rupeeSymbolView: {
    alignSelf: 'center',
  },
  buttonIcon: {
    fontSize: 15,
    color: AppColors.drawerIcons,
  },
  rupeeInputView: {
    // alignSelf: 'center',
    alignSelf: 'stretch',
    paddingVertical: Platform.OS === 'ios' ? 10 : 0,
  },
  inputView: {
    width: 250,
    paddingTop: Platform.OS === 'ios' ? 5 : 10,
  },
  totalFPView: {
    marginHorizontal: AppSizes.padding,
    marginTop: 10,
    backgroundColor: AppColors.brand.secondary,
    alignSelf: 'flex-start',
    padding: 5,
  },
  totalAmountSummeryView: {
    // padding:10,
    paddingTop: 7,
    paddingBottom: 7,
    // borderWidth:1,
    // borderColor: AppColors.border,
    marginHorizontal: 15,
    backgroundColor: AppColors.brand.accentSecondary,
    marginTop: 15,
  },
  hline: {
    height: 1,
    // backgroundColor: AppColors.border,
    backgroundColor: '#FFFFFF',
    marginVertical: 7,
  },
  nameView: {
    marginLeft: 10,
  },
  valueView: {
    alignItems: 'flex-end',
    marginRight: 10,
  },
  vehicleCheckBoxView: {
    marginLeft: AppSizes.padding,
    marginRight: AppSizes.padding,
    marginTop: 10,
  },
  checkboxLabelStyle: {
    marginLeft: 5,
  },
  selectVehicleMainView: {
    marginTop: 10,
    marginHorizontal: AppSizes.padding,
    paddingLeft: 10,
    paddingVertical: 15,
    borderColor: AppColors.brand.accentSecondary,
    borderWidth: 1,
  },
  vehicleListView: {
    flexDirection: 'row',
    borderRadius: 3,
  },
  vehicleItemView: {
    flex: 6,
    justifyContent: 'center',
    paddingTop: 5,
    paddingBottom: 5,
  },
  downIconView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingView: {
    height: 300,
    padding: 20,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fpInputTitleView: {
    paddingHorizontal: 15,
    paddingBottom: 10,
  },
  paymentLoading: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF30',
  },
  shareMainView: {
    backgroundColor: AppColors.brand.primary,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: AppSizes.padding,
    borderRadius: 5,
    // paddingHorizontal:15,
    // paddingVertical:5
  },
  iconView: {
    backgroundColor: AppColors.brand.secondary,
    marginRight: 10,
    borderTopRightRadius: 50,
    borderBottomRightRadius: 50,
    borderRadius: 5,
  },
  shareIcon: {
    fontSize: 25,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  shareInfoView: {
    paddingHorizontal: 10,
    flex: 1,
  },
  expiredView: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#FFFFFF80',
    alignItems: 'center',
    justifyContent: 'center',
  },
  expireContentView: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderWidth: 5,
    borderColor: AppColors.brand.primary,
    borderRadius: 10,
    alignItems: 'center',
  },
});
