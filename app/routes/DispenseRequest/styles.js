/**
 * Copyright (c) 2018-present, Oleum. All rights reserved.
 *
 */

'use strict';

import {StyleSheet, Platform} from 'react-native';
import {AppColors, AppSizes, AppStyles} from '@theme';

export default StyleSheet.create({
  locationDateView: {
    flexDirection: 'row',
    marginLeft: AppSizes.padding,
    marginRight: AppSizes.padding,
    marginTop: 10,
  },
  locationView: {
    flex: 1,
    marginHorizontal: AppSizes.padding,
    // marginRight: 5,
    // backgroundColor: "red"
  },
  dateView: {
    flex: 1,
  },
  locationContentView: {
    flexDirection: 'row',
    justifyContent: 'center',
    borderBottomWidth: 1,
    marginTop: 5,
  },
  locationTextView: {
    flex: 4,
    justifyContent: 'center',
  },
  locationIconView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginRight: 5,
  },
  locationTex: {
    marginTop: 5,
    marginBottom: 5,
  },
  labelText: {
    marginTop: 7,
  },
  centerAlignedText: {
    textAlign: 'center',
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
  scrollViewProductListContentContainer: {
    paddingLeft: 15,
    paddingRight: 5,
  },
  productListView: {
    marginTop: 5,
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
  controlSectionMainView: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    padding: AppSizes.padding,
    paddingBottom: 10,
    marginBottom: 1,
    marginTop: 5,
  },
  controlButtonView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  controlLabelView: {
    flex: 1,
    justifyContent: 'center',
  },
  nameInput: {
    color: '#000000',
    fontWeight: '500',
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        height: 35,
      },
      android: {
        height: 45,
      },
    }),
  },
  iconView: {
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  iconCircleView: {
    width: 40,
    height: 40,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: AppColors.drawerIcons,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconCircleViewDisabled: {
    width: 40,
    height: 40,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: AppColors.border,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  countInputView: {
    flex: 2,
    justifyContent: 'center',
    marginLeft: 15,
    marginRight: 10,
    borderWidth: 1,
  },
  typeSelectTouch: {
    flexDirection: 'row',
  },
  typeTextView: {
    flex: 3,
    justifyContent: 'center',
  },
  typeIconView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  seperator: {
    marginLeft: 10,
  },
  canListView: {
    flexDirection: 'row',
    borderRadius: 3,
    backgroundColor: '#FFFFFF',
  },
  canItemView: {
    flex: 6,
    justifyContent: 'center',
    paddingTop: 5,
    paddingBottom: 5,
  },
  canIconView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  vendorView: {
    marginLeft: AppSizes.padding,
    marginRight: AppSizes.padding,
    marginTop: 15,
    marginBottom: 5,
  },
  canListSelectTouch: {
    marginTop: 10,
    borderColor: AppColors.brand.accentSecondary,
    borderWidth: 1,
    paddingLeft: 15,
    paddingVertical: 7,
  },
  roListView: {
    paddingTop: 15,
    backgroundColor: AppColors.background,
  },
  roListHeaderView: {
    flexDirection: 'row',
    // marginBottom: 10,
    backgroundColor: AppColors.brand.accentSecondary,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  roListHeadingView: {
    flex: 1,
  },
  roListFilterIconView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  buttonView: {
    margin: 10,
  },
  inputUnderline: {
    height: 1,
    backgroundColor: AppColors.border,
  },
  noSBUView: {
    marginTop: 10,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  infoView: {
    flexDirection: 'row',
    backgroundColor: AppColors.brand.secondary,
    paddingHorizontal: AppSizes.padding,
    paddingVertical: 10,
  },
  infoTextView: {
    flex: 1,
  },
  inputField: {
    height: 50,
    justifyContent: 'center',
    marginLeft: 5,
  },
  line: {
    height: 1,
    backgroundColor: '#000000',
    marginHorizontal: 15,
  },
  productTitleView: {
    marginBottom: 10,
    marginLeft: 15,
  },
  disclaimerView: {
    backgroundColor: '#00000020',
    marginTop: 15,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  selectVehicleMainView: {
    marginBottom: 5,
    marginTop: 5,
  },
  selectVehicleView: {
    marginTop: 10,
    marginHorizontal: AppSizes.padding,
    paddingLeft: 15,
    paddingVertical: 15,
    borderColor: AppColors.brand.accentSecondary,
    borderWidth: 1,
  },
  selectVehicleLabelView: {
    marginHorizontal: AppSizes.padding,
  },
  vehicleListView: {
    flexDirection: 'row',
    borderRadius: 3,
  },
  vehicleItemView: {
    flex: 6,
    justifyContent: 'center',
    paddingTop: 5,
    paddingBottom: 5,
  },
  downIconView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  locationSearchView: {
    flex: 1,
    marginHorizontal: AppSizes.padding,
    marginBottom: 5,
  },
  locationSearchContentView: {
    flexDirection: 'row',
    // backgroundColor: 'red',
    // borderRadius: 3,
    justifyContent: 'center',
    borderWidth: 1,
    marginTop: 10,
    paddingHorizontal: 10,
    paddingVertical: 7,
  },
  searchIcon: {
    fontSize: 18,
  },
  noNearByView: {
    paddingHorizontal: 15,
    marginVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: "red"
  },
  loadingView: {
    marginTop: 15,
  },
  divideLine: {
    marginVertical: 5,
  },
});
