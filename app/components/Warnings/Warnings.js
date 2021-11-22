/**
 * Copyright (c) 2018-present, Evolvier Technologies. All rights reserved.
 *
 */

import React, {Component} from 'react';
import {
  Text,
  View,
  Animated,
  Easing,
  TouchableHighlight,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';

import styles from './styles';
import {AppStyles} from '@theme';

const WINDOW = Dimensions.get('window');

class Warnings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: '',
      startDelta: -130,
      endDelta: 0,
    };
    this.animatedValue = new Animated.Value(0);
  }

  animate(toValue) {
    this.animatedValue.setValue(0);
    Animated.timing(this.animatedValue, {
      toValue: toValue,
      duration: 500,
      easing: Easing.elastic(1),
      friction: 9,
    }).start();
  }

  alert(message) {
    let timeout = this.props.timeout ? this.props.timeout : 3000;
    setTimeout(() => this.dismiss(), timeout);
    this.setState({
      message: message,
    });
    this.animate(1);
  }

  dismiss() {
    this.animate(0);
  }

  onLayoutEvent(event) {
    let {x, y, width, height} = event.nativeEvent.layout; // eslint-disable-line no-unused-vars
    let actualStartDelta = this.state.startDelta;
    let actualEndDelta = this.state.endDelta;
    if (this.props.startDelta < 0) {
      let delta = 0 - height;
      if (delta !== this.props.startDelta) {
        actualStartDelta = delta;
      }
    } else if (this.props.startDelta > WINDOW.height) {
      actualStartDelta = WINDOW.height + height;
    }
    if (this.props.endDelta < 0) {
      actualEndDelta = 0;
    } else if (this.props.endDelta > WINDOW.height) {
      actualEndDelta = WINDOW.height - height;
    }
    let heightDelta = WINDOW.height - this.props.endDelta - height;
    if (heightDelta < 0) {
      actualEndDelta = this.props.endDelta + heightDelta;
    }
    if (
      actualStartDelta !== this.state.startDelta ||
      actualEndDelta !== this.state.endDelta
    ) {
      this.setState({
        startDelta: actualStartDelta,
        endDelta: actualEndDelta,
      });
    }
  }

  render() {
    return (
      <Animated.View
        style={[
          styles.warningView,
          {
            backgroundColor: this.props.bgc,
          },
          {
            transform: [
              {
                translateY: this.animatedValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: [this.state.startDelta, this.state.endDelta],
                }),
              },
            ],
          },
        ]}>
        <TouchableHighlight onLayout={event => this.onLayoutEvent(event)}>
          <View style={styles.mainView}>
            <View style={styles.textView}>
              <Text style={[AppStyles.baseText, styles.messageText]}>
                {this.state.message}
              </Text>
            </View>
            <View style={styles.iconView}>
              <TouchableOpacity onPress={() => this.dismiss()}>
                <MaterialIcons style={styles.iconImage} name="close" />
              </TouchableOpacity>
            </View>
          </View>
        </TouchableHighlight>
      </Animated.View>
    );
  }
}

Warnings.propTypes = {
  bgc: PropTypes.string.isRequired,
};

export default Warnings;
