/**
 * Copyright (c) 2018-present, Evolvier Technologies. All rights reserved.
 *
 */

'use strict';

import {StyleSheet} from 'react-native';
import {AppColors} from '@theme';

export default StyleSheet.create({
  contactMainView: {
    flexDirection: 'row',
  },
  imageView: {
    overflow: 'hidden',
  },
  nameView: {
    alignSelf: 'center',
    marginLeft: 20,
  },
  userImage: {
    width: 60,
    height: 60,
    borderRadius: 100,
    overflow: 'hidden',
  },
  nameText: {
    color: AppColors.textPrimary,
  },
});
