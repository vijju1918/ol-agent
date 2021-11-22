/**
 * Copyright (c) 2018-present, Oleum. All rights reserved.
 *
 */

'use strict';

import React, {Component} from 'react';
import {View, Text, SectionList} from 'react-native';
import {getDateTimeString} from '../../lib/utils';

import Account from '@stores/Account';
import Corporates from '@stores/Corporates';
import Transfers from '@stores/Transfers';

import {AppResources, AppConstants} from '@config';
import AppStrings from '@config/strings';
import {AppStyles, AppColors} from '@theme';
import styles from './styles';

import Image from '@components/Image';

class MyDonations extends Component {
  _keyExtractor = item => item.id;

  getName(item) {
    if (item.sendTo.type !== 'corporate') {
      if (item.sendFrom.id === Account.user.endUserId) {
        return item.receiverName;
      } else {
        return item.senderName;
      }
    } else {
      let corporate = Corporates.list.find(
        corporateItem => corporateItem.id === item.sendTo.id,
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
  renderRow(item) {
    return (
      <View>
        <View>
          <View style={styles.transfersView}>
            <View style={styles.contactAndVendorDetailsView}>
              <View style={styles.contactDetailsView}>
                <View style={styles.contactAvatarView}>
                  <Image
                    style={styles.contactAvatar}
                    source={AppResources.noProfilePic}
                  />
                </View>
                <View style={styles.contactNameAndTransferDateView}>
                  <View style={styles.contactNameView}>
                    <Text
                      style={[
                        AppStyles.regularBoldText,
                        AppStyles.darkText,
                        styles.name,
                      ]}
                      numberOfLines={2}>
                      {this.getName(item)}
                    </Text>
                  </View>
                  <View style={styles.TransferDateView}>
                    <Text
                      style={
                        item.status === AppConstants.promotionStatus.pending
                          ? [
                              AppStyles.mediumText,
                              {
                                color: AppColors.red,
                              },
                            ]
                          : [
                              AppStyles.mediumText,
                              {color: AppColors.brand.accent},
                            ]
                      }>
                      {item.status}
                    </Text>
                  </View>
                  <View style={styles.TransferDateView}>
                    <Text style={[AppStyles.smallText]}>
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
                <View style={styles.vendorImageView}>
                  <Image
                    style={styles.vendorLogo}
                    source={
                      item.vendorLogo
                        ? {
                            uri: item.vendorLogo,
                          }
                        : AppResources.noImage
                    }
                  />
                </View>
                <View style={styles.vendorNameView}>
                  <Text
                    style={[
                      AppStyles.mediumText,
                      AppStyles.darkText,
                      styles.vendorNameText,
                    ]}>
                    {item.vendorName}
                  </Text>
                </View>
              </View>
            </View>
            <View style={AppStyles.verticalLine} />
            <View style={styles.fuelDetailsView}>
              <View style={styles.fuelPointView}>
                <Text style={[AppStyles.titleBoldText, AppStyles.darkText]}>
                  {item.quantity}
                </Text>
                <View>
                  <Text style={[AppStyles.mediumText, AppStyles.darkText]}>
                    {AppStrings.fp}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }

  render() {
    return (
      <View style={AppStyles.container}>
        <SectionList
          alwaysBounceVertical={false}
          renderItem={({item}) => this.renderRow(item, this)}
          renderSectionHeader={({section}) => this.renderSectionHeader(section)}
          keyExtractor={this._keyExtractor}
          sections={Transfers.donationList}
          showsVerticalScrollIndicator={false}
        />
      </View>
    );
  }
}

export default MyDonations;
