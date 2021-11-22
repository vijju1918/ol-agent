/**
 * Copyright (c) 2018-present, Oleum. All rights reserved.
 *
 */

'use strict';

import {StyleSheet} from 'react-native';
import {AppColors, AppSizes} from '@theme';

export default StyleSheet.create({
  infoView: {
    flexDirection: 'row',
    backgroundColor: AppColors.brand.secondary,
    alignItems: 'center',
    paddingVertical: 15,
    zIndex: 1,
  },
  infoMessageText: {
    marginHorizontal: 10,
  },
  qrView: {
    marginTop: 10,
  },
  labelView: {
    marginTop: 10,
    backgroundColor: AppColors.brand.accentSecondary,
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  buttonView: {
    marginHorizontal: AppSizes.padding,
    marginVertical: 10,
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
  },
});
