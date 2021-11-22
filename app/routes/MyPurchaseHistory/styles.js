/**
 * Copyright (c) 2018-present, Evolvier Technologies. All rights reserved.
 *
 */

'use strict';

import {StyleSheet} from 'react-native';

import {AppSizes, AppColors} from '@theme';

export default StyleSheet.create({
  promoItemMainView: {
    backgroundColor: '#FFFFFF',
    marginVertical: 5,
  },
  priceView: {
    flex: 3,
  },
  fpView: {
    flex: 2,
    marginLeft: 20,
  },
  outerView: {
    marginHorizontal: AppSizes.padding,
  },
  statusText: {
    marginTop: 10,
  },
  priceMianView: {
    flexDirection: 'row',
  },
  dateText: {
    marginBottom: 5,
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionHeaderView: {
    backgroundColor: AppColors.brand.accentSecondary,
    padding: AppSizes.padding,
    marginBottom: 10,
  },
  line: {
    marginVertical: 10,
  },
  grayLine: {
    marginVertical: 10,
    backgroundColor: AppColors.lightGray,
  },
  infoView: {
    backgroundColor: AppColors.brand.secondary,
    paddingVertical: 10,
    paddingHorizontal: AppSizes.padding,
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
  flatListView: {
    flex: 1,
  },
  purchaseListContentContainerStyle: {
    paddingBottom: 50,
  },
  refreshButton: {
    fontSize: 25,
  },
  refreshButtonTouch: {
    alignSelf: 'center',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  refreshLoadingView: {
    position: 'absolute',
    right: 0,
    left: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
