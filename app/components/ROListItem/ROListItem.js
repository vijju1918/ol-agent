/**
 * Copyright (c) 2018-present, Oleum. All rights reserved.
 *
 */

'use strict';

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react';
import {View, Text} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {AppStyles} from '@theme';
import styles from './styles';

@observer
class ROListItem extends Component {
  getRatingCount() {
    let totalStars = 0;
    let totalRatings = 0;
    let ratings = this.props.data.rating;
    if (ratings && ratings['1']) {
      totalStars += ratings['1'];
      totalRatings += ratings['1'];
    }
    if (ratings && ratings['2']) {
      totalStars += ratings['2'] * 2;
      totalRatings += ratings['2'];
    }
    if (ratings && ratings['3']) {
      totalStars += ratings['3'] * 3;
      totalRatings += ratings['3'];
    }
    if (ratings && ratings['4']) {
      totalStars += ratings['4'] * 4;
      totalRatings += ratings['4'];
    }
    if (ratings && ratings['5']) {
      totalStars += ratings['5'] * 5;
      totalRatings += ratings['5'];
    }
    return {
      totalStars: totalStars,
      totalRating: totalRatings,
      avgRating: totalStars / totalRatings,
    };
  }

  renderQuantityView() {
    if (this.props.isCP) {
      return (
        <View style={styles.quantityFPView}>
          <MaterialCommunityIcons style={styles.buttonIcon} name="directions" />
          <Text style={[AppStyles.mediumText]}>Direction</Text>
        </View>
      );
    } else {
      return (
        <View style={styles.quantityFPView}>
          <Text style={[AppStyles.titleBoldText, AppStyles.darkText]}>
            {Math.round(this.props.slectedQuantityFP * 100) / 100}
          </Text>
          <Text style={[AppStyles.mediumBoldText]}>
            {this.props.slectedQuantityFPUnit}
          </Text>
          {this.props.showNavIcon ? (
            <MaterialCommunityIcons
              style={styles.buttonIconSmall}
              name="directions"
            />
          ) : null}
        </View>
      );
    }
  }

  render() {
    return (
      <View style={styles.roListItemMainView}>
        <View style={styles.detailView}>
          <View style={styles.nameRatingView}>
            <View style={styles.nameView}>
              <Text style={[AppStyles.regularBoldText, AppStyles.darkText]}>
                {this.props.data.title}
              </Text>
              <Text style={[AppStyles.smallText]}>
                {this.props.data.address
                  ? this.props.data.address.street +
                    ', ' +
                    this.props.data.address.district
                  : ''}
              </Text>
            </View>
          </View>
          <View style={styles.priceDistanceView}>
            {/* <View style={styles.nameView}>
              <Text style={[AppStyles.mediumBoldText]}>
                {this.props.slectedProductSBUPrice + '*'}
              </Text>
            </View> */}
            {this.getRatingCount().avgRating ? (
              <View style={styles.ratingValueView}>
                <View style={styles.ratingStarView}>
                  <View style={[AppStyles.row, styles.starIconWrapper]}>
                    <MaterialCommunityIcons
                      style={styles.starIcon}
                      name="star"
                    />
                    <Text style={[AppStyles.mediumBoldText]}>
                      {this.getRatingCount().avgRating.toFixed(1)}
                    </Text>
                  </View>
                </View>
                <View style={styles.ratingNumView}>
                  <Text style={[AppStyles.smallText]}>
                    {'(' + this.getRatingCount().totalRating + ')'}
                  </Text>
                </View>
              </View>
            ) : (
              <View style={[AppStyles.row, styles.starIconWrapper]}>
                <Text style={[AppStyles.mediumBoldText]}>{'Not Rated'}</Text>
              </View>
            )}
            <View style={styles.ratingView}>
              <Text style={[AppStyles.smallText]}>
                {this.props.distance
                  ? 'Distance: ' +
                    Number(this.props.distance).toFixed(2) +
                    ' km'
                  : ''}
              </Text>
            </View>
          </View>
        </View>
        {/* <View style={[AppStyles.verticalLine, styles.verticalLine]} /> */}
        {/* {this.renderQuantityView()} */}
      </View>
    );
  }
}

ROListItem.propTypes = {
  data: PropTypes.object.isRequired,
  slectedProductSBUPrice: PropTypes.string,
  slectedQuantityFP: PropTypes.string,
  slectedQuantityFPUnit: PropTypes.string,
  isCP: PropTypes.bool,
  showNavIcon: PropTypes.bool,
  distance: PropTypes.string,
};

export default ROListItem;
