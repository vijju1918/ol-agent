/**
 * Copyright (c) 2017-present, Oleum. All rights reserved.
 *
 */

'use strict';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Meteor from '@meteorrn/core';
import {observable} from 'mobx';
import {persist} from 'mobx-persist';
import Upload from 'react-native-background-upload';

import Subscribe from '@lib/subscribe';

import settings from '@config/settings';
import DispenseRequests from '@stores/DispenseRequests';
import Products from '@stores/Products';
import Cans from '@stores/Cans';
import Locations from '@stores/Locations'; 
import Corporates from '@stores/Corporates';
import Promotions from '@stores/Promotions';
import NewPromotions from '../Promotions/newIndex';
import Contacts from '@stores/Contacts';
import Ratings from '@stores/Ratings';
import Notifications from '@stores/Notifications';
import Beneficiaries from '@stores/Beneficiaries';
import Dispensations from '@stores/Dispensations';
import Vehicles from '@stores/Vehicles';
import VehicleDetails from '@stores/VehicleDetails';
import Config from '@stores/Config';

import User from './user';
import Profile from './profile';
import {getDeviceInfo} from '../../lib/utils';
import {AppConstants} from '@config';

// import { errorMessages, errorDuration } from "../config/strings";
// import { renderAlert, closeAlert } from "@lib/utils";getDeviceInfo

const USER_TOKEN_KEY = 'reactnativemeteor_usertoken';

class Account {
  @persist('object', User) @observable user = new User();
  @persist('object', Profile) @observable profile = new Profile();
  @observable connectionReady = false;
  @observable userReady = false;
  @observable profileReady = false;
  subscription = new Subscribe();
  myProfileSubscription = null;
  userSubscription = null;

  isFirstOpen = key => {
    return new Promise(resolve => {
      AsyncStorage.getItem(key, (err, value) => {
        if (!err && value) {
          resolve(false);
        } else {
          AsyncStorage.setItem(key, 'true');
          resolve(true);
        }
      });
    });
  };

  meteorConnectionAlert = () => {
    Meteor.ddp.on('connected', () => {
      // Meteor._subscriptionsRestart();
      // closeAlert();
    });
    Meteor.ddp.on('disconnected', () => {
      // renderAlert("Failed to contact server");
    });
  };

  hasCredentials = () => {
    const user = this.user;
    if (!user || !user.id) {
      return false;
    }
    return user;
  };

  hasProfile = () => {
    if (this.profile.fullName) {
      return true;
    }
    return false;
  };

  isAgent = () => {
    if (this.profile.types.find(item => item === 'MCA' || item === 'DSM')) {
      return true;
    } else {
      return false;
    }
  };

  isAgentMCA = () => {
    if (this.profile.types.find(item => item === 'MCA')) {
      return true;
    } else {
      return false;
    }
  };

  isAgentDSM = () => {
    if (this.profile.types.find(item => item === 'DSM')) {
      return true;
    } else {
      return false;
    }
  };

  loadUserData = () => {
    this.profileLoad();
    // Locations.locationDetails.userCurrentLocation();
    this.updateDeviceInfo();
    Config.load();
    Corporates.load();
    Vehicles.load();
    Cans.load();
    Locations.load();
    Promotions.load();
    // Products.load();
    DispenseRequests.load();
    Contacts.load();
    Ratings.load();
    Notifications.load();
    VehicleDetails.loadVehiclesInfo();
  };

  initUserStore = () => {
    let user = Meteor.user();
    if (user) {
      this.user.update(Meteor.user());
      this.loadUserData();
      if (!this.userSubscription) {
        this.userSubscription = this.subscription.onChange(
          'users',
          {
            _id: this.user.id,
          },
          results => {
            this.userReady = true;
            if (results && results.length) {
              this.user.update(results[0]);
            }
          },
        );
      }
    }
  };

  profileLoad = () => {
    if (!this.myProfileSubscription) {
      this.myProfileSubscription = this.subscription.onChange(
        'profile',
        {
          _id: this.user.endUserId,
        },
        results => {
          this.profileReady = true;
          if (results && results.length) {
            this.profile.set(results[0], true);
          }
        },
      );
    }
  };

  updateUser = () => {
    return new Promise(resolve => {
      resolve(true);
    });
  };

  getConnected = () => {
    return new Promise((resolve, reject) => {
      if (!Meteor) {
        reject(false);
      } else if (Meteor.status().connected) {
        resolve(true);
      } else {
        Meteor.ddp.on('connected', () => {
          resolve(true);
        });
      }
    });
  };

  isUserReady = () => {
    return new Promise((resolve, reject) => {
      try {
        let timer = setInterval(() => {
          if (!Meteor.loggingIn()) {
            clearInterval(timer);
            resolve(true);
          }
        }, 100);
      } catch (ex) {
        reject(ex);
      }
    });
  };

  login = ({user, code}) => {
    return this.meteorLogin(
      user.internationalFormatNumber,
      code,
      user.country,
    ).then(data => {
      this.initUserStore();
      return data;
    });
  };

  resetAllData = () => {
    Promotions.logout();
    NewPromotions.logout();
    Notifications.logout();
    Products.logout();
    Cans.logout();
    Corporates.logout();
    DispenseRequests.logout();
    Ratings.logout();
    Beneficiaries.logout();
    Dispensations.logout();
    Vehicles.logout();
    Config.logout();
    this.user = new User();
    this.profile = new Profile();
    this.subscription = new Subscribe();
    this.myProfileSubscription = null;
    this.userSubscription = null;
    this.userReady = false;
    this.profileReady = false;
  };

  logout = () => {
    Meteor.logout();
    AsyncStorage.removeItem(USER_TOKEN_KEY);
    this.resetAllData();
    AsyncStorage.removeItem(
      AppConstants.asyncStorageKeys.lastFuelDispensedNozzleId,
    );
    AsyncStorage.removeItem(AppConstants.asyncStorageKeys.lastSelectedUserRole);
    return true;
  };

  updateDeviceInfo = () => {
    return new Promise((resolve, reject) => {
      getDeviceInfo().then(deviceInfo => {
        Meteor.call(
          'updateDeviceInfo',
          {
            deviceInfo: deviceInfo,
          },
          err => {
            if (err) {
              reject(err);
            } else {
              resolve(true);
            }
          },
        );
      });
    });
  };

  sendVerificationCode = user => {
    return this.meteorSendVerificationCode(user.internationalFormatNumber);
  };

  meteorSendVerificationCode = phone => {
    return new Promise((resolve, reject) => {
      Meteor.call('sendVerificationCode', phone, error => {
        if (error) {
          reject(false);
        } else {
          resolve(true);
        }
      });
    });
  };

  meteorLogin = (phoneNumber, code, country) => {
    // const Data = Meteor.getData();
    return new Promise((resolve, reject) => {
      Meteor._login(
        {
          ['phone']: {
            phone: phoneNumber,
            code: code,
            country: country,
          },
        },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            // save user id and token
            // AsyncStorage.setItem(USER_TOKEN_KEY, result.token);
            // Data._tokenIdSaved = result.token;
            // Meteor._userIdSaved = result.id;
            resolve(true);
          }
        },
      );
    });
  };

  meteorUploadProfileImage = (image, userId, userType) => {
    let options;
    return new Promise(function(resolve, reject) {
      let postURL =
        (settings.secureProtocol ? 'https' : 'http') +
        '://' +
        settings.serverAddress +
        (settings.serverPort ? ':' + settings.serverPort : '') +
        '/profileImage/upload';

      image.path = image.path.replace('file://', '');
      options = {
        url: postURL,
        path: image.path,
        method: 'POST',
        field: 'imageFile',
        headers: {
          userId: userId,
          userType: userType,
          'content-type': image.mime,
        },
        type: 'multipart',
        // Below are options only supported on Android
        notification: {
          enabled: true,
        },
      };

      Upload.startUpload(options)
        .then(uploadId => {
          console.log('Upload started');
          Upload.addListener('progress', uploadId, data => {
            console.log(`Progress: ${data.progress}%`);
          });
          Upload.addListener('error', uploadId, data => {
            console.log(`Error: ${data.error}%`);
          });
          Upload.addListener('cancelled', uploadId, data => {
            if (data) {
              console.log('Cancelled!');
            }
          });
          Upload.addListener('completed', uploadId, data => {
            if (data && data.responseBody) {
              let responseBody = JSON.parse(data.responseBody);
              if (responseBody.status === 'success') {
                console.log('Completed!');
              }
            }
            resolve(data);
          });
        })
        .catch(err => {
          console.log('Upload error!', err);
          reject(false);
        });
    });
  };

  sleep = time => new Promise(resolve => setTimeout(resolve, time));
}

export default new Account();
export {User};
export {Profile};
