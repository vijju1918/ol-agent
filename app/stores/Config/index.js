'use strict';

import { observable, action, computed } from 'mobx';
import DeviceInfo from 'react-native-device-info';
import { Actions } from 'react-native-router-flux';

import Subscribe from '@lib/subscribe';
import { AppConstants } from '@config';

class Config {
  @observable list = [];
  subscription = new Subscribe();
  configSubscription = null;

  doubleBackToExitPressedOnce = false;

  isExitOnAndroidBack = () => {
    if (this.doubleBackToExitPressedOnce) {
      return true;
    } else {
      this.doubleBackToExitPressedOnce = true;
      setTimeout(() => {
        this.doubleBackToExitPressedOnce = false;
      }, 2000);
      return false;
    }
  };

  @action
  logout() {
    this.list = [];
    this.subscription = new Subscribe();
    this.configSubscription = null;
  }

  @action
  reset() {
    this.list = [];
  }

  addAll = datas => {
    if (datas) {
      this.removeAll();
      datas.forEach(data => this.add(data));
    }
  };

  removeAll = () => {
    this.list.replace([]);
  };

  add = data => {
    let item = {
      key: data.parameterKey,
      value: data.value,
    };
    if (!this.list.find(listItem => listItem.key === item.key)) {
      this.list.push(item);
    }
  };

  load = () => {
    if (!this.configSubscription) {
      this.configSubscription = this.subscription.onChange(
        'config',
        {},
        results => {
          this.addAll(results);
          this.appMandatoryUpdateLightBox(results);
        },
      );
    }
  };

  /**
   * App mandatory update lightbox
   *
   * @param {Array} results cofig data
   * @memberof Config
   */
  appMandatoryUpdateLightBox(results) {
    const currentScene = Actions.currentScene.replace('_', '');
    let minBuildVersionData =
      results &&
      results.length &&
      results.find(item => item.parameterKey === 'minBuildVersion');
    let currentBuildVersion = DeviceInfo.getBuildNumber();
    let minBuildVersion = minBuildVersionData && minBuildVersionData.value;
    if (
      currentBuildVersion &&
      minBuildVersion &&
      currentScene !== 'update' &&
      currentScene !== 'verifyOTP' &&
      Number(currentBuildVersion) < minBuildVersion
    ) {
      Actions.update();
    }
  }

  @computed
  get fallbackGoogleApiKey() {
    if (this.list && this.list.length) {
      let apiKey = this.list.find(
        item =>
          item.key === AppConstants.configParameterKeys.fallbackGoogleApiKey,
      );
      if (apiKey && apiKey.value) {
        return apiKey.value;
      } else {
        return null;
      }
    } else {
      return null;
    }
  }

  @computed
  get getMinBuildVersion() {
    if (this.list && this.list.length) {
      let minBuildData = this.list.find(
        item => item.key === AppConstants.configParameterKeys.minBuildVersion,
      );
      if (minBuildData && minBuildData.value) {
        return minBuildData.value;
      }
    }
  }

  @computed
  get getConvenienceFee() {
    if (this.list && this.list.length) {
      let minBuildData = this.list.find(
        item => item.key === AppConstants.configParameterKeys.convenienceFee,
      );
      if (minBuildData && minBuildData.value) {
        return minBuildData.value;
      }
    }
  }
}

export default new Config();
