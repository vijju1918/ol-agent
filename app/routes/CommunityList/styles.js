/**
 * Copyright (c) 2018-present, Evolvier Technologies. All rights reserved.
 *
 */

'use strict';

import {StyleSheet} from 'react-native';
import {AppSizes, AppColors} from '@theme';

export default StyleSheet.create({
  mainView: {
    // marginHorizontal: AppSizes.padding
  },
  infoView: {
    backgroundColor: AppColors.brand.secondary,
    paddingHorizontal: AppSizes.padding,
    paddingVertical: 10,
  },
  listMainView: {
    marginHorizontal: AppSizes.padding,
    marginTop: 5,
    marginBottom: 5,
  },
  itemTouch: {},
  itemMainView: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  selectView: {
    marginRight: 10,
    height: 20,
    width: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: AppColors.brand.primary,
  },
  buttonsView: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: AppSizes.padding,
    marginTop: 30,
    marginHorizontal: AppSizes.padding,
  },
  buttonView: {
    flex: 1,
  },
  buttonSpacing: {
    width: 10,
  },
});
