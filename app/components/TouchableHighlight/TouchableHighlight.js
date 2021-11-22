import React, {Component} from 'react';
import {TouchableHighlight} from 'react-native';
import {_} from 'underscore';

export default class TouchableHighlightWrapper extends Component {
  onPress() {
    this.props.onPress && this.props.onPress();
  }

  render() {
    const {onPress, ...props} = this.props;
    return (
      <TouchableHighlight
        onPress={_.debounce(this.onPress.bind(this), 800, true)}
        {...props}
      />
    );
  }
}
