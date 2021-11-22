/**
 * Copyright (c) 2018-present, Evolvier Technologies. All rights reserved.
 *
 */

'use strict';

import {StyleSheet} from 'react-native';
import {AppColors} from '@theme';

export default StyleSheet.create({
  emptyView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  emptyTextView: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 15,
  },
  noItemImage: {},
  title: {
    color: AppColors.textPrimary,
    marginTop: 10,
    textAlign: 'center',
    fontSize: 20,
  },
});
