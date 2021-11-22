/**
 * Copyright (c) 2018-present, Oleum. All rights reserved.
 *
 */
'use strict';
import {observable, action} from 'mobx';
import Meteor from '@meteorrn/core';

import Beneficiary from './beneficiary';
import Account from '@stores/Account';

class Beneficiaries {
  @observable list = [];
  @observable communityList = [];
  @observable loading = false;
  @observable getCommunitiesLoading = false;

  @action
  logout() {
    this.list = [];
    this.communityList = [];
  }

  addAll = (data, isFromAPI = false) => {
    if (data) {
      this.removeAll();
      data.forEach(eachData => this.add(eachData, isFromAPI));
    }
  };

  removeAll = () => {
    this.list.replace([]);
  };

  add = (data, isFromAPI = false) => {
    let item = new Beneficiary(data, isFromAPI);
    if (!this.list.find(listItem => listItem.id === item.id)) {
      this.list.push(JSON.parse(JSON.stringify(item)));
    }
  };

  getBeneficiariesParentCorporate = vehiclesData => {
    let userData = [
      {
        id: Account.user.endUserId,
        type: Account.user.type,
      },
    ];
    let data = vehiclesData.concat(userData);
    this.loading = true;
    return new Promise((resolve, reject) => {
      Meteor.call(
        'getBeneficiariesParentCorporate',
        {
          users: data,
        },
        (err, result) => {
          if (!err) {
            this.loading = false;
            this.addAll(result, true);
            resolve(result);
          } else {
            this.loading = false;
            reject(err);
          }
        },
      );
    });
  };

  addAllCommunities = (data, isFromAPI = false) => {
    if (data) {
      this.removeAllCommunities();
      data.forEach(eachData => this.addCommunity(eachData, isFromAPI));
    }
  };

  removeAllCommunities = () => {
    this.communityList.replace([]);
  };

  addCommunity = (data, isFromAPI = false) => {
    let item = new Beneficiary(data, isFromAPI);
    if (!this.communityList.find(listItem => listItem.id === item.id)) {
      this.communityList.push(JSON.parse(JSON.stringify(item)));
    }
  };

  getCommunityList = vehiclesData => {
    let userData = [
      {
        id: Account.user.endUserId,
        type: Account.user.type,
      },
    ];
    let data = vehiclesData.concat(userData);
    this.getCommunitiesLoading = true;
    return new Promise((resolve, reject) => {
      Meteor.call(
        'getCommunityListOfUser',
        {
          users: data,
        },
        (err, result) => {
          if (!err) {
            this.getCommunitiesLoading = false;
            this.addAllCommunities(result, true);
            resolve(result);
          } else {
            this.getCommunitiesLoading = false;
            reject(err);
          }
        },
      );
    });
  };
}

export default new Beneficiaries();
export {Beneficiary, Beneficiaries};
