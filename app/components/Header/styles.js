/**
 * Copyright (c) 2018-present, Oleum. All rights reserved.
 *
 */

'use strict';

import {StyleSheet, Platform} from 'react-native';
import {AppColors, AppSizes, AppStyles} from '@theme';

export default StyleSheet.create({
  controlMainView: {
    flexDirection: 'row',
    backgroundColor: AppColors.brand.secondary,
    paddingTop: 5,
    paddingBottom: 10,
    paddingRight: AppSizes.padding,
    height: 70,
  },
  fpMainView: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 10 : 0,
    justifyContent: 'center',
    marginLeft: AppSizes.padding,
  },
  fpView: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  fpText: {
    marginBottom: 5,
  },
  textLeftMargin: {
    marginLeft: 7,
  },
  textLeftMarginSmall: {
    marginLeft: 3,
  },
  buttonView: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonTouch: {
    borderWidth: 1.5,
    borderColor: AppColors.brand.primary,
    borderRadius: 200,
    alignItems: 'center',
    marginBottom: 5,
    justifyContent: 'center',
    backgroundColor: AppColors.brand.secondary,
    height: AppStyles.windowSize.width * 0.1,
    width: AppStyles.windowSize.width * 0.1,
  },
  buttonTouchView: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 3,
  },
  buttonMainView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  buttonIcon: {
    fontSize: 20,
  },
  buttonSpacing: {
    width: 10,
  },
  loadingStyle: {
    alignSelf: 'center',
    alignItems: 'center',
    marginLeft: 20,
  },
  loadingText: {
    marginLeft: 10,
  },
  loadingView: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  addFPMainView: {
    marginTop: 5,
    justifyContent: 'center',
  },
  addIconView: {
    backgroundColor: AppColors.brand.primary,
    borderRadius: 100,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 5,
  },
  addIcon: {
    color: AppColors.brand.secondary,
    padding: 5,
    fontSize: 15,
  },
  centerAlign: {
    alignItems: 'center',
  },
});
