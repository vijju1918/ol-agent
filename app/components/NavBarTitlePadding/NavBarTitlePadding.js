/**
 * Copyright (c) 2018-present, Oleum. All rights reserved.
 *
 */

'use strict';

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text} from 'react-native';

import styles from './styles';
import {AppStyles} from '@theme';

class NavBarTitlePadding extends Component {
  renderSubTitle() {
    if (this.props.showSubtitle && this.props.subTitle) {
      return (
        <Text style={[AppStyles.smallText, styles.subtitle]}>
          {this.props.subTitle}
        </Text>
      );
    } else {
      return null;
    }
  }

  render() {
    return (
      <View style={styles.wrapperView}>
        <Text
          style={[
            this.props.showSubtitle
              ? [AppStyles.navbarSubTitle, styles.subtitle]
              : [AppStyles.navbarTitle, styles.subtitle],
            styles.navBarTitleText,
            styles.titleMargin,
          ]}
          numberOfLines={1}>
          {this.props.title}
        </Text>
        {this.renderSubTitle()}
      </View>
    );
  }
}

NavBarTitlePadding.propTypes = {
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string,
  showSubtitle: PropTypes.bool,
};

export default NavBarTitlePadding;
