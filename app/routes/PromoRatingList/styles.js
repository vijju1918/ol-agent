/**
 * Copyright (c) 2018-present, Evolvier Technologies. All rights reserved.
 *
 */

'use strict';

import {StyleSheet} from 'react-native';
import {AppSizes, AppColors} from '@theme';

export default StyleSheet.create({
  itemMainView: {
    flexDirection: 'row',
    marginHorizontal: AppSizes.padding,
    marginBottom: 10,
    backgroundColor: '#FFFFFF',
  },
  textView: {
    flex: 4,
  },
  ratingView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  promoRatingContentContainerStyle: {
    paddingTop: 10,
  },
  dateText: {
    marginTop: 20,
  },
  likeIconSelected: {
    color: AppColors.brand.secondary,
    fontSize: 30,
  },
  dislikeIconSelected: {
    color: AppColors.darkGray,
    fontSize: 30,
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  skippedSelected: {
    color: AppColors.drawerIcons,
    fontSize: 30,
  },
  likestatusView: {
    alignItems: 'center',
  },
  line: {
    marginTop: 10,
    marginBottom: 15,
  },
  infoView: {
    backgroundColor: AppColors.brand.secondary,
    paddingVertical: 10,
    paddingHorizontal: AppSizes.padding,
    marginBottom: 5,
  },
});
