/**
 * Copyright (c) 2018-present, Evolvier Technologies. All rights reserved.
 *
 */

'use strict';

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, TouchableOpacity, Text} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import styles from './styles';
import {AppStyles} from '@theme';
import {getDateTimeString} from '../../../lib/utils';
import {AppResources} from '@config';

import Corporates from '@stores/Corporates';

import Image from '@components/Image';
class RatingPromo extends Component {
  constructor(props) {
    super(props);
    this.rating = this.props.data;
    this.state = {
      like: false,
      dislike: false,
      enableSubmit: false,
      sbu: Corporates.list.find(item => item.id === this.rating.createdBy.id),
    };
  }

  setLikeState() {
    this.rating.userRating = 'LIKED';
    this.setState({
      like: true,
      dislike: false,
      enableSubmit: true,
    });
  }

  setDislikeState() {
    this.rating.userRating = 'DISLIKED';
    this.setState({
      dislike: true,
      like: false,
      enableSubmit: true,
    });
  }

  submitPromoRating() {
    this.ratingCall();
  }

  skipedPromoRating() {
    this.rating.userRating = 'SKIPPED';
    this.ratingCall();
  }

  ratingCall() {
    this.rating.updatePromoRating().then(data => {
      if (data) {
        this.props.onBack();
      } else {
        console.log('rating failed');
      }
    });
  }

  getCompletedDate() {
    if (this.props.data && this.props.data.statusHistory) {
      let completedDate = this.props.data.statusHistory.find(
        item => item.status === 'COMPLETED',
      );
      if (completedDate) {
        return getDateTimeString(completedDate.date, 'DD MMMM YYYY, hh:mm a');
      } else {
        return '';
      }
    } else {
      return '';
    }
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
            <Image
              style={styles.ratingImage}
              source={AppResources.promoRating}
            />
            <Text style={AppStyles.regularText}>Please rate the promotion</Text>
            <Text
              style={[
                AppStyles.titleBoldText,
                AppStyles.darkText,
                AppStyles.textCenterAligned,
                AppStyles.textSpace,
              ]}>
              {this.props.data.title}
            </Text>
            <Text
              style={[
                AppStyles.mediumBoldText,
                AppStyles.textCenterAligned,
                AppStyles.textSpace,
              ]}>
              {'by ' + (this.state.sbu && this.state.sbu.title)}
            </Text>
            <Text style={[AppStyles.smallText, AppStyles.textSpace]}>
              {this.getCompletedDate()}
            </Text>
            <View style={styles.likeButtonMainView}>
              <TouchableOpacity
                style={styles.likeButtonView}
                onPress={() => this.setLikeState()}>
                <MaterialCommunityIcons
                  style={
                    this.state.like
                      ? styles.likeIconSelected
                      : styles.likeIconDefault
                  }
                  name={this.state.like ? 'thumb-up' : 'thumb-up-outline'}
                />
              </TouchableOpacity>
              <View style={AppStyles.verticalLine} />
              <TouchableOpacity
                style={styles.likeButtonView}
                onPress={() => this.setDislikeState()}>
                <MaterialCommunityIcons
                  style={
                    this.state.dislike
                      ? styles.dislikeIconSelected
                      : styles.dislikeIconDefault
                  }
                  name={
                    this.state.dislike ? 'thumb-down' : 'thumb-down-outline'
                  }
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.footerTouch}>
            <TouchableOpacity
              style={[styles.submitButtonTouch, styles.skipTouch]}
              onPress={() => this.skipedPromoRating()}>
              <Text style={[AppStyles.regularBoldText, styles.skipButton]}>
                SKIP
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={
                this.state.enableSubmit
                  ? styles.submitButtonTouch
                  : [styles.submitButtonTouch, styles.disabledSubmit]
              }
              onPress={() => this.submitPromoRating()}
              disabled={!this.state.enableSubmit}>
              <Text
                style={
                  this.state.enableSubmit
                    ? [
                        AppStyles.regularBoldText,
                        styles.submitButton,
                        AppStyles.darkText,
                      ]
                    : [AppStyles.regularBoldText, styles.submitButton]
                }>
                SUBMIT
              </Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </TouchableOpacity>
    );
  }
}

RatingPromo.propTypes = {
  data: PropTypes.object.isRequired,
};

export default RatingPromo;
