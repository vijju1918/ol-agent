/**
 * Copyright (c) 2018-present, Oleum. All rights reserved.
 *
 */

'use strict';
import Meteor from '@meteorrn/core';
import Geocoder from 'react-native-geocoder';
import Geolocation from 'react-native-geolocation-service';

import Config from '@stores/Config';

import { requestLocationPermission } from '@lib/permissions';

export const parseGoogleAddress = results => {
  return new Promise(resolve => {
    let parseData = {};
    if (results && results.length) {
      parseData.name = results[0].feature
        ? results[0].feature
        : results[0].streetName;
      parseData.address = results[0].formattedAddress;
      results.slice(0, 3).forEach(item => {
        if (item.postalCode) {
          if (!parseData.postalCode) {
            parseData.postalCode = [];
          }
          if (!parseData.postalCode.includes(item.postalCode.toLowerCase())) {
            parseData.postalCode.push(item.postalCode.toLowerCase());
          }
        }
        if (item.subLocality) {
          if (!parseData.locality) {
            parseData.locality = [];
          }
          if (!parseData.locality.includes(item.subLocality.toLowerCase())) {
            parseData.locality.push(item.subLocality.toLowerCase());
          }
        }
        if (item.locality) {
          if (!parseData.locality) {
            parseData.locality = [];
          }
          if (!parseData.locality.includes(item.locality.toLowerCase())) {
            parseData.locality.push(item.locality.toLowerCase());
          }
        }
        if (item.subAdminArea) {
          if (!parseData.district) {
            parseData.district = [];
          }
          if (!parseData.district.includes(item.subAdminArea.toLowerCase())) {
            parseData.district.push(item.subAdminArea.toLowerCase());
          }
        }
        if (item.adminArea) {
          if (!parseData.state) {
            parseData.state = [];
          }
          if (!parseData.state.includes(item.adminArea.toLowerCase())) {
            parseData.state.push(item.adminArea.toLowerCase());
          }
        }
        if (item.country) {
          if (!parseData.country) {
            parseData.country = [];
          }
          if (!parseData.country.includes(item.country.toLowerCase())) {
            parseData.country.push(item.country.toLowerCase());
          }
        }
      });
    }
    resolve(parseData);
  });
};

export const fetchGeoLocationData = (latitude, longitude) => {
  if (Config.fallbackGoogleApiKey) {
    Geocoder.fallbackToGoogle(Config.fallbackGoogleApiKey);
  }
  return Geocoder.geocodePosition({ lat: latitude, lng: longitude });
};

export const getCurrentLocation = () => {
  return requestLocationPermission().then(status => {
    return new Promise((resolve, reject) => {
      if (status === 'granted') {
        Geolocation.getCurrentPosition(
          position => {
            resolve({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
          },
          error => {
            reject(error);
          },
          {
            enableHighAccuracy: false,
            timeout: 15000,
            maximumAge: 10000,
          },
        );
      } else {
        reject(false);
      }
    });
  });
};

export const ToSearchInfoFromCoordinates = (latitude, longitude) => {

  return new Promise((resolve, reject) => {
    let coordinates = {
      latitude,
      longitude
    };
    console.log(coordinates)
    Meteor.call(
      'getToSearchInfoFromCoordinates',
      {
        location: {
          coordinates
        }
      },
      (err, result) => {
        if (!err) {
          console.log(result)
          resolve(result.data);
        } else {
          console.log(err)
          reject(err);
        }
      },
    );
  })
}

export const fetchAndParseGeoLocationData = (latitude, longitude) => {

  return ToSearchInfoFromCoordinates(latitude, longitude).then(results => {
    // return parseGoogleAddress(results);
    return results;
  });
};
