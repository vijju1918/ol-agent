/**
 * Copyright (c) 2018-present, Oleum. All rights reserved.
 *
 */

'use strict';

import React, { Component } from 'react';
import {
  View,
  SectionList,
  Text,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { observer } from 'mobx-react';

import { AppStyles, AppColors } from '@theme';
import styles from './styles';
import { getDateTimeString } from '../../lib/utils';
import { AppConstants, AppResources } from '@config';

import Transfers from '@stores/Transfers';

import NoData from '@components/NoData';
import Image from '@components/Image';

@observer
class MyRewardsHistory extends Component {
  onPressViewDetails() { }

  renderStatus() {
    return (
      <Text style={[AppStyles.mediumText, styles.statusText]}>
        Waiting for approval
      </Text>
    );
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

  renderRow(item) {
    return (
      <View>
        <TouchableOpacity
          style={styles.promoItemMainView}
          activeOpacity={1}
          onPress={() => this.onPressViewDetails(item)}>
          <View style={styles.promoDataView}>
            <View style={styles.imageNameView}>
              <View style={styles.promoTitleView}>
                <Text style={[AppStyles.smallText, AppStyles.darkText]}>
                  {'Promotion By'}
                </Text>
                <Text style={[AppStyles.regularBoldText, AppStyles.darkText]}>
                  {item.promotedBy}
                </Text>
                <Text
                  style={
                    item.status === AppConstants.promotionStatus.pending
                      ? [
                        AppStyles.regularText,
                        styles.statusText,
                        {
                          color: AppColors.darkGary,
                        },
                      ]
                      : [
                        AppStyles.regularBoldText,
                        styles.statusText,
                        {
                          color: AppColors.brand.secondary,
                        },
                      ]
                  }>
                  {item.status}
                </Text>
                <Text style={[AppStyles.smallText]}>
                  {getDateTimeString(
                    item.completedAt,
                    'MMMM DD, YYYY  hh:mm a',
                  )}
                </Text>
              </View>
            </View>
            <View style={[styles.vendorView]}>
              <Image
                style={[styles.vendorLogo]}
                source={
                  item.vendorLogo
                    ? {
                      uri: item.vendorLogo,
                    }
                    : AppResources.noImage
                }
              />
              <Text style={[AppStyles.regularText]}>{item.vendorName}</Text>
            </View>
          </View>
          <View style={styles.promoValueView}>
            <Text style={[AppStyles.titleBoldText]}>
              {item.quantity + ' FP'}
            </Text>
            <Text style={[AppStyles.regularText]}>{'Reward'}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  _keyExtractor = item => item.id;

  itemSeparatorComponent() {
    return <View style={[AppStyles.horizontalLine, styles.line]} />;
  }

  render() {

    if (Transfers.rewardList.length) {
      return (
        <View style={AppStyles.container}>
          <View style={styles.infoView}>
            <Text style={AppStyles.regularText}>Your fuel point purchases</Text>
          </View>
          <View style={styles.flatListVeiw}>
            <SectionList
              renderItem={({ item }) => this.renderRow(item, this)}
              renderSectionHeader={({ section }) =>
                this.renderSectionHeader(section)
              }
              keyExtractor={this._keyExtractor}
              sections={Transfers.rewardList}
              showsVerticalScrollIndicator={false}
              ItemSeparatorComponent={() => this.itemSeparatorComponent()}
            />
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
            title={'No Rewards History'}
            content={'You have no history of Rewards.'}
          />
        </View>
      );
    }
  }
}

export default MyRewardsHistory;
