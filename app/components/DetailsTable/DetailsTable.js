/**
 * Copyright (c) 2018-present, Evolvier Technologies. All rights reserved.
 *
 */

'use strict';

import React, {Component} from 'react';
import {View, Text, FlatList} from 'react-native';
import PropTypes from 'prop-types';

import {AppStyles} from '@theme';
import styles from './styles';

class DetailsTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: ['a', 'b', 'c', 'd', 'f', 'g', 'h', 'i'],
    };
  }

  renderTableItem(item) {
    return (
      <View style={styles.tableListItemMainView}>
        <View style={styles.tableListItemNameView}>
          <Text style={[AppStyles.regularText]}>{item.name}</Text>
        </View>
        <View style={styles.tableListItemValueView}>
          <Text style={[AppStyles.regularBoldText, AppStyles.darkText]}>
            {item.value}
          </Text>
        </View>
      </View>
    );
  }

  _keyExtractor = item => item.name + item.value;

  renderItemSeperator() {
    return (
      <View
        style={[
          AppStyles.horizontalLine,
          AppStyles.marginHorizontal,
          styles.line,
        ]}
      />
    );
  }

  render() {
    return (
      <View style={styles.tableListMainView}>
        <FlatList
          data={this.props.listData}
          alwaysBounceVertical={false}
          style={styles.tableList}
          renderItem={({item, i}) => this.renderTableItem(item, i)}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.notificationContentContainerStyle}
          ItemSeparatorComponent={() => this.renderItemSeperator()}
          scrollEnabled={false}
          keyExtractor={this._keyExtractor}
          extra={JSON.stringify(this.props.listData)}
        />
      </View>
    );
  }
}

DetailsTable.propTypes = {
  listData: PropTypes.array.isRequired,
};

export default DetailsTable;
