/**
 * Copyright (c) 2018-present, Oleum. All rights reserved.
 *
 */

'use strict';

import {StyleSheet, Platform} from 'react-native';
import {AppSizes, AppColors} from '@theme';

export default StyleSheet.create({
  rupeeEnterBoxView: {
    flexDirection: 'row',
    paddingHorizontal: AppSizes.padding,
    borderRadius: 0,
    borderColor: AppColors.border,
    borderWidth: 1,
    marginHorizontal: AppSizes.padding,
  },
  scrollViewContentContainer: {
    paddingBottom: 20,
  },
  rupeeSymbolView: {
    alignSelf: 'center',
  },
  rupeeInputView: {
    // alignSelf: 'center',
    alignSelf: 'stretch',
    paddingVertical: Platform.OS === 'ios' ? 10 : 0,
  },
  buttonIcon: {
    fontSize: 15,
    color: AppColors.drawerIcons,
  },
  labelTextView: {
    marginVertical: AppSizes.padding,
    marginHorizontal: AppSizes.padding,
  },
  totalAmountView: {
    flexDirection: 'row',
    padding: AppSizes.padding,
    // borderColor:AppColors.border,
    // borderWidth:1,
    // backgroundColor: "red"
  },
  totalPayableTextView: {
    // flex: 1,
    // marginLeft: 8,
    alignSelf: 'center',
  },
  rupeeAndAmountView: {
    // flex: 1,
    marginLeft: 10,
    flexDirection: 'row',
    alignSelf: 'center',
  },
  payButtonView: {
    // flex: 2,
    alignSelf: 'center',
    alignItems: 'flex-end',
  },
  buttonView: {
    marginHorizontal: AppSizes.padding,
    marginVertical: 10,
  },
  titleInfoText: {
    padding: AppSizes.padding,
    // marginHorizontal: AppSizes.padding,
  },
  loadingView: {
    height: 300,
    padding: 20,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dataContentView: {},
  infoView: {
    backgroundColor: AppColors.brand.accentSecondary,
  },
  inputView: {
    width: 250,
    paddingTop: Platform.OS === 'ios' ? 5 : 10,
  },
  valueText: {
    marginTop: Platform.OS === 'ios' ? 2 : 0,
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
  selectVehicleLabelView: {
    marginTop: 15,
    marginHorizontal: AppSizes.padding,
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
  totalFPView: {
    marginHorizontal: AppSizes.padding,
    marginTop: 10,
    backgroundColor: AppColors.brand.secondary,
    alignSelf: 'flex-start',
    padding: 5,
  },
});
