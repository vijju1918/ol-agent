/**
 * Copyright (c) 2018-present, Evolvier Technologies. All rights reserved.
 *
 */

'use strict';

import React, {Component} from 'react';
import {observer} from 'mobx-react';
import {View, Text, FlatList, ScrollView} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import RNGooglePlaces from 'react-native-google-places';
import {showMessage} from 'react-native-flash-message';

import SavedLocationItem from '@components/SavedLocationItem';
import CustomTextInput from '@components/CustomTextInput';
import TouchableOpacity from '@components/TouchableOpacity';

import {decodePosition} from '../../lib/utils';
import {isRequired} from '@lib/validator';

import {Location} from '@stores/Locations';
import Account from '@stores/Account';

import {AppStyles, AppColors, AppFonts} from '@theme';
import styles from './styles';

@observer
class MyLocations extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorLabel: null,
    };
    this.location = new Location();
  }

  renderSavedLocation(location) {
    return (
      <View style={styles.locationItemView}>
        <SavedLocationItem
          data={location}
          onPressDelete={this.deleteSavedLocation.bind(this)}
        />
      </View>
    );
  }

  deleteSavedLocation(location) {
    if (location) {
      this.location.removeSavedLocation(location.label).then(data => {
        if (data) {
          console.log('success');
        } else {
          console.log('delete failed');
        }
      });
    }
  }

  openLocationSearchModal() {
    RNGooglePlaces.openAutocompleteModal()
      .then(place => {
        if (place) {
          if (place.address) {
            this.setLocationState({
              latitude: place.location.latitude,
              longitude: place.location.longitude,
              address: place.address,
              name: place.name,
            });
          } else {
            decodePosition({
              lat: place.latitude,
              lng: place.longitude,
            }).then(address => {
              this.setLocationState({
                latitude: place.location.latitude,
                longitude: place.location.longitude,
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
    this.location.address = location.address;
    this.location.name = location.name;
    this.location.latitude = location.latitude;
    this.location.longitude = location.longitude;
  }

  saveLocation() {
    if (this.location.label && this.location.address) {
      this.location.addSavedLocation().then(data => {
        if (data) {
          this.location.reset();
        } else {
          console.log('saving failed');
          showMessage({
            message: 'Label already exist!',
          });
        }
      });
    } else {
      this.setState({
        errorLabel: 'Please add a label',
      });
    }
  }

  renderLocationView() {
    if (this.location.address) {
      return (
        <View>
          <TouchableOpacity
            onPress={() => this.openLocationSearchModal()}
            style={[styles.locationAddView]}>
            <View style={[styles.locationDisplayView]}>
              <Text style={[AppStyles.regularBoldText, AppStyles.darkText]}>
                {this.location.name}
              </Text>
              <Text
                style={[
                  AppStyles.regularText,
                  AppStyles.darkText,
                  AppStyles.textSpace,
                ]}>
                {this.location.address}
              </Text>
            </View>
          </TouchableOpacity>
          <View style={styles.saveButtonView}>
            <TouchableOpacity
              style={styles.saveTouch}
              onPress={() => this.saveLocation()}>
              <Text style={[AppStyles.regularBoldText, styles.saveText]}>
                Save
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    } else {
      return (
        <TouchableOpacity
          onPress={() => this.openLocationSearchModal()}
          style={styles.locationAddView}>
          <View style={styles.locationAddIconView}>
            <View style={styles.locationButtonView}>
              <MaterialIcons style={[styles.lcoationIcon]} name="location-on" />
            </View>
          </View>
          <View style={[styles.locationAddDisplayView]}>
            <Text style={[AppStyles.regularBoldText, AppStyles.darkText]}>
              Add location
            </Text>
          </View>
        </TouchableOpacity>
      );
    }
  }

  itemSeparatorComponent() {
    return <View style={[AppStyles.horizontalLine, styles.dividerLine]} />;
  }

  render() {
    return (
      <View style={AppStyles.container}>
        <View style={styles.locationAddMainView}>
          <View style={[styles.locationTitleView]}>
            <Text style={[AppStyles.regularText, AppStyles.darkText]}>
              Add Favourite Locations
            </Text>
          </View>
          <View style={styles.locationLableView}>
            {this.renderLocationView()}
          </View>
          <View style={AppStyles.paddingHorizontal}>
            <CustomTextInput
              label="Name of the location"
              placeholder={'Add location name. Eg: Home, Work, Club etc.'}
              baseColor={AppColors.inputLable}
              tintColor={AppColors.brand.primary}
              labelTextStyle={AppStyles.regularText}
              fontSize={AppFonts.base.size}
              autoCapitalize={'words'}
              style={[AppStyles.regularText, styles.inputText]}
              onChangeText={label => {
                this.location.label = label.replace(/[^a-zA-Z0-9 ]/gi, '');
                this.setState({
                  errorLabel: isRequired(label).message,
                });
              }}
              value={this.location.label ? this.location.label : ''}
              inputContainerStyle={AppStyles.inputContainerStyle}
              returnKeyType="next"
              error={this.state.errorLabel}
            />
          </View>
        </View>
        <View style={styles.savedLocationListView}>
          <View style={[AppStyles.locationTitleView]}>
            <Text style={[AppStyles.regularBoldText, AppStyles.darkText]}>
              Saved Locations
            </Text>
          </View>
        </View>
        <ScrollView>
          <View style={styles.flatlistView}>
            <FlatList
              alwaysBounceVertical={false}
              data={Account.profile.savedLocations}
              extraData={JSON.stringify(Account.profile.savedLocations)}
              renderItem={({item}) => this.renderSavedLocation(item)}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.sbuRatingContentContainerStyle}
              ItemSeparatorComponent={() => this.itemSeparatorComponent()}
              keyExtractor={this._keyExtractor}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default MyLocations;
