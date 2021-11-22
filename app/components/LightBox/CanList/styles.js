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
    bottom: 0,
    backgroundColor: '#FFFFFF',
    width: AppStyles.windowSize.width,
    maxHeight: AppStyles.windowSize.height * 0.8,
  },
  labelText: {
    marginBottom: 20,
  },

  drCanListItem: {
    backgroundColor: AppColors.brand.accentSecondary,
    padding: 10,
    paddingVertical: 15,
  },
  canListItem: {
    padding: 10,
    paddingVertical: 15,
  },
});
