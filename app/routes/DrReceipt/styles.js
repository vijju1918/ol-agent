/**
 * Copyright (c) 2018-present, Oleum. All rights reserved.
 *
 */

'use strict';

import {StyleSheet} from 'react-native';
import {AppSizes, AppColors} from '@theme';

export default StyleSheet.create({
  buttonView: {
    marginHorizontal: AppSizes.padding,
    marginBottom: AppSizes.padding,
    marginTop: 10,
  },
  infoView: {
    flexDirection: 'row',
    backgroundColor: AppColors.brand.secondary,
    alignItems: 'center',
    paddingVertical: 10,
    zIndex: 1,
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
    borderColor: 'black',
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonIcon: {
    fontSize: 30,
    color: 'black',
  },
  labelView: {
    backgroundColor: AppColors.brand.accentSecondary,
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  referrenceIdText: {
    marginBottom: 10,
    textAlign: 'center',
  },
  detailsTableView: {
    backgroundColor: '#FFFFFF',
  },
  QRView: {
    marginTop: 20,
  },
  doneTouch: {
    backgroundColor: AppColors.brand.secondary,
    alignItems: 'center',
    paddingVertical: 10,
  },
});
