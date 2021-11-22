/**
 * Copyright (c) 2018-present, Evolvier Technologies. All rights reserved.
 *
 */

'use strict';

import {StyleSheet} from 'react-native';
import {AppSizes} from '@theme';

export default StyleSheet.create({
  mainView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainSubView: {
    height: 50,
    width: 50,
    borderRadius: 30,
    marginLeft: AppSizes.padding,
    justifyContent: 'center',
  },
  backIcon: {
    padding: 0,
    fontSize: 30,
    color: '#FFFFFF',
  },
});
