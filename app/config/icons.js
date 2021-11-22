/**
 * Copyright (c) 2017-present, PotluckHub. All rights reserved.
 *
 */

'use strict';

import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {AppStyles} from '@theme';
import DRCountIcon from '@components/DRCountIcon';

export function TabIcon({title, focused}) {
  switch (title) {
    case 'Oleum':
      return (
        <MaterialCommunityIcons
          style={focused ? AppStyles.tabIconSelected : AppStyles.tabIconDefault}
          name="home"
        />
      );
    case 'DR':
      return <DRCountIcon focused={focused} />;
    case 'My Can':
      return (
        <MaterialCommunityIcons
          style={focused ? AppStyles.tabIconSelected : AppStyles.tabIconDefault}
          name="fuel"
        />
      );
    case 'Transfer':
      return (
        <MaterialCommunityIcons
          style={focused ? AppStyles.tabIconSelected : AppStyles.tabIconDefault}
          name="swap-horizontal"
        />
      );
    case 'Donate':
      return (
        <MaterialCommunityIcons
          style={focused ? AppStyles.tabIconSelected : AppStyles.tabIconDefault}
          name="wallet-giftcard"
        />
      );
    default:
      return null;
  }
}
