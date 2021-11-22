/**
 * Copyright (c) 2018-present, Evolvier Technologies. All rights reserved.
 *
 */

'use strict';

import React, {Component} from 'react';

import {
  View,
  Text,
  SectionList,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import {observer} from 'mobx-react';
import {showMessage} from 'react-native-flash-message';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {AppStyles, AppColors} from '@theme';
import styles from './styles';
import {getDateTimeString} from '../../lib/utils';
import {AppConstants, AppResources} from '@config';

import NoData from '@components/NoData';
import LoadingShadow from '@components/LoadingShadow';
import LoadingSmall from '@components/LoadingSmall';

import Purchases, {Purchase} from '@stores/Purchases';
import Vehicles from '@stores/Vehicles';
import Account from '@stores/Account';

@observer
class MyPurchaseHistory extends Component {
  constructor(props) {
    super(props);
    this.purchase = new Purchase();
    this.state = {
      isPersonalCanTab: true,
      isVehicleCanTab: false,
      getVehicleFuelPurchasesFlag: true,
      getUserFuelPurchasesFlag: true,
      purchaseItemRefreshLoading: false,
    };
  }

  componentDidMount() {
    if (Account.connectionReady) {
      this.getUserFuelPurchases();
    } else {
      this.timer = setInterval(() => {
        if (Account.connectionReady) {
          this.getUserFuelPurchases();
          clearInterval(this.timer);
        }
      }, 500);
    }
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  getUserFuelPurchases(backgroundLoading) {
    if (Account.connectionReady) {
      Purchases.geUserFuelPurchases(false, backgroundLoading).catch(error =>
        showMessage({
          message:
            error && error.details && error.details.displayMessage
              ? error.details.displayMessage
              : 'Unable to load purchase history, try again later',
        }),
      );
    }
  }

  onPressPersonalCanTab() {
    this.setState({
      isPersonalCanTab: true,
      isVehicleCanTab: false,
      getUserFuelPurchasesFlag: true,
    });
    Purchases.resetUserFuelPurchaseDetails();
    this.getUserFuelPurchases();
  }

  getVehicleFuelPurchases(backgroundLoading) {
    if (
      Account.connectionReady &&
      Vehicles.ready &&
      Vehicles.list &&
      Vehicles.list.length
    ) {
      Purchases.geVehiclesFuelPurchases(
        Vehicles.list,
        false,
        backgroundLoading,
      ).catch(error =>
        showMessage({
          message:
            error && error.details && error.details.displayMessage
              ? error.details.displayMessage
              : 'Unable to load purchase history, try again later',
        }),
      );
    }
  }

  onPressVehicleCanTab() {
    this.setState({
      isPersonalCanTab: false,
      isVehicleCanTab: true,
      getVehicleFuelPurchasesFlag: true,
    });
    Purchases.resetVehicleFuelPurchaseDetails();
    this.getVehicleFuelPurchases();
  }

  renderSectionHeader(date) {
    return (
      <View style={styles.sectionHeaderView}>
        <Text style={[AppStyles.labelText, AppStyles.darkText]}>
          {getDateTimeString(date.title, 'DD MMMM YYYY')}
        </Text>
      </View>
    );
  }

  renderVehicleInfo(item) {
    if (
      item.vehicleDetails &&
      item.vehicleDetails._id &&
      item.vehicleDetails.number
    ) {
      return <Text>Vehicle : {item.vehicleDetails.number}</Text>;
    }
  }

  /**
   * Set loading for refresh purchase history item
   *
   * @param {Boolean} value
   * @memberof MyPurchaseHistory
   */
  setRefreshPurchaseHistoryItemLoading(value) {
    this.setState({purchaseItemRefreshLoading: value});
  }

  /**
   * Update purchase history list after purchase history item refresh
   *
   * @param {Object} item
   * @memberof MyPurchaseHistory
   */
  updatePurchaseHistoryList(item) {
    if (item && item.to && item.to.type) {
      if (item.to.type === AppConstants.vehicle) {
        this.getVehicleFuelPurchases(true);
      } else if (item.to.type === AppConstants.endUser) {
        this.getUserFuelPurchases(true);
      }
    }
  }

  /**
   * Action on purchase history item refresh button click
   * Execute 'Complete Purchase' api call
   *
   * @param {Object} item Purchase history item
   * @memberof MyPurchaseHistory
   */
  refreshPurchaseHistoryItem(item) {
    if (item && item.referenceId) {
      this.setRefreshPurchaseHistoryItemLoading(true);
      this.purchase.referenceId = item.referenceId;
      this.purchase
        .completePurchase()
        .then(() => {
          this.updatePurchaseHistoryList(item);
          this.purchase.loading = false;
          this.setRefreshPurchaseHistoryItemLoading(false);
        })
        .catch(() => {
          this.purchase.loading = false;
          this.setRefreshPurchaseHistoryItemLoading(false);
        });
    }
  }

  renderRefreshButton(item) {
    if (item && item.status === AppConstants.paymentStatus.pending) {
      return (
        <TouchableOpacity
          style={styles.refreshButtonTouch}
          activeOpacity={0.7}
          onPress={() => {
            this.refreshPurchaseHistoryItem(item);
          }}>
          <MaterialCommunityIcons style={styles.refreshButton} name="refresh" />
          <Text style={AppStyles.smallText}>Refresh</Text>
        </TouchableOpacity>
      );
    }
  }

  renderRow(item) {
    return (
      <View style={styles.outerView}>
        <View style={styles.promoItemMainView}>
          <View style={styles.priceMianView}>
            <View style={styles.priceView}>
              <Text style={[AppStyles.regularText]}>Amount Paid</Text>
              <Text style={[AppStyles.titleBoldText]}>
                {'₹ ' + item.quantity.value}
              </Text>
              {this.renderVehicleInfo(item)}
              <Text
                style={
                  item.status === AppConstants.promotionStatus.completed
                    ? [
                        AppStyles.regularBoldText,
                        styles.statusText,
                        {
                          color: AppColors.brand.secondary,
                        },
                      ]
                    : [
                        AppStyles.regularBoldText,
                        styles.statusText,
                        {
                          color: AppColors.darkGray,
                        },
                      ]
                }>
                {item.status}
              </Text>
            </View>
            <View style={styles.fpView}>
              <Text style={[AppStyles.regularText]}>Credit</Text>
              <Text style={[AppStyles.titleBoldText]}>
                {item.quantity.value}
              </Text>
              <Text style={[AppStyles.regularText, AppStyles.darkText]}>
                {item.quantity.unit}
              </Text>
            </View>
            {this.renderRefreshButton(item)}
          </View>
          <View style={[AppStyles.horizontalLine, styles.grayLine]} />
          <View style={styles.detailsView}>
            <Text style={[AppStyles.mediumRegularText]}>
              {'Reference Id: ' + item.referenceId}
            </Text>
            <Text style={[AppStyles.mediumRegularText]}>
              {item.payment && item.payment.status
                ? 'Payment: ' + item.payment.status
                : ''}
            </Text>
          </View>
        </View>
      </View>
    );
  }

  renderTabView() {
    return (
      <View style={styles.tabView}>
        <TouchableOpacity
          activeOpacity={1}
          style={
            this.state.isPersonalCanTab
              ? styles.tabTouchSelected
              : styles.tabTouch
          }
          onPress={() => this.onPressPersonalCanTab()}>
          <Text style={AppStyles.regularBoldText}>Personal Can</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={1}
          style={
            this.state.isVehicleCanTab
              ? styles.tabTouchSelected
              : styles.tabTouch
          }
          onPress={() => this.onPressVehicleCanTab()}>
          <Text style={AppStyles.regularBoldText}>Vehicle Can</Text>
        </TouchableOpacity>
      </View>
    );
  }

  renderFooter(isLoadingMore = false) {
    if (isLoadingMore) {
      return (
        <View style={styles.loadMoreLoadingView}>
          <LoadingSmall />
        </View>
      );
    }
  }

  onEndReached() {
    if (
      Vehicles.list &&
      Vehicles.list.length &&
      this.state.getVehicleFuelPurchasesFlag &&
      !Purchases.isLoadingMore &&
      Purchases.vehicleFuelPurchases &&
      Purchases.vehicleFuelPurchases.length >= 10
    ) {
      if (Purchases && Purchases.next) {
        Purchases.geVehiclesFuelPurchases(Vehicles.list, true)
          .then(result => {
            if (result && result.list && !result.list.length) {
              this.setState({
                getVehicleFuelPurchasesFlag: false,
              });
            }
          })
          .catch(error =>
            showMessage({
              message:
                error && error.details && error.details.displayMessage
                  ? error.details.displayMessage
                  : 'Unable to load more data, try again later',
            }),
          );
      } else {
        showMessage({
          message: 'Unable to load more data',
        });
      }
    }
  }

  onUserPurchaseListEndReached() {
    if (
      this.state.getUserFuelPurchasesFlag &&
      !Purchases.userFuelPurchaseLoadMore &&
      Purchases.list &&
      Purchases.list.length >= 10
    ) {
      if (Purchases && Purchases.userFuelPurchaseNext) {
        Purchases.geUserFuelPurchases(true)
          .then(result => {
            if (result && result.list && !result.list.length) {
              this.setState({
                getUserFuelPurchasesFlag: false,
              });
            }
          })
          .catch(error =>
            showMessage({
              message:
                error && error.details && error.details.displayMessage
                  ? error.details.displayMessage
                  : 'Unable to load more data, try again later',
            }),
          );
      } else {
        showMessage({
          message: 'Unable to load more data',
        });
      }
    }
  }

  renderListView() {
    if (this.state.isPersonalCanTab) {
      if (Purchases.userFuelPurchaseListLoading) {
        return (
          <View style={[AppStyles.container, AppStyles.containerCentered]}>
            <View style={styles.loadingView}>
              <LoadingShadow />
            </View>
          </View>
        );
      } else if (Purchases.purchaseList.length) {
        return (
          <View style={styles.flatListView}>
            <SectionList
              renderItem={({item}) => this.renderRow(item, this)}
              renderSectionHeader={({section}) =>
                this.renderSectionHeader(section)
              }
              alwaysBounceVertical={false}
              keyExtractor={this._keyExtractor}
              sections={Purchases.purchaseList}
              showsVerticalScrollIndicator={false}
              ItemSeparatorComponent={() => this.itemSeparatorComponent()}
              extraData={JSON.stringify(Purchases.purchaseList)}
              ListFooterComponent={this.renderFooter(
                Purchases.userFuelPurchaseLoadMore,
              )}
              contentContainerStyle={styles.purchaseListContentContainerStyle}
              bounces={true}
              onEndReachedThreshold={0.1}
              onEndReached={() => this.onUserPurchaseListEndReached()}
            />
          </View>
        );
      } else if (!Account.connectionReady) {
        return (
          <View style={[AppStyles.container, AppStyles.containerCentered]}>
            <View style={styles.loadingView}>
              <LoadingShadow />
            </View>
          </View>
        );
      } else {
        return (
          <View
            style={[
              AppStyles.container,
              AppStyles.containerCentered,
              styles.noDataView,
            ]}>
            <NoData
              image={AppResources.noHistory}
              title={'No Purchase History !'}
              content={'You have no purchase to personal can'}
            />
          </View>
        );
      }
    } else if (!this.state.isPersonalCanTab) {
      if (Purchases.vehiclesFuelPurchaseListLoading) {
        return (
          <View style={[AppStyles.container, AppStyles.containerCentered]}>
            <View style={styles.loadingView}>
              <LoadingShadow />
            </View>
          </View>
        );
      } else if (Purchases.vehiclesFuelPurchaseList.length) {
        return (
          <View style={styles.flatListView}>
            <SectionList
              renderItem={({item}) => this.renderRow(item, this)}
              renderSectionHeader={({section}) =>
                this.renderSectionHeader(section)
              }
              alwaysBounceVertical={false}
              keyExtractor={this._keyExtractor}
              sections={Purchases.vehiclesFuelPurchaseList}
              showsVerticalScrollIndicator={false}
              ItemSeparatorComponent={() => this.itemSeparatorComponent()}
              extraData={JSON.stringify(Purchases.vehiclesFuelPurchaseList)}
              ListFooterComponent={this.renderFooter(Purchases.isLoadingMore)}
              contentContainerStyle={styles.purchaseListContentContainerStyle}
              bounces={true}
              onEndReachedThreshold={0.1}
              onEndReached={() => this.onEndReached()}
            />
          </View>
        );
      } else if (!Account.connectionReady) {
        return (
          <View style={[AppStyles.container, AppStyles.containerCentered]}>
            <View style={styles.loadingView}>
              <LoadingShadow />
            </View>
          </View>
        );
      } else {
        return (
          <View
            style={[
              AppStyles.container,
              AppStyles.containerCentered,
              styles.noDataView,
            ]}>
            <NoData
              image={AppResources.noHistory}
              title={'No Purchase History !'}
              content={'You have no purchase to vehicle can'}
            />
          </View>
        );
      }
    }
  }

  itemSeparatorComponent() {
    return <View style={[AppStyles.horizontalLine, styles.line]} />;
  }

  _keyExtractor = item => item.id;

  /**
   * Render shadow loading
   *
   * @return {Component}
   * @memberof MyPurchaseHistory
   */
  renderShadowLoader() {
    if (
      this.purchase.loading ||
      this.state.purchaseItemRefreshLoading ||
      Purchases.userFuelPurchaseListBackgroundLoading ||
      Purchases.vehiclesFuelPurchaseListBackgroundLoading
    ) {
      return (
        <View style={styles.refreshLoadingView}>
          <LoadingShadow />
        </View>
      );
    }
  }

  render() {
    return (
      <View style={AppStyles.container}>
        <StatusBar
          backgroundColor={AppColors.statusBarBg}
          hidden={false}
          barStyle={AppColors.statusBarStyle}
        />
        <View style={styles.infoView}>
          <Text style={AppStyles.regularText}>Your fuel point purchases</Text>
        </View>
        {this.renderTabView()}
        {this.renderListView()}
        {this.renderShadowLoader()}
      </View>
    );
  }
}

export default MyPurchaseHistory;
