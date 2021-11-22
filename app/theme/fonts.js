/**
 * Copyright (c) 2018-present, Evolvier Technologies. All rights reserved.
 *
 */

'use strict';

// function lineHeight(fontSize) {
//   const multiplier = (fontSize > 20) ? 0.1 : 0.33;
//   return parseInt(fontSize + (fontSize * multiplier), 10);
// }

const base = {
  size: 14,
  extraSmall: 8,
  small: 10,
  medium: 12,
  title: 16,
  large: 18,
  xlarge: 20,
  h1: 25,
  h2: 20,
  lineHeight: 0,
};

const fontFamily = {
  regular: 'HelveticaNeueLTStd-Roman',
  light: 'HelveticaNeueLTStd-Th',
  bold: 'HelveticaNeueLTStd-Bd',
  black: 'HelveticaNeueLTStd-Blk',
};

export default {
  base: {
    ...base,
  },
  fontFamily: {
    ...fontFamily,
  },
};
