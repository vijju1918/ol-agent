/**
 * Copyright (c) 2018-present, Oleum. All rights reserved.
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

import Ratings from '@stores/Ratings';
import Corporates from '@stores/Corporates';

class SbuRatingList extends Component {
  _keyExtractor = item => item.id;

  getTypeofDR(item) {
    if (item.type === 'DEPOSIT') {
      return 'Material Deposit';
    } else {
      return 'Fuel Dispensation';
    }
  }

  getDispenseDateTime(item) {
    let date = item.statusHistory.find(history => history.status === 'PENDING');
    return getDateTimeString(date.date, 'DD MMMM YYYY, hh:mm a');
  }

  renderPromoRating(item) {
    let corprate = Corporates.list.find(
      corporate => corporate.id === item.to.id,
    );
    return (
      <View style={styles.sbuRatingItem}>
        <View>
          <View style={styles.sbuRatingTextView}>
            <Text style={[AppStyles.regularBoldText, AppStyles.darkText]}>
              {this.getTypeofDR(item)}
            </Text>
            <Text style={[AppStyles.mediumRegularText]}>
              {this.getDispenseDateTime(item)}
            </Text>
            <Text
              style={[
                AppStyles.regularBoldText,
                AppStyles.darkText,
                styles.corporateTypeName,
              ]}>
              {corprate ? corprate.title : 'SBU'}
            </Text>
          </View>
          <View style={styles.ratingView}>
            <View style={[styles.ratingTextView]}>
              <Text style={[AppStyles.regularText]}>Your Rating</Text>
            </View>
            <View style={[AppStyles.row, styles.starIconWrapper]}>
              <MaterialCommunityIcons style={styles.starIcon} name="star" />
              <Text style={[AppStyles.mediumBoldText]}>
                {item.userRating.toFixed(1)}
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  }

  ItemSeparatorComponent() {
    return <View style={[AppStyles.horizontalLine, styles.line]} />;
  }

  render() {
    if (Ratings.completedRatings.length) {
      return (
        <View style={AppStyles.container}>
          <View style={styles.infoView}>
            <Text style={AppStyles.regularText}>Your vendor impressions</Text>
          </View>
          <FlatList
            alwaysBounceVertical={false}
            data={Ratings.completedRatings}
            renderItem={({item}) => this.renderPromoRating(item)}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.sbuRatingContentContainerStyle}
            ItemSeparatorComponent={() => this.ItemSeparatorComponent()}
            keyExtractor={this._keyExtractor}
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

export default SbuRatingList;
