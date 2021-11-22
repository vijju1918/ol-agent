/**
 * Copyright (c) 2018-present, Oleum. All rights reserved.
 *
 */

'use strict';

import {StyleSheet} from 'react-native';
import {AppColors} from '@theme';

export default StyleSheet.create({
  locationItemMainView: {
    flexDirection: 'row',
  },
  addressView: {
    flex: 3,
    justifyContent: 'center',
  },
  iconView: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  lcoationIcon: {
    fontSize: 25,
    color: AppColors.drawerIcons,
    marginLeft: 15,
  },
  addressText: {
    marginTop: 10,
  },
  labelText: {
    color: AppColors.brand.secondary,
  },
  locationLabel: {
    backgroundColor: AppColors.brand.accentSecondary,
    alignSelf: 'flex-start',
    padding: 5,
    paddingHorizontal: 10,
  },
});
