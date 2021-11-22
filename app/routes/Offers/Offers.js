/**
 * Copyright (c) 2018-present, Oleum. All rights reserved.
 *
 */
'use strict';

import React, {Component} from 'react';
import {
  View,
  ScrollView,
  Text,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import {observer} from 'mobx-react';
import moment from 'moment';

import NoData from '@components/NoData';
import TouchableOpacity from '@components/TouchableOpacity';
import NavbarRightIcons from '@components/NavbarRightIcons';
import LoadingSmall from '@components/LoadingSmall';
import LoadingShadow from '@components/LoadingShadow';
import Image from '@components/Image';

import {AppStyles, AppColors} from '@theme';
import {AppStrings, AppResources, AppConstants} from '@config';
import styles from './styles';
import {getDateTimeString} from '../../lib/utils';
import {
  checkLocationPermission,
  requestLocationPermission,
} from '../../lib/permissions';

import Account from '@stores/Account';
import Promotions from '@stores/Promotions';

@observer
class Offers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageLoading: true,
      isPermissionRequired: false,
      promoList: [
        {
          title: 'Promo 1',
          bannerImageUrl:
            'https://www.consumerbankers.com/sites/default/files/styles/white_paper_node/public/Is%20Your%20Workforce%20white%20paper%20image.png?itok=2xKFZImu',
        },
        {
          title: 'Promo 2',
          bannerImageUrl:
            'https://www.worldfinanceinforms.com/wp-content/uploads/2020/02/ncinofunda.jpg',
        },
        {
          title: 'Promo 3',
          bannerImageUrl:
            'https://images.passle.net/H7xv9FhIh4Q97zT4phOCX5SMRqc=/fit-in/640x640/Passle/53304eb43d9474057cbfc02a/MediaLibrary/Images/5d088cf6989b6e0c043729d4/2019-07-19-14-48-47-897-5d31d84f989b6e0a84b54c71.jpg',
        },
      ],
    };
  }

  openPromotionDetails(promotion) {
    if (Promotions.unratedCompletedPromo) {
      this.props.viewRatingPromo({
        data: Promotions.unratedCompletedPromo,
      });
    } else {
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
    this.setState({
      loading: false,
    });
  }

  onPressFilter() {
    this.props.viewFilterList({
      data: AppConstants.promotionFilter,
      onPress: this.filterPromo.bind(this),
    });
  }

  filterPromo(item) {
    Promotions.filterApplied = true;
    Promotions.filterType = item.value;
    Promotions.filterName = item;
  }

  componentWillMount() {
    this.props.navigation.setParams({
      right: (
        <NavbarRightIcons
          page={'offers'}
          viewActive={() => this.props.viewActive()}
          viewNotification={() => this.props.viewNotification()}
          viewFilterList={() =>
            this.props.viewFilterList({
              data: AppConstants.promotionFilter,
              onPress: this.filterPromo.bind(this),
            })
          }
        />
      ),
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
  }

  renderPromoItem(promo, i) {
    return (
      <TouchableOpacity
        onPress={() => this.openPromotionDetails(promo)}
        style={styles.promoView}
        key={i}
        activeOpacity={0.8}>
        {this.renderItemContent(promo)}
      </TouchableOpacity>
    );
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

  renderItemContent(promo) {
    let currentDateTime = new Date();
    if (promo.bannerImageUrl) {
      return (
        <View style={AppStyles.flex1}>
          <Image
            style={styles.bannerImage}
            onLoadStart={e => this.setState({imageLoading: true})}
            onLoadEnd={e => this.setState({imageLoading: false})}
            source={
              promo.bannerImageUrl
                ? {
                    uri: promo.bannerImageUrl,
                  }
                : AppResources.noImage
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
                <Text style={AppStyles.regularBoldText}>Avail Now</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={[AppStyles.horizontalLine, styles.horizontalLine]} />
          {this.state.imageLoading ? (
            <View style={styles.imageLoadingView}>
              <LoadingSmall color={AppColors.brand.secondary} />
            </View>
          ) : null}
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
        </View>
      );
    }
  }

  renderPromotions() {
    if (Promotions.filterApplied) {
      if (Promotions.filterList.length && Promotions.filterApplied) {
        return (
          <View>
            {this.renderAllListHeader()}
            <ScrollView
              style={styles.recommendedScrollView}
              automaticallyAdjustContentInsets={true}
              alwaysBounceVertical={false}
              horizontal={false}
              contentContainerStyle={
                styles.scrollViewProductListContentCdontainer
              }
              showsHorizontalScrollIndicator={false}>
              {Promotions.filterList.map((a, i) => this.renderPromoItem(a, i))}
            </ScrollView>
          </View>
        );
      } else if (Promotions.filterApplied) {
        return (
          <View>
            {this.renderAllListHeader()}
            <View style={styles.noResultView}>
              <Text
                style={[
                  AppStyles.regularBoldText,
                  styles.newPromoLabel,
                  AppStyles.darkText,
                ]}>
                Sorry, no results found!
              </Text>
            </View>
          </View>
        );
      } else {
        return null;
      }
    } else {
      return (
        <ScrollView
          style={styles.promoScrollView}
          automaticallyAdjustContentInsets={true}
          alwaysBounceVertical={false}
          horizontal={false}
          contentContainerStyle={styles.promoListContentContainer}
          showsHorizontalScrollIndicator={false}>
          {Promotions.offerList.map((a, i) => this.renderPromoItem(a, i))}
        </ScrollView>
      );
    }
  }

  renderAllListHeader() {
    if (Promotions.filterApplied) {
      return (
        <View style={styles.filterHeadingView}>
          <View style={styles.filterTextView}>
            <Text>
              <Text style={[AppStyles.regularText, styles.allPromoLabel]}>
                {'Filter Applied: '}
              </Text>
              <Text
                style={[
                  AppStyles.regularBoldText,
                  styles.allPromoLabel,
                  AppStyles.darkText,
                ]}>
                {Promotions.filterName.title}
              </Text>
            </Text>
          </View>
          <TouchableOpacity
            style={styles.clearTouch}
            onPress={() => this.clearFilter()}>
            <Text style={[AppStyles.regularBoldText, styles.clearText]}>
              Clear
            </Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <Text
          style={[
            AppStyles.cairoLabelText,
            styles.allPromoLabel,
            AppStyles.darkText,
          ]}>
          {AppStrings.allPromos}
        </Text>
      );
    }
  }

  clearFilter() {
    Promotions.filterApplied = false;
  }

  renderContent() {
    if (Promotions && Promotions.offerList.length) {
      return (
        <View>
          <View style={styles.infoView}>
            <View style={styles.infoTextView}>
              <Text style={[AppStyles.regularText, AppStyles.darkText]}>
                Fuel Point Offers
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
          {this.renderPromotions()}
        </View>
      );
    } else if (!(Account.connectionReady && Promotions.promotionReady)) {
      return (
        <View style={styles.container}>
          <LoadingShadow />
        </View>
      );
    } else {
      return (
        <View style={[AppStyles.container, AppStyles.containerCentered]}>
          <NoData image={AppResources.noPromo} title={'No Offers !'} />
          {this.renderPermissionWarning()}
        </View>
      );
    }
  }

  render() {
    return (
      <View style={[AppStyles.containerWhite, styles.mainView]}>
        {this.renderContent()}
      </View>
    );
  }
}

export default Offers;
