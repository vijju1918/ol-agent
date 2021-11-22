/**
 * Copyright (c) 2018-present, Evolvier Technologies. All rights reserved.
 *
 */

'use strict';

import React, {Component} from 'react';
import {View, ActivityIndicator} from 'react-native';
import PropTypes from 'prop-types';

import {AppColors} from '@theme';

class LoadingSmall extends Component {
  render() {
    return (
      <View>
        <ActivityIndicator
          size="small"
          color={this.props.color ? this.props.color : AppColors.brand.primary}
        />
      </View>
    );
  }
}

LoadingSmall.propTypes = {
  color: PropTypes.string.isRequired,
};

export default LoadingSmall;
