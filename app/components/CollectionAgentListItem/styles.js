/**
 * Copyright (c) 2018-present, Evolvier Technologies. All rights reserved.
 *
 */

'use strict';

import {StyleSheet} from 'react-native';
import {AppColors} from '@theme';

export default StyleSheet.create({
  collectionPointMainView: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    marginVertical: 5,
    borderWidth: 1,
    borderColor: AppColors.border,
    borderRadius: 5,
    padding: 10,
  },

  collectionPointDataView: {
    flex: 3.2,
  },
  imageNameView: {
    flexDirection: 'row',
  },
  imageView: {
    flex: 0.8,
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 5,
  },
  buttonIcon: {
    fontSize: 30,
    marginBottom: 6,
    color: AppColors.border,
  },
  promoTitleView: {
    flex: 4,
    justifyContent: 'center',
    marginLeft: 10,
  },
  distanceText: {
    marginTop: 10,
    flexDirection: 'row',
  },
  ratingValueView: {
    marginTop: 7,
    flexDirection: 'row',
    flex: 1,
  },
  ratingNumView: {
    marginLeft: 3,
  },
  ratingView: {
    marginTop: 1,
  },
  ratingAndLocationView: {
    alignItems: 'center',
  },
});
