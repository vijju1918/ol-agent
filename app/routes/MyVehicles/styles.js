/**
 * Copyright (c) 2018-present, Oleum. All rights reserved.
 *
 */

'use strict';

import {StyleSheet} from 'react-native';
import {AppSizes, AppColors} from '@theme';

export default StyleSheet.create({
  infoView: {
    flexDirection: 'row',
    backgroundColor: AppColors.brand.secondary,
    paddingHorizontal: AppSizes.padding,
    paddingVertical: 10,
  },
  infoTextView: {
    flex: 1,
  },
  vehicleListView: {
    marginHorizontal: AppSizes.padding,
    marginTop: 10,
    marginBottom: 20,
  },
  horizontalLine: {
    backgroundColor: AppColors.brand.primary,
    marginTop: 5,
    marginBottom: 5,
  },
  displayView: {
    flex: 5,
    marginLeft: 5,
  },
  margin: {
    marginBottom: 5,
  },
  textFieldLabelMainView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconView: {
    marginRight: 7,
  },
  labelView: {
    flex: 1,
    height: 25,
    justifyContent: 'center',
  },
  icon: {
    height: 25,
    width: 25,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: AppColors.brand.primary,
  },
  expandedView: {
    marginTop: 5,
  },
  valueView: {
    marginLeft: 37,
  },
  labelText: {
    color: AppColors.textSecondary,
  },
  valueText: {
    fontSize: 16,
  },
  controlTouch: {
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  controlMainView: {
    backgroundColor: AppColors.brand.secondary,
    justifyContent: 'flex-end',
  },
  icons: {
    fontSize: 16,
    padding: 5,
  },
});
