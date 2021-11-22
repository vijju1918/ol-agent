/**
 * Copyright (c) 2018-present, Evolvier Technologies. All rights reserved.
 *
 */

'use strict';

import {StyleSheet} from 'react-native';
import {AppStyles, AppColors} from '@theme';

export default StyleSheet.create({
  contentView: {
    position: 'absolute',
    backgroundColor: '#FFFFFF',
    width: AppStyles.windowSize.width - 30,
  },
  alignCentre: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  dataView: {
    paddingTop: 40,
    paddingBottom: 40,
    paddingLeft: 10,
    paddingRight: 10,
    alignItems: 'center',
  },
  appLogo: {
    height: AppStyles.windowSize.width * 0.2,
    width: AppStyles.windowSize.width * 0.5,
  },
  submitButtonTouch: {
    backgroundColor: AppColors.brand.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  submitButton: {
    margin: 20,
  },
  footerTouch: {
    flexDirection: 'row',
  },
});
