/**
 * Copyright (c) 2018-present, Evolvier Technologies. All rights reserved.
 *
 */

'use strict';

import React, {Component} from 'react';
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import {observer} from 'mobx-react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import LoadingShadow from '@components/LoadingShadow';
import NoData from '@components/NoData';
import Image from '@components/Image';

import {AppStyles, AppColors} from '@theme';
import {AppConstants, AppResources} from '@config';
import styles from './styles';
import {getDateTimeString} from '../../lib/utils';

import Account from '@stores/Account';
import Promotions from '@stores/Promotions';

@observer
class ActivePromosList extends Component {
  openPromotionDetails(promotion) {
    switch (promotion.type) {
      case AppConstants.action:
        this.props.viewPromotionsDetails({
          promotion: promotion,
        });
        break;
      case AppConstants.material:
        this.props.viewMaterialPromotionDetails({
          promotion: promotion,
        });
        break;
      case AppConstants.value:
        if (promotion.valueType.type === 'FP') {
          this.props.viewPurchaseFuelPromotionDetails({
            promotion: promotion,
          });
        } else {
          this.props.viewValuePromotionDetails({
            promotion: promotion,
          });
        }

        break;
    }
  }

  renderAllPromoList(a, i) {
    return (
      <TouchableOpacity
        onPress={() => this.openPromotionDetails(a)}
        style={styles.allPromoView}
        key={i}>
        {this.renderAllContentView(a)}
      </TouchableOpacity>
    );
  }

  renderAllContentView(promo) {
    if (promo.bannerImageUrl) {
      return (
        <Image
          style={styles.bannerImageAll}
          source={{
            uri: promo.bannerImageUrl,
          }}
        />
      );
    } else {
      return this.renderContent(promo);
    }
  }

  renderContent(promo) {
    return (
      <View style={styles.contentMainView}>
        <Text
          style={[
            AppStyles.titleBoldText,
            styles.promoTitleText,
            AppStyles.darkText,
          ]}>
          {promo.title}
        </Text>
        <Text
          style={[
            AppStyles.regularText,
            styles.promoDescriptionText,
            AppStyles.darkText,
          ]}
          numberOfLines={2}>
          {promo.description}
        </Text>
        {this.renderPromoIcon(promo.type)}
        <View style={styles.validityDateView}>
          <Text
            style={[
              AppStyles.mediumText,
              styles.promoDescriptionText,
              AppStyles.whiteText,
            ]}>
            {'Validity: ' +
              getDateTimeString(promo.endDate, 'DD MMMM YYYY, hh:mm a')}
          </Text>
        </View>
      </View>
    );
  }

  renderPromoIcon(type) {
    if (type === 'ACTION') {
      return <MaterialIcons style={[styles.promoIcon]} name="games" />;
    } else if (type === 'MATERIAL') {
      return <MaterialIcons style={[styles.promoIcon]} name="layers" />;
    } else {
      return <MaterialIcons style={[styles.promoIcon]} name="grain" />;
    }
  }

  render() {
    if (Promotions.active.length) {
      return (
        <View style={AppStyles.container}>
          <View style={styles.infoView}>
            <View style={styles.infoTextView}>
              <Text style={[AppStyles.regularText, AppStyles.darkText]}>
                Your active promotions
              </Text>
            </View>
            <ActivityIndicator
              animating={
                !(
                  Account.connectionReady &&
                  Promotions.promotionReady &&
                  Promotions.activePromotionReady
                )
              }
              size="small"
              color={AppColors.brand.accentSecondary}
            />
          </View>
          <ScrollView
            style={styles.recommendedScrollView}
            automaticallyAdjustContentInsets={true}
            alwaysBounceVertical={false}
            horizontal={false}
            contentContainerStyle={styles.scrollViewProductListContentContainer}
            showsHorizontalScrollIndicator={false}>
            {Promotions.active.map((a, i) => this.renderAllPromoList(a, i))}
          </ScrollView>
        </View>
      );
    } else if (!(Account.connectionReady && Promotions.activePromotionReady)) {
      return (
        <View style={styles.container}>
          <LoadingShadow />
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
            image={AppResources.noPromo}
            title={'No Pending Actions!'}
            content={'You have no Pending Actions. Please avail a promotion'}
          />
        </View>
      );
    }
  }
}

export default ActivePromosList;
