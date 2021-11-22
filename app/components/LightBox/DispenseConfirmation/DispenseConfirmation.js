/**
 * Copyright (c) 2018-present, Evolvier Technologies. All rights reserved.
 *
 */

'use strict';

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text, TextInput} from 'react-native';

import Button from '@components/Button';
import styles from './styles';
import {AppStyles} from '@theme';
import AppStrings from '@config/strings';

class DispenseConfirmation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      quantity: this.props.defaultValue,
    };
  }

  agentReceipt() {
    this.props.onPressOK(this.state.quantity);
    this.props.onBack();
  }
  render() {
    return (
      <View style={AppStyles.lightBoxBg}>
        <View style={styles.lightBoxContent}>
          <View style={styles.labelText}>
            <Text style={[AppStyles.titleBoldText, AppStyles.darkText]}>
              Quantity
            </Text>
          </View>
          <View style={styles.labelText}>
            <Text style={AppStyles.regularText}>{this.props.message}</Text>
          </View>
          <View style={styles.inputAndButtonView}>
            <View style={styles.inputView}>
              <TextInput
                style={[AppStyles.titleBoldText, styles.textAlign]}
                keyboardType="numeric"
                autoFocus={true}
                value={this.state.quantity}
                onChangeText={value =>
                  this.setState({
                    quantity: value,
                  })
                }
              />
              <View style={AppStyles.horizontalLine} />
            </View>
            <View style={styles.buttonView}>
              <Button
                buttonText={AppStrings.completeOrder}
                onPress={() => this.agentReceipt()}
              />
            </View>
          </View>
        </View>
      </View>
    );
  }
}

DispenseConfirmation.propTypes = {
  onPressOK: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
  defaultValue: PropTypes.string.isRequired,
};

export default DispenseConfirmation;
