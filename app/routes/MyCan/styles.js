/**
 * Copyright (c) 2018-present, Oleum. All rights reserved.
 *
 */

'use strict';

import {StyleSheet, Platform} from 'react-native';
import {AppStyles, AppSizes, AppColors} from '@theme';

export default StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  flatListView: {
    flex: 1,
  },
  listContentContainerStyle: {
    // paddingHorizontal: AppSizes.padding,
    // paddingVertical: 10,
  },
  canItemView: {
    marginVertical: AppSizes.padding,
  },
  dateView: {
    marginLeft: 10,
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  horizontalLine: {
    // marginVertical: 10,
    marginHorizontal: 10,
    height: 2,
  },
  canItemVieww: {
    // marginVertical: 5,
  },

  // can item component styles

  canItemMainView: {
    flexDirection: 'row',
    padding: 10,
  },
  mrCanItemMainView: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: AppColors.brand.accentSecondary,
    marginHorizontal: 10,
    marginVertical: 10,
  },
  canImage: {
    height: AppStyles.windowSize.width * 0.12,
    width: AppStyles.windowSize.width * 0.12,
    borderRadius: AppStyles.windowSize.width * 0.1,
  },
  canItemDetailsView: {
    flex: 1,
    marginLeft: 10,
  },
  lastUpdatedText: {
    marginTop: 3,
    color: '#00000050',
  },
  ratingView: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
  },
  starStyle: {
    marginRight: 5,
  },
  optionsView: {
    flexDirection: 'row',
    marginTop: 10,
  },
  optionsSpacingView: {
    width: 5,
  },
  dispenseIcon: {
    fontSize: 16,
  },
  fpAndDistanceView: {
    alignItems: 'center',
  },
  navigationIcon: {
    fontSize: 30,
    marginTop: 5,
    alignSelf: 'center',
  },
  distanceText: {
    marginTop: 5,
  },
  drCanDispenseRequestView: {
    backgroundColor: AppColors.brand.primary,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  dispenseRequestView: {
    backgroundColor: AppColors.brand.accentSecondary,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 0.5,
    borderColor: AppColors.brand.secondary,
  },
  tabView: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: AppColors.brand.secondary,
    borderBottomWidth: 1,
    borderColor: AppColors.brand.secondary,
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
  horizontalLineTap: {
    backgroundColor: AppColors.brand.secondary,
    height: 1,
  },
  letterView: {
    backgroundColor: AppColors.brand.secondary,
    height: AppStyles.windowSize.width * 0.12,
    width: AppStyles.windowSize.width * 0.12,
    borderRadius: AppStyles.windowSize.width * 0.1,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingView: {
    paddingVertical: 50,
  },
  noDataView: {
    marginTop: 100,
  },
  titleLetterText: {
    marginTop: Platform.OS === 'ios' ? 5 : 0,
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
  noRatingText: {
    color: AppColors.brand.secondary,
  },
});
