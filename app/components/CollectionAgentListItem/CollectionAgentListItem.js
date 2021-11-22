/**
 * Copyright (c) 2018-present, Evolvier Technologies. All rights reserved.
 *
 */
'use strict';

import React, {Component} from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import StarRating from 'react-native-star-rating';

import {AppStyles, AppColors} from '@theme';
import AppStrings from '@config/strings';
import PropTypes from 'prop-types';
import styles from './styles';

class CollectionAgentListItem extends Component {
  iconView(status) {
    if (status === true) {
      return (
        <MaterialCommunityIcons style={styles.buttonIcon} name="map-marker" />
      );
    } else {
      return null;
    }
  }
  render() {
    return (
      <TouchableOpacity
        style={styles.collectionPointMainView}
        activeOpacity={0.5}>
        <View style={styles.collectionPointDataView}>
          <View style={styles.imageNameView}>
            <View style={styles.imageView}>
              <MaterialCommunityIcons
                style={styles.buttonIcon}
                name="gas-station"
              />
            </View>
            <View style={styles.promoTitleView}>
              <Text style={[AppStyles.regularBoldText, AppStyles.darkText]}>
                Save Nature Plastic Deposit
              </Text>
              <Text style={[AppStyles.mediumText]}>Tripunitra</Text>
              <Text style={[AppStyles.mediumText, styles.distanceText]}>
                {AppStrings.distance}
                <Text>
                  15
                  {AppStrings.km}
                </Text>
              </Text>
              <View style={styles.ratingValueView}>
                <View style={styles.ratingView}>
                  <StarRating
                    disabled={false}
                    emptyStarColor={AppColors.brand.primary}
                    starSize={12}
                    maxStars={5}
                    fullStarColor={AppColors.brand.primary}
                  />
                </View>
                <View style={styles.ratingNumView}>
                  <Text style={[AppStyles.smallText]}>{'(24)'}</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.ratingAndLocationView}>{this.iconView()}</View>
      </TouchableOpacity>
    );
  }
}

CollectionAgentListItem.propTypes = {
  isActive: PropTypes.bool.isRequired,
};
export default CollectionAgentListItem;
