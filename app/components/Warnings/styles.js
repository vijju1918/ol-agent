/**
 * Copyright (c) 2018-present, Evolvier Technologies. All rights reserved.
 *
 */

'use strict';

import {StyleSheet} from 'react-native';
import {AppSizes} from '@theme';

export default StyleSheet.create({
  messageText: {
    margin: AppSizes.padding,
    marginVertical: AppSizes.padding + 10,
    color: '#FFFFFF',
  },
  warningView: {
    justifyContent: 'center',
    position: 'absolute',
    right: 0,
    left: 0,
    zIndex: 1,
  },
  mainView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textView: {
    flex: 7,
  },
  iconImage: {
    fontSize: 20,
    alignSelf: 'center',
    marginRight: 10,
    color: '#ffffff90',
  },
  iconView: {
    flex: 1,
  },
});
