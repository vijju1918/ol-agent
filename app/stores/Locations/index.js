/**
 * Copyright (c) 2018-present, Oleum. All rights reserved.
 *
 */
'use strict';
import { observable } from 'mobx';
import { persist } from 'mobx-persist';

import Location from './location';
import { getCurrentLocation, fetchAndParseGeoLocationData, ToSearchInfoFromCoordinates } from '@lib/geocoder';
import AccountStore from '@stores/Account';

class Locations {
  @observable locationDetails = new Location();
  @persist('object') @observable currentLocation = {};

  load = () => {
    if (!this.currentLocation || !this.currentLocation.coordinates) {
      this.setLocationFromProfile();
    }
    this.userCurrentLocation();
  };

  setLocationFromProfile() {
    if (
      AccountStore.profile &&
      AccountStore.profile.location &&
      AccountStore.profile.location.coordinates
    ) {
      let currentLocation = {
        coordinates: AccountStore.profile.location.coordinates,
      };
      if (AccountStore.profile.locationDetails) {
        currentLocation.google = AccountStore.profile.locationDetails.google;
        currentLocation.toSearch =
          AccountStore.profile.locationDetails.toSearch;
      }
      this.currentLocation = currentLocation;
    }
  }

  userCurrentLocation() {
    getCurrentLocation()
      .then(data => {
        if (data) {
          this.currentLocation.coordinates = [data.longitude, data.latitude];
          fetchAndParseGeoLocationData(data.latitude, data.longitude)
            .then(locationData => {
              if (locationData) {
                this.currentLocation.google = locationData;
                // let loc = [];
                // loc = [].concat(
                //   locationData.locality ? locationData.locality : '',
                //   locationData.district ? locationData.district : '',
                //   locationData.state ? locationData.state : '',
                //   locationData.country ? locationData.country : '',
                //   locationData.postalCode ? locationData.postalCode : '',
                // );
                this.currentLocation.toSearch = locationData;
                console.log(
                  'Fetch location : ',
                  JSON.stringify(this.currentLocation),
                );
              } else {
                console.log('no location');
              }
            })
            .catch(error => console.log(error));
        } else {
          console.log('no location');
        }
      })
      .catch(error => console.log(error));
  }
}

export default new Locations();
export { Location };
