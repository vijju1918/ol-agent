/**
 * Copyright (c) 2018-present, Oleum. All rights reserved.
 *
 */

'use strict';

import React, {Component} from 'react';
import {View, Text, SectionList, StatusBar, ScrollView} from 'react-native';
import {createIconSetFromFontello} from 'react-native-vector-icons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {observer} from 'mobx-react';
import {showMessage} from 'react-native-flash-message';

import Transfers from '@stores/Transfers';
import Account from '@stores/Account';

import {getDateTimeString} from '../../lib/utils';
import {AppColors, AppStyles} from '@theme';
import {AppStrings} from '@config';
import styles from './styles';
import {AppResources, AppIconFonts} from '@config';
import {AppConstants} from '../../config';

import CanItem from '@components/CanItem';
import NoData from '@components/NoData';
import LoadingShadow from '@components/LoadingShadow';

const Icon = createIconSetFromFontello(AppIconFonts);

@observer
class CanDetails extends Component {
  componentDidMount() {
    if (this.props.can && this.props.can.id) {
      Transfers.getCanTransfers(this.props.can.id).catch(error =>
        showMessage({
          message:
            error && error.details && error.details.displayMessage
              ? error.details.displayMessage
              : 'Something went wrong, unable to load transfer details',
        }),
      );
    }
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

  getColor(item) {
    let color =
      item.sendFrom.id === Account.user.endUserId
        ? AppColors.darkGray
        : AppColors.brand.primary;
    return color;
  }

  getTransactionType(item) {
    if (item.sendFrom.id === Account.user.endUserId) {
      return AppStrings.debit;
    } else {
      return AppStrings.credit;
    }
  }

  _keyExtractor = (item, i) => i;

  getImage(item) {
    if (item && item.type === AppConstants.transferTypes.transfer) {
      return <Icon style={styles.buttonIcon} name={'oleum_my-transactions'} />;
    } else if (item && item.type === AppConstants.transferTypes.reward) {
      return <Icon style={styles.buttonIcon} name={'oleum_reward'} />;
    } else if (item && item.type === AppConstants.transferTypes.purchase) {
      return <Icon style={styles.buttonIcon} name={'oleum-15'} />;
    } else if (item && item.type === AppConstants.transferTypes.dispense) {
      return <Icon style={styles.buttonIcon} name={'oleum_fuel'} />;
    } else if (item && item.type === AppConstants.transferTypes.donate) {
      return <Icon style={styles.buttonIcon} name={'oleum_my-vendor-rating'} />;
    } else if (item && item.type === AppConstants.transferTypes.redeem) {
      return (
        <MaterialCommunityIcons
          style={styles.buttonIcon}
          name={'eject-outline'}
        />
      );
    } else if (item && item.type === AppConstants.transferTypes.refund) {
      return (
        <MaterialCommunityIcons
          style={styles.buttonIcon}
          name={'call-missed'}
        />
      );
    }
  }

  renderNote(item) {
    if (item && item.note) {
      return <Text style={[AppStyles.smallText]}>{'Note: ' + item.note}</Text>;
    }
  }

  renderRow(item) {
    return (
      <View style={styles.rowItemView}>
        <View style={styles.iconViewSend}>{this.getImage(item)}</View>
        <View style={styles.transactionDetailsTextView}>
          <Text
            style={[
              styles.contentTextStyleview,
              AppStyles.labelText,
              AppStyles.darkText,
            ]}>
            {item.type}
          </Text>
          <Text style={[AppStyles.regularText]}>
            {this.getTransactionType(item)}
          </Text>
          {this.renderNote(item)}
        </View>
        <View style={styles.fuelPointsView}>
          <Text
            style={[
              AppStyles.regularBoldText,
              styles.fuelPointTextView,
              {
                color: this.getColor(item),
              },
            ]}>
            {item.quantity.toFixed(2) + ' FP'}
          </Text>
          <Text style={[styles.fuelPointTextView, AppStyles.smallText]}>
            {getDateTimeString(item.completedAt, 'hh:mm a')}
          </Text>
        </View>
      </View>
    );
  }

  renderItemSeparator() {
    return <View style={AppStyles.horizontalLine} />;
  }

  renderHeader(item) {
    return (
      <View style={styles.listHeaderView}>
        <View style={styles.canDetailsView}>
          <CanItem
            name={this.props.can.title}
            image={this.props.can.image}
            points={Number(this.props.can.quantity)}
            lastUpdated={this.props.can.lastUpdatedAt}
          />
        </View>
      </View>
    );
  }

  render() {
    if (Transfers.getCanTransfersLoading) {
      return (
        <View style={[AppStyles.container, AppStyles.containerCentered]}>
          <View style={styles.loadingView}>
            <LoadingShadow />
          </View>
        </View>
      );
    } else if (
      Transfers.canTransferData() &&
      Transfers.canTransferData().length
    ) {
      return (
        <ScrollView
          alwaysBounceVertical={false}
          showsVerticalScrollIndicator={false}>
          <View style={AppStyles.containerWhite}>
            <SectionList
              renderItem={({item}) => this.renderRow(item, this)}
              renderSectionHeader={({section}) =>
                this.renderSectionHeader(section)
              }
              ItemSeparatorComponent={this.renderItemSeparator}
              keyExtractor={this._keyExtractor}
              sections={Transfers.canTransferData()}
              extraData={Transfers.canTransferData()}
              ListHeaderComponent={this.renderHeader(
                this.props.can.lastUpdatedAt,
              )}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </ScrollView>
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
            image={AppResources.noDataPic}
            title={'No Activity'}
            content={'You have no recent activity.'}
          />
        </View>
      );
    }
  }
}

export default CanDetails;
