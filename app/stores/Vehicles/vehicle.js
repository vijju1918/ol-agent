/**
 * Copyright (c) 2018-present, Oleum. All rights reserved.
 *
 */

'use strict';

import {observable, computed} from 'mobx';
import Meteor from '@meteorrn/core';
import Upload from 'react-native-background-upload';
import {persist} from 'mobx-persist';

import Account from '@stores/Account';
import Cans from '@stores/Cans';

import settings from '@config/settings';

class Vehicle {
  @persist @observable id;
  @persist @observable code;
  @persist @observable number;
  @persist @observable title;
  @persist('list') @observable users = [];
  @persist @observable fuelTypeId;
  @persist @observable vehicleType;
  @persist @observable manufacturer;
  @persist @observable model;
  @observable recommendedMileage: '';
  @observable createdAt;
  @persist('object') @observable image;
  @persist('object') @observable mileage = {};
  @observable addVehicleLoading = false;
  @observable getVehicleRegistrationDetailsLoading = false;
  @persist @observable odometer = '';
  @observable dispensations = '';

  constructor(data, isFromAPI = false) {
    this.set(data, isFromAPI);
  }

  set(data, isFromAPI = false) {
    if (data && isFromAPI) {
      this.id = data._id;
      this.code = data.code;
      this.number = data.number;
      this.title =
        data.number && data.manufacturer && data.model
          ? data.number + ' - ' + data.manufacturer + ' ' + data.model
          : data.number && data.manufacturer
          ? data.number + ' ' + data.manufacturer
          : data.number
          ? data.number
          : '';
      this.users = data.users;
      this.fuelTypeId = data.fuelType;
      this.vehicleType = data.vehicleType;
      this.manufacturer = data.manufacturer;
      this.model = data.model;
      this.createdAt = data.createdAt;
      this.image = data.image;
      this.recommendedMileage =
        data.mileage && data.mileage.recommended
          ? data.mileage.recommended
          : '';
      this.mileage = data.mileage;
      this.odometer = data.odometer;
      this.dispensations = data.dispensations;
    } else if (data) {
      this.id = data.id;
      this.code = data.code;
      this.number = data.number;
      this.users = data.users;
      this.fuelTypeId = data.fuelTypeId;
      this.vehicleType = data.vehicleType;
      this.manufacturer = data.manufacturer;
      this.model = data.model;
      this.createdAt = data.createdAt;
      this.image = data.image;
      this.recommendedMileage =
        data.mileage && data.mileage.recommended
          ? data.mileage.recommended
          : '';
      this.mileage = data.mileage;
    }
  }

  reset() {
    this.id = '';
    this.code = '';
    this.number = '';
    this.users = [];
    this.fuelTypeId = '';
    this.vehicleType = '';
    this.manufacturer = '';
    this.model = '';
    this.createdAt = '';
    this.image = '';
    this.recommendedMileage = '';
  }

  @computed
  get formattedNumber() {
    return this.number ? this.number.replace(/[^a-zA-Z0-9]/g, '') : '';
  }

  updateNumber(number) {
    this.number = number
      ? number.toUpperCase().replace(/[^a-zA-Z0-9]/g, '')
      : '';
  }

  getVehicleRegistrationDetails = () => {
    this.getVehicleRegistrationDetailsLoading = true;
    return new Promise((resolve, reject) => {
      Meteor.call(
        'getVehicleRegistrationDetails',
        {
          regNo: this.number,
        },
        (err, data) => {
          if (!err) {
            this.getVehicleRegistrationDetailsLoading = false;
            resolve(data);
          } else {
            this.getVehicleRegistrationDetailsLoading = false;
            reject(err);
          }
        },
      );
    });
  };

  addOrUpdateVehicle = () => {
    this.addVehicleLoading = true;
    return new Promise((resolve, reject) => {
      Meteor.call(
        'addOrUpdateVehicle',
        {
          user: {
            id: Account.user.endUserId,
            type: Account.user.type,
          },
          vehicleId: this.id,
          number: this.number,
          fuelType: this.fuelTypeId,
          vehicleType: this.vehicleType,
          manufacturer: this.manufacturer,
          imageId: this.image ? this.image.id : null,
          model: this.model,
          recommendedMileage: Number(this.recommendedMileage),
        },
        (err, data) => {
          if (!err) {
            this.addVehicleLoading = false;
            resolve(data);
            setTimeout(() => {
              Cans.load();
            }, 100);
          } else {
            this.addVehicleLoading = false;
            reject(err);
          }
        },
      );
    });
  };

  meteorUploadLicenseImage = image => {
    let options;
    return new Promise(function(resolve, reject) {
      let postURL =
        (settings.secureProtocol ? 'https' : 'http') +
        '://' +
        settings.serverAddress +
        (settings.serverPort ? ':' + settings.serverPort : '') +
        '/licenseImage/upload';

      image.path = image.path.replace('file://', '');
      options = {
        url: postURL,
        path: image.path,
        method: 'POST',
        field: 'imageFile',
        headers: {
          usertype: Account.user.type,
          userid: Account.user.endUserId,
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
                resolve(responseBody);
              }
            }
          });
        })
        .catch(err => {
          console.log('Upload error!', err);
          reject(false);
        });
    });
  };

  meteorUploadVehicleImage = image => {
    let options;
    return new Promise(function(resolve, reject) {
      let postURL =
        (settings.secureProtocol ? 'https' : 'http') +
        '://' +
        settings.serverAddress +
        (settings.serverPort ? ':' + settings.serverPort : '') +
        '/vehicleImage/upload';

      image.path = image.path.replace('file://', '');
      options = {
        url: postURL,
        path: image.path,
        method: 'POST',
        field: 'imageFile',
        headers: {
          usertype: Account.user.type,
          userid: Account.user.endUserId,
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
                resolve(responseBody);
              }
            } else {
              reject(false);
            }
          });
        })
        .catch(err => {
          console.log('Upload error!', err);
          reject(false);
        });
    });
  };
}

export default Vehicle;
