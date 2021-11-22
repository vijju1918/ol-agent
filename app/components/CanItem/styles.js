/**
 * Copyright (c) 2018-present, Evolvier Technologies. All rights reserved.
 *
 */

'use strict';

import {StyleSheet, Platform} from 'react-native';
import {AppStyles, AppColors} from '@theme';

export default StyleSheet.create({
  canItemView: {
    flexDirection: 'row',
  },
  vendorNameView: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: 10,
    marginRight: 10,
  },
  updateText: {
    marginTop: 5,
  },
  vendorFpView: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  vendorLogo: {
    width: AppStyles.windowSize.width * 0.1,
    height: AppStyles.windowSize.width * 0.1,
    borderRadius: AppStyles.windowSize.width * 0.1,
  },
  letterView: {
    backgroundColor: '#FFFFFF',
    width: AppStyles.windowSize.width * 0.1,
    height: AppStyles.windowSize.width * 0.1,
    borderRadius: AppStyles.windowSize.width * 0.1,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: AppColors.brand.secondary,
  },
  titleLetterText: {
    marginTop: Platform.OS === 'ios' ? 5 : 0,
  },
});
