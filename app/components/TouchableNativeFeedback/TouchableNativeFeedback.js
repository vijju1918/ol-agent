import React, {Component} from 'react';
import {TouchableNativeFeedback} from 'react-native';
import {_} from 'underscore';

export default class TouchableNativeFeedbackWrapper extends Component {
  onPress() {
    requestAnimationFrame(() => {
      this.props.onPress && this.props.onPress();
    });
  }

  render() {
    const {...props} = this.props;
    return (
      <TouchableNativeFeedback
        background={TouchableNativeFeedback.Ripple('#fce692', true)}
        delayPressIn={0}
        {...props}
        onPress={_.debounce(this.onPress.bind(this), 500, true)}
      />
    );
  }
}
