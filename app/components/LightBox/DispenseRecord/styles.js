/**
 * Copyright (c) 2018-present, Evolvier Technologies. All rights reserved.
 *
 */

'use strict';

import {StyleSheet} from 'react-native';
import {AppColors, AppSizes, AppStyles} from '@theme';

export default StyleSheet.create({
  lightBoxContent: {
    backgroundColor: 'white',
  },
  labelText: {
    marginTop: 20,
    marginHorizontal: 20,
  },
  inputAndButtonView: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginBottom: 20,
  },
  textAlign: {
    textAlign: 'center',
  },
  buttonView: {
    paddingHorizontal: AppSizes.padding,
    paddingVertical: 10,
  },
  infoView: {
    backgroundColor: AppColors.brand.secondary,
    paddingHorizontal: AppSizes.padding,
    paddingVertical: 10,
  },
  inputDetailsView: {
    paddingHorizontal: AppSizes.padding,
  },
  inputView: {
    marginTop: 10,
  },
  inputText: {
    color: AppColors.textPrimary,
  },
  productListView: {
    marginTop: 10,
    marginBottom: 10,
  },
  productTitleView: {
    marginBottom: 10,
    marginLeft: 15,
  },
  selectLabelText: {
    marginTop: 7,
  },
  scrollViewProductListContentContainer: {
    paddingLeft: 15,
    paddingRight: 5,
  },
  productView: {
    padding: 10,
    marginRight: 10,
    width: AppStyles.windowSize.width * 0.35,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: AppColors.border,
  },
  productSelectView: {
    backgroundColor: AppColors.brand.accentSecondary,
    padding: 10,
    marginRight: 10,
    width: AppStyles.windowSize.width * 0.35,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: AppColors.brand.secondary,
  },
  productNameText: {
    marginTop: 3,
    marginBottom: 3,
    color: AppColors.textPrimary,
    textAlign: 'center',
  },
  productPriceText: {
    textAlign: 'center',
    marginTop: 5,
  },
});
