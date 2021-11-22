/**
 * Copyright (c) 2018-present, Oleum. All rights reserved.
 *
 */

'use strict';

import {observable, computed} from 'mobx';
import Meteor from '@meteorrn/core';
import moment from 'moment-timezone';
// import RNGooglePlaces from 'react-native-google-places';
import haversine from 'haversine';

import {AppStrings, AppConstants} from '@config';
import {
  getDateTimeString,
  fetchVehicleDetailsUsingVehicleId,
  sortOleumTypeCansFirst,
} from '../../lib/utils';

import Segment from '@stores/Promotions/segment';
import {getCurrentLocation, fetchAndParseGeoLocationData} from '@lib/geocoder';

import Corporates from '@stores/Corporates';
import Account from '@stores/Account';
import Locations from '@stores/Locations';
import Cans from '@stores/Cans';
import Vehicles from '@stores/Vehicles';

class dispenseRequest {
  @observable loading = false;
  @observable id;
  @observable location = {};
  @observable dispensationDate;
  @observable validity = new Date();
  @observable canId;
  @observable user = {
    id: Account.user.endUserId,
    type: Account.user.type,
  };
  @observable vendorId;
  @observable vendorTitle;
  @observable product = {};
  @observable type;
  @observable value;
  @observable valueType;
  @observable valueUnit;
  @observable quantity;
  @observable dispensedQuatity;
  @observable vehicleNumber;
  @observable fuelNozzleId;
  @observable odometer;
  @observable isFullTank = false;
  @observable dispensedQuantities = [];
  @observable referenceId;
  @observable status;
  @observable statusHistory = [];
  @observable createdAt = new Date();
  @observable material = {};
  @observable segments = [];
  @observable promotionId;
  @observable promotedBy = {};
  @observable agent = {};
  @observable location = {};
  @observable sbulist = [];
  @observable products = [];
  @observable filter;
  @observable dispensationVehicle = {};
  @observable fetchUserCurrentLocationLoading = false;

  constructor(data, isFromAPI = false) {
    this.set(data, isFromAPI);
  }

  set(data, isFromAPI = false) {
    if (data && isFromAPI) {
      this.id = data._id;
      this.location = data.location;
      this.dispensationDate = data.dispensationDate;
      this.validity = data.validity;
      this.can = data.can;
      this.statusHistory = data.statusHistory ? data.statusHistory : [];
      this.user = data.user;
      this.type = data.type;
      this.product = data.product;
      this.createdAt = data.createdAt;
      this.agent = data.agent;
      if (data.drQuantity) {
        this.value = data.drQuantity.value;
        this.valueType = data.drQuantity.type;
        this.valueUnit = data.drQuantity.unit;
      }
      this.quantity = data.quantity;
      if (data.can) {
        this.canId = data.can.id;
        this.vendorId = data.can.vendorId;
        this.vendorTitle = data.can.vendor && data.can.vendor.title;
      }
      this.referenceId = data.referenceId;
      this.status = data.status;
      this.dispensedQuantities = data.dispensedQuantities;
      this.material = data.material;
      this.promotionId = data.promotionId;
      this.promotedBy = data.promotedBy;
      if (data.segments && data.segments.length) {
        data.segments.forEach(item =>
          this.segments.push(new Segment(item, isFromAPI)),
        );
      }
      this.dispensationVehicle = data.vehicle && data.vehicle;
    } else if (data) {
      this.id = data.id;
      this.location = data.location;
      this.dispensationDate = data.dispensationDate;
      this.validity = data.validity;
      this.can = data.can;
      this.statusHistory = data.statusHistory ? data.statusHistory : [];
      this.user = data.user;
      this.product = data.product;
      this.type = data.type;
      this.referenceId = data.referenceId;
      this.status = data.status;
      this.createdAt = data.createdAt;
      this.value = data.value;
      this.dispensedQuantities = data.dispensedQuantities;
      this.valueType = data.valueType;
      this.valueUnit = data.valueUnit;
      this.quantity = data.quantity;
      this.canId = data.id;
      this.vendorId = data.vendorId;
      this.vendorTitle = data.vendorTitle;
      this.material = data.material;
      this.agent = data.agent;
      data.segments.forEach(item =>
        this.segments.push(new Segment(item, isFromAPI)),
      );
      this.promotionId = data.promotionId;
      this.promotedBy = data.promotedBy;
      this.dispensationVehicle =
        data.dispensationVehicle && data.dispensationVehicle;
    } else {
      this.type = AppStrings.drTypeFuel;
      this.value = 50;
      this.valueType = AppConstants.fuelTypes[0].value;
      this.valueUnit = AppConstants.fuelTypes[0].unit;
      this.dispensationDate = new Date();
      this.validity = new Date();
    }
  }

  reset() {
    this.id = '';
    this.location = {};
    this.dispensationDate = new Date();
    this.validity = new Date();
    this.product = {};
    this.type = AppStrings.fuelPoint;
    this.value = 50;
    this.referenceId = '';
    this.quantity = null;
    this.status = '';
    this.createdAt = new Date();
    this.material = {};
    if (this.segments.length > 0) {
      this.segments.splice(0, this.segments.length);
    }
    this.promotionId = '';
    this.promotedBy = {};
    this.dispensedQuantities = [];
    this.statusHistory = [];
    this.agent = {};
    this.sbulist = [];
    this.dispensationVehicle = {};
  }

  @computed
  get filterdSbulistData() {
    if (this.selectedCanDetails && this.selectedProductDetails) {
      return this.sbulist.filter(sbu => {
        return (
          this.selectedCanDetails.vendorId === sbu.vendorId &&
          sbu.products.find(
            product => product.productId === this.selectedProductDetails.id,
          )
        );
      });
    } else if (this.selectedCanDetails) {
      return this.sbulist.filter(
        sbu => this.selectedCanDetails.vendorId === sbu.vendorId,
      );
    }
    return [];
  }

  getRatingCount(sbu) {
    let totalStars = 0;
    let totalRatings = 0;
    let ratings = sbu.rating;
    if (ratings['1']) {
      totalStars += ratings['1'];
      totalRatings += ratings['1'];
    }
    if (ratings['2']) {
      totalStars += ratings['2'] * 2;
      totalRatings += ratings['2'];
    }
    if (ratings['3']) {
      totalStars += ratings['3'] * 3;
      totalRatings += ratings['3'];
    }
    if (ratings['4']) {
      totalStars += ratings['4'] * 4;
      totalRatings += ratings['4'];
    }
    if (ratings['5']) {
      totalStars += ratings['5'] * 5;
      totalRatings += ratings['5'];
    }
    let avgRating = totalStars / totalRatings;
    return {
      totalStars: totalStars,
      totalRating: totalRatings,
      avgRating: isNaN(avgRating) ? 0 : avgRating,
    };
  }

  getSbuMaxMinProductPrice(sbu) {
    if (this.selectedProductDetails) {
      let product =
        sbu.products &&
        sbu.products.length &&
        sbu.products.find(
          item => item.productId === this.selectedProductDetails.id,
        );
      if (product) {
        return {
          maxPrice: product.price.value,
          minPrice: product.price.value,
        };
      }
    } else {
      let maxPrice;
      let minPrice;
      sbu.products &&
        sbu.products.length &&
        sbu.products.forEach(product => {
          if (maxPrice < product.price.value) {
            maxPrice = product.price.value;
          }
          if (minPrice > product.price.value) {
            minPrice = product.price.value;
          }
        });
      return {
        maxPrice,
        minPrice,
      };
    }
    return {
      maxPrice: 0,
      minPrice: 0,
    };
  }

  initializeVehicle() {
    let selectedCanUserType = '';
    if (this.canId) {
      let selectedCan = this.getAllCans.find(item => item.id === this.canId);
      selectedCanUserType =
        selectedCan && selectedCan.user && selectedCan.user.type;
    }
    if (this.dispensationVehicle && this.dispensationVehicle.id) {
      //Vehicle info is already passed from MyCan
      console.log('No need to initialize');
    } else if (
      selectedCanUserType &&
      selectedCanUserType !== AppConstants.vehicle &&
      Vehicles.list &&
      Vehicles.list.length
    ) {
      this.dispensationVehicle = Vehicles.list[0];
    } else {
      this.dispensationVehicle = {};
    }
  }

  initializeVendorAndCanAndVehicle(isFromMyCans = false) {
    if (this.getAllCans && this.getAllCans.length) {
      if (isFromMyCans) {
        this.initializeVehicle();
      } else {
        this.canId = this.getAllCans[0] && this.getAllCans[0].id;
        this.vendorId = this.getAllCans[0] && this.getAllCans[0].vendorId;
        this.initializeVehicle();
      }
    }
  }

  @computed
  get filterdMaterialSbulist() {
    if (this.filter === 'rating') {
      return this.sbulist.sort(
        (a, b) =>
          this.getRatingCount(b).avgRating - this.getRatingCount(a).avgRating,
      );
    }
    return this.sbulist;
  }

  @computed
  get filterdSbulist() {
    let filterdSbulist = JSON.parse(JSON.stringify(this.sbulist));
    if (this.filter === 'rating') {
      return filterdSbulist.sort(
        (a, b) =>
          this.getRatingCount(b).avgRating - this.getRatingCount(a).avgRating,
      );
    } else if (this.filter === 'price') {
      return filterdSbulist.sort(
        (a, b) =>
          this.getSbuMaxMinProductPrice(a).minPrice -
          this.getSbuMaxMinProductPrice(b).minPrice,
      );
    }
    return filterdSbulist;
  }

  @computed
  get sortedSbulist() {
    let sbulist = JSON.parse(JSON.stringify(this.sbulist));
    if (sbulist && sbulist.length) {
      return sbulist.sort(
        (a, b) => this.getdistance(a.location) - this.getdistance(b.location),
      );
    } else {
      return sbulist;
    }
  }

  @computed
  get myCan() {
    return Cans.myList;
  }

  @computed
  get vehicleCan() {
    return Cans.myVehicleCanList;
  }

  @computed
  get getAllCans() {
    if (
      this.myCan &&
      this.myCan.length &&
      this.vehicleCan &&
      this.vehicleCan.length
    ) {
      return sortOleumTypeCansFirst([...this.vehicleCan, ...this.myCan]);
    } else if (this.myCan && this.myCan.length) {
      return sortOleumTypeCansFirst(this.myCan);
    } else if (this.vehicleCan && this.vehicleCan.length) {
      return sortOleumTypeCansFirst(this.vehicleCan);
    } else {
      return [];
    }
  }

  // @computed  -----------------------------> OLD CODE selectedCanDetails
  // get selectedCanDetails() {
  //   let can = this.myCan.find(item => item.vendorId === this.vendorId);
  //   if (this.vendorId) {
  //     if (can) {
  //       return can;
  //     } else {
  //       return null;
  //     }
  //   } else if (this.myCan.length) {
  //     return this.myCan[0];
  //   }
  //   return null;
  // }

  @computed
  get selectedCanDetails() {
    let can =
      this.getAllCans &&
      this.getAllCans.length &&
      this.getAllCans.find(
        item => item.vendorId === this.vendorId && item.id === this.canId,
      );
    if (this.vendorId) {
      if (can) {
        return can;
      } else {
        return null;
      }
    } else if (this.myCan.length) {
      return this.myCan[0];
    }
    return null;
  }

  selectedVehicleCanFuelType() {
    let vehicleId =
      this.selectedCanDetails &&
      this.selectedCanDetails.user &&
      this.selectedCanDetails.user.id;
    let vehicleInfo = fetchVehicleDetailsUsingVehicleId(
      Vehicles.list,
      vehicleId,
    );
    return vehicleInfo && vehicleInfo.fuelTypeId;
  }

  @computed
  get selectedCanProducts() {
    let products = this.products.filter(
      item =>
        this.selectedCanDetails &&
        item.vendorId === this.selectedCanDetails.vendorId,
    );
    if (products && products.length) {
      if (
        this.selectedCanDetails &&
        this.selectedCanDetails.user &&
        this.selectedCanDetails.user.type &&
        this.selectedCanDetails.user.type !== AppConstants.vehicle &&
        this.dispensationVehicle &&
        this.dispensationVehicle.id
      ) {
        if (this.dispensationVehicle.fuelTypeId) {
          return products.filter(
            eachProduct =>
              eachProduct.type &&
              this.dispensationVehicle.fuelTypeId &&
              eachProduct.type === this.dispensationVehicle.fuelTypeId,
          );
        } else {
          return products;
        }
      } else if (
        this.selectedCanDetails &&
        this.selectedCanDetails.user &&
        this.selectedCanDetails.user.type &&
        this.selectedCanDetails.user.type === AppConstants.vehicle
      ) {
        let fuelType = this.selectedVehicleCanFuelType();
        if (fuelType) {
          return products.filter(
            eachProduct => eachProduct.type && eachProduct.type === fuelType,
          );
        } else {
          return products;
        }
      } else {
        return products;
      }
    }
    return [];
  }

  @computed
  get selectedProductDetails() {
    let product = this.selectedCanProducts.find(
      item => this.product && this.product.id && item.id === this.product.id,
    );
    if (product) {
      return product;
    } else if (this.selectedCanProducts.length) {
      return this.selectedCanProducts[0];
    }
    return null;
  }

  @computed
  get getValue() {
    if (this.value) {
      return Number(this.value);
    }
    return 0;
  }

  @computed
  get totalFuelPoints() {
    if (this.valueType === AppConstants.quantityType.fuelPoint) {
      return this.getValue;
    } else {
      return 0;
    }
  }

  @computed
  get isCanHasSufficientBalance() {
    if (this.totalFuelPoints) {
      return this.totalFuelPoints <= this.selectedCanDetails.quantity;
    }
    return false;
  }

  @computed
  get corporateTitle() {
    let corporate = Corporates.list.find(item => item.id === this.vendorId);
    if (corporate) {
      return corporate.title;
    }
    return '';
  }

  @computed
  get completedAt() {
    let data = this.statusHistory.find(
      item =>
        item.status === AppConstants.promotionStatus.completed ||
        item.status === AppConstants.promotionStatus.canceled,
    );
    if (data) {
      return new Date(data.date);
    }
    return null;
  }

  @computed
  get PromotedBy() {
    let corporate = Corporates.list.find(
      item => item.id === this.promotedBy.id,
    );
    if (corporate) {
      return corporate.title;
    }
    return '';
  }

  @computed
  get productName() {
    if (this.product && this.product.title) {
      return this.product.title;
    } else if (
      this.selectedProductDetails &&
      this.selectedProductDetails.title
    ) {
      return this.selectedProductDetails.title;
    } else {
      return '';
    }
  }

  @computed
  get vendorLogo() {
    let corporate = Corporates.list.find(item => item.id === this.vendorId);
    if (corporate) {
      return corporate.companyLogo;
    } else {
      let defaultCorporate = Corporates.list.find(
        item => item.id === this.myCan[0].vendorId,
      );
      return defaultCorporate && defaultCorporate.companyLogo;
    }
  }

  @computed
  get materialSegments() {
    let data = [];
    if (this.type === AppConstants.drType.material) {
      this.segments.forEach(segment => {
        data.push({
          name:
            segment.minQuantity +
            ' ' +
            this.material.unit +
            ' - ' +
            segment.maxQuantity +
            ' ' +
            this.material.unit,
          value: segment.reward + ' FP',
        });
      });
    }
    return data;
  }

  userCurrentLocation() {
    this.fetchUserCurrentLocationLoading = true;
    return new Promise(resolve => {
      if (
        Locations.currentLocation &&
        Locations.currentLocation.google &&
        Locations.currentLocation.google.name &&
        Locations.currentLocation.google.address &&
        Locations.currentLocation.coordinates &&
        Locations.currentLocation.coordinates.length > 1
      ) {
        this.fetchUserCurrentLocationLoading = false;
        this.location = {
          coordinates: {
            longitude: Locations.currentLocation.coordinates[0],
            latitude: Locations.currentLocation.coordinates[1],
          },
          address: Locations.currentLocation.google.address,
          name: Locations.currentLocation.google.name,
        };
        resolve(this.location);
      } else {
        getCurrentLocation()
          .then(data => {
            if (data) {
              this.location.coordinates = {
                longitude: data.longitude,
                latitude: data.latitude,
              };
              fetchAndParseGeoLocationData(data.latitude, data.longitude)
                .then(locationData => {
                  this.location.address = locationData.address;
                  this.location.name = locationData.name;
                  resolve(this.location);
                })
                .catch(() => {
                  resolve(this.location);
                });
            }
          })
          .catch(() => {
            resolve(this.location);
          });
      }
    });
  }

  @computed
  get dispensationDetails() {
    return this.dispensationDetailsView(false);
  }

  @computed
  get dispensationDetailsAgent() {
    return this.dispensationDetailsView(true);
  }

  @computed
  get materialDispensationDetails() {
    return this.materialDispensationDetailsView(false);
  }

  @computed
  get materialDispensationDetailsAgent() {
    return this.materialDispensationDetailsView(true);
  }

  @computed
  get summary() {
    let data = [];
    if (this.createdAt) {
      data.push({
        name: 'Request Date',
        value: getDateTimeString(this.createdAt, 'DD MMMM YYYY, hh:mm a'),
      });
    }
    if (this.dispensationDate) {
      data.push({
        name: 'Dispensation Date/ Validity',
        value: getDateTimeString(this.dispensationDate, 'DD MMMM YYYY'),
      });
    }
    if (this.value) {
      data.push({
        name: 'Fuel Points',
        value: this.value + ' FP',
      });
    }

    if (this.vendorId) {
      data.push({
        name: 'Vendor',
        value: this.corporateTitle,
      });
    }
    if (this.product && this.product.id) {
      data.push({
        name: 'Product',
        value: this.productName,
      });
    }
    if (this.material) {
      data.push({
        name: 'Material',
        value: this.material.name,
      });
    }
    if (this.vendorId) {
      data.push({
        name: 'Promoted By',
        value: this.PromotedBy,
      });
    }
    return data;
  }

  getCanceledDate() {
    let canceledDate = this.statusHistory.find(
      data => data.status === AppConstants.promotionStatus.canceled,
    );
    if (canceledDate) {
      return getDateTimeString(canceledDate.date, 'DD MMMM YYYY, hh:mm a');
    } else {
      return '';
    }
  }

  dispensationDetailsView(isAgent) {
    let data = [];
    if (this.createdAt) {
      data.push({
        name: 'Request Date',
        value: getDateTimeString(this.createdAt, 'DD MMMM YYYY, hh:mm a'),
      });
    }
    if (this.validity) {
      if (this.status === AppConstants.promotionStatus.completed) {
        data.push({
          name: 'Dispensed At',
          value: getDateTimeString(
            this.completedAt ? this.completedAt : null,
            'DD MMMM YYYY, hh:mm a',
          ),
        });
      } else if (this.status === AppConstants.promotionStatus.pending) {
        data.push({
          name: 'Dispensation Date/ Validity',
          value: getDateTimeString(
            this.validity ? this.validity : null,
            'DD MMMM YYYY, hh:mm a',
          ),
        });
      } else if (this.status === AppConstants.promotionStatus.canceled) {
        data.push({
          name: 'Canceled At',
          value: this.getCanceledDate(),
        });
      } else {
        data.push({
          name: 'Dispensation Date/ Validity',
          value:
            getDateTimeString(
              this.dispensationDate ? this.dispensationDate : null,
              'DD MMMM YYYY, 11:59',
            ) + ' pm',
        });
      }
    }
    if (
      this.value &&
      !(this.dispensedQuantities && this.dispensedQuantities.length)
    ) {
      if (this.valueType === AppConstants.quantityType.fuelPoint) {
        data.push({
          name: 'Fuel Points',
          value: this.value + ' ' + this.valueUnit,
        });
      }
      if (this.valueType === AppConstants.quantityType.fuel) {
        data.push({
          name: 'Fuel Quantity',
          value: this.value + ' ' + this.valueUnit,
        });
      }
    }

    if (this.dispensedQuantities && this.dispensedQuantities.length) {
      this.dispensedQuantities.forEach(quantity => {
        if (quantity.type === AppConstants.quantityType.fuel) {
          data.push({
            name: 'Fuel Quantity',
            value: quantity.value + ' ' + quantity.unit,
          });
        } else if (quantity.type === AppConstants.quantityType.fuelPoint) {
          data.push({
            name: 'Fuel Points',
            value: quantity.value + ' ' + quantity.unit,
          });
        }
      });
    }

    if (this.vendorTitle && !isAgent) {
      data.push({
        name: 'Vendor',
        value: this.vendorTitle,
      });
    }
    if (
      (this.product && this.product.id) ||
      (this.selectedProductDetails && this.selectedProductDetails.title)
    ) {
      data.push({
        name: 'Product',
        value: this.productName,
      });
    }
    if (this.status) {
      data.push({
        name: 'Status',
        value: this.status,
      });
    }
    if (
      (this.dispensationVehicle && this.dispensationVehicle.number) ||
      (this.selectedCanDetails && this.selectedCanDetails.id)
    ) {
      if (this.dispensationVehicle && this.dispensationVehicle.number) {
        data.push({
          name: 'Vehicle Number',
          value: this.dispensationVehicle.number,
        });
      } else if (
        this.selectedCanDetails &&
        this.selectedCanDetails.user &&
        this.selectedCanDetails.user.type &&
        this.selectedCanDetails.user.id &&
        this.selectedCanDetails.user.type === AppConstants.vehicle &&
        this.getVehicleNumberFromSelectedVehicleCan(
          this.selectedCanDetails.user.id,
        )
      ) {
        data.push({
          name: 'Vehicle Number',
          value: this.getVehicleNumberFromSelectedVehicleCan(
            this.selectedCanDetails.user.id,
          ),
        });
      } else {
        return null;
      }
    }
    return data;
  }

  getVehicleNumberFromSelectedVehicleCan(vehicleId) {
    let vehicleInfo = fetchVehicleDetailsUsingVehicleId(
      Vehicles.list,
      vehicleId,
    );
    return vehicleInfo && vehicleInfo.number;
  }

  materialDispensationDetailsView(isAgent) {
    let data = [];
    if (this.createdAt) {
      data.push({
        name: 'Request Date',
        value: getDateTimeString(this.createdAt, 'DD MMMM YYYY, hh:mm a'),
      });
    }
    if (this.validity) {
      if (this.status === AppConstants.promotionStatus.completed) {
        data.push({
          name: 'Deposited At',
          value: getDateTimeString(
            this.completedAt ? this.completedAt : null,
            'DD MMMM YYYY, hh:mm a',
          ),
        });
      } else {
        data.push({
          name: 'Validity',
          value: getDateTimeString(
            this.validity ? this.validity : null,
            'DD MMMM YYYY, hh:mm a',
          ),
        });
      }
    }

    if (this.vendorTitle && !isAgent) {
      data.push({
        name: 'Vendor',
        value: this.vendorTitle,
      });
    }
    if (this.product && this.product.id) {
      data.push({
        name: 'Product',
        value: this.productName,
      });
    }
    if (this.material) {
      data.push({
        name: 'Material',
        value: this.material.name,
      });
    }
    if (this.vendorId) {
      data.push({
        name: 'Promoted By',
        value: this.PromotedBy,
      });
    }
    if (this.dispensedQuantities && this.dispensedQuantities.length) {
      this.dispensedQuantities.forEach(quantity => {
        if (quantity.type === AppConstants.quantityType.material) {
          data.push({
            name: 'Deposited quantity',
            value: quantity.value + ' ' + quantity.unit,
          });
        } else if (quantity.type === AppConstants.quantityType.fuelPoint) {
          data.push({
            name: 'Reward',
            value: quantity.value + ' ' + quantity.unit,
          });
        }
      });
    }
    if (this.status) {
      data.push({
        name: 'Status',
        value: this.status,
      });
    }
    return data;
  }

  getSelectedCanDetails() {
    return Cans.myList.find(item => item.vendorId === this.vendorId);
  }

  getVehicleParamFromSelectedVehicleCan() {
    if (
      this.selectedCanDetails &&
      this.selectedCanDetails.user &&
      this.selectedCanDetails.user.type &&
      this.selectedCanDetails.user.id &&
      this.selectedCanDetails.user.type === AppConstants.vehicle
    ) {
      return {
        id: this.selectedCanDetails.user.id,
        type: this.selectedCanDetails.user.type,
      };
    }
  }

  get params() {
    return {
      dispensationDate: moment(this.dispensationDate)
        .tz(moment.tz.guess())
        .endOf('day')
        .toDate(),
      drQuantity: {
        value: this.getValue,
        unit: this.valueUnit,
        type: this.valueType,
      },
      can: {
        id: this.selectedCanDetails.id,
        vendorId: this.selectedCanDetails.vendorId,
      },
      user: this.user,
      vehicle:
        this.dispensationVehicle && this.dispensationVehicle.id
          ? {
              id: this.dispensationVehicle.id,
              type: AppConstants.vehicle,
            }
          : this.getVehicleParamFromSelectedVehicleCan()
          ? this.getVehicleParamFromSelectedVehicleCan()
          : {},
    };
  }

  setDispensedQuatity(quantity) {
    switch (this.type) {
      // case AppConstants.drType.fuel:          ---------> Fuel based code
      //   this.dispensedQuatity = {
      //     value: Number(quantity),
      //     unit: 'L',
      //     type: AppConstants.quantityType.fuel,
      //   };
      //   break;
      case AppConstants.drType.fuel:
        this.dispensedQuatity = {
          value: Number(quantity),
          unit: 'FP',
          type: AppConstants.quantityType.fuelPoint,
        };
        break;
      case AppConstants.drType.material:
        this.dispensedQuatity = {
          value: Number(quantity),
          unit: this.material.unit,
          type: AppConstants.drType.material,
        };
        break;
    }
  }

  slectedProductSBUPrice = sbuId => {
    let sbu = this.sbulist.find(item => item._id === sbuId);
    if (sbu) {
      let product =
        sbu.products &&
        sbu.products.length &&
        sbu.products.find(
          item =>
            this.selectedProductDetails &&
            item.productId === this.selectedProductDetails.id,
        );
      if (product) {
        return 'Price: ₹ ' + product.price.value;
      }
    }
    return '';
  };

  slectedQuantityFP = sbuId => {
    let productPrice;
    let calculatedValue;
    let sbu = this.sbulist.find(item => item._id === sbuId);
    if (sbu) {
      let product =
        sbu.products &&
        sbu.products.length &&
        sbu.products.find(
          item =>
            this.selectedProductDetails &&
            item.productId === this.selectedProductDetails.id,
        );
      if (product) {
        productPrice = product.price.value;
        if (this.valueType === AppConstants.quantityType.fuelPoint) {
          calculatedValue = Number(this.value) / Number(productPrice);
        } else {
          calculatedValue = Number(this.value) * Number(productPrice);
        }
        return calculatedValue;
      }
    }
    return '';
  };

  slectedQuantityFPUnit = () => {
    if (this.valueType === AppConstants.quantityType.fuelPoint) {
      return 'Litre';
    } else {
      return 'FP';
    }
  };

  getdistance(sbuId) {
    let userCurrentLocation = Locations.currentLocation;
    let sbuLocation = sbuId;
    if (userCurrentLocation && sbuLocation) {
      const start = {
        latitude: userCurrentLocation.coordinates[1],
        longitude: userCurrentLocation.coordinates[0],
      };
      const end = {
        latitude: sbuId.coordinates[1],
        longitude: sbuId.coordinates[0],
      };
      return haversine(start, end, {
        unit: 'km',
      });
    } else {
      return '';
    }
  }

  sumbitDispenseRequest = () => {
    this.loading = true;
    return new Promise((resolve, reject) => {
      Meteor.call('createDispenseRequest', this.params, (err, data) => {
        this.loading = false;
        if (!err) {
          resolve(data);
        } else {
          reject(err);
        }
      });
    });
  };

  completeDispenseRequest = () => {
    this.loading = true;
    return new Promise((resolve, reject) => {
      Meteor.call(
        'completeDR',
        {
          referenceId: this.referenceId,
          dispensedQuantity: this.dispensedQuatity,
          user: {
            id: Account.user.endUserId,
            type: Account.user.type,
          },
          sbu: {
            id:
              Account.profile && Account.profile.sbu && Account.profile.sbu.id,
            type: AppConstants.corporate,
          },
          productId: this.product && this.product.productId,
          sbuProductId: this.product && this.product._id,
          vehicleNumber: this.vehicleNumber ? this.vehicleNumber : null,
          odometer: this.odometer ? Number(this.odometer) : null,
          nozzleId: this.fuelNozzleId ? this.fuelNozzleId.toString() : null,
          isFullTank: this.isFullTank,
        },
        (err, data) => {
          this.loading = false;
          if (!err) {
            resolve(data);
          } else {
            reject(err);
          }
        },
      );
    });
  };

  getNearBySBUs = () => {
    return new Promise((resolve, reject) => {
      if (
        this.location &&
        this.location.coordinates &&
        this.location.coordinates.longitude &&
        this.location.coordinates.latitude
      ) {
        const longitude = this.location.coordinates.longitude;
        const latitude = this.location.coordinates.latitude;
        Meteor.call(
          'getNearBySBUs',
          {
            user: {
              id: Account.user.endUserId,
              type: Account.user.type,
            },
            radius: 50,
            coordinates: [longitude, latitude],
            vendorId: this.selectedCanDetails.vendorId,
            DRType: AppConstants.drType.fuel,
          },
          (err, data) => {
            if (!err) {
              resolve(data);
            } else {
              reject(err);
            }
          },
        );
      }
    });
  };

  updateProductList = () => {
    this.products = [];
    if (this.sbulist && this.sbulist.length) {
      this.sbulist.forEach(sbuData => {
        if (sbuData.products && sbuData.products.length) {
          sbuData.products.forEach(product => {
            let productData = this.products.find(
              item =>
                product.productId === item.id &&
                sbuData.vendorId === item.vendorId,
            );
            if (productData) {
              productData.sbuProductId = null;
              if (product.price && productData.minPrice > product.price.value) {
                productData.minPrice = product.price.value;
              }
              if (product.price && productData.maxPrice < product.price.value) {
                productData.maxPrice = product.price.value;
              }
            } else {
              let productDetails = {
                id: product.productId,
                title: product.title,
                type: product.type,
                vendorId: sbuData.vendorId,
                description: product.description,
              };
              if (product.price) {
                productDetails.minPrice = product.price.value;
                productDetails.maxPrice = product.price.value;
                productDetails.unit = product.price.unit;
              }
              if (sbuData._id === sbuData.vendorId) {
                productDetails.sbuProductId = product._id;
              }
              this.products.push(productDetails);
            }
          });
        }
      });
    }
  };

  updateSbuList = () => {
    this.loading = true;
    return this.getNearBySBUs()
      .then(sbulist => {
        this.sbulist = [];
        if (this.type === AppConstants.material) {
          this.sbulist = sbulist;
        } else {
          if (sbulist && sbulist.length) {
            this.sbulist = sbulist;
            this.updateProductList();
          }
        }
        this.loading = false;
        return sbulist;
      })
      .catch(() => {
        this.loading = false;
      });
  };
}

export default dispenseRequest;
