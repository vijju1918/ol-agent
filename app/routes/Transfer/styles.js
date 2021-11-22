/**
 * Copyright (c) 2018-present, Oleum. All rights reserved.
 *
 */

'use strict';

import {StyleSheet, Platform} from 'react-native';
import {AppColors, AppSizes} from '@theme';

export default StyleSheet.create({
  selectVendorMainView: {
    marginTop: 15,
    marginHorizontal: AppSizes.padding,
    paddingLeft: AppSizes.padding,
    paddingVertical: 10,
    borderColor: AppColors.brand.accentSecondary,
    borderWidth: 1,
  },
  transferToMainView: {
    marginTop: 15,
    marginHorizontal: AppSizes.padding,
    paddingLeft: 10,
    paddingVertical: 10,
    borderColor: AppColors.brand.accentSecondary,
    borderWidth: 1,
  },
  noteMainView: {
    marginBottom: 15,
  },
  labelView: {
    backgroundColor: AppColors.brand.accentSecondary,
    paddingHorizontal: AppSizes.padding,
    paddingVertical: 10,
  },

  canListView: {
    flexDirection: 'row',
    borderRadius: 3,
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
    paddingHorizontal: AppSizes.padding,
    paddingTop: 25,
    paddingBottom: 20,
  },
  decrementView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  valueView: {
    flex: 1,
    flexDirection: 'row',
  },
  inputTextView: {
    flex: 1,
    justifyContent: 'center',
  },
  transferContactView: {
    marginTop: 10,
  },
  contactListView: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 5,
  },
  selectContactTextStyle: {
    paddingVertical: 20,
    color: AppColors.brand.primary,
  },
  noteView: {
    marginTop: 10,
  },
  noteInputView: {
    marginTop: 5,
    marginHorizontal: AppSizes.padding,
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: Platform.OS === 'ios' ? 15 : 5,
  },
  buttonView: {
    marginVertical: 10,
    marginHorizontal: 15,
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
    color: AppColors.brand.primary,
  },
  contactTouch: {},
  center: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  textInput: {
    flex: 1,
    marginLeft: 5,
  },
  inputUnderline: {
    height: 1,
    backgroundColor: AppColors.border,
  },
  unitView: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginLeft: 10,
    marginRight: 10,
  },
  infoView: {
    backgroundColor: AppColors.brand.secondary,
    paddingHorizontal: AppSizes.padding,
    paddingVertical: 10,
  },
  valueInputView: {
    flex: 1,
    alignSelf: 'flex-end',
    height: 50,
    justifyContent: 'center',
    borderWidth: 1,
  },
  iconView: {
    backgroundColor: 'black',
    borderRadius: 100,
    marginLeft: 5,
    marginRight: 10,
  },
  addIcon: {
    color: AppColors.brand.secondary,
  },
  horizontalLine: {
    marginHorizontal: AppSizes.padding,
    marginTop: -10,
  },
  margin: {
    marginTop: 15,
  },
});
