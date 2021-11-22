/**
 * Copyright (c) 2018-present, Evolvier Technologies. All rights reserved.
 *
 */
'use strict';

import React, {Component} from 'react';

import {TextField} from 'react-native-material-textfield';
import PropTypes from 'prop-types';

import {AppColors, AppStyles, AppFonts} from '@theme';

class CustomTextInput extends Component {
  componentDidUpdate(prevProps, prevState, snapshot) {
    this.text.setValue(this.props.value);
  }

  render() {
    const props = this.props;
    return (
      <TextField
        lineWidth={1}
        disabledLineType="solid"
        baseColor={AppColors.brand.primary}
        tintColor={AppColors.brand.primary}
        labelTextStyle={AppStyles.regularText}
        fontSize={AppFonts.base.size}
        ref={ref => {
          this.text = ref;
        }}
        {...props}
      />
    );
  }
}

CustomTextInput.propTypes = {
  placeholder: PropTypes.string,
};

export default CustomTextInput;
