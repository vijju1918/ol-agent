/**
 * Copyright (c) 2018-present, Evolvier Technologies. All rights reserved.
 *
 */
'use strict';

import React, {Component} from 'react';
import {View, Text} from 'react-native';

import styles from './styles';
import {AppStyles} from '@theme';
import AppStrings from '@config/strings';
import {getDateTimeString} from '../../lib/utils';
import PropTypes from 'prop-types';

import Image from '@components/Image';
import CountDownView from '@components/CountDownView';

class PromotionDetailsHeader extends Component {
  renderImage() {
    if (this.props.promotionItems.bannerImage) {
      return (
        <View style={styles.promoView}>
          <Image
            style={styles.promotionImage}
            resizeMode={'stretch'}
            source={{
              uri: this.props.promotionItems.bannerImage.url
                ? this.props.promotionItems.bannerImage.url
                : undefined,
            }}
          />
        </View>
      );
    } else {
      return null;
    }
  }

  renderCounter() {
    if (this.props.endDate) {
      return (
        <CountDownView
          endDate={this.props.endDate}
          onFinishCount={this.props.onFinishCount}
        />
      );
    }
  }

  render() {
    return (
      <View style={[AppStyles.container, styles.mainView]}>
        {this.renderImage()}
        {/* {this.renderCounter()} */}
        <View style={styles.validityView}>
          <Text style={[AppStyles.titleBoldText, AppStyles.darkText]}>
            {this.props.promotionItems.title}
          </Text>
        </View>
        <View style={styles.promotionTitleTextView}>
          <Text style={[AppStyles.regularText, AppStyles.darkText]}>
            {AppStrings.validity}
            {getDateTimeString(
              this.props.promotionItems.endDate,
              'DD MMMM YYYY, hh:mm a',
            )}
          </Text>

          <Text style={[AppStyles.smallText, styles.referenceIdText]}>
            {this.props.promotionItems.referenceId}
          </Text>
        </View>
        <View style={styles.descriptionView}>
          <Text
            style={[AppStyles.regularText, styles.promoDescriptionTextStyle]}>
            {this.props.promotionItems.description}
          </Text>
        </View>
      </View>
    );
  }
}

PromotionDetailsHeader.propTypes = {
  promotionItems: PropTypes.object.isRequired,
  onFinishCount: PropTypes.func,
};

export default PromotionDetailsHeader;
