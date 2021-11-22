/**
 * Copyright (c) 2018-present, Evolvier Technologies. All rights reserved.
 *
 */
'use strict';

import React, {Component} from 'react';

import {View, Text} from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles';
import {AppStyles} from '@theme';

import Image from '@components/Image';
class NoData extends Component {
  render() {
    return (
      <View style={styles.emptyTextView}>
        <Image
          style={[
            {
              width: AppStyles.windowSize.width * 0.5,
              height: AppStyles.windowSize.width * 0.5,
            },
            styles.noItemImage,
          ]}
          source={this.props.image}
          resizeMode={'contain'}
          backfaceVisibility={'visible'}
          overflow={'hidden'}
        />
        <Text style={[AppStyles.titleBoldText, styles.title]}>
          {this.props.title}
        </Text>
        <Text
          style={[
            AppStyles.regularText,
            AppStyles.centerAlignText,
            AppStyles.textSpace,
          ]}>
          {this.props.content}
        </Text>
      </View>
    );
  }
}

NoData.propTypes = {
  image: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
};

export default NoData;
