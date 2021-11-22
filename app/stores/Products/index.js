/**
 * Copyright (c) 2018-present, Oleum. All rights reserved.
 *
 */
'use strict';

import {observable, action, computed} from 'mobx';
import getSymbolFromCurrency from 'currency-symbol-map';

import Subscribe from '@lib/subscribe';

import Product from './product'; 
import SbuProducts from './sbuProducts';
import Account from '@stores/Account';

class Products {
  @observable list = [];
  @observable sbuList = [];
  subscription = new Subscribe();
  myProductSubscription = null;
  mySbuProductSubscription = null;

  @action
  logout() {
    this.list = [];
    this.sbuList = [];
    this.subscription = new Subscribe();
    this.myProductSubscription = null;
    this.mySbuProductSubscription = null;
  }

  addAll = (datas, isFromAPI = false) => {
    if (datas) {
      this.removeAll();
      datas.forEach(data => this.add(data, isFromAPI));
    }
  };

  addAllSbuProducts = (datas, isFromAPI = false) => {
    if (datas) {
      this.removeAllSbu();
      datas.forEach(data => this.addSbu(data, isFromAPI));
    }
  };

  removeAll = () => {
    this.list.replace([]);
  };

  removeAllSbu = () => {
    this.sbuList.replace([]);
  };

  add = (data, isFromAPI = false) => {
    let item = new Product(data, isFromAPI);
    if (!this.list.find(listItem => listItem.id === item.id)) {
      this.list.push(item);
    }
  };

  addSbu = (data, isFromAPI = false) => {
    let item = new SbuProducts(data, isFromAPI);
    if (!this.sbuList.find(listItem => listItem.id === item.id)) {
      this.sbuList.push(item);
    }
  };

  getPriceOnlyToDisplay = (productId, sbuProductId = null) => {
    if (sbuProductId) {
      const productData = this.sbuList.find(item => item.id === sbuProductId);
      if (productData && productData.price) {
        return productData.price.value;
      }
    }
    return '-';
  };

  getPriceToDisplay = (productId, sbuProductId = null) => {
    if (sbuProductId) {
      const productData = this.sbuList.find(item => item.id === sbuProductId);
      if (productData && productData.price) {
        return (
          getSymbolFromCurrency(productData.price.unit) +
          ' ' +
          productData.price.value
        );
      }
    }
    return '-';
  };

  @computed
  get sbuAndProductLinkedList() {
    return (
      Account.profile &&
      Account.profile.sbuProducts &&
      Account.profile.sbuProducts.length &&
      Account.profile.sbuProducts
    );
  }

  getProducts = vendorId => {
    let products = this.list.filter(item => item.createdBy.id === vendorId);
    if (products && products.length) {
      return products.map(eachItem => {
        return {
          id: eachItem.id,
          title: eachItem.title,
          type: eachItem.type,
          description: eachItem.description,
        };
      });
    } else {
      products = this.sbuList.filter(item => item.user.id === vendorId);
      if (products && products.length) {
        return products
          .map(eachItem => {
            let productData = this.list.find(
              product => product.id === eachItem.productId,
            );
            if (productData) {
              return {
                id: productData.id,
                sbuProductId: eachItem.id,
                title: productData.title,
                type: productData.type,
                description: productData.description,
              };
            }
            return {};
          })
          .filter(eachItem => !!eachItem.id);
      }
    }
    return [];
  };

  load = () => {
    this.subscription.start('selectedProducts.list', [
      Account.profile && Account.profile.sbu && Account.profile.sbu.id,
      Account.profile && Account.profile.sbu && Account.profile.sbu.type,
    ]);
    if (!this.myProductSubscription) {
      this.myProductSubscription = this.subscription.onChange(
        'products',
        {},
        results => {
          this.addAll(results, true);
        },
      );
    }
    if (!this.mySbuProductSubscription) {
      this.mySbuProductSubscription = this.subscription.onChange(
        'selectedProducts',
        {},
        results => {
          this.addAllSbuProducts(results, true);
        },
      );
    }
  };
}

export default new Products();
export {Product};
export {SbuProducts};
