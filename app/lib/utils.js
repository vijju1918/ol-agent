/**
 * Copyright (c) 2018-present, Evolvier Technologies. All rights reserved.
 *
 */

'use strict';

import moment from 'moment-timezone';
import Contacts from 'react-native-contacts';
import {isValidNumber, format, parse} from 'libphonenumber-js';
import {Platform} from 'react-native';
import Geocoder from 'react-native-geocoder';
// import {PermissionsAndroid} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Geolocation from '@react-native-community/geolocation';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';

import Account from '@stores/Account';
import Config from '@stores/Config';

import settings from '../config/settings';
import AppResources from '@config/resources';
import AppConstants from '@config/constants';

export const getCurrentLocation = () => {
  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      info => resolve(info),
      error => reject(error),
    );
  });
};

function getDateTimeString(date, dateFormat) {
  if (date) {
    return moment(date)
      .tz(moment.tz.guess())
      .format(dateFormat);
  }
  return null;
}

async function getDeviceInfo() {
  let oneSignalUserId;
  oneSignalUserId = await AsyncStorage.getItem('oneSignalId');
  return {
    os: Platform.OS,
    oneSignalId: oneSignalUserId,
  };
}

function formatPhoneNumber(phoneNumber) {
  if (isValidNumber(phoneNumber)) {
    return format(parse(phoneNumber), 'E.164');
  } else {
    let number = phoneNumber.replace(/\D+/g, '');
    if (number.length > 10) {
      return null;
    }
    number = Account.user.country.dial_code + number;
    return number;
  }
}

function getName(givenName, middleName, familyName) {
  let name = givenName;
  if (middleName) {
    name = name + ' ' + middleName;
  }
  if (familyName) {
    name = name + ' ' + familyName;
  }
  return name;
}

function fetchPhoneContacts() {
  return new Promise(function(resolve, reject) {
    //
    Contacts.getAll((getAllErr, contacts) => {
      if (getAllErr === 'denied') {
        reject(getAllErr);
      } else {
        let contactsArr = [];
        contacts.forEach(contact => {
          contact.phoneNumbers.forEach(phoneNumber => {
            const formattedPhoneNumber = formatPhoneNumber(phoneNumber.number);
            if (
              formattedPhoneNumber &&
              formattedPhoneNumber !== Account.user.number &&
              !contactsArr.find(
                item => item.formattedPhoneNumber === formattedPhoneNumber,
              )
            ) {
              let localPicture = null;
              if (contact.hasThumbnail) {
                if (Platform.OS === 'ios') {
                  localPicture = 'file:/' + contact.thumbnailPath;
                } else {
                  localPicture = contact.thumbnailPath;
                }
              }
              contactsArr.push({
                name: getName(
                  contact.givenName,
                  contact.middleName,
                  contact.familyName,
                ),
                localPicture: localPicture,
                phoneNumber: phoneNumber.number,
                formattedPhoneNumber: formattedPhoneNumber,
                picture: contact.picture,
              });
            }
          });
        });
        resolve(contactsArr);
      }
    });
  });
}

function getAllContacts() {
  // return new Promise(function(resolve, reject) {
  //   Contacts.checkPermission((err, permission) => {
  //     // Contacts.PERMISSION_AUTHORIZED || Contacts.PERMISSION_UNDEFINED || Contacts.PERMISSION_DENIED
  //     let platformPermission =
  //       Platform.OS === 'ios'
  //         ? PERMISSIONS.IOS.CONTACTS
  //         : Platform.OS === 'android'
  //         ? PERMISSIONS.ANDROID.READ_CONTACTS
  //         : '';
  //     if (permission === 'undefined') {
  //       Contacts.requestPermission(
  //         (requestPermissionErr, requestedPermission) => {
  //           if (requestedPermission) {
  //             permission = requestedPermission;
  //           }
  //           reject(requestPermissionErr);
  //         },
  //       );
  //     }
  //     if (permission === 'authorized') {
  //       fetchPhoneContacts().then(data => resolve(data));
  //     }
  //     if (permission === 'denied') {
  //       // if (Platform.OS !== 'ios') {
  //       //   PermissionsAndroid.request(
  //       //     PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
  //       //   ).then(androidPermission => {
  //       //     if (androidPermission === 'granted') {
  //       //       fetchPhoneContacts().then(data => resolve(data));
  //       //     }
  //       //   });
  //       // } else {
  //       //   reject(err);
  //       // }
  //       if (platformPermission) {
  //         request(platformPermission).then(result => {
  //           if (result === 'granted') {
  //             fetchPhoneContacts().then(data => resolve(data));
  //           }
  //         });
  //       } else {
  //         reject(err);
  //       }
  //     }
  //   });
  // });

  return new Promise(function(resolve, reject) {
    let permission =
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.CONTACTS
        : Platform.OS === 'android'
        ? PERMISSIONS.ANDROID.READ_CONTACTS
        : '';
    check(permission)
      .then(permissionStatus => {
        switch (permissionStatus) {
          case RESULTS.UNAVAILABLE:
            request(permission).then(result => {
              if (result === 'granted') {
                fetchPhoneContacts().then(data => resolve(data));
              }
            });
            break;
          case RESULTS.GRANTED:
            fetchPhoneContacts().then(data => resolve(data));
            break;
          case RESULTS.DENIED:
            request(permission).then(result => {
              if (result === 'granted') {
                fetchPhoneContacts().then(data => resolve(data));
              }
            });
            break;
        }
      })
      .catch(error => {
        console.log('Error', error);
        reject(error);
      });
  });
}

function checkContactPermissionStatus() {
  return new Promise(function(resolve, reject) {
    let permission =
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.CONTACTS
        : Platform.OS === 'android'
        ? PERMISSIONS.ANDROID.READ_CONTACTS
        : '';
    check(permission)
      .then(result => {
        resolve(result);
      })
      .catch(error => {
        console.log('Error', error);
        reject(error);
      });
  });
}

function constructAbsoluteUrl(relativePath) {
  if (relativePath === undefined || relativePath === null) {
    return undefined;
  }

  let theRelativePath = relativePath;

  if (theRelativePath.substring(0, 1) !== '/') {
    theRelativePath = '/' + theRelativePath;
  }

  let theUrl =
    (settings.secureProtocol ? 'https' : 'http') +
    '://' +
    settings.serverAddress +
    (settings.serverPort ? ':' + settings.serverPort : '') +
    theRelativePath;

  return theUrl;
}

function getImageDisplayUri(path, defaultImage = AppResources.noProfilePic) {
  if (!path) {
    return defaultImage;
  } else if (
    path.startsWith('file://') ||
    path.startsWith('assets-library://') ||
    path.startsWith('content://') ||
    path.startsWith('http://') ||
    path.startsWith('https://')
  ) {
    return {
      uri: path,
    };
  } else {
    return {
      uri: constructAbsoluteUrl(path),
    };
  }
}

function decodePosition(thePosition) {
  if (Config.fallbackGoogleApiKey) {
    Geocoder.fallbackToGoogle(Config.fallbackGoogleApiKey);
  }
  return new Promise(function(resolve, reject) {
    //
    Geocoder.geocodePosition(thePosition).then(
      addressArray => {
        if (addressArray.length > 0 && addressArray[0].formattedAddress) {
          resolve(addressArray[0].formattedAddress);
        } else {
          reject('No address returned!');
        }
      },
      err => reject(err),
    );
  });
}

export const storeData = async (key, data) => {
  try {
    await AsyncStorage.setItem(key, data);
  } catch (e) {
    console.log(e);
  }
};

export const getStoredData = key => {
  return AsyncStorage.getItem(key);
};

export const isValidVehicleNumber = vehicleNumber => {
  const pattern = new RegExp('^[A-Z]{2}[0-9]{2}[A-Z]{1,2}[0-9]{1,4}$');
  if (vehicleNumber) {
    return pattern.test(vehicleNumber);
  }
};

export const fetchVehicleDetailsUsingVehicleId = (vehicleList, vehicleId) => {
  if (vehicleList && vehicleList.length && vehicleId) {
    let matchedVehicle = vehicleList.find(
      eachVehicle => eachVehicle.id === vehicleId,
    );
    return matchedVehicle;
  }
};

export const sortOleumTypeCansFirst = canList => {
  if (canList && canList.length) {
    return canList.sort(eachCan =>
      eachCan.type && eachCan.type === AppConstants.canTypes.oleum ? -1 : 1,
    );
  } else {
    return [];
  }
};

export {getDateTimeString, getDeviceInfo, decodePosition};
export {constructAbsoluteUrl, getImageDisplayUri};
export {getAllContacts, checkContactPermissionStatus};
