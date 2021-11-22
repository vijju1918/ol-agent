/**
 * Copyright (c) 2018-present, Oleum. All rights reserved.
 *
 */

'use strict';

import React, {Component} from 'react';
import {View, StatusBar, Text, SectionList} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {showMessage} from 'react-native-flash-message';
import {observer} from 'mobx-react';

import Account from '@stores/Account';
import Corporates from '@stores/Corporates';
import Transfers from '@stores/Transfers';

import NoData from '@components/NoData';
import LoadingSmall from '@components/LoadingSmall';
import LoadingShadow from '@components/LoadingShadow';

import {getDateTimeString} from '../../lib/utils';
import {AppColors, AppStyles} from '@theme';
import {AppResources, AppStrings, AppConstants} from '@config';
import styles from './styles';

@observer
class AllTransactions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      getTransfersFlag: true,
    };
  }

  componentDidMount() {
    if (Account.connectionReady) {
      this.getAllTransfers();
    } else {
      this.timer = setInterval(() => {
        if (Account.connectionReady) {
          this.getAllTransfers();
          clearInterval(this.timer);
        }
      }, 500);
    }
  }

  getAllTransfers() {
    let transferDataTypes = [
      AppConstants.transferTypes.transfer,
      AppConstants.transferTypes.reward,
      AppConstants.transferTypes.purchase,
      AppConstants.transferTypes.dispense,
      AppConstants.transferTypes.donate,
    ];
    Transfers.load(transferDataTypes).catch(error =>
      showMessage({
        message:
          error && error.details && error.details.displayMessage
            ? error.details.displayMessage
            : 'Unable to load transfers, try again later',
      }),
    );
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  getTransactionType(item) {
    if (item.sendFrom.id === Account.user.endUserId) {
      return AppStrings.debit;
    } else {
      return AppStrings.credit;
    }
  }

  vendorName(can) {
    let corporate = Corporates.list.find(
      item => can.sendFromCan && item.id === can.sendFromCan.vendorId,
    );
    if (corporate) {
      return corporate.title;
    }
    return '';
  }

  renderSectionHeader(dataItem) {
    return (
      <View style={styles.sectionHeaderView}>
        <Text style={[AppStyles.labelText, AppStyles.darkText]}>
          {getDateTimeString(dataItem.title, 'DD MMMM YYYY')}
        </Text>
      </View>
    );
  }

  _keyExtractor = (item, i) => i;

  renderRow(item) {
    return (
      <View style={styles.rowItemView}>
        <View style={styles.iconViewSend}>
          <MaterialCommunityIcons
            style={styles.buttonIcon}
            name={
              item.sendFrom.id === Account.user.endUserId
                ? 'arrow-collapse-up'
                : 'arrow-collapse-down'
            }
            color={
              item.sendFrom.id === Account.user.endUserId
                ? AppColors.darkGray
                : AppColors.brand.secondary
            }
          />
        </View>
        <View style={styles.transactionDetailsTextView}>
          <Text
            style={[
              styles.contentTextStyleView,
              AppStyles.regularBoldText,
              AppStyles.darkText,
            ]}>
            {item.type}
          </Text>
          <Text style={[AppStyles.regularText]}>
            {this.getTransactionType(item)}
          </Text>
          <Text style={[AppStyles.mediumRegularText, AppStyles.textSpace]}>
            {this.vendorName(item)}
          </Text>
        </View>
        <View style={styles.fuelPointsView}>
          <Text style={[AppStyles.regularBoldText]}>
            {item.quantity.toFixed(2) + ' FP'}
          </Text>
          <Text style={[AppStyles.smallText, AppStyles.textSpace]}>
            {getDateTimeString(item.completedAt, 'hh:mm a')}
          </Text>
          <Text
            style={[
              AppStyles.smallBoldText,
              AppStyles.textSpace,
              {
                color:
                  item.status === 'PENDING'
                    ? AppColors.darkGray
                    : AppColors.brand.secondary,
              },
            ]}>
            {item.status}
          </Text>
        </View>
      </View>
    );
  }

  renderItemSeparator() {
    return <View style={[AppStyles.horizontalLine, styles.line]} />;
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
      this.state.getTransfersFlag &&
      !Transfers.isLoadingMore &&
      Transfers.list &&
      Transfers.list.length >= 10
    ) {
      let transferDataTypes = [
        AppConstants.transferTypes.transfer,
        AppConstants.transferTypes.reward,
        AppConstants.transferTypes.purchase,
        AppConstants.transferTypes.dispense,
        AppConstants.transferTypes.donate,
      ];
      if (Transfers && Transfers.next) {
        Transfers.load(transferDataTypes, true)
          .then(result => {
            if (result && result.list && !result.list.length) {
              this.setState({
                getTransfersFlag: false,
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

  render() {
    if (Transfers.transfersListLoading) {
      return (
        <View style={[AppStyles.container, AppStyles.containerCentered]}>
          <View style={styles.loadingView}>
            <LoadingShadow />
          </View>
        </View>
      );
    } else if (
      Transfers &&
      Transfers.allTransactions &&
      Transfers.allTransactions.length
    ) {
      return (
        <View style={AppStyles.container}>
          <View style={styles.infoView}>
            <Text style={AppStyles.regularText}>Your all FP transactions</Text>
          </View>
          <View style={AppStyles.containerWhite}>
            <SectionList
              renderItem={({item}) => this.renderRow(item, this)}
              renderSectionHeader={({section}) =>
                this.renderSectionHeader(section)
              }
              ItemSeparatorComponent={this.renderItemSeparator}
              keyExtractor={this._keyExtractor}
              sections={Transfers.allTransactions}
              showsVerticalScrollIndicator={false}
              extraData={JSON.stringify(Transfers.allTransactions)}
              ListFooterComponent={this.renderFooter(Transfers.isLoadingMore)}
              contentContainerStyle={styles.transferListContentContainerStyle}
              bounces={true}
              onEndReachedThreshold={0.1}
              onEndReached={() => this.onEndReached()}
            />
          </View>
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
        <View style={[AppStyles.container, styles.center]}>
          <StatusBar
            backgroundColor={AppColors.statusBarBg}
            hidden={false}
            barStyle={AppColors.statusBarStyle}
          />
          <NoData
            image={AppResources.noHistory}
            title={'No Transaction History'}
            content={'You have no history of Fuel Point Transactions.'}
          />
        </View>
      );
    }
  }
}

export default AllTransactions;
