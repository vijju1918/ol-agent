/**
 * Copyright (c) 2018-present, Oleum. All rights reserved.
 *
 */
'use strict';

import React, { Component } from 'react';
import {
  View,
  StatusBar,
  FlatList,
  Text,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { observer } from 'mobx-react';
import { showMessage } from 'react-native-flash-message';

import NoData from '@components/NoData';
import LoadingShadow from '@components/LoadingShadow';
import LoadingSmall from '@components/LoadingSmall';
import Image from '@components/Image';

import Transfers from '@stores/Transfers';
import Account from '@stores/Account';

import { getDateTimeString } from '../../lib/utils';
import { AppColors, AppStyles } from '@theme';
import { AppResources } from '@config';
import styles from './styles';

@observer
class MyRewards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      getUserRewardsFlag: true,
    };

  }

  componentDidMount() {
    if (Account.connectionReady) {
      this.getUserRewards();
    } else {
      this.timer = setInterval(() => {
        if (Account.connectionReady) {
          this.getUserRewards();
          clearInterval(this.timer);
        }
      }, 500);
    }
  }

  getUserRewards() {
    Transfers.getUserRewards().catch(error =>
      showMessage({
        message:
          error && error.details && error.details.displayMessage
            ? error.details.displayMessage
            : 'Something went wrong, try again later',
      }),
    );
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  renderImage(reward) {
    if (
      reward.promotionDetails &&
      reward.promotionDetails.bannerImage &&
      reward.promotionDetails.bannerImage.url
    ) {
      return (
        <Image
          style={styles.bannerImage}
          source={{
            uri: reward.promotionDetails.bannerImage.url,
          }}
        />
      );
    } else {
      return (
        <View style={AppStyles.flex1}>
          <ImageBackground
            style={styles.bannerImage}
            source={AppResources.noPromoImageBg}>
            <View style={styles.contentMainView}>
              <Text
                style={[AppStyles.titleBoldText, styles.promoTitleText]}
                numberOfLines={2}>
                {reward.promotionDetails && reward.promotionDetails.title}
              </Text>
            </View>
          </ImageBackground>
        </View>
      );
    }
  }

  renderRewardItem(reward, i) {
    return (
      <View>
        <TouchableOpacity style={styles.promoView} key={i} activeOpacity={1}>
          {this.renderImage(reward)}

          <View style={styles.rewardDetailsView}>
            <View style={styles.rewardPointsView}>
              <View style={styles.rewardPointLabelView}>
                <Text style={[AppStyles.titleBoldText, styles.labelText]}>
                  Rewards Earned
                </Text>
              </View>
              <View style={styles.rewardPointView}>
                <Text style={[AppStyles.titleBoldText, styles.labelText]}>
                  {reward.quantity + ' FP'}
                </Text>
              </View>
            </View>
            <View style={styles.rewardsInfoTextView}>
              <Text style={[AppStyles.mediumRegularText]}>
                Fuel points added to your Can
              </Text>
            </View>
            <View style={styles.dateAndTimeView}>
              <Text style={[AppStyles.mediumRegularText, styles.textSecondary]}>
                {getDateTimeString(
                  reward.completedAt,
                  'MMMM DD, YYYY  hh:mm a',
                )}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        <View style={[AppStyles.horizontalLine, styles.horizontalLine]} />
      </View>
    );
  }

  renderFooter(isLoadingMore) {
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
      this.state.getUserRewardsFlag &&
      !Transfers.isLoadingMore &&
      Transfers &&
      Transfers.userRewardsList &&
      Transfers.userRewardsList.length >= 10
    ) {
      if (Transfers && Transfers.rewardsNext) {
        Transfers.getUserRewards(true)
          .then(result => {
            if (result && result.list && !result.list.length) {
              this.setState({ getUserRewardsFlag: false });
            }
          })
          .catch(error =>
            showMessage({
              message:
                error && error.details && error.details.displayMessage
                  ? error.details.displayMessage
                  : 'Something went wrong, try again later',
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
    if (Transfers.getUserRewardsLoading) {
      return (
        <View style={[AppStyles.containerWhite, styles.mainView]}>
          <LoadingShadow />
        </View>
      );
    } else if (
      Transfers &&
      Transfers.userRewardsList &&
      Transfers.userRewardsList.length
    ) {
      return (
        <View style={[AppStyles.containerWhite, styles.mainView]}>
          <StatusBar
            backgroundColor={AppColors.statusBarBg}
            hidden={false}
            barStyle={AppColors.statusBarStyle}
          />
          <FlatList
            data={
              Transfers.userRewardsList && Transfers.userRewardsList.length
                ? Transfers.userRewardsList
                : []
            }
            alwaysBounceVertical={false}
            extraData={
              Transfers.userRewardsList && Transfers.userRewardsList.length
                ? JSON.stringify(Transfers.userRewardsList)
                : []
            }
            renderItem={({ item, i }) => this.renderRewardItem(item, i)}
            ListFooterComponent={this.renderFooter(Transfers.isLoadingMore)}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.rewardListContentContainer}
            keyExtractor={this._keyExtractor}
            bounces={true}
            onEndReachedThreshold={0.1}
            onEndReached={() => this.onEndReached()}
          />
        </View>
      );
    } else if (!Account.connectionReady) {
      return (
        <View style={AppStyles.container}>
          <LoadingShadow />
        </View>
      );
    } else {
      return (
        <View style={[AppStyles.container, AppStyles.containerCentered]}>
          <StatusBar
            backgroundColor={AppColors.statusBarBg}
            hidden={false}
            barStyle={AppColors.statusBarStyle}
          />
          <NoData
            image={AppResources.noRewards}
            title={'No Rewards !'}
            content={'Complete offers to get rewards'}
          />
        </View>
      );
    }
  }
}

export default MyRewards;
