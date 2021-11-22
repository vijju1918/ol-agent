/**
 * Copyright (c) 2018-present, Oleum. All rights reserved.
 *
 */
'use strict';
import {observable, action, computed} from 'mobx';
import Meteor from '@meteorrn/core';
import moment from 'moment-timezone';
import {_} from 'underscore';

import Dispensation from './dispensation';
import Account from '@stores/Account';
import Vehicles from '@stores/Vehicles';

import {AppConstants} from '@config';
import {sortOleumTypeCansFirst} from '@lib/utils';

class Dispensations {
  @observable list = [];
  @observable agentList = [];
  @observable dispensationDetails = [];
  @observable getVehicleDetailsForDispenseLoading = false;
  @observable nozzles = [];
  @observable paymentModes = [];
  @observable cans = [];
  @observable activeCommunityPromotions = [];
  @observable selectedVehicle = {};
  @observable next = null;
  @observable agentNext = null;
  @observable getDispensationsLoading = false;
  @observable getAgentDispensationsLoading = false;
  @observable deleteDispenseLoading = false;
  @observable getDispensationDetailsLoading = false;
  @observable isLoadingMore = false;

  @action
  logout() {
    this.list = [];
    this.agentList = [];
    this.nozzles = [];
    this.paymentModes = [];
    this.activeCommunityPromotions = [];
    this.cans = [];
    this.selectedVehicle = {};
  }

  addAll = (data, isFromAPI = false, loadMore = false) => {
    if (data && data.list) {
      if (!loadMore) {
        this.removeAll();
      }
      data.list.forEach(eachData => this.add(eachData, isFromAPI));
    }
  };

  removeAll = () => {
    this.list.replace([]);
  };

  add = (data, isFromAPI = false) => {
    let item = new Dispensation(data, isFromAPI);
    if (!this.list.find(listItem => listItem.id === item.id)) {
      this.list.push(JSON.parse(JSON.stringify(item)));
    }
  };

  addAgentAll = (data, isFromAPI = false, loadMore = false) => {
    if (data && data.list) {
      if (!loadMore) {
        this.removeAgentAll();
      }
      data.list.forEach(eachData => this.addAgent(eachData, isFromAPI));
    }
  };

  removeAgentAll = () => {
    this.agentList.replace([]);
  };

  addAgent = (data, isFromAPI = false) => {
    let item = new Dispensation(data, isFromAPI);
    if (!this.agentList.find(listItem => listItem.id === item.id)) {
      this.agentList.push(JSON.parse(JSON.stringify(item)));
    }
  };

  reset() {
    this.getVehicleDetailsForDispenseLoading = false;
    this.cans = [];
    this.selectedVehicle = {};
    this.next = 0;
    this.getDispensationsLoading = false;
    this.agentList = [];
    this.agentNext = null;
    this.getAgentDispensationsLoading = false;
  }

  updateVehicle(vehicle) {
    this.reset();
    this.selectedVehicle = vehicle;
    this.load();
  }

  @computed
  get getFuelPointsInCan() {
    let cans =
      this.cans &&
      this.cans.length &&
      this.cans.sort((a, b) =>
        a.quantity < b.quantity ? 1 : b.quantity < a.quantity ? -1 : 0,
      );
    return cans && cans.length && cans[0].quantity;
  }

  setResultData(data) {
    this.nozzles =
      data && data.nozzles && data.nozzles.length ? data.nozzles : [];
    this.paymentModes =
      data && data.paymentModes && data.paymentModes.length
        ? data.paymentModes
        : [];
    this.cans =
      data && data.cans && data.cans.length
        ? sortOleumTypeCansFirst(data.cans)
        : [];
    this.activeCommunityPromotions =
      data &&
      data.activeCommunityPromotions &&
      data.activeCommunityPromotions.length
        ? data.activeCommunityPromotions
        : [];
  }

  @computed
  get agentDispenseList() {
    let dispensations =
      this.agentList &&
      this.agentList.length &&
      this.agentList
        .slice()
        .sort((a, b) => new Date(b.dispensedAt) - new Date(a.dispensedAt))
        .map(eachDispensation => {
          let dispensation = JSON.parse(JSON.stringify(eachDispensation));
          dispensation.dispensedDate = moment(dispensation.dispensedAt)
            .tz(moment.tz.guess())
            .startOf('day');
          return dispensation;
        });
    dispensations = _.groupBy(dispensations, 'dispensedDate');
    let returnDispensationData = [];
    for (let key in dispensations) {
      returnDispensationData.push({
        title: key,
        data: dispensations[key],
      });
    }
    return returnDispensationData;
  }

  @computed
  get dispensationDetailsData() {
    return {
      id: this.dispensationDetails && this.dispensationDetails.id,
      user: this.dispensationDetails && this.dispensationDetails.userData,
      dispensedAt:
        this.dispensationDetails && this.dispensationDetails.dispensedAt,
      vehicleDetails:
        this.dispensationDetails && this.dispensationDetails.vehicleDetails,
      product: this.dispensationDetails && this.dispensationDetails.product,
      dispensedQuantity:
        this.dispensationDetails && this.dispensationDetails.dispensedQuantity,
      isFullTank:
        this.dispensationDetails && this.dispensationDetails.isFullTank,
      paymentDetails:
        this.dispensationDetails && this.dispensationDetails.paymentDetails,
      isLocked: this.dispensationDetails && this.dispensationDetails.isLocked,
      referenceId:
        this.dispensationDetails && this.dispensationDetails.referenceId,
      createdAt: this.dispensationDetails && this.dispensationDetails.createdAt,
      sbu: this.dispensationDetails && this.dispensationDetails.sbu,
      agent: this.dispensationDetails && this.dispensationDetails.agent,
    };
  }

  getVehicleDetailsForDispense = vehicleNumber => {
    this.getVehicleDetailsForDispenseLoading = true;
    return new Promise((resolve, reject) => {
      Meteor.call(
        'getVehicleDetailsForDispense',
        {
          vehicleNumber: vehicleNumber,
          agent: {
            id: Account.user.endUserId,
            type: Account.user.type,
          },
          sbu: {
            id:
              Account.profile && Account.profile.sbu && Account.profile.sbu.id,
            type: AppConstants.corporate,
          },
        },
        (err, data) => {
          if (!err) {
            this.getVehicleDetailsForDispenseLoading = false;
            this.setResultData(data);
            resolve(data);
          } else {
            this.getVehicleDetailsForDispenseLoading = false;
            reject(err);
          }
        },
      );
    });
  };

  getUserData() {
    let data = [];
    if (
      this.selectedVehicle &&
      this.selectedVehicle.id &&
      this.selectedVehicle.id === AppConstants.invoiceType.allInvoices
    ) {
      let vehicleData =
        Vehicles.list && Vehicles.list.length
          ? Vehicles.list.map(eachVehicle => {
              return {id: eachVehicle.id, type: AppConstants.vehicle};
            })
          : [];
      let userData = Account.user.endUserId
        ? [
            {
              id: Account.user.endUserId,
              type: Account.user.type,
            },
          ]
        : [];
      data = [...vehicleData, ...userData];
      return data;
    } else {
      data = [
        {
          id: this.selectedVehicle && this.selectedVehicle.id,
          type: AppConstants.vehicle,
        },
      ];
      return data;
    }
  }

  load = (loadMore = false) => {
    let userData = this.getUserData();
    if (loadMore) {
      this.isLoadingMore = true;
    } else {
      this.getDispensationsLoading = true;
    }
    return new Promise((resolve, reject) => {
      Meteor.call(
        'getDispensations',
        {
          users: userData,
          next: loadMore ? this.next : 0,
        },
        (err, data) => {
          if (!err) {
            this.getDispensationsLoading = false;
            this.isLoadingMore = false;
            this.addAll(data, true, loadMore);
            this.next = data && data.next;
            resolve(data);
          } else {
            this.getDispensationsLoading = false;
            this.isLoadingMore = false;
            reject(err);
          }
        },
      );
    });
  };

  loadAgentDispensations = (loadMore = false) => {
    if (loadMore) {
      this.isLoadingMore = true;
    } else {
      this.getAgentDispensationsLoading = true;
    }
    return new Promise((resolve, reject) => {
      Meteor.call(
        'getDispensations',
        {
          users: [
            {
              id: Account.user.endUserId,
              type: Account.user.type,
            },
          ],
          next: this.agentNext,
          type: AppConstants.agent,
        },
        (err, data) => {
          if (!err) {
            this.getAgentDispensationsLoading = false;
            this.isLoadingMore = false;
            this.addAgentAll(data, true, loadMore);
            this.agentNext = data && data.next;
            resolve(data);
          } else {
            this.getAgentDispensationsLoading = false;
            this.isLoadingMore = false;
            reject(err);
          }
        },
      );
    });
  };

  deleteDispense = dispensationId => {
    this.deleteDispenseLoading = true;
    return new Promise((resolve, reject) => {
      Meteor.call(
        'deleteDispense',
        {
          id: dispensationId,
        },
        (err, data) => {
          if (!err) {
            this.deleteDispenseLoading = false;
            this.load();
            resolve(data);
          } else {
            this.deleteDispenseLoading = false;
            reject(err);
          }
        },
      );
    });
  };

  setDispensationDetails(data, isFromAPI = false) {
    let item = new Dispensation(data, isFromAPI);
    this.dispensationDetails = item;
  }

  getDispensationDetails = referenceId => {
    this.getDispensationDetailsLoading = true;
    return new Promise((resolve, reject) => {
      Meteor.call(
        'getDispensationDetails',
        {
          referenceId: referenceId,
        },
        (err, data) => {
          if (!err) {
            this.getDispensationDetailsLoading = false;
            this.setDispensationDetails(data, true);
            resolve(data);
          } else {
            this.getDispensationDetailsLoading = false;
            reject(err);
          }
        },
      );
    });
  };
}

export default new Dispensations();
export {Dispensation, Dispensations};
