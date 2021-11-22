/**
 * Copyright (c) 2018-present, Evolvier Technologies. All rights reserved.
 *
 */

'use strict';

import {StyleSheet} from 'react-native';
import {AppColors} from '@theme';

export default StyleSheet.create({
  mainView: {
    marginTop: 5,
  },
  scrollView: {
    marginTop: 10,
    marginLeft: 37,
  },
  textFieldLabelMainView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  labelView: {
    marginLeft: 0,
  },
  icon: {
    height: 25,
    width: 25,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: AppColors.brand.primary,
  },
  selectItemMainView: {
    flexDirection: 'row',
    marginRight: 20,
    alignItems: 'center',
  },
  selectView: {
    height: 18,
    width: 18,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    backgroundColor: AppColors.brand.primary,
  },
  unSelectView: {
    height: 18,
    width: 18,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  checkedIcon: {
    fontSize: 16,
    color: AppColors.brand.secondary,
  },
  labelTextView: {
    marginLeft: 10,
  },
  iconView: {
    marginRight: 7,
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
