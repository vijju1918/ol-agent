/**
 * Copyright (c) 2018-present, Evolvier Technologies. All rights reserved.
 *
 */

'use strict';

import {StyleSheet} from 'react-native';
import {AppColors, AppFonts} from '@theme';

export default StyleSheet.create({
  mainView: {
    marginTop: 10,
    flex: 1,
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
  inputContainerStyle: {
    marginTop: -35,
    paddingBottom: 3,
  },
  paddingStyle: {
    paddingLeft: 38,
  },
  paddingWithoutIconStyle: {
    marginTop: -30,
  },
  icons: {
    padding: 2,
    color: AppColors.brand.secondary,
  },
  leftAccessoryText: {
    marginBottom: 2.75,
    marginRight: 3,
    fontSize: AppFonts.base.size,
  },
  iconWrapView: {
    width: 30,
    height: 30,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: AppColors.brand.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
