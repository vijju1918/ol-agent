/**
 * Copyright (c) 2018-present, Oleum. All rights reserved.
 *
 */

'use strict';

import Meteor, { Tracker, Mongo } from '@meteorrn/core';

export default class Subscribe {

  constructor() {
    let Data = Meteor.getData();
    this.connected = true;
    Data.waitDdpReady(() => {
      this._meteorDataDep = new Tracker.Dependency();
      Data.onChange(() => this.dataChanged());
      Data.ddp.on('connected', () => {
        setTimeout(() => {
          if (Data.ddp.status === 'connected') {
            this.connected = true;
            this.dataChanged();
          }
        }, 1000);
      });
      Data.ddp.on('disconnected', () => {
        this.connected = false;
      });
    });
  }

  dataChanged = () => {
    if (this.connected) {
      this._meteorDataDep && this._meteorDataDep.changed();
    }
  }; 
  subscription = null;
  subscriptions = [];

  start(key, args = null) {
    if (key) {
      this.key = key;
      if (args) {
        this.args = args;
        this.subscription = Meteor.subscribe(this.key, ...this.args);
      } else {
        this.subscription = Meteor.subscribe(this.key);
      }
    }
  }

  update(args) {
    if (this.subscription) {
      this.args = args;
      this.subscription = Meteor.subscribe(this.key, ...this.args);
    }
  }

  isReady() {
    if (this.subscription) {
      return this.subscription.ready();
    }
    return false;
  }

  isArgChanged(args) {
    if (!this.args || !this.args.length) {
      return true;
    }
    let isEqual = false;
    args.forEach((arg, i) => {
      if (arg !== this.args[i]) {
        isEqual = true;
      }
    });
    return isEqual;
  }

  onChange(collection, query, result) {
    Tracker.autorun(() => {
      this._meteorDataDep.depend();
      const MongoCollection = new Mongo.Collection(collection);
      if (!this.subscription || this.subscription.ready()) {
        result(MongoCollection.find(query).fetch());
      }
    });
  }

  stop(subscription = null) {
    if (!subscription) {
      this.subscription.stop();
      this.subscriptions.forEach(subscriptionItem => {
        if (subscriptionItem) {
          subscriptionItem.stop();
        }
      });
      this.key = null;
      this.args = null;
    } else if (
      this.subscriptions.find(
        subscriptionItem => subscriptionItem === subscription,
      )
    ) {
      this.subscriptions = this.subscriptions.filter(
        subscriptionItem => subscriptionItem !== subscription,
      );
      subscription.stop();
    }
  }
}
