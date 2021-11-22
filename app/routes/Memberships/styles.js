/**
 * Copyright (c) 2018-present, Oleum. All rights reserved.
 *
 */

'use strict';

import {StyleSheet, Platform} from 'react-native';
import {AppColors, AppSizes, AppStyles} from '@theme';

export default StyleSheet.create({
  mainView: {
    // marginHorizontal: AppSizes.padding
  },
  tabView: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: AppColors.brand.secondary,
  },
  tabTouch: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  tabTouchSelected: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#FFFFFF',
  },
  horizontalLine: {
    backgroundColor: AppColors.brand.secondary,
    height: 2,
  },
  listContentContainerStyle: {
    padding: AppSizes.padding,
  },
  itemSeparator: {
    marginVertical: 15,
  },
  communityItemMainView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  communityLogo: {
    height: AppStyles.windowSize.width * 0.12,
    width: AppStyles.windowSize.width * 0.12,
    borderRadius: AppStyles.windowSize.width * 0.12,
  },
  communityDetailsView: {
    flex: 1,
    marginLeft: 15,
    marginRight: 10,
  },
  letterView: {
    backgroundColor: AppColors.brand.secondary,
    height: AppStyles.windowSize.width * 0.12,
    width: AppStyles.windowSize.width * 0.12,
    borderRadius: AppStyles.windowSize.width * 0.12,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },

  titleLetterText: {
    marginTop: Platform.OS === 'ios' ? 5 : 0,
  },
  fpView: {
    alignItems: 'flex-end',
  },
  nameView: {
    alignItems: 'center',
  },
  communityNameText: {
    marginLeft: 10,
  },
});
