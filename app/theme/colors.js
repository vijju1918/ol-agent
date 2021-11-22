/**
 * Copyright (c) 2018-present, Evolvier Technologies. All rights reserved.
 *
 */

'use strict';

const app = {
  // background: "#E9EBEE",
  background: '#FFFFFF',
  navBarIcons: '#787C87',
  navBarTitle: '#787C87',
  // statusBarBg: '#faac04',
  statusBarBg: '#000000',
  statusBarStyle: 'light-content',
  inputUnderline: '#EFEDED',
  inputLable: '#777777',
  drawerIcons: '#000000',
  whiteIcon: '#FFFFFF',
  iconBg: '#FFFFFF30',
  buttonBg: '#00000005',
  gray: '#E0DDDD',
  border: '#E0DDDD',
  lightGray: '#EFEDED',
  xtralightGray: '#EBEBEB',
  darkGray: '#4A4D5B',
  link: '#4764DD',
  video: '#E23B6E',
  other: '#38A590',
  red: '#ef5350',
  blackLine: '#4a4a48',

  // UnderLay Colors

  underlayYellow: '#F3C133',

  // Pormo Criteria Colors

  fuelColor1: '#ED5270',
  fuelColor2: '#DE4260',
  materialColor1: '#54BCEA',
  materialColor2: '#45B0E0',
  valueColor1: '#905FC9',
  valueColor2: '#7C48B9',
};

const brand = {
  brand: {
    primary: '#000000',
    secondary: '#F9CF2F',
    accentSecondary: '#ffe7ac',
  },
};

const text = {
  // textPrimary: '#313e44',
  textPrimary: '#000000',
  textSecondary: '#4a4a48',
  headingPrimary: brand.brand.primary,
  headingSecondary: brand.brand.primary,
  disabled: '#A7A5A5',
  whiteText: '#FFFFFF',
  labelBg: '#FFFFFF',
};

export default {
  ...app,
  ...brand,
  ...text,
};
