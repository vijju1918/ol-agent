/**
 * Copyright (c) 2018-present, Evolvier Technologies. All rights reserved.
 *
 */

'use strict';

import {Dimensions, Platform} from 'react-native';

const {width, height} = Dimensions.get('window');
const screenHeight = width < height ? height : width;
const screenWidth = width < height ? width : height;

export default {
  // Window Dimensions
  screen: {
    height: screenHeight,
    width: screenWidth,

    heightHalf: screenHeight * 0.5,
    heightThird: screenHeight * 0.333,
    heightTwoThirds: screenHeight * 0.666,
    heightQuarter: screenHeight * 0.25,
    heightThreeQuarters: screenHeight * 0.75,

    widthHalf: screenWidth * 0.5,
    widthThird: screenWidth * 0.333,
    widthTwoThirds: screenWidth * 0.666,
    widthQuarter: screenWidth * 0.25,
    widthThreeQuarters: screenWidth * 0.75,
  },
  navbarHeight: Platform.OS === 'ios' ? 64 : 54,
  statusBarHeight: Platform.OS === 'ios' ? 16 : 0,
  tabbarHeight: 51,

  padding: 15,
  paddingSml: 7,

  borderRadius: 3,
  borderWidth: 1,

  icons: 25,
  drawerIcons: 20,
};
