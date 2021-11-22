/**
 * Copyright (c) 2018-present, Evolvier Technologies. All rights reserved.
 *
 */

'use strict';

import {StyleSheet, Platform} from 'react-native';
import {AppStyles} from '@theme';

export default StyleSheet.create({
  mainView: {
    flexDirection: 'row',
  },
  subtitle: {
    alignSelf: Platform.OS === 'ios' ? 'center' : 'flex-start',
  },
  titleImage: {
    width: AppStyles.windowSize.width * 0.25,
    height: 40,
  },
});
