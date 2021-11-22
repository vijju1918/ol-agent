/**
 * Copyright (c) 2018-present, Evolvier Technologies. All rights reserved.
 *
 */

'use strict';

import React, {Component} from 'react';

import {View, TouchableOpacity, Text} from 'react-native';
import PropTypes from 'prop-types';
import StarRating from 'react-native-star-rating';

import styles from './styles';
import {AppStyles, AppColors} from '@theme';
import {AppResources} from '@config';
import {getDateTimeString} from '../../../lib/utils';

import Corporates from '@stores/Corporates';

import Image from '@components/Image';
class RatingSBU extends Component {
  constructor(props) {
    super(props);
    this.rating = this.props.data;
    this.state = {
      sbu: Corporates.list.find(item => item.id === this.rating.to.id),
      starCount: 0,
    };
  }

  ratingCompleted(rating) {
    if (rating) {
      this.rating.userRating = rating;
      this.setState({
        starCount: rating,
      });
    } else {
      this.rating.userRating = 1;
    }
  }

  submitRating() {
    if (this.rating.userRating) {
      this.rating.sumbitSBUrating().then(data => {
        if (data) {
          this.props.onBack();
        } else {
          console.log('rating failed');
        }
      });
    } else {
      this.rating.userRating = 1;
      this.rating.sumbitSBUrating().then(data => {
        if (data) {
          this.props.onBack();
        } else {
          console.log('rating failed');
        }
      });
    }
  }

  skipRating() {
    this.props.onBack();
  }

  getDate() {
    let date = this.rating.statusHistory.find(
      item => item.status === 'PENDING',
    );
    return getDateTimeString(date.date, 'DD MMMM YYYY, hh:mm a');
  }

  render() {
    return (
      <TouchableOpacity
        style={[AppStyles.lightBoxBg, styles.alignCentre]}
        activeOpacity={1}>
        <TouchableOpacity
          style={styles.contentView}
          onPress={() => {}}
          activeOpacity={1}>
          <View style={styles.dataView}>
            <Image style={styles.ratingImage} source={AppResources.roRating} />
            <Text
              style={[
                AppStyles.regularText,
                AppStyles.darkText,
                AppStyles.textCenterAligned,
              ]}>
              {this.state.sbu
                ? 'Please rate your experience with '
                : 'Rate the SBU'}
            </Text>
            <Text
              style={[
                AppStyles.titleBoldText,
                AppStyles.darkText,
                AppStyles.textSpace,
                AppStyles.textCenterAligned,
              ]}>
              {this.state.sbu ? this.state.sbu.title : ''}
            </Text>
            <Text
              style={[
                AppStyles.mediumBoldText,
                AppStyles.textCenterAligned,
                AppStyles.textSpace,
              ]}>
              {this.getDate()}
            </Text>
            <View style={styles.ratingView}>
              <StarRating
                disabled={false}
                emptyStar={'ios-star-outline'}
                fullStar={'ios-star'}
                halfStar={'ios-star-half'}
                iconSet={'Ionicons'}
                maxStars={5}
                fullStarColor={AppColors.brand.primary}
                emptyStarColor={'#00000050'}
                rating={this.state.starCount}
                starStyle={styles.starStyle}
                selectedStar={rating => this.ratingCompleted(rating)}
              />
            </View>
          </View>
          <View style={styles.footerTouch}>
            <TouchableOpacity
              style={styles.submitButtonTouch}
              onPress={() => this.submitRating()}>
              <Text
                style={[
                  AppStyles.regularBoldText,
                  AppStyles.darkText,
                  styles.submitButton,
                ]}>
                SUBMIT
              </Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </TouchableOpacity>
    );
  }
}

RatingSBU.propTypes = {
  data: PropTypes.object.isRequired,
};

export default RatingSBU;
