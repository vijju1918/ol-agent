/**
 * Copyright (c) 2018-present, Evolvier Technologies. All rights reserved.
 *
 */

'use strict';

import {StyleSheet} from 'react-native';
import {AppColors, AppFonts} from '@theme';

export default StyleSheet.create({
  mainView: {
    flexDirection: 'row',
    marginLeft: 4,
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
    fontSize: 11,
    color: '#000000',
  },
  buttonMainView: {
    flexDirection: 'row',
    marginRight: 10,
  },
  centerAlign: {alignItems: 'center'},
});
