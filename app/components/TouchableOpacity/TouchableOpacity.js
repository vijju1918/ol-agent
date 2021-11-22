import React, {Component} from 'react';
import {TouchableOpacity} from 'react-native';
import {_} from 'underscore';

export default class TouchableOpacityWrapper extends Component {
  onPress() {
    requestAnimationFrame(() => {
      this.props.onPress && this.props.onPress();
    });
  }

  render() {
    const {...props} = this.props;
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        delayPressIn={0}
        {...props}
        onPress={_.debounce(this.onPress.bind(this), 500, true)}
      />
    );
  }
}
