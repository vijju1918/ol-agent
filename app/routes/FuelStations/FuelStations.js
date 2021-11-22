/**
 * Copyright (c) 2018-present, Oleum. All rights reserved.
 *
 */

'use strict';

import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {observer} from 'mobx-react';
import {showMessage} from 'react-native-flash-message';
import MapView, {Callout, PROVIDER_GOOGLE} from 'react-native-maps';
import {OpenMapDirections} from 'react-native-navigation-directions';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import LoadingShadow from '@components/LoadingShadow';
import Image from '@components/Image';

import Corporates from '@stores/Corporates';
import {getCurrentLocation} from '@lib/utils';
import {AppStyles} from '@theme';
import {AppResources} from '@config';
import styles from './styles';
@observer
class FuelStations extends Component {
  constructor(props) {
    super(props);
    this.count = 1;
    this.state = {
      lat: '',
      long: '',
      canUpdate: false,
    };
  }

  componentDidMount() {
    this.getNearByFuelStations();
  }

  getNearByFuelStations() {
    getCurrentLocation()
      .then(data => {
        if (
          data &&
          data.coords &&
          data.coords.latitude &&
          data.coords.longitude
        ) {
          this.setState({
            lat: data.coords.latitude,
            long: data.coords.longitude,
          });
          this.getNearByFuelStationsMethod(
            data.coords.latitude,
            data.coords.longitude,
          );
        }
        // else {
        //   this.getGoogleLocation();
        // }
      })
      .catch(() => {
        // this.getGoogleLocation();
        console.log('Nearby Fuel stations fetching error');
      });
  }

  // getGoogleLocation() {
  //   Corporates.userCurrentLocation()
  //     .then(data => {
  //       if (
  //         data &&
  //         data.coordinates &&
  //         data.coordinates.latitude &&
  //         data.coordinates.longitude
  //       ) {
  //         this.setState({
  //           lat: data.coordinates.latitude,
  //           long: data.coordinates.longitude,
  //         });
  //         this.getNearByFuelStationsMethod(
  //           data.coordinates.latitude,
  //           data.coordinates.longitude,
  //         );
  //       } else {
  //         showMessage({
  //           message: 'Location permission required',
  //         });
  //       }
  //     })
  //     .catch(error =>
  //       showMessage({
  //         message:
  //           error && error.details && error.details.displayMessage
  //             ? error.details.displayMessage
  //             : 'Location permission required',
  //       }),
  //     );
  // }

  getNearByFuelStationsMethod(latitude, longitude) {
    Corporates.getNearByFuelStations(latitude, longitude)
      .then(() => {
        this.map.fitToSuppliedMarkers(
          Corporates.nearByFuelStationsList.map(marker => {
            return marker.id ? marker.id : marker.googleId;
          }),
          {edgePadding: {top: 50, right: 50, bottom: 50, left: 50}},
        );
        setTimeout(() => {
          if (!this.state.canUpdate) {
            this.state.canUpdate = true;
          }
        }, 5000);
      })
      .catch(error =>
        showMessage({
          message:
            error && error.details && error.details.displayMessage
              ? error.details.displayMessage
              : 'Something went wrong, try again later',
        }),
      );
  }

  onPressCallout(marker) {
    if (marker.location && marker.location.coordinates) {
      const endPoint = {
        longitude: marker.location.coordinates[0],
        latitude: marker.location.coordinates[1],
      };
      OpenMapDirections(null, endPoint, 'd');
    }
  }

  render() {
    console.log('FuelStations -> render -> render', this.count);
    if (
      Corporates.getUserCurrentLocationLoading ||
      !this.state.lat ||
      !this.state.long
    ) {
      return (
        <View style={styles.container}>
          <LoadingShadow />
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <MapView
            provider={PROVIDER_GOOGLE}
            ref={map => {
              this.map = map;
            }}
            style={styles.map}
            onMarkerPress={() => {
              this.state.canUpdate = false;
              setTimeout(() => {
                if (!this.state.canUpdate) {
                  this.state.canUpdate = true;
                }
              }, 500);
            }}
            onRegionChangeComplete={region => {
              if (this.state.canUpdate) {
                this.state.canUpdate = false;
                this.getNearByFuelStationsMethod(
                  region.latitude,
                  region.longitude,
                );
              }
            }}
            initialRegion={{
              latitude: 23.67125,
              longitude: 79.1642389,
              latitudeDelta: 20,
              longitudeDelta: 20,
            }}>
            <MapView.Marker
              opacity={1}
              coordinate={{
                latitude: this.state.lat,
                longitude: this.state.long,
              }}
              pinColor={'red'}
              title={'You are here'}
            />
            {Corporates.nearByFuelStationsList.map(marker => (
              <MapView.Marker
                coordinate={{
                  latitude: marker.location.coordinates[1],
                  longitude: marker.location.coordinates[0],
                }}
                title={marker.title}
                identifier={marker.id ? marker.id : marker.googleId}>
                <Image
                  source={
                    marker.type && marker.type === 'google'
                      ? AppResources.marker
                      : AppResources.markerYellow
                  }
                  style={styles.pinImage}
                />
                <Callout
                  onPress={() => this.onPressCallout(marker)}
                  style={styles.calloutView}>
                  <Text style={[AppStyles.regularBoldText]}>
                    {marker.title}
                  </Text>
                  {marker.ratingValue ? (
                    <View style={[AppStyles.row, styles.ratingView]}>
                      <View style={[AppStyles.row, styles.starIconWrapper]}>
                        <MaterialCommunityIcons
                          style={styles.starIcon}
                          name="star"
                        />
                        <Text style={[AppStyles.mediumBoldText]}>
                          {marker.ratingValue}
                        </Text>
                      </View>
                      <View style={styles.rateCountView}>
                        <Text
                          style={[AppStyles.smallText, styles.ratingCountText]}>
                          {'(' + marker.ratingCount + ')'}
                        </Text>
                      </View>
                    </View>
                  ) : (
                    <View style={[AppStyles.row, styles.starIconWrapper]}>
                      <Text style={[AppStyles.mediumBoldText]}>
                        {'Not Rated'}
                      </Text>
                    </View>
                  )}
                </Callout>
              </MapView.Marker>
            ))}
          </MapView>
          {Corporates.getNearByFuelStationsLoading ? <LoadingShadow /> : null}
        </View>
      );
    }
  }
}

export default FuelStations;
