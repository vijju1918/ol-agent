/**
 * Copyright (c) 2018-present, Oleum. All rights reserved.
 *
 */
'use strict';

import {observable, action} from 'mobx';
// import RNGooglePlaces from 'react-native-google-places';
import Meteor from '@meteorrn/core';
import {persist} from 'mobx-persist';

import Subscribe from '@lib/subscribe';

import Corporate from './corporate';
import FuelStation from './fuelStation';

class CorporatesList {
  @persist('list', Corporate) @observable list = [];
  @observable nearByFuelStationsList = [];
  @observable fuelStationSearchResult = [];
  @observable getUserCurrentLocationLoading = false;
  @observable getNearByFuelStationsLoading = false;
  @observable searchFuelStationsLoading = false;
  subscription = new Subscribe();
  myCorporateSubscription = null;
  @observable ready = false;

  @action
  logout() {
    this.list = [];
    this.subscription = new Subscribe();
    this.myCorporateSubscription = null;
    this.ready = false;
  }

  @action
  reset() {
    this.list = [];
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
    let item = new Corporate(data, isFromAPI);
    if (!this.list.find(listItem => listItem.id === item.id)) {
      this.list.push(item);
    }
  };

  remove = id => {
    let newList = this.list.filter(item => item._id !== id);
    this.list.replace(newList);
  };

  update = (id, data, isFromAPI = false) => {
    let corporate = JSON.parse(JSON.stringify(new Corporate(data, isFromAPI)));
    let selectedItem = this.list.find(item => item.id === id);
    selectedItem = Object.assign(selectedItem, corporate);
    return selectedItem;
  };

  get = id => {
    return this.list.find(corporate => corporate.id === id);
  };

  load = () => {
    // this.subscription.start('corporates.list', [
    //   Account.user.type,
    //   Account.user.endUserId,
    // ]);

    if (!this.myCorporateSubscription) {
      this.myCorporateSubscription = this.subscription.onChange(
        'corporates',
        {},
        results => {
          this.ready = true;
          this.addAll(results, true);
        },
      );
    }
  };

  // userCurrentLocation() {
  //   this.getUserCurrentLocationLoading = true;
  //   return RNGooglePlaces.getCurrentPlace()
  //     .then(results => {
  //       this.getUserCurrentLocationLoading = false;
  //       const location = {
  //         coordinates: {
  //           longitude: results[0].location.longitude,
  //           latitude: results[0].location.latitude,
  //         },
  //         // address: results[0].address,
  //         // name: results[0].name,
  //       };
  //       return location;
  //     })
  //     .catch(error => {
  //       this.getUserCurrentLocationLoading = false;
  //       console.log(error.message);
  //       return error;
  //     });
  // }

  addAllNearByFuelStations = (data, isFromAPI = false) => {
    if (data) {
      this.removeAllNearByFuelStations();
      data.forEach(eachData => this.addNearByFuelStation(eachData, isFromAPI));
    }
  };

  removeAllNearByFuelStations = () => {
    this.nearByFuelStationsList.replace([]);
  };

  addNearByFuelStation = (data, isFromAPI = false) => {
    let item = new FuelStation(data, isFromAPI);
    if (
      !this.nearByFuelStationsList.find(listItem => listItem.id === item.id) ||
      !this.nearByFuelStationsList.find(
        listItem => listItem.placeId === item.placeId,
      )
    ) {
      this.nearByFuelStationsList.push(JSON.parse(JSON.stringify(item)));
    }
  };

  getNearByFuelStations = (latitude, longitude) => {
    this.getNearByFuelStationsLoading = true;
    return new Promise((resolve, reject) => {
      Meteor.call(
        'getNearByFuelStations',
        {
          latitude: latitude,
          longitude: longitude,
        },
        (err, data) => {
          if (!err) {
            this.getNearByFuelStationsLoading = false;
            this.addAllNearByFuelStations(data, true);
            resolve(data);
          } else {
            this.getNearByFuelStationsLoading = false;
            reject(err);
          }
        },
      );
    });
  };

  addAllFuelStationSearchResult = (data, isFromAPI = false) => {
    if (data && data.length) {
      this.removeAllFuelStationSearchResult();
      data.forEach(eachData =>
        this.addFuelStationSearchResult(eachData, isFromAPI),
      );
    }
  };

  removeAllFuelStationSearchResult = () => {
    this.fuelStationSearchResult.replace([]);
  };

  addFuelStationSearchResult = (data, isFromAPI = false) => {
    let item = new FuelStation(data, isFromAPI);
    if (
      !this.fuelStationSearchResult.find(listItem => listItem.id === item.id)
    ) {
      this.fuelStationSearchResult.push(JSON.parse(JSON.stringify(item)));
    }
  };

  searchFuelStations = query => {
    this.searchFuelStationsLoading = true;
    return new Promise((resolve, reject) => {
      Meteor.call(
        'searchFuelStations',
        {
          query: query,
        },
        (err, data) => {
          if (!err) {
            this.searchFuelStationsLoading = false;
            this.addAllFuelStationSearchResult(data, true);
            resolve(data);
          } else {
            this.searchFuelStationsLoading = false;
            reject(err);
          }
        },
      );
    });
  };
}

export default new CorporatesList();
export {Corporate};
