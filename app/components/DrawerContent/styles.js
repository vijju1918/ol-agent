/**
 * Copyright (c) 2018-present, Evolvier Technologies. All rights reserved.
 *
 */

'use strict';

import {StyleSheet} from 'react-native';
import {AppColors, AppSizes} from '@theme';

export default StyleSheet.create({
  profileHeaderView: {
    backgroundColor: AppColors.brand.secondary,
    paddingTop: 30,
    paddingBottom: 30,
    padding: AppSizes.padding,
  },
  profilePicView: {
    flex: 1.2,
  },
  profileNameView: {
    flex: 3,
    justifyContent: 'center',
  },
  profileNameText: {
    color: AppColors.brand.primary,
  },
  phoneNumberText: {
    marginTop: 5,
    color: AppColors.brand.primary,
  },
  profilePicImage: {
    width: 60,
    height: 60,
    borderRadius: 60,
  },
  drawerItemView: {
    flexDirection: 'row',
  },
  drawerItemNameView: {
    flex: 4,
    justifyContent: 'center',
  },
  iconView: {
    flex: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  drawerItemText: {
    marginTop: 15,
    marginBottom: 15,
  },
});
