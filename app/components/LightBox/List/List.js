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
} from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles';
import {AppStyles, AppColors} from '@theme';

class List extends Component {
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
        <Text style={[AppStyles.regularBoldText]}>{item.title}</Text>
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

List.propTypes = {
  data: PropTypes.array.isRequired,
  onPress: PropTypes.func.isRequired,
};

export default List;
