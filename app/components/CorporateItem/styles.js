/**
 * Copyright (c) 2018-present, Evolvier Technologies. All rights reserved.
 *
 */

'use strict';

import {StyleSheet} from 'react-native';
import {AppColors} from '@theme';

export default StyleSheet.create({
  corporateMainView: {
    flexDirection: 'row',
  },
  imageView: {
    flex: 2,
    alignSelf: 'center',
    marginLeft: 5,
    justifyContent: 'center',
  },
  nameView: {
    flex: 7,
    alignSelf: 'center',
    marginLeft: 4,
  },
  corporateImage: {
    width: 50,
    height: 50,
    borderRadius: 5,
  },
  nameText: {
    color: AppColors.textPrimary,
  },
});
