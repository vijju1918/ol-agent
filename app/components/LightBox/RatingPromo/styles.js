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
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    width: AppStyles.windowSize.width - 30,
  },
  alignCentre: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  dataView: {
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    alignItems: 'center',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    backgroundColor: AppColors.brand.secondary,
  },
  ratingImage: {
    width: 120,
    height: 120,
    margin: 10,
  },
  submitButtonTouch: {
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomRightRadius: 5,
    flex: 1,
  },
  submitButton: {
    margin: 20,
    color: 'gray',
  },
  skipButton: {
    margin: 20,
    color: 'gray',
  },
  likeButtonMainView: {
    flexDirection: 'row',
    marginVertical: 25,
    marginTop: 35,
  },
  likeButtonView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  likeIconSelected: {
    color: AppColors.brand.primary,
    fontSize: 30,
  },
  likeIconDefault: {
    color: AppColors.brand.primary,
    fontSize: 30,
  },
  dislikeIconSelected: {
    color: AppColors.brand.primary,
    fontSize: 30,
  },
  dislikeIconDefault: {
    color: AppColors.brand.primary,
    fontSize: 30,
  },
  skipTouch: {
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomLeftRadius: 5,
  },
  footerTouch: {
    borderBottomLeftRadius: 5,
    flexDirection: 'row',
  },
});
