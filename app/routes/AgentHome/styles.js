/**
 * Copyright (c) 2018-present, Evolvier Technologies. All rights reserved.
 *
 */

'use strict';

import {StyleSheet, Platform} from 'react-native';
import {AppFonts, AppSizes, AppColors, AppStyles} from '@theme';

export default StyleSheet.create({
  navBarRightIconsView: {
    flexDirection: 'row',
  },
  countView: {
    height: 16,
    width: 16,
    backgroundColor: AppColors.red,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    borderColor: AppColors.brand.primary,
    borderWidth: 0.8,
    top: 7,
    right: 7,
  },
  customStyle: {
    fontSize: AppFonts.base.extraSmall,
    color: AppColors.textSecondary,
  },
  countText: {
    marginTop: Platform.OS === 'ios' ? 3 : 0,
    color: '#000000',
  },
  orView: {
    alignItems: 'center',
    marginVertical: 10,
  },
  idAndScanView: {
    padding: AppSizes.padding,
    marginBottom: 10,
  },
  referenceIdView: {
    justifyContent: 'flex-end',
  },
  referenceIdTextView: {
    marginBottom: 5,
  },
  qrScanView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 7,
  },
  buttonTouch: {
    borderWidth: 1,
    borderColor: AppColors.brand.secondary,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    height: AppStyles.windowSize.width * 0.21,
    width: AppStyles.windowSize.width * 0.21,
  },
  buttonTouchView: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 3,
  },
  idInputBoxStyle: {
    marginTop: 10,
    borderWidth: 1,
    borderRadius: 0,
    height: 40,
    borderColor: AppColors.brand.primary,
    padding: 10,
  },
  locateRequestButtonView: {
    marginHorizontal: AppSizes.padding,
  },
  onLineStatus: {
    padding: AppSizes.padding,
    backgroundColor: AppColors.brand.accent,
    flexDirection: 'row',
  },
  textOnlineView: {
    flex: 4,
  },
  buttonView: {
    flex: 2,
    justifyContent: 'center',
  },
  buttonIcon: {
    fontSize: 30,
    color: AppColors.brand.primary,
  },
  buttonMainView: {
    alignItems: 'center',
  },
  buttonSpace: {
    marginLeft: 20,
    
  },
  onLineOfflineStatus: {
    paddingHorizontal: AppSizes.padding,
    backgroundColor: AppColors.brand.secondary,
    minHeight: 75,
  },
  switchView: {
    alignItems: 'center',
    flex: 4,
  },
  offLineView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch',
    marginTop: 70,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 25,
    marginRight: 5,
  },
  onlineStatusView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dsmMcaStatusView: {
    flexDirection: 'row',
  },
  typeView: {
    flex: 1,
  },
  buttobnLoadingView: {
    justifyContent: 'center',
  },
  dsmMcaStatusMainView: {
    backgroundColor: AppColors.darkGray,
    alignItems: 'center',
    justifyContent: 'center',
    height: 120,
  },
  offlineButton: {
    height: 20,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#FFFFFF10',
    backgroundColor: '#FFFFFF10',
  },
  contentSubView: {
    flex: 1,
    backgroundColor: AppColors.background,
  },
  barIconView: {
    alignSelf: 'flex-end',
    paddingVertical: 10,
  },
  switch: {
    marginLeft: 10,
  },
});
