/**
 * Copyright (c) 2018-present, Evolvier Technologies. All rights reserved.
 *
 */

'use strict';
import {StyleSheet} from 'react-native';

import {AppSizes, AppColors} from '@theme';

export default StyleSheet.create({
  mainView: {
    // marginHorizontal: AppSizes.padding,
  },
  dispensationContentContainerStyle: {
    paddingVertical: 10,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionHeaderView: {
    backgroundColor: AppColors.brand.accentSecondary,
    paddingVertical: 10,
    paddingHorizontal: AppSizes.padding,
    marginBottom: 10,
  },
  loadMoreLoadingView: {
    marginVertical: 10,
  },
  line: {
    marginVertical: 10,
  },
});
