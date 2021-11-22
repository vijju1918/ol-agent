/**
 * Copyright (c) 2018-present, Evolvier Technologies. All rights reserved.
 *
 */

'use strict';

import {StyleSheet, Platform} from 'react-native';
import {AppColors} from '@theme';

export default StyleSheet.create({
  buttonTouch: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.8,
  },
  buttonText: {
    marginTop: Platform.OS === 'ios' ? 12 : 10,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  buttonTouchDisabled: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: AppColors.border,
  },
});
