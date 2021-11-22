/**
 * Copyright (c) 2018-present, Evolvier Technologies. All rights reserved.
 *
 */

'use strict';

import React, {Component} from 'react';

import {View, FlatList, Text, StatusBar} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {AppStyles, AppColors} from '@theme';
import {AppResources} from '@config';
import styles from './styles';
import NoData from '@components/NoData';
import {getDateTimeString} from '../../lib/utils';

import Promotions from '@stores/Promotions';
import Corporates from '@stores/Corporates';

class PromoRatingList extends Component {
  getCorporayeName(item) {
    let company = Corporates.list.find(
      corporate => corporate.id === item.createdBy.id,
    );
    if (company) {
      return company.title;
    } else {
      return null;
    }
  }

  rednerRating(item) {
    if (item.ratingStatus === 'LIKED') {
      return (
        <View style={styles.likestatusView}>
          <MaterialCommunityIcons
            style={styles.likeIconSelected}
            name="thumb-up-outline"
          />
          <Text
            style={[
              AppStyles.mediumRegularText,
              AppStyles.darkText,
              AppStyles.textSpace,
            ]}>
            Liked
          </Text>
        </View>
      );
    } else if (item.ratingStatus === 'DISLIKED') {
      return (
        <View style={styles.likestatusView}>
          <MaterialCommunityIcons
            style={styles.dislikeIconSelected}
            name="thumb-down-outline"
          />
          <Text
            style={[
              AppStyles.mediumRegularText,
              AppStyles.darkText,
              AppStyles.textSpace,
            ]}>
            Disliked
          </Text>
        </View>
      );
    } else if (item.ratingStatus === 'SKIPPED') {
      return (
        <View style={styles.likestatusView}>
          <MaterialCommunityIcons
            style={styles.skippedSelected}
            name="drag-horizontal"
          />
          <Text style={[AppStyles.smallText, AppStyles.darkText]}>Skipped</Text>
        </View>
      );
    } else {
      return (
        <View style={styles.likestatusView}>
          <Text style={[AppStyles.smallText, AppStyles.darkText]}>Pending</Text>
        </View>
      );
    }
  }

  renderPromoRating(item) {
    return (
      <View style={styles.itemMainView}>
        <View style={styles.textView}>
          <Text style={[AppStyles.regularBoldText, AppStyles.darkText]}>
            {item.title}
          </Text>
          <Text style={[AppStyles.smallText]}>
            {'by ' + this.getCorporayeName(item)}
          </Text>
          <Text style={[AppStyles.mediumRegularText, styles.dateText]}>
            {this.getCompletedDate(item)}
          </Text>
        </View>
        <View style={styles.ratingView}>{this.rednerRating(item)}</View>
      </View>
    );
  }

  getCompletedDate(item) {
    let date = item.statusHistory.find(
      ratingItem => ratingItem.status === 'COMPLETED',
    );
    return getDateTimeString(date.date, 'DD MMMM YYYY, hh:mm a');
  }

  itemSeparatorComponent() {
    return <View style={[AppStyles.horizontalLine, styles.line]} />;
  }

  render() {
    if (Promotions.ratedPromoList.length) {
      return (
        <View style={AppStyles.container}>
          <View style={styles.infoView}>
            <Text style={AppStyles.regularText}>
              Your likes & dislikes for promotions
            </Text>
          </View>
          <FlatList
            alwaysBounceVertical={false}
            data={Promotions.ratedPromoList}
            renderItem={({item}) => this.renderPromoRating(item)}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.promoRatingContentContainerStyle}
            keyExtractor={this._keyExtractor}
            ItemSeparatorComponent={() => this.itemSeparatorComponent()}
          />
        </View>
      );
    } else {
      return (
        <View style={[AppStyles.container, styles.center]}>
          <StatusBar
            backgroundColor={AppColors.statusBarBg}
            hidden={false}
            barStyle={AppColors.statusBarStyle}
          />
          <NoData
            image={AppResources.noHistory}
            title={'No ratings yet'}
            content={"You haven't done any rating!"}
          />
        </View>
      );
    }
  }
}

export default PromoRatingList;
