/**
 * Copyright (c) 2018-present, Evolvier Technologies. All rights reserved.
 *
 */

'use strict';

import {StyleSheet} from 'react-native';
import {AppColors} from '@theme';

export default StyleSheet.create({
  mainView: {
    marginTop: 10,
    flex: 1,
  },
  textFieldLabelMainView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  labelView: {
    marginLeft: 7,
  },
  inputTouch: {
    flexDirection: 'row',
  },
  dropDownIconView: {
    width: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 7,
  },
  dropDownIcon: {
    fontSize: 30,
    marginBottom: -5,
  },
  inputFieldView: {
    flex: 1,
  },
  inputContainerStyle: {
    marginTop: -35,
    paddingBottom: 3,
  },
  icons: {
    padding: 2,
    color: AppColors.brand.secondary,
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
