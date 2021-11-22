/**
 * Copyright (c) 2018-present, Evolvier Technologies. All rights reserved.
 *
 */

'use strict';

import {StyleSheet, Platform} from 'react-native';
import {AppSizes, AppColors} from '@theme';

export default StyleSheet.create({
  mainView: {
    flex: 1,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF50',
  },
  textSecondary: {
    color: AppColors.textSecondary,
    marginTop: Platform.OS === 'ios' ? 2 : 2,
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
  listMainView: {
    marginHorizontal: AppSizes.padding,
    marginBottom: 5,
  },
  labelText: {
    marginBottom: 10,
  },
  itemMainView: {
    flexDirection: 'row',
  },
  iconAndStripView: {
    marginLeft: 10,
    alignItems: 'center',
  },
  iconView: {
    position: 'absolute',
    marginTop: 10,
  },
  icon: {
    height: 35,
    width: 35,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: AppColors.brand.primary,
    backgroundColor: AppColors.whiteIcon,
  },
  detailsView: {
    flex: 1,
    marginLeft: 20,
  },
  nameAndDateView: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 10,
    marginTop: 3,
  },
  itemNameView: {
    flex: 1,
    paddingRight: 20,
  },
  itemDateView: {
    alignItems: 'flex-end',
  },
  costText: {
    marginTop: 3,
  },
  horizontalLine: {
    backgroundColor: AppColors.brand.primary,
  },
  verticalStrip: {
    flex: 1,
    width: 15,
    backgroundColor: AppColors.brand.primary,
  },
  dashedLine: {
    alignSelf: 'center',
    flex: 1,
    width: 1,
    backgroundColor: AppColors.brand.secondary,
    borderWidth: 1,
    borderRadius: 100,
    borderTopWidth: 0,
    borderColor: AppColors.brand.secondary,
    borderStyle: 'dashed',
  },
  dashedLineTwo: {
    width: 0.5,
    height: Platform.OS === 'ios' ? 75 : 85,
    flexDirection: 'column',
    alignSelf: 'center',
    marginRight: 1,
  },
  dashedLineTwoExpand: {
    width: 0.5,
    height: Platform.OS === 'ios' ? 155 : 165,
    flexDirection: 'column',
    alignSelf: 'center',
    marginRight: 1,
  },
  footerView: {
    flex: 1,
    backgroundColor: AppColors.brand.secondary,
    marginTop: 10,
    marginBottom: 20,
    marginLeft: 20,
    paddingHorizontal: 5,
  },
  welcomeMainView: {
    flexDirection: 'row',
    marginBottom: 50,
  },
  welcomeIconView: {
    position: 'absolute',
    top: -5,
  },
  welcomeTextView: {
    marginTop: -3,
    marginLeft: 45,
  },
  nonExpandedView: {
    marginTop: 3,
  },
  expandedView: {
    marginTop: 5,
  },
  expandedItemMainView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  expandedItemIconView: {
    marginRight: 10,
    justifyContent: 'center',
  },
  hidden: {
    display: 'none',
  },
  optionsView: {
    flexDirection: 'row',
    backgroundColor: AppColors.brand.secondary,
    padding: 5,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  optionTouch: {
    borderRadius: 50,
    marginLeft: 10,
    paddingHorizontal: 10,
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
  invoiceContentContainerStyle: {
    paddingBottom: 50,
  },
  loadMoreLoadingView: {
    marginVertical: 10,
  },
  kmText: {
    marginTop: 3,
  },
  ownerIcon: {
    marginLeft: 3,
    color: '#00000050',
  },
});
