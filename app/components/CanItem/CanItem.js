/**
 * Copyright (c) 2018-present, Evolvier Technologies. All rights reserved.
 *
 */

'use strict';

import React, {Component} from 'react';

import {View, Text} from 'react-native';
import PropTypes from 'prop-types';

import {getDateTimeString} from '../../lib/utils';

import styles from './styles';
import {AppStyles} from '@theme';
import {AppResources} from '@config';

import Image from '@components/Image';

class CanItem extends Component {
  render() {
    return (
      <View style={styles.canItemView}>
        {this.props.image ? (
          <View style={styles.vendorLogoView}>
            <Image
              style={[styles.vendorLogo]}
              source={
                this.props.image
                  ? {
                      uri: this.props.image,
                    }
                  : AppResources.noImage
              }
            />
          </View>
        ) : (
          <View style={styles.vendorLogoView}>
            <View style={styles.letterView}>
              <Text
                style={[
                  AppStyles.regularBoldText,
                  AppStyles.upperCaseText,
                  styles.titleLetterText,
                ]}>
                {this.props.subTitle
                  ? this.props.subTitle
                      .match(/\b(\w)/g)
                      .join('')
                      .slice(0, 2)
                  : this.props.name
                  ? this.props.name
                      .match(/\b(\w)/g)
                      .join('')
                      .slice(0, 2)
                  : ''}
              </Text>
            </View>
          </View>
        )}
        <View style={styles.vendorNameView}>
          <Text style={[AppStyles.regularBoldText, AppStyles.darkText]}>
            {this.props.name}
          </Text>
          {this.props.lastUpdated ? (
            <Text style={[AppStyles.mediumRegularText, styles.updateText]}>
              {'Last updated' +
                ': ' +
                getDateTimeString(
                  this.props.lastUpdated,
                  'DD MMMM YYYY, hh:mm a',
                )}
            </Text>
          ) : null}
          {this.props.subTitle ? (
            <Text style={[AppStyles.mediumRegularText, AppStyles.darkText]}>
              {this.props.subTitle}
            </Text>
          ) : null}
        </View>
        <View style={styles.vendorFpView}>
          <Text style={[AppStyles.regularBoldText]}>
            {this.props.points.toFixed(2) + ' FP'}
          </Text>
        </View>
      </View>
    );
  }
}

CanItem.propTypes = {
  name: PropTypes.string.isRequired,
  subTitle: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  points: PropTypes.number.isRequired,
  lastUpdated: PropTypes.string,
};

export default CanItem;
