/**
 * Copyright (c) 2018-present, Evolvier Technologies. All rights reserved.
 *
 */

'use strict';

import React, {Component} from 'react';

import {View, Text, StatusBar, SectionList} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {getDateTimeString} from '../../lib/utils';
import {observer} from 'mobx-react';
import {showMessage} from 'react-native-flash-message';

import TouchableOpacity from '@components/TouchableOpacity';
import LoadingSmall from '@components/LoadingSmall';
import LoadingShadow from '@components/LoadingShadow';
import Image from '@components/Image';

import Transfers from '@stores/Transfers';
import Account from '@stores/Account';
import Corporates from '@stores/Corporates';

import {AppResources, AppConstants} from '@config';
import AppStrings from '@config/strings';
import {AppStyles, AppColors} from '@theme';
import styles from './styles';

import NoData from '@components/NoData';

@observer
class MyTransferHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      getTransfersFlag: true,
    };
  }

  componentDidMount() {
    if (Account.connectionReady) {
      this.getTransfers();
    } else {
      this.timer = setInterval(() => {
        if (Account.connectionReady) {
          this.getTransfers();
          clearInterval(this.timer);
        }
      }, 500);
    }
  }

  getTransfers() {
    Transfers.load([AppConstants.transferTypes.transfer]).catch(error =>
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

  _keyExtractor = item => item.id;

  onPressViewDetails(item) {
    this.props.renderTransferHistoryDetails({
      transferItem: item,
    });
  }

  getName(item) {
    if (item.sendFrom.type !== 'corporate') {
      if (item.sendFrom.id === Account.user.endUserId) {
        return item.receiverName ? item.receiverName : 'Unknown';
      } else {
        return item.senderName ? item.senderName : 'Unknown';
      }
    } else {
      let corporate = Corporates.list.find(
        corporateItem => corporateItem.id === item.sendFrom.id,
      );
      if (corporate) {
        return corporate.title;
      }
      return 'Corporate';
    }
  }

  renderSectionHeader(item) {
    return (
      <View style={styles.sectionHeaderView}>
        <Text style={[AppStyles.labelText, AppStyles.darkText]}>
          {getDateTimeString(item.title, 'DD MMMM YYYY')}
        </Text>
      </View>
    );
  }

  getCanImage(vendorId) {
    let corporate = Corporates.list.find(item => item.id === vendorId);
    if (corporate) {
      return corporate.companyLogo;
    }
    return '';
  }

  renderProfileImage(item) {
    if (item.sendFrom.type === 'corporate') {
      if (this.getCanImage(item.sendFrom.can.vendorId)) {
        return (
          <View style={styles.contactAvatarView}>
            <Image
              style={styles.contactAvatar}
              source={{uri: this.getCanImage(item.sendFrom.can.vendorId)}}
            />
          </View>
        );
      } else {
        return (
          <View style={styles.contactAvatarView}>
            <View style={styles.letterView}>
              <Text style={[AppStyles.titleBoldText, AppStyles.upperCaseText]}>
                {this.getName(item)
                  ? this.getName(item)
                      .match(/\b(\w)/g)
                      .join('')
                      .slice(0, 2)
                  : ''}
              </Text>
            </View>
          </View>
        );
      }
    } else if (item.sendTo.type === AppConstants.vehicle) {
      return (
        <View style={styles.contactAvatarView}>
          <View style={styles.letterView}>
            <Text style={[AppStyles.titleBoldText, AppStyles.upperCaseText]}>
              {item.sendTo && item.sendTo.vehicleNumber.slice(0, 2)}
            </Text>
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.contactAvatarView}>
          <View style={styles.letterView}>
            <Text style={[AppStyles.titleBoldText, AppStyles.upperCaseText]}>
              {this.getName(item)
                ? this.getName(item)
                    .match(/\b(\w)/g)
                    .join('')
                    .slice(0, 2)
                : ''}
            </Text>
          </View>
        </View>
      );
    }
  }

  renderRow(item) {
    return (
      <View>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => this.onPressViewDetails(item)}>
          <View style={styles.transfersView}>
            <View style={styles.contactAndVendorDetailsView}>
              <View style={styles.contactDetailsView}>
                {this.renderProfileImage(item)}
                <View style={styles.contactNameAndTransferDateView}>
                  <View style={styles.contactNameView}>
                    <Text
                      style={[
                        AppStyles.regularBoldText,
                        AppStyles.darkText,
                        styles.name,
                      ]}>
                      {item.sendTo.type === AppConstants.vehicle
                        ? item.sendTo.vehicleNumber
                        : this.getName(item)
                        ? this.getName(item)
                        : ''}
                    </Text>
                  </View>
                  <View style={styles.TransferDateView}>
                    <Text
                      style={
                        item.status === AppConstants.promotionStatus.pending
                          ? [
                              AppStyles.regularBoldText,
                              {
                                color: AppColors.darkGray,
                              },
                            ]
                          : [
                              AppStyles.regularBoldText,
                              {color: AppColors.brand.secondary},
                            ]
                      }>
                      {item.status}
                    </Text>
                  </View>
                  <View style={styles.TransferDateView}>
                    <Text style={[AppStyles.smallText, AppStyles.textSpace]}>
                      {getDateTimeString(
                        item.status === AppConstants.promotionStatus.pending
                          ? null
                          : item.completedAt,
                        'DD MMMM YYYY, hh:mm a',
                      )}
                    </Text>
                  </View>
                </View>
              </View>
              <View style={styles.vendorDetailsView}>
                <View style={styles.vendorNameView}>
                  <Text
                    style={[
                      AppStyles.mediumBoldText,
                      AppStyles.darkText,
                      styles.vendorNameText,
                    ]}
                    numberOfLines={2}>
                    {item.vendorName}
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.fuelDetailsView}>
              <View style={styles.iconView}>
                <MaterialCommunityIcons
                  style={styles.buttonIcon}
                  name={
                    item.sendFrom.id === Account.user.endUserId
                      ? 'arrow-collapse-up'
                      : 'arrow-collapse-down'
                  }
                />
              </View>
              <View style={styles.fuelPointView}>
                <View>
                  <Text style={[AppStyles.titleBoldText, AppStyles.darkText]}>
                    {item.quantity}
                  </Text>
                </View>
                <View>
                  <Text
                    style={[AppStyles.mediumRegularText, AppStyles.darkText]}>
                    {AppStrings.fp}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  itemSeparatorComponent() {
    return <View style={[AppStyles.horizontalLine, styles.line]} />;
  }

  onEndReached() {
    if (
      this.state.getTransfersFlag &&
      !Transfers.isLoadingMore &&
      Transfers.list &&
      Transfers.list.length >= 10
    ) {
      if (Transfers && Transfers.next) {
        Transfers.load([AppConstants.transferTypes.transfer], true)
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

  renderFooter(isLoadingMore = false) {
    if (isLoadingMore) {
      return (
        <View style={styles.loadMoreLoadingView}>
          <LoadingSmall />
        </View>
      );
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
    } else if (Transfers.transferList.length) {
      return (
        <View style={AppStyles.container}>
          <View style={styles.infoView}>
            <Text style={AppStyles.regularText}>Your fuel point purchases</Text>
          </View>
          <SectionList
            alwaysBounceVertical={false}
            renderItem={({item}) => this.renderRow(item, this)}
            renderSectionHeader={({section}) =>
              this.renderSectionHeader(section)
            }
            keyExtractor={this._keyExtractor}
            sections={Transfers.transferList}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={() => this.itemSeparatorComponent()}
            extraData={JSON.stringify(Transfers.transferList)}
            ListFooterComponent={this.renderFooter(Transfers.isLoadingMore)}
            contentContainerStyle={styles.transferListContentContainerStyle}
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
        <View style={[AppStyles.container, styles.center]}>
          <StatusBar
            backgroundColor={AppColors.statusBarBg}
            hidden={false}
            barStyle={AppColors.statusBarStyle}
          />
          <NoData
            image={AppResources.noHistory}
            title={'No Transfer History'}
            content={'You have no history of Fuel Transfer.'}
          />
        </View>
      );
    }
  }
}

export default MyTransferHistory;
