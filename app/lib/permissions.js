/**
 * Copyright (c) 2018-present, Oleum. All rights reserved.
 *
 */

'use strict';

import {Platform} from 'react-native';
import {PERMISSIONS, check, request} from 'react-native-permissions';

export const checkLocationPermission = () => {
  if (Platform.OS === 'ios') {
    return check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
  } else {
    return check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
  }
};

export const requestLocationPermission = () => {
  if (Platform.OS === 'ios') {
    return request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
  } else {
    return request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
  }
};
