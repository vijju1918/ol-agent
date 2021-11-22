/**
 * Copyright (c) 2018-present, Evolvier Technologies. All rights reserved.
 *
 */

'use strict';

import {StyleSheet} from 'react-native';
import {AppSizes, AppColors} from '@theme';

export default StyleSheet.create({
  sbuRatingItem: {
    marginBottom: 10,
    paddingHorizontal: AppSizes.padding,
    borderColor: AppColors.border,
    backgroundColor: '#FFFFFF',
  },
  ratingView: {
    // justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 5,
  },
  ratingTextView: {
    // flex: 1,
    justifyContent: 'center',
  },
  ratingStarView: {
    flex: 3,
  },
  sbuRatingTextView: {
    marginBottom: 5,
  },
  sbuRatingContentContainerStyle: {
    paddingTop: 10,
    marginBottom: 20,
  },
  ratingStar: {
    alignSelf: 'flex-start',
    marginLeft: 10,
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  corporateTypeName: {
    marginTop: 10,
  },
  line: {
    marginVertical: 10,
  },
  infoView: {
    backgroundColor: AppColors.brand.secondary,
    paddingVertical: 10,
    paddingHorizontal: AppSizes.padding,
    marginBottom: 5,
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
    marginLeft: 5,
  },
});
