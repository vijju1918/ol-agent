/**
 * Copyright (c) 2018-present, Evolvier Technologies. All rights reserved.
 *
 */

'use strict';

import React, {Component} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {View, Text} from 'react-native';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react';

import DispenseRequestStore from '@stores/DispenseRequests';
import {AppStyles} from '@theme';

@observer
class DRCountIcon extends Component {
  render() {
    return (
      <View>
        <MaterialCommunityIcons
          style={
            this.props.focused
              ? AppStyles.tabIconSelected
              : AppStyles.tabIconDefault
          }
          name="oil"
        />
        {DispenseRequestStore.sortedList.length ? (
          <View style={AppStyles.countView}>
            <Text style={[AppStyles.extraSmallText, AppStyles.whiteText]}>
              {DispenseRequestStore.sortedList.length}
            </Text>
          </View>
        ) : null}
      </View>
    );
  }
}

DRCountIcon.propTypes = {
  focused: PropTypes.bool.isRequired,
};

export default DRCountIcon;
