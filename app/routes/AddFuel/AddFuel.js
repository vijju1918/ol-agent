/**
 * Copyright (c) 2018-present, Oleum. All rights reserved.
 *
 */
'use strict';

import React, { Component } from 'react';
import {
  View,
  Text,
  FlatList,
  ImageBackground,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { observer } from 'mobx-react';
import moment from 'moment';
import { showMessage } from 'react-native-flash-message';

import NoData from '@components/NoData';
import TouchableOpacity from '@components/TouchableOpacity';
import LoadingShadow from '@components/LoadingShadow';
import LoadingSmall from '@components/LoadingSmall';
import Image from '@components/Image';
import CountDownView from '@components/CountDownView';

import { AppColors, AppStyles } from '@theme';
import { AppConstants, AppResources } from '@config';
import styles from './styles';
import { getDateTimeString } from '../../lib/utils';
import {
  checkLocationPermission,
  requestLocationPermission,
} from '../../lib/permissions';

import Account from '@stores/Account';
import NewPromotions from '../../stores/Promotions/newIndex';

@observer
class AddFuel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPermissionRequired: false,
    };
  }

  openPromotionDetails(promotion) {
    if (promotion.valueType.type === 'FP') {
      this.props.viewPurchaseFuelPromotionDetails({
        promotion: promotion,
        vehicleInfo: this.props.vehicleInfo,
        isFromVehicleCan: this.props.isFromVehicleCan ? true : false,
      });
    }
  }

  /**
   * Promotions loading method call
   *
   * @memberof AddFuel
   */
  loadPromotionsList() {

    let isBackgroundLoading = false;
    if (
      NewPromotions.valueFpPromotionList &&
      NewPromotions.valueFpPromotionList.length
    ) {
      isBackgroundLoading = true;
    }
    NewPromotions.getPromotionsList({
      backgroundLoading: isBackgroundLoading,
    }).catch((error) => {
      console.log("Promotion error" + JSON.stringify(error))
      showMessage({
        message:
          error && error.details && error.details.displayMessage
            ? error.details.displayMessage
            : 'Unable to load promotions, try again later',
      })
    });

  }

  componentDidMount() {
    checkLocationPermission().then(result => {
      if (result === 'granted') {
        if (this.state.isPermissionRequired) {
          this.setState({
            isPermissionRequired: false,
          });
        }
      } else {
        if (!this.state.isPermissionRequired) {
          this.setState({
            isPermissionRequired: true,
          });
        }
      }
      if (result === 'denied') {
        requestLocationPermission().catch(e => console.log(e));
      }
    });
    if (Account.connectionReady) {

      this.loadPromotionsList();
    } else {
      this.timer = setInterval(() => {
        if (Account.connectionReady) {
          this.loadPromotionsList();
          clearInterval(this.timer);
        }
      }, 500);
    }
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  renderPermissionWarning() {
    if (this.state.isPermissionRequired) {
      return (
        <View style={styles.locationWarningView}>
          <Text
            style={[
              AppStyles.titleBoldText,
              AppStyles.centerAlignText,
              AppStyles.whiteText,
            ]}>
            Location Access Denied!
          </Text>
          <Text
            style={[
              AppStyles.regularText,
              AppStyles.centerAlignText,
              AppStyles.whiteText,
              AppStyles.textSpace,
            ]}>
            Promotions are displaying based on your location. Please grand the
            permission to access your location
          </Text>
        </View>
      );
    }
  }

  isMrCanPromo(vendor) {
    if (vendor.role === AppConstants.userTypes.oleum) {
      return true;
    } else {
      return false;
    }
  }

  renderCounter(promo) {
    return <CountDownView endDate={promo.endDate} size={12} />;
  }

  renderPromoItem(promo, i) {
    return (
      <TouchableOpacity
        onPress={() => this.openPromotionDetails(promo)}
        style={
          this.isMrCanPromo(promo.vendor)
            ? styles.promoViewSmall
            : styles.promoView
        }
        key={i}
        activeOpacity={0.9}>
        {this.renderCounter(promo)}
        {this.renderItemContent(promo)}
      </TouchableOpacity>
    );
  }
  renderMRCanPromoItem(promo, i) {
    return (
      <TouchableOpacity
        onPress={() => this.openPromotionDetails(promo)}
        style={styles.mrCanItemView}
        key={i}
        activeOpacity={0.9}>
        {this.renderCounter(promo)}
        {this.renderMRCanItemContent(promo)}
      </TouchableOpacity>
    );
  }

  renderMRCanItemContent(promo) {
    let currentDateTime = new Date();
    if (promo.bannerImageUrl) {
      return (
        <View style={AppStyles.flex1}>
          <Image
            style={styles.bannerImage}
            source={
              promo.bannerImageUrl
                ? {
                  uri: promo.bannerImageUrl,
                }
                : AppResources.noPromoImageBg
            }
          />
          <View style={[AppStyles.row, styles.validityMainView]}>
            <View style={[AppStyles.flex1, styles.validityView]}>
              <Text style={[AppStyles.regularBoldText]}>
                {'Expires ' + moment(currentDateTime).to(moment(promo.endDate))}
              </Text>
              <Text style={[AppStyles.smallText]}>
                {'Validity: ' +
                  getDateTimeString(promo.endDate, 'DD MMMM YYYY')}
              </Text>
            </View>
            <View style={[AppStyles.flex1, styles.availButtonView]}>
              <TouchableOpacity
                style={styles.availTouch}
                onPress={() => this.openPromotionDetails(promo)}>
                <Text style={AppStyles.regularBoldText}>Buy Now</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={[AppStyles.horizontalLine, styles.horizontalLine]} />
        </View>
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
                {promo.title}
              </Text>
              <Text
                style={[AppStyles.regularText, AppStyles.textSpace]}
                numberOfLines={3}>
                {promo.description}
              </Text>
            </View>
          </ImageBackground>
          <View style={[AppStyles.row, styles.validityMainNoImageView]}>
            <View style={[AppStyles.flex1, styles.validityView]}>
              <Text style={[AppStyles.regularBoldText]}>
                {'Expires ' + moment(currentDateTime).to(moment(promo.endDate))}
              </Text>
              <Text style={[AppStyles.smallText]}>
                {'Validity: ' +
                  getDateTimeString(promo.endDate, 'DD MMMM YYYY')}
              </Text>
            </View>
            <View style={[AppStyles.flex1, styles.availButtonView]}>
              <TouchableOpacity
                style={styles.availTouch}
                onPress={() => this.openPromotionDetails(promo)}>
                <Text style={AppStyles.regularBoldText}>Buy Now</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={[AppStyles.horizontalLine, styles.horizontalLine]} />
        </View>
      );
    }
  }

  renderItemContent(promo) {
    let currentDateTime = new Date();
    if (promo.bannerImageUrl) {
      return (
        <View style={AppStyles.flex1}>
          <Image
            style={
              this.isMrCanPromo(promo.vendor)
                ? styles.bannerImageSmall
                : styles.bannerImage
            }
            source={
              promo.bannerImageUrl
                ? {
                  uri: promo.bannerImageUrl,
                }
                : AppResources.noPromoImageBg
            }
          />
          <View
            style={
              this.isMrCanPromo(promo.vendor)
                ? [AppStyles.row, styles.hidden]
                : [AppStyles.row, styles.validityMainView]
            }>
            <View style={[AppStyles.flex1, styles.validityView]}>
              <Text style={[AppStyles.regularBoldText]}>
                {'Expires ' + moment(currentDateTime).to(moment(promo.endDate))}
              </Text>
              <Text style={[AppStyles.smallText]}>
                {'Validity: ' +
                  getDateTimeString(promo.endDate, 'DD MMMM YYYY')}
              </Text>
            </View>
            <View style={[AppStyles.flex1, styles.availButtonView]}>
              <TouchableOpacity
                style={styles.availTouch}
                onPress={() => this.openPromotionDetails(promo)}>
                <Text style={AppStyles.regularBoldText}>Buy Now</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={
              this.isMrCanPromo(promo.vendor)
                ? styles.hidden
                : [AppStyles.horizontalLine, styles.horizontalLine]
            }
          />
        </View>
      );
    } else {
      return (
        <View style={AppStyles.flex1}>
          <ImageBackground
            style={
              this.isMrCanPromo(promo.vendor)
                ? styles.bannerImageSmall
                : styles.bannerImage
            }
            source={AppResources.noPromoImageBg}>
            <View style={styles.contentMainView}>
              <Text
                style={[AppStyles.titleBoldText, styles.promoTitleText]}
                numberOfLines={2}>
                {promo.title}
              </Text>
              <Text
                style={[AppStyles.regularText, AppStyles.textSpace]}
                numberOfLines={3}>
                {promo.description}
              </Text>
            </View>
          </ImageBackground>
          <View
            style={
              this.isMrCanPromo(promo.vendor)
                ? [AppStyles.row, styles.hidden]
                : [AppStyles.row, styles.validityMainNoImageView]
            }>
            <View style={[AppStyles.flex1, styles.validityView]}>
              <Text style={[AppStyles.regularBoldText]}>
                {'Expires ' + moment(currentDateTime).to(moment(promo.endDate))}
              </Text>
              <Text style={[AppStyles.smallText]}>
                {'Validity: ' +
                  getDateTimeString(promo.endDate, 'DD MMMM YYYY')}
              </Text>
            </View>
            <View style={[AppStyles.flex1, styles.availButtonView]}>
              <TouchableOpacity
                style={styles.availTouch}
                onPress={() => this.openPromotionDetails(promo)}>
                <Text style={AppStyles.regularBoldText}>Buy Now</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={
              this.isMrCanPromo(promo.vendor)
                ? styles.hidden
                : [AppStyles.horizontalLine, styles.horizontalLine]
            }
          />
        </View>
      );
    }
  }

  renderContent() {
    if (this.props.vendorId) {
      if (
        (this.getPromotionsRecommendedList() &&
          this.getPromotionsRecommendedList().length) ||
        (this.getMrCanRecommendedPromoList() &&
          this.getMrCanRecommendedPromoList().length)
      ) {
        return (
          <View>
            <View style={styles.infoView}>
              <View style={styles.infoTextView}>
                <Text style={[AppStyles.regularText, AppStyles.darkText]}>
                  Add fuel points
                </Text>
              </View>
              <ActivityIndicator
                animating={!Account.connectionReady}
                size="small"
                color={AppColors.brand.accentSecondary}
              />
            </View>
            <ScrollView>
              {this.getMrCanRecommendedPromoList() &&
                this.getMrCanRecommendedPromoList().length ? (
                <FlatList
                  style={styles.promoScrollView}
                  data={this.getMrCanRecommendedPromoList()}
                  keyExtractor={this._keyExtractor}
                  renderItem={({ item }) => this.renderMRCanPromoItem(item)}
                  contentContainerStyle={styles.promoListContentContainer}
                  removeClippedSubviews={true}
                />
              ) : null}
              <View style={AppStyles.flex1}>
                <FlatList
                  style={styles.promoScrollView}
                  data={this.getPromotionsRecommendedList()}
                  keyExtractor={this._keyExtractor}
                  renderItem={({ item }) => this.renderPromoItem(item)}
                  contentContainerStyle={styles.promoListContentContainer}
                  removeClippedSubviews={true}
                />
              </View>
            </ScrollView>
          </View>
        );
      } else if (
        !Account.connectionReady ||
        NewPromotions.getPromotionsListLoading
      ) {
        return (
          <View style={styles.container}>
            <LoadingShadow />
          </View>
        );
      } else {
        return (
          <View style={[AppStyles.container, AppStyles.containerCentered]}>
            <NoData
              image={AppResources.noPromo}
              title={'No Add Fuel Promotions !'}
            />
          </View>
        );
      }
    } else if (
      NewPromotions.valueFpPromotionList &&
      NewPromotions.valueFpPromotionList.length
    ) {
      return (
        <View>
          <View style={styles.infoView}>
            <View style={styles.infoTextView}>
              <Text style={[AppStyles.regularText, AppStyles.darkText]}>
                Purchase fuel points of your choice
              </Text>
            </View>
            <ActivityIndicator
              animating={!Account.connectionReady}
              size="small"
              color={AppColors.brand.accentSecondary}
            />
          </View>
          <ScrollView showsVerticalScrollIndicator={false}>
            {this.getMrCanPromoList() && this.getMrCanPromoList().length ? (
              this.getMrCanPromoList().length >= 3 &&
                this.getPromotionsList().length ? (
                <View style={styles.drCanListView}>
                  <FlatList
                    horizontal={true}
                    data={this.getMrCanPromoList()}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={this._keyExtractor}
                    renderItem={({ item }) => this.renderPromoItem(item)}
                    contentContainerStyle={
                      styles.mrCanPromoListContentContainer
                    }
                    extraData={this.getMrCanPromoList()}
                    removeClippedSubviews={true}
                    ItemSeparatorComponent={() =>
                      this.promoItemHorizontalSeparator()
                    }
                    decelerationRate={'fast'}
                    snapToInterval={
                      ((AppStyles.windowSize.width * 0.515) / 9) * 16
                    }
                    snapToAlignment={'center'}
                    pagingEnabled={true}
                  />
                </View>
              ) : (
                <FlatList
                  style={styles.promoScrollView}
                  data={this.getMrCanPromoList()}
                  keyExtractor={this._keyExtractor}
                  renderItem={({ item }) => this.renderMRCanPromoItem(item)}
                  contentContainerStyle={
                    styles.mrCanPromoVerticalListContentContainer
                  }
                  removeClippedSubviews={true}
                  showsVerticalScrollIndicator={false}
                />
              )
            ) : null}
            <View style={AppStyles.flex1}>
              <FlatList
                style={styles.promoScrollView}
                data={this.getPromotionsList()}
                keyExtractor={this._keyExtractor}
                renderItem={({ item }) => this.renderPromoItem(item)}
                contentContainerStyle={styles.roPromoListContentContainer}
                extraData={this.getPromotionsList()}
                removeClippedSubviews={true}
                showsVerticalScrollIndicator={false}
              />
            </View>
          </ScrollView>
        </View>
      );
    } else if (
      !Account.connectionReady ||
      NewPromotions.getPromotionsListLoading
    ) {
      return (
        <View style={styles.container}>
          <LoadingShadow />
        </View>
      );
    } else {
      return (
        <View style={[AppStyles.container, AppStyles.containerCentered]}>
          <NoData
            image={AppResources.noPromo}
            title={'No Add Fuel Promotions !'}
          />
          {this.renderPermissionWarning()}
        </View>
      );
    }
  }

  promoItemHorizontalSeparator() {
    return <View style={styles.horizontalPromoItemSeparator} />;
  }

  getPromotionsList() {
    if (
      NewPromotions.valueFpPromotionList &&
      NewPromotions.valueFpPromotionList.length
    ) {
      let filteredList = NewPromotions.valueFpPromotionList.filter(
        item =>
          item.vendor && item.vendor.role !== AppConstants.userTypes.oleum,
      );
      return filteredList;
    } else {
      return [];
    }
  }

  getPromotionsRecommendedList() {
    if (
      NewPromotions.valueFpPromotionList &&
      NewPromotions.valueFpPromotionList.length &&
      this.props.vendorId
    ) {
      let filteredList = NewPromotions.valueFpPromotionList.filter(
        item =>
          item.vendor &&
          item.vendor._id === this.props.vendorId &&
          item.vendor.role !== AppConstants.userTypes.oleum,
      );
      return filteredList;
    } else {
      return [];
    }
  }

  getMrCanPromoList() {
    if (
      NewPromotions.valueFpPromotionList &&
      NewPromotions.valueFpPromotionList.length
    ) {
      let filteredList = NewPromotions.valueFpPromotionList.filter(
        item =>
          item.vendor && item.vendor.role === AppConstants.userTypes.oleum,
      );
      return filteredList;
    } else {
      return [];
    }
  }

  getMrCanRecommendedPromoList() {
    if (
      NewPromotions.valueFpPromotionList &&
      NewPromotions.valueFpPromotionList.length &&
      this.props.vendorId
    ) {
      let filteredList = NewPromotions.valueFpPromotionList.filter(
        item =>
          item.vendor &&
          item.vendor._id === this.props.vendorId &&
          item.vendor.role === AppConstants.userTypes.oleum,
      );
      return filteredList;
    } else {
      return [];
    }
  }

  renderRefreshLoading() {
    if (NewPromotions.getPromotionsListBackgroundLoading) {
      return (
        <View style={styles.loadingSmallView}>
          <View style={styles.loadingContentView}>
            <LoadingSmall color={AppColors.brand.secondary} />
          </View>
        </View>
      );
    }
  }

  render() {
    return (
      <View style={[AppStyles.containerWhite, styles.mainView]}>
        {this.renderContent()}
        {this.renderRefreshLoading()}
      </View>
    );
  }
}

export default AddFuel;
