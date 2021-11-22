/**
 * Copyright (c) 2018-present, Evolvier Technologies. All rights reserved.
 *
 */

'use strict';

import React, {Component} from 'react';
import {
  TouchableOpacity,
  FlatList,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles';
import {AppResources} from '@config';
import {AppStyles, AppColors} from '@theme';

import Image from '@components/Image';

class ListWithThumbnail extends Component {
  onPressItem(item) {
    this.props.onPress(item);
    this.props.onBack();
  }

  renderListItem(item, index) {
    return (
      <TouchableHighlight
        style={styles.listItemView}
        onPress={() => this.onPressItem(item)}
        activeOpacity={1}
        underlayColor={AppColors.buttonBg}
        key={index}>
        <View style={[AppStyles.row, styles.itemContent]}>
          {item.image && item.image.url ? (
            <View style={styles.vendorLogoView}>
              <Image
                style={[styles.vendorLogo]}
                source={
                  item.image && item.image.url
                    ? {
                        uri: item.image.url,
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
                  {item.title
                    .match(/\b(\w)/g)
                    .join('')
                    .slice(0, 2)}
                </Text>
              </View>
            </View>
          )}
          <Text style={[AppStyles.regularBoldText, styles.titleText]}>
            {item.title}
          </Text>
        </View>
      </TouchableHighlight>
    );
  }

  _keyExtractor = item => item.title;

  renderContent(data) {
    if (data && data.length) {
      return (
        <FlatList
          data={data}
          alwaysBounceVertical={false}
          renderItem={({item, i}) => this.renderListItem(item, i)}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.notificationContentContainerStyle}
          keyExtractor={this._keyExtractor}
        />
      );
    } else {
      return (
        <Text style={[AppStyles.regularBoldText, styles.noItemsText]}>
          No items!
        </Text>
      );
    }
  }

  render() {
    return (
      <TouchableOpacity
        style={AppStyles.lightBoxBg}
        activeOpacity={1}
        onPress={() => this.props.onBack()}>
        <TouchableOpacity
          style={styles.contentView}
          onPress={() => {}}
          activeOpacity={1}>
          {this.renderContent(this.props.data)}
        </TouchableOpacity>
      </TouchableOpacity>
    );
  }
}

ListWithThumbnail.propTypes = {
  data: PropTypes.array.isRequired,
  onPress: PropTypes.func.isRequired,
};

export default ListWithThumbnail;
