/**
 * Copyright (c) 2018-present, Oleum. All rights reserved.
 *
 */
'use strict';

import {observable, action, computed} from 'mobx';
import Upload from 'react-native-background-upload';
import Meteor from '@meteorrn/core';
// import RNGooglePlaces from 'react-native-google-places';

import Subscribe from '@lib/subscribe';

import Promotion from './promotion';
import Account from '@stores/Account';
import Locations from '@stores/Locations';
import {AppConstants} from '@config';
import settings from '@config/settings';

class Promotions {
  @observable list = [];
  // @observable location = {};
  @observable activeList = [];
  @observable filterApplied = false;
  @observable filterType;
  @observable filterName;
  @observable loading = true;
  subscription = new Subscribe();
  activeSubscription = new Subscribe();
  myPromotionSubscription = null;
  myActivePromotionSubscription = null;
  timer = null;
  @observable promotionReady = false;
  @observable activePromotionReady = false;

  @action
  reset() {
    this.list = [];
  }

  @action
  logout() {
    this.list = [];
    this.activeList = [];
    this.subscription = new Subscribe();
    this.activeSubscription = new Subscribe();
    this.myPromotionSubscription = null;
    this.myActivePromotionSubscription = null;
    this.promotionReady = false;
    this.activePromotionReady = false;
  }

  @computed
  get isLoading() {
    if (!this.loading || this.list.length) {
      return false;
    }
    return true;
  }

  addAll = (datas, isFromAPI = false) => {
    if (datas) {
      this.removeAll();
      datas.forEach(data => this.add(data, isFromAPI));
    }
  };

  removeAll = () => {
    this.list.replace([]);
  };

  add = (data, isFromAPI = false) => {
    let item = new Promotion(data, isFromAPI);
    if (!this.list.find(listItem => listItem.id === item.id)) {
      this.list.push(item);
    }
  };

  remove = id => {
    let newList = this.list.filter(item => item._id !== id);
    this.list.replace(newList);
  };

  update = (id, data, isFromAPI = false) => {
    let promotion = JSON.parse(JSON.stringify(new Promotion(data, isFromAPI)));
    let selectedItem = this.list.find(item => item.id === id);
    selectedItem = Object.assign(selectedItem, promotion);
    return selectedItem;
  };

  addAllActiveList = (datas, isFromAPI = false) => {
    if (datas) {
      this.removeAllActivelist();
      datas.forEach(data => this.addActiveList(data, isFromAPI));
    }
  };

  removeAllActivelist = () => {
    this.activeList.replace([]);
  };

  addActiveList = (data, isFromAPI = false) => {
    let item = new Promotion(data, isFromAPI);
    if (!this.activeList.find(listItem => listItem.id === item.id)) {
      this.activeList.push(item);
    }
  };

  removeActiveList = id => {
    let newList = this.activeList.filter(item => item._id !== id);
    this.activeList.replace(newList);
  };

  updateActiveList = (id, data, isFromAPI = false) => {
    let promotion = JSON.parse(JSON.stringify(new Promotion(data, isFromAPI)));
    let selectedItem = this.activeList.find(item => item.id === id);
    selectedItem = Object.assign(selectedItem, promotion);
    return selectedItem;
  };

  load = () => {
    setTimeout(() => {
      this.loading = false;
    }, 10000);
    let currentLocation = JSON.stringify(Locations.currentLocation);
    this.subscription.start('promotions.list', [
      Account.user.type,
      Account.user.endUserId,
      currentLocation,
    ]);
    this.activeSubscription.start('activePromotions.list', [
      Account.user.type,
      Account.user.endUserId,
    ]);

    if (!this.myPromotionSubscription) {
      this.myPromotionSubscription = this.subscription.onChange(
        'promotions',
        {},
        results => {
          this.promotionReady = true;
          this.addAll(results, true);
        },
      );
    }

    if (!this.myActivePromotionSubscription) {
      this.myActivePromotionSubscription = this.activeSubscription.onChange(
        'activePromotions',
        {},
        results => {
          this.activePromotionReady = true;
          this.addAllActiveList(results, true);
        },
      );
      // this.userCurrentLocation();
    }
  };

  updatePubSub = () => {
    let currentLocation = JSON.stringify(Locations.currentLocation);
    this.subscription.update([
      Account.user.type,
      Account.user.endUserId,
      currentLocation,
    ]);
  };

  // userCurrentLocation() {
  //   RNGooglePlaces.getCurrentPlace()
  //     .then(results => {
  //     console.log("AAA Promotions ~ userCurrentLocation ~ results", results)
  //       this.location = results[0];
  //     })
  //     .catch(error => console.log(error.message));
  // }

  meteorUploadProofImage = (image, promotionId) => {
    let options;
    return new Promise(function(resolve, reject) {
      let postURL =
        (settings.secureProtocol ? 'https' : 'http') +
        '://' +
        settings.serverAddress +
        (settings.serverPort ? ':' + settings.serverPort : '') +
        '/proofimage/upload';

      image.path = image.path.replace('file://', '');
      options = {
        url: postURL,
        path: image.path,
        method: 'POST',
        field: 'imageFile',
        headers: {
          promotionid: promotionId,
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

  @computed
  get filteredList() {
    return this.list
      .filter(item => {
        switch (item.type) {
          case AppConstants.action:
            return !this.activeList.find(data => data.promotionId === item.id);
          case AppConstants.material:
          case AppConstants.value:
            return !this.activeList.find(
              data =>
                data.promotionId === item.id &&
                ((data.status !== AppConstants.promotionStatus.completed &&
                  data.status !== AppConstants.promotionStatus.canceled) ||
                  (data.valueType && data.valueType.type !== 'FP')),
            );
        }
        return false;
      })
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  getServiceCharge(item) {
    let stakeHolder = item.stakeHolders.find(sh => sh.type === 'admin');
    if (stakeHolder) {
      return stakeHolder.commision;
    } else {
      return '';
    }
  }

  @computed
  get active() {
    return this.activeList.filter(
      data =>
        (data.status === AppConstants.promotionStatus.active &&
          data.type !== AppConstants.material) ||
        (data.status === AppConstants.promotionStatus.claimed &&
          data.type !== AppConstants.material),
    );
  }

  @computed
  get newList() {
    return this.filteredList
      .slice(0, 3)
      .sort((a, b) => this.getServiceCharge(b) - this.getServiceCharge(a));
  }

  @computed
  get recommendedList() {
    return this.filteredList.filter(
      data => data.type === AppConstants.value && data.valueType.type === 'FP',
    );
  }

  @computed
  get offerList() {
    return this.filteredList.filter(
      data =>
        data.type === AppConstants.action ||
        data.type === AppConstants.material ||
        (data.type === AppConstants.value && data.valueType.type !== 'FP'),
    );
  }

  @computed
  get AllList() {
    return this.filteredList
      .slice(3, this.filteredList.length)
      .sort((a, b) => this.getServiceCharge(b) - this.getServiceCharge(a));
  }

  @computed
  get filterList() {
    if (this.filterType === AppConstants.value) {
      return this.filteredList.filter(data => data.type === AppConstants.value);
    } else if (this.filterType === AppConstants.action) {
      return this.filteredList.filter(
        data => data.type === AppConstants.action,
      );
    } else if (this.filterType === AppConstants.material) {
      return this.filteredList.filter(
        data => data.type === AppConstants.material,
      );
    } else if (this.filterType === AppConstants.fp) {
      return this.filteredList.filter(
        data =>
          data.type === AppConstants.value && data.valueType.type === 'FP',
      );
    } else if (this.filterType === AppConstants.other) {
      return this.filteredList.filter(
        data =>
          data.type === AppConstants.value && data.valueType.type !== 'FP',
      );
    } else {
      return this.filteredList;
    }
  }

  @computed
  get unratedCompletedPromo() {
    return this.activeList.find(
      data => data.ratingStatus === 'UNRATED' && data.status === 'COMPLETED',
    );
  }

  @computed
  get ratedPromoList() {
    return this.activeList
      .filter(data => data.status === AppConstants.promotionStatus.completed)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  getScannedPromotion(ref) {
    return this.list.find(data => data.referenceId === ref);
  }

  getPromotionDetails = ref => {
    return new Promise((resolve, reject) => {
      Meteor.call(
        'getPublishedPromotion',
        {
          referenceId: ref,
        },
        (err, data) => {
          if (!err) {
            resolve(data);
          } else {
            reject(err);
          }
        },
      );
    });
  };
}

export default new Promotions();
export {Promotion};
