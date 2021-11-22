/**
 * Copyright (c) 2018-present, Evolvier Technologies. All rights reserved.
 *
 */

'use strict';

import {StyleSheet} from 'react-native';
import {AppColors} from '@theme';

export default StyleSheet.create({
  orderStatusMainView: {
    backgroundColor: AppColors.brand.secondary,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  statusAndReferenceIdView: {
    flex: 4,
    marginLeft: 20,
  },
  referenceidText: {
    marginTop: 5,
  },
  iconView: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    width: 40,
    borderRadius: 25,
    backgroundColor: '#FFFFFF30',
  },
  iconMainView: {
    borderWidth: 1.5,
    height: 40,
    width: 40,
    borderRadius: 25,
    borderColor: AppColors.brand.primary,
    borderStyle: 'dotted',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonIcon: {
    fontSize: 25,
    color: AppColors.brand.primary,
  },
});
