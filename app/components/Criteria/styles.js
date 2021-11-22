/**
 * Copyright (c) 2018-present, Evolvier Technologies. All rights reserved.
 *
 */

'use strict';

import {StyleSheet} from 'react-native';
import {AppColors} from '@theme';

export default StyleSheet.create({
  mainView: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: AppColors.brand.secondary,
  },
  checkBoxAndRangeView: {
    flexDirection: 'row',
    flex: 1.7,
    paddingVertical: 15,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    backgroundColor: '#FFFFFF',
  },
  checkBoxView: {
    flex: 0.6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rangeView: {
    flex: 2,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  rangePaddingView: {
    flex: 2,
    marginLeft: 15,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  rewardView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    backgroundColor: AppColors.brand.secondary,
  },
  rangeText: {
    color: '#FFFFFF',
  },
});
