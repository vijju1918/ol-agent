/**
 * Copyright (c) 2018-present, Oleum. All rights reserved.
 *
 */

'use strict';

import {StyleSheet} from 'react-native';
import {AppColors} from '@theme';

export default StyleSheet.create({
  roListItemMainView: {
    flexDirection: 'row',
    marginTop: 5,
    marginBottom: 5,
    backgroundColor: '#FFFFFF',
  },
  detailView: {
    flex: 3,
  },
  quantityFPView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ratingView: {
    flex: 2,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  nameView: {
    flex: 3,
    justifyContent: 'center',
  },
  nameRatingView: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  priceDistanceView: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 3,
    marginRight: 10,
  },
  ratingValueView: {
    // marginTop: 7,
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },
  ratingNumView: {
    marginLeft: 3,
    alignItems: 'center',
  },
  ratingStarView: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonIcon: {
    fontSize: 35,
  },
  buttonIconSmall: {
    fontSize: 20,
    marginTop: 7,
  },
  verticalLine: {
    backgroundColor: '#00000030',
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
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 3,
    alignSelf: 'flex-start',
    marginTop: 3,
  },
});
