/**
 * Copyright (c) 2018-present, Evolvier Technologies. All rights reserved.
 *
 */

'use strict';

import {StyleSheet, Platform} from 'react-native';
import {AppStyles, AppColors} from '@theme';

export default StyleSheet.create({
  vendorLogo: {
    width: AppStyles.windowSize.width * 0.15,
    height: AppStyles.windowSize.width * 0.15,
    borderRadius: 100,
    marginTop: 10,
    overflow: 'hidden',
  },
  corporateDetailsMainView: {
    marginTop: 5,
    flex: 1,
  },
  logoView: {
    justifyContent: 'center',
    flex: 1,
  },
  logoAndTitleView: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  titleView: {
    flex: 5,
    marginLeft: 20,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  titleText: {
    flexWrap: 'wrap',
  },
  letterView: {
    backgroundColor: AppColors.brand.secondary,
    width: AppStyles.windowSize.width * 0.15,
    height: AppStyles.windowSize.width * 0.15,
    borderRadius: 100,
    marginTop: 10,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleLetterText: {
    marginTop: Platform.OS === 'ios' ? 5 : 0,
  },
});
