/**
 * Copyright (c) 2018-present, Evolvier Technologies. All rights reserved.
 *
 */

'use strict';
import {Platform} from 'react-native';

import Colors from './colors';
import Fonts from './fonts';
import Sizes from './sizes';

export default {
  appContainer: {
    backgroundColor: '#000',
  },

  // Default
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: Colors.background,
  },
  containerWhite: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
  },
  containerCentered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  windowSize: {
    height: Sizes.screen.height,
    width: Sizes.screen.width,
  },

  // Aligning items
  leftAligned: {
    alignItems: 'flex-start',
  },
  centerAligned: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightAligned: {
    alignItems: 'flex-end',
  },

  // Text Styles
  regularText: {
    fontFamily: Fonts.fontFamily.regular,
    fontSize: Fonts.base.size,
    color: Colors.textPrimary,
  },
  regularLightText: {
    fontFamily: Fonts.fontFamily.light,
    fontSize: Fonts.base.size,
    color: Colors.textPrimary,
  },
  regularBoldText: {
    fontFamily: Fonts.fontFamily.bold,
    fontSize: Fonts.base.size,
    color: Colors.textPrimary,
  },
  regularBlackText: {
    fontFamily: Fonts.fontFamily.black,
    fontSize: Fonts.base.size,
    color: Colors.textPrimary,
  },
  titleText: {
    fontFamily: Fonts.fontFamily.regular,
    fontSize: Fonts.base.title,
    color: Colors.textPrimary,
  },
  titleBoldText: {
    fontFamily: Fonts.fontFamily.bold,
    fontSize: Fonts.base.title,
    color: Colors.textPrimary,
  },
  subTitleText: {
    fontFamily: Fonts.fontFamily.regular,
    fontSize: Fonts.base.title,
    color: Colors.textSecondary,
  },
  subTitleBoldText: {
    fontFamily: Fonts.fontFamily.bold,
    fontSize: Fonts.base.title,
    color: Colors.textSecondary,
  },
  semiLargeText: {
    fontFamily: Fonts.fontFamily.bold,
    fontSize: 24,
    color: Colors.textPrimary,
  },
  largeText: {
    fontFamily: Fonts.fontFamily.bold,
    fontSize: 30,
    color: Colors.textPrimary,
  },
  mediumText: {
    fontFamily: Fonts.fontFamily.light,
    fontSize: Fonts.base.medium,
    color: Colors.textPrimary,
  },
  mediumRegularText: {
    fontFamily: Fonts.fontFamily.regular,
    fontSize: Fonts.base.medium,
    color: Colors.textPrimary,
  },
  mediumBoldText: {
    fontFamily: Fonts.fontFamily.bold,
    fontSize: Fonts.base.medium,
    color: Colors.textPrimary,
  },
  smallText: {
    fontFamily: Fonts.fontFamily.regular,
    fontSize: Fonts.base.small,
    color: Colors.textPrimary,
  },
  smallBoldText: {
    fontFamily: Fonts.fontFamily.bold,
    fontSize: Fonts.base.small,
    color: Colors.textPrimary,
  },
  extraSmallText: {
    fontFamily: Fonts.fontFamily.regular,
    fontSize: 8,
    color: Colors.textSecondary,
  },
  extraSmallBoldText: {
    fontFamily: Fonts.fontFamily.bold,
    fontSize: 8,
    color: Colors.textSecondary,
  },
  labelText: {
    fontFamily: Fonts.fontFamily.bold,
    fontSize: Fonts.base.size,
    color: Colors.textPrimary,
  },
  // Helper Text Styles
  textCenterAligned: {
    textAlign: 'center',
  },
  textRightAligned: {
    textAlign: 'right',
  },
  upperCaseText: {
    textTransform: 'uppercase',
  },
  lowerCaseText: {
    textTransform: 'lowercase',
  },

  // Give me padding
  padding: {
    paddingVertical: Sizes.padding,
    paddingHorizontal: Sizes.padding,
  },
  paddingHorizontal: {
    paddingHorizontal: Sizes.padding,
  },
  paddingLeft: {
    paddingLeft: Sizes.padding,
  },
  paddingRight: {
    paddingRight: Sizes.padding,
  },
  paddingVertical: {
    paddingVertical: Sizes.padding,
  },
  paddingTop: {
    paddingTop: Sizes.padding,
  },
  paddingBottom: {
    paddingBottom: Sizes.padding,
  },
  paddingSml: {
    paddingVertical: Sizes.paddingSml,
    paddingHorizontal: Sizes.paddingSml,
  },
  paddingHorizontalSml: {
    paddingHorizontal: Sizes.paddingSml,
  },
  paddingLeftSml: {
    paddingLeft: Sizes.paddingSml,
  },
  paddingRightSml: {
    paddingRight: Sizes.paddingSml,
  },
  paddingVerticalSml: {
    paddingVertical: Sizes.paddingSml,
  },
  paddingTopSml: {
    paddingTop: Sizes.paddingSml,
  },
  paddingBottomSml: {
    paddingBottom: Sizes.paddingSml,
  },

  marginHorizontal: {
    marginHorizontal: Sizes.padding,
  },

  // General HTML-like Elements
  hr: {
    left: 0,
    right: 0,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    height: 1,
    backgroundColor: 'transparent',
    marginTop: Sizes.padding,
    marginBottom: Sizes.padding,
  },

  // Grid
  row: {
    left: 0,
    right: 0,
    flexDirection: 'row',
  },
  flex1: {
    flex: 1,
  },
  flex2: {
    flex: 2,
  },
  flex3: {
    flex: 3,
  },
  flex4: {
    flex: 4,
  },
  flex5: {
    flex: 5,
  },
  flex6: {
    flex: 6,
  },

  // Navbar
  navbar: {
    backgroundColor: Colors.brand.primary,
    borderBottomWidth: 0,
    ...Platform.select({
      ios: {
        shadowRadius: 0,
        shadowOffset: {
          height: 0,
          width: 0,
        },
        shadowColor: Colors.navBarIcons,
        shadowOpacity: 0.2,
      },
      android: {
        elevation: 0,
      },
    }),
  },
  navbarTransparent: {
    position: 'absolute',
    backgroundColor: 'transparent',
    zIndex: 100,
    top: 0,
    left: 0,
    right: 0,
    borderBottomWidth: 0,
    elevation: 0,
  },
  navbarShadow: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 0,
    ...Platform.select({
      ios: {
        shadowRadius: 2,
        shadowOffset: {
          height: 1,
          width: 1,
        },
        shadowColor: Colors.navBarIcons,
        shadowOpacity: 0.2,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  navbarTitle: {
    color: '#FFFFFF',
    fontFamily: Fonts.fontFamily.bold,
    fontSize: Fonts.base.xlarge,
  },
  navbarSubTitle: {
    color: Colors.navBarTitle,
    fontWeight: '500',
    fontFamily: Fonts.fontFamily.regular,
    fontSize: 15,
  },
  navbarButton: {
    tintColor: '#ffffff',
  },

  navBarRightTextButton: {
    color: '#FFFFFF',
    // fontWeight: "500",
    fontFamily: Fonts.fontFamily.regular,
    fontSize: Fonts.base.size,
  },

  // Icons

  icons: {
    fontSize: Sizes.icons,
    color: Colors.navBarIcons,
    // padding: 6,
  },

  navBarIcons: {
    fontSize: 22,
    color: Colors.brand.secondary,
    padding: 8,
  },

  lightIcons: {
    fontSize: Sizes.icons,
    color: Colors.drawerIcons,
    padding: 6,
  },

  drawerIcons: {
    fontSize: Sizes.drawerIcons,
    color: Colors.drawerIcons,
    padding: 15,
  },

  lightBoxBg: {
    position: 'absolute',
    right: 0,
    left: 0,
    top: 0,
    bottom: 0,
    backgroundColor: '#00000090',
  },

  buttonTouch: {
    borderRadius: 20,
  },
  appLogo: {
    height: Sizes.screen.width * 0.15,
    width: Sizes.screen.width * 0.15,
  },
  horizontalLine: {
    height: 0.5,
    backgroundColor: Colors.blackLine,
  },
  verticalLine: {
    width: 1,
    backgroundColor: Colors.blackLine,
  },
  separator: {
    height: 10,
    backgroundColor: Colors.inputUnderline,
  },
  tabIconSelected: {
    fontSize: 25,
    color: Colors.brand.primary,
  },
  tabIconDefault: {
    fontSize: 25,
    color: Colors.drawerIcons,
  },
  whiteText: {
    color: '#FFFFFF',
  },
  darkText: {
    color: Colors.textPrimary,
  },
  textSpace: {
    marginTop: 8,
  },
  countView: {
    position: 'absolute',
    height: 20,
    width: 20,
    borderRadius: 20,
    backgroundColor: Colors.brand.secondary,
    bottom: 0,
    // left: 0,
    right: 0,
    top: 0,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#000000',
    alignSelf: 'center',
  },
  inputContainerStyle: {
    marginTop: -10,
    paddingBottom: 0,
  },
  centerAlignText: {
    textAlign: 'center',
  },
  inputBoldFont: {
    fontWeight: '700',
  },
  alignCenter: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  waringBoxStyle: {
    backgroundColor: Colors.darkGray,
  },
};
