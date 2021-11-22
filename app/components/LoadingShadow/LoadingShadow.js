import React, {Component} from 'react';
import {View, ActivityIndicator, Text} from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles';
import {AppColors, AppStyles} from '@theme';

export default class LoadingFull extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.loadingMainView}>
        <View style={styles.loadingContainerView}>
          <ActivityIndicator
            size="large"
            color={
              this.props.color ? this.props.color : AppColors.brand.primary
            }
          />
        </View>
        {this.props.text ? (
          <Text
            style={[
              AppStyles.regularBoldText,
              AppStyles.darkText,
              AppStyles.textSpace,
            ]}>
            {this.props.text}
          </Text>
        ) : null}
      </View>
    );
  }
}
LoadingFull.propTypes = {
  color: PropTypes.string,
  text: PropTypes.string,
};
