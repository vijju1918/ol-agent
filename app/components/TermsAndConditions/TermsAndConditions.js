/**
 * Copyright (c) 2018-present, Evolvier Technologies. All rights reserved.
 *
 */
'use strict';

import React, {Component} from 'react';

import {View, Text, TouchableOpacity} from 'react-native';
import {Actions} from 'react-native-router-flux';
import PropTypes from 'prop-types';
import CheckBox from 'react-native-checkbox-heaven';
import NavBarTitle from '@components/NavBarTitle';

import styles from './styles';
import {AppColors, AppStyles} from '@theme';
import AppStrings from '@config/strings';

class TermsAndConditions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      checked: false,
    };
  }

  handleOnChange(value) {
    this.props.onPressCheckBox(value);
  }

  render() {
    return (
      <View>
        <TouchableOpacity
          onPress={() =>
            Actions.webViewPage({
              renderTitle: (
                <NavBarTitle title={AppStrings.termsAndConditions} />
              ),
              url: this.props.url,
              actionComplete: () => {},
            })
          }>
          <View>
            <Text style={[AppStyles.regularText, styles.termsTextStyle]}>
              Promoter Terms & Conditions
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.handleOnChange()}>
          <View style={styles.agreeCheckBoxview}>
            <View>
              <CheckBox
                iconSize={25}
                iconName="matMix"
                checked={this.props.status}
                checkedColor={AppColors.brand.secondary}
                uncheckedColor={AppColors.border}
                onChange={this.handleOnChange.bind(this)}
                disabled={false}
                disabledColor={AppColors.border}
                labelStyle={[AppStyles.regularText, styles.agreementTextStyle]}
                label={AppStrings.agreementText}
              />
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

TermsAndConditions.propTypes = {
  onPressCheckBox: PropTypes.func.isRequired,
  status: PropTypes.bool.isRequired,
  url: PropTypes.string.isRequired,
};

export default TermsAndConditions;
