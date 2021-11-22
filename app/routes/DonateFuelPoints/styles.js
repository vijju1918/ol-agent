/**
 * Copyright (c) 2018-present, Oleum. All rights reserved.
 *
 */

'use strict';

import {StyleSheet} from 'react-native';
import {AppColors, AppSizes} from '@theme';

export default StyleSheet.create({
  selectVendorMainView: {
    marginHorizontal: AppSizes.padding,
  },
  transferToMainView: {
    marginHorizontal: AppSizes.padding,
  },
  noteMainView: {
    marginHorizontal: AppSizes.padding,
  },
  vendorView: {
    marginTop: 10,
  },
  vendorListAndPointsSelectView: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: AppColors.border,
    borderRadius: AppSizes.borderRadius,
    backgroundColor: '#FFFFFF',
  },
  canListView: {
    flexDirection: 'row',
    borderRadius: 3,
    backgroundColor: '#FFFFFF',
  },
  canItemView: {
    flex: 6,
    justifyContent: 'center',
    paddingTop: 5,
    paddingBottom: 5,
  },
  canIconView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pointsSelectView: {
    flexDirection: 'row',
    flex: 1,
  },
  decrementView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  valueView: {
    flex: 1.5,
    padding: AppSizes.padding,
  },
  inputTextView: {
    flex: 3,
    padding: 10,
    justifyContent: 'center',
  },
  transferContactView: {
    marginTop: 10,
  },
  contactListView: {
    flexDirection: 'row',
    padding: 10,
    marginTop: 10,
    borderWidth: 1,
    borderColor: AppColors.border,
    borderRadius: AppSizes.borderRadius,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  selectContactTextStyle: {
    paddingVertical: 20,
    color: AppColors.brand.secondary,
  },
  noteView: {
    marginTop: 10,
  },
  noteInputView: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: AppColors.border,
    borderRadius: AppSizes.borderRadius,
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#FFFFFF',
  },
  buttonView: {
    margin: 10,
  },
  contactCardMainView: {
    flexDirection: 'row',
  },
  contactCardView: {
    flex: 4,
  },
  textView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  changeText: {
    color: AppColors.brand.secondary,
  },
  contactTouch: {},
  center: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  textInput: {
    flex: 1,
  },
  inputUnderline: {
    height: 1,
    backgroundColor: AppColors.border,
  },
  unitView: {
    flex: 1,
    justifyContent: 'center',
    marginRight: 10,
  },
});
