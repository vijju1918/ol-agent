/**
 * Copyright (c) 2018-present, Oleum. All rights reserved.
 *
 */

'use strict';

import {StyleSheet} from 'react-native';
import {AppSizes, AppColors} from '@theme';

export default StyleSheet.create({
  center: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: AppSizes.padding,
  },
  sectionHeaderView: {
    backgroundColor: AppColors.brand.accentSecondary,
    paddingVertical: 10,
    paddingHorizontal: AppSizes.padding,
    marginBottom: 15,
  },
  infoView: {
    backgroundColor: AppColors.brand.secondary,
    paddingVertical: 10,
    paddingHorizontal: AppSizes.padding,
  },
  rowItemView: {
    flex: 3,
    flexDirection: 'row',
    paddingHorizontal: AppSizes.padding,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginBottom: 10,
  },
  buttonIcon: {
    fontSize: 25,
  },
  iconViewSend: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  transactionDetailsTextView: {
    flex: 2.5,
    flexDirection: 'column',
    marginHorizontal: 10,
  },
  contentTextStyleView: {
    marginBottom: 5,
  },
  fuelPointsView: {
    flex: 2.5,
    flexDirection: 'column',
    marginHorizontal: 10,
    alignItems: 'flex-end',
  },
  line: {
    marginTop: 5,
    marginBottom: 10,
  },
  transferListContentContainerStyle: {
    paddingBottom: 50,
  },
});
