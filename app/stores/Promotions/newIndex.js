/**
 * Copyright (c) 2018-present, Oleum. All rights reserved.
 *
 */
'use strict';

import { observable, action } from 'mobx';
import Meteor from '@meteorrn/core';

import { AppConstants } from '@config';

import NewPromotion from './newPromotion';
import Account from '@stores/Account';
import Locations from '@stores/Locations';

class NewPromotions {
  @observable valueFpPromotionList = [];
  @observable getPromotionsListLoadingMore = false;
  @observable getPromotionsListBackgroundLoading = false;
  @observable getPromotionsListLoading = false;

  @action
  reset() {
    this.valueFpPromotionList = [];
    this.getPromotionsListLoadingMore = false;
    this.getPromotionsListBackgroundLoading = false;
    this.getPromotionsListLoading = false;
  }

  @action
  logout() {
    this.valueFpPromotionList = [];
    this.getPromotionsListLoadingMore = false;
    this.getPromotionsListBackgroundLoading = false;
    this.getPromotionsListLoading = false;
  }

  /**
   * Return location details for 'getPromotionsList' method
   *
   * @return {Object}
   * @memberof Promotions
   */
  locationDataForPromotionList() {
    let currentLocation = Locations.currentLocation;
    let coordinatesData = {};
    if (
      currentLocation &&
      currentLocation.coordinates &&
      currentLocation.coordinates.length
    ) {
      coordinatesData = {
        longitude: currentLocation.coordinates[0],
        latitude: currentLocation.coordinates[1],
      };
    }
    let locationData = {
      coordinates: coordinatesData,
      toSearch: currentLocation && currentLocation.toSearch,
      google: currentLocation && currentLocation.google,
    };
    return locationData;
  }

  /**
   * Clear promotion data
   *
   * @memberof Promotions
   */
  removeAllPromotionList = () => {
    this.valueFpPromotionList.replace([]);
  };

  /**
   * Set promotion item
   *
   * @param {Object} data Each promotion item
   * @param {boolean} [isFromAPI=false]
   * @memberof Promotions
   */
  addPromotionItem = (data, isFromAPI = false) => {
    let item = new NewPromotion(data, isFromAPI);
    if (!this.valueFpPromotionList.find(listItem => listItem.id === item.id)) {
      this.valueFpPromotionList.push(item);
    }
  };

  /**
   * Set result of 'getPromotionsList' method
   *
   * @param {Array} data Promotions array
   * @param {boolean} [isFromAPI=false]
   * @param {boolean} [loadMore=false]
   * @memberof Promotions
   */
  addAllPromotionList = (data, isFromAPI = false, loadMore = false) => {
    if (data) {
      if (!loadMore) {
        this.removeAllPromotionList();
      }
      data.forEach(eachData => this.addPromotionItem(eachData, isFromAPI));
    }
  };

  /**
   * Method for fetching 'Promotions'
   *
   * @param {boolean} [loadMore=false]
   * @param {boolean} [backgroundLoading=false]
   * @memberof Promotions
   */
  getPromotionsList = data => {
    if (data && data.loadMore) {
      this.getPromotionsListLoadingMore = true;
    } else if (data && data.backgroundLoading) {
      this.getPromotionsListBackgroundLoading = true;
    } else {
      this.getPromotionsListLoading = true;
    }
    return new Promise((resolve, reject) => {
      Meteor.call(
        'listPromotions',
        {
          user: { id: Account.user.endUserId, type: Account.user.type },
          location: this.locationDataForPromotionList(),
          filters: { types: [AppConstants.value], valueTypes: ['FP'] },
          next: data && data.loadMore ? this.promotionsListNext : 0,
        },
        (err, result) => {
          if (!err) {
            this.getPromotionsListLoading = false;
            this.getPromotionsListLoadingMore = false;
            this.getPromotionsListBackgroundLoading = false;
            this.addAllPromotionList(
              result && result.list,
              true,
              data && data.loadMore,
            );
            this.promotionsListNext = result && result.next;
            resolve(result);
          } else {
            this.getPromotionsListLoading = false;
            this.getPromotionsListLoadingMore = false;
            this.getPromotionsListBackgroundLoading = false;
            reject(err);
          }
        },
      );
    });
  };
}

export default new NewPromotions();
export { NewPromotion };
