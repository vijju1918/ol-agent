/**
 * Copyright (c) 2018-present, Oleum. All rights reserved.
 *
 */

'use strict';

import {StyleSheet} from 'react-native';
import {AppColors} from '@theme';

export default StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  ratingView: {
    alignItems: 'center',
  },
  pinImage: {
    width: 30,
    height: 30,
  },
  calloutView: {
    minWidth: 200,
    maxWidth: 400,
    paddingVertical: 5,
  },
  starIcon: {
    fontSize: 15,
    color: AppColors.brand.primary,
    marginRight: 3,
  },
  ratingCountText: {
    marginLeft: 5,
  },
  starIconWrapper: {
    alignItems: 'center',
    backgroundColor: AppColors.brand.secondary,
    paddingHorizontal: 3,
    paddingVertical: 2,
    borderRadius: 3,
    marginTop: 5,
    alignSelf: 'flex-start',
  },
  rateCountView: {
    justifyContent: 'center',
    marginTop: 5,
  },
});
