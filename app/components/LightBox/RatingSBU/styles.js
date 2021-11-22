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
    backgroundColor: AppColors.brand.secondary,
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
  },
  ratingImage: {
    width: 120,
    height: 120,
    margin: 10,
  },
  submitButtonTouch: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5,
  },
  submitButton: {
    margin: 15,
    paddingVertical: 3,
  },
  skipTouch: {
    backgroundColor: AppColors.lightGray,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomLeftRadius: 5,
  },
  footerTouch: {
    marginTop: 20,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    flexDirection: 'row',
  },
  ratingView: {
    marginVertical: 15,
    overflow: 'hidden',
  },
  starContainerStyle: {
    backgroundColor: 'green',
  },
  starStyle: {
    marginRight: 5,
  },
});
