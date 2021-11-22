/**
 * Copyright (c) 2018-present, Evolvier Technologies. All rights reserved.
 *
 */

'use strict';

import React, {Component} from 'react';
import {Actions} from 'react-native-router-flux';
import {View, FlatList, TouchableOpacity, TextInput, Text} from 'react-native';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react';

import styles from './styles';
import {AppStyles} from '@theme';
import AppStrings from '@config/strings';

import {Corporate} from '@stores/Corporates';

import CorporateItem from '@components/CorporateItem';
import BackButton from '@components/BackButton';
import Loading from '@components/Loading';

@observer
class Corporates extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.corporate = new Corporate();
  }

  componentDidMount() {
    this.corporate.corporateListForFPTransfer().then(data => {
      if (data) {
        this.corporate.loading = false;
        data.forEach(eachItem => {
          if (
            !this.corporate.fpTransferList.includes(eachItem.id) &&
            eachItem.isAdminApproved === 'APPROVED'
          ) {
            this.corporate.fpTransferList.push(eachItem);
          }
        });
      }
    });
  }

  _keyExtractor = item => item.phoneNumber;
  renderContactList(corporate) {
    return (
      <TouchableOpacity
        style={styles.corporateItemView}
        onPress={() => this.props.contactTransfer(corporate)}>
        <CorporateItem corporate={corporate} />
      </TouchableOpacity>
    );
  }

  renderItemSeperator() {
    return <View style={AppStyles.horizontalLine} />;
  }
  _keyExtractor = item => item._id;

  renedrList() {
    if (this.corporate.filteredCorporate.length && !this.corporate.loading) {
      return (
        <FlatList
          style={styles.flatListView}
          data={this.corporate.filteredCorporate}
          refreshing={this.corporate.loading}
          renderItem={({item}) => this.renderContactList(item)}
          ItemSeparatorComponent={() => this.renderItemSeperator()}
          extraData={this.corporate.filteredCorporate}
          keyExtractor={this._keyExtractor}
          onEndReachedThreshold={4}
        />
      );
    } else if (this.corporate.loading) {
      return <Loading />;
    } else {
      return (
        <View style={styles.noItemView}>
          <Text style={AppStyles.regularText}>{AppStrings.nothing}</Text>
        </View>
      );
    }
  }

  render() {
    return (
      <View style={[AppStyles.lightBoxBg, styles.mainView]}>
        <View style={styles.contentView}>
          <View style={styles.searchbarView}>
            <TouchableOpacity style={styles.backButtonTouch} activeOpacity={1}>
              <BackButton onBack={() => Actions.pop()} />
            </TouchableOpacity>
            <View style={styles.searchView}>
              <TextInput
                style={[styles.input, AppStyles.regularText]}
                placeholder={'search'}
                underlineColorAndroid="transparent"
                onChangeText={this.corporate.updateFilter}
                value={this.corporate.filter}
                returnKeyType={'next'}
                editable={true}
              />
            </View>
          </View>
          {this.renedrList()}
        </View>
      </View>
    );
  }
}

Corporates.propTypes = {
  contactTransfer: PropTypes.func.isRequired,
};

export default Corporates;
