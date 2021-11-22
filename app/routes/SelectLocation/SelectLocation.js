/**
 * Copyright (c) 2018-present, Evolvier Technologies. All rights reserved.
 *
 */

'use strict';

import React, {Component} from 'react';
import {observer} from 'mobx-react';
import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import RNGooglePlaces from 'react-native-google-places';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import SavedLocationItem from '@components/SavedLocationItem';
import {decodePosition} from '../../lib/utils';

import {Location} from '@stores/Locations';
import Account from '@stores/Account';

import {AppStyles} from '@theme';
import styles from './styles';

@observer
class SelectLocation extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.location = new Location();
  }

  renderSavedLocation(location) {
    return (
      <TouchableOpacity
        style={styles.locationItemView}
        onPress={() => this.setSavedLocation(location)}>
        <SavedLocationItem data={location} disableDelete={true} />
      </TouchableOpacity>
    );
  }

  setSavedLocation(location) {
    this.props.data.location = location;
    this.props.data.updateSbuList();
    this.props.onBack();
  }

  openLocationSearchModal() {
    RNGooglePlaces.openAutocompleteModal()
      .then(place => {
        if (place) {
          if (place.address) {
            this.setLocationState({
              coordinates: {
                longitude: place.location.longitude,
                latitude: place.location.latitude,
              },
              address: place.address,
              name: place.name,
            });
          } else {
            decodePosition({
              lat: place.latitude,
              lng: place.longitude,
            }).then(address => {
              this.setLocationState({
                coordinates: {
                  longitude: place.longitude,
                  latitude: place.latitude,
                },
                address: address,
                name: '',
              });
            });
          }
        }
      })
      .catch(error => console.log(error.message)); // error is a Javascript Error object
  }

  setLocationState(location) {
    this.props.data.location = location;
    this.props.data.updateSbuList();
    this.props.onBack();
  }

  saveLocation() {
    this.location.savedLocations.push({
      name: this.location.name,
      address: this.location.address,
      label: this.location.label,
    });
    this.location.reset();
  }

  ItemSeparatorComponent() {
    return <View style={[AppStyles.horizontalLine, styles.line]} />;
  }

  render() {
    return (
      <View style={AppStyles.container}>
        <View style={[AppStyles.row, styles.locationAddMainView]}>
          <TouchableOpacity
            style={styles.iconView}
            onPress={() => this.openLocationSearchModal()}>
            <MaterialCommunityIcons
              style={styles.buttonIcon}
              name="map-marker"
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.locationSearchView]}
            onPress={() => this.openLocationSearchModal()}>
            <Text style={[AppStyles.regularBoldText, AppStyles.darkText]}>
              {this.props.data.location
                ? this.props.data.location.name
                  ? this.props.data.location.name
                  : 'Search Location'
                : 'Search Location'}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.savedLocationListView}>
          <View style={styles.labelView}>
            <Text style={[AppStyles.regularBoldText, AppStyles.darkText]}>
              Saved Locations
            </Text>
          </View>
          <View style={styles.flatlistView}>
            <FlatList
              alwaysBounceVertical={false}
              data={Account.profile.savedLocations}
              extraData={JSON.stringify(Account.profile.savedLocations)}
              renderItem={({item}) => this.renderSavedLocation(item)}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.sbuRatingContentContainerStyle}
              ItemSeparatorComponent={() => this.ItemSeparatorComponent()}
              keyExtractor={this._keyExtractor}
            />
          </View>
        </View>
      </View>
    );
  }
}

export default SelectLocation;
