/**
 * Copyright (c) 2018-present, Evolvier Technologies. All rights reserved.
 *
 */

'use strict';

import React, {Component} from 'react';
import {Actions} from 'react-native-router-flux';
import {
  View,
  FlatList,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  Text,
} from 'react-native';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react';

import styles from './styles';
import {AppStyles} from '@theme';

import Corporates from '@stores/Corporates';

import BackButton from '@components/BackButton';
import LoadingShadow from '@components/LoadingShadow';

@observer
class ROSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
    };
  }
  _keyExtractor = item => item.id;

  onPressFuelStationItem(title, addressText, location) {
    this.props.onPressFuelStationItem(title, addressText, location);
    Actions.pop();
    Corporates.removeAllFuelStationSearchResult();
  }

  renderFuelStationList(fuelStation) {
    return (
      <TouchableOpacity
        style={styles.roItemView}
        onPress={() =>
          this.onPressFuelStationItem(
            fuelStation && fuelStation.title,
            fuelStation && fuelStation.addressText,
            fuelStation && fuelStation.location,
          )
        }>
        <View>
          <Text style={AppStyles.regularBoldText}>
            {fuelStation && fuelStation.title}
          </Text>
          <Text style={AppStyles.regularText}>
            {fuelStation && fuelStation.addressText}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

  renderItemSeperator() {
    return <View style={AppStyles.horizontalLine} />;
  }

  onChangeSearchText(searchText) {
    this.setState({searchText: searchText});
    if (!searchText.length) {
      Corporates.removeAllFuelStationSearchResult();
    } else {
      Corporates.searchFuelStations(searchText);
    }
  }

  onBackButtonPressed() {
    Actions.pop();
    Corporates.removeAllFuelStationSearchResult();
  }

  renderLoading() {
    if (Corporates.searchFuelStationsLoading) {
      return (
        <View style={[styles.loadingContainer]}>
          <LoadingShadow />
        </View>
      );
    }
  }

  render() {
    return (
      <View style={[AppStyles.lightBoxBg, styles.mainView]}>
        <SafeAreaView style={styles.contentView}>
          <View style={styles.searchbarView}>
            <TouchableOpacity style={styles.backButtonTouch} activeOpacity={1}>
              <BackButton onBack={() => this.onBackButtonPressed()} />
            </TouchableOpacity>
            <View style={styles.searchView}>
              <TextInput
                style={[styles.input, AppStyles.regularText]}
                placeholder={'Search fuel stations...'}
                underlineColorAndroid="transparent"
                onChangeText={searchText => this.onChangeSearchText(searchText)}
                value={this.state.searchText}
                returnKeyType={'next'}
                editable={true}
                autoFocus={true}
              />
            </View>
          </View>
          <FlatList
            style={styles.flatListView}
            data={Corporates.fuelStationSearchResult}
            renderItem={({item}) => this.renderFuelStationList(item)}
            ItemSeparatorComponent={() => this.renderItemSeperator()}
            extraData={JSON.stringify(Corporates.fuelStationSearchResult)}
            keyExtractor={this._keyExtractor}
          />
        </SafeAreaView>
        {this.renderLoading()}
      </View>
    );
  }
}

ROSearch.propTypes = {
  contactTransfer: PropTypes.func.isRequired,
};

export default ROSearch;
