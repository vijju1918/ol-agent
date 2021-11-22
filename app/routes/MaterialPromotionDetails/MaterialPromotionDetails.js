/**
 * Copyright (c) 2018-present, Oleum. All rights reserved.
 *
 */

'use strict';

import React, {Component} from 'react';
import {View, ScrollView, Text, FlatList, StatusBar} from 'react-native';
import {observer} from 'mobx-react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CheckBox from 'react-native-checkbox-heaven';
import {showMessage} from 'react-native-flash-message';

import PromotionDetailsHeader from '@components/PromotionDetailsHeader';
import CorporateDetails from '@components/CorporateDetails';
import Criteria from '@components/Criteria';
import Button from '@components/Button';

import Loading from '@components/Loading';
import NavBarInfoButton from '@components/NavBarInfoButton';
import Image from '@components/Image';

import Corporates from '@stores/Corporates';

import {AppColors, AppStyles} from '@theme';
import {AppStrings} from '@config';
import styles from './styles';
import Ratings from '@stores/Ratings';

@observer
class MaterialPromotionDetails extends Component {
  constructor(props) {
    super(props);
    if (
      this.props.promotion &&
      this.props.promotion.donationCorporates &&
      this.props.promotion.donationCorporates.length
    ) {
      this.props.promotion.isDonateEnabled = true;
    }
    this.state = {};
  }

  componentDidMount() {
    // this.props.renderIntro();
  }

  componentWillMount() {
    this.props.navigation.setParams({
      right: (
        <NavBarInfoButton
          onClick={this.props.onClickInfoButton.bind(this)}
          shareLink={this.shareData.bind(this)}
        />
      ),
    });
  }

  shareData() {
    return new Promise((resolve, reject) => {
      this.props.promotion
        .getPromotionUrl()
        .then(url => {
          resolve(AppStrings.promotionShareMessage.replace('<url>', url));
        })
        .catch(e => {
          reject(e);
        });
    });
  }

  _keyExtractor = item => item.id;

  renderCriteria(item) {
    return (
      <View style={styles.criteriaItemView}>
        <Criteria
          color1={AppColors.materialColor1}
          color2={AppColors.materialColor2}
          range={this.getRange(item)}
          reward={item.reward + ' FP'}
          touchDisabled={true}
        />
      </View>
    );
  }

  getRange(item) {
    if (item.minQuantity === item.maxQuantity) {
      return item.minQuantity + ' ' + this.props.promotion.materialType.unit;
    } else {
      return (
        item.minQuantity +
        ' ' +
        this.props.promotion.materialType.unit +
        ' - ' +
        item.maxQuantity +
        ' ' +
        this.props.promotion.materialType.unit
      );
    }
  }

  viewFunction() {
    if (Ratings.checkRatingStatus) {
      this.props.viewRatingSBU({
        data: Ratings.checkRatingStatus,
      });
    } else {
      this.props.promotion.redeemMaterialPromotion().then(data => {
        if (data) {
          this.props.promotion.loading = false;
          this.props.renderDepositRequestReceipt({
            depositDetails: data,
          });
        } else {
          this.props.promotion.loading = false;
          showMessage({
            message:
              'Sorry, could not complete this request now. Please try later',
          });
        }
      });
    }
  }

  renderFooterView() {
    if (this.props.promotion.status === 'ACTIVE') {
      return (
        <View style={styles.waitingView}>
          <Text style={[AppStyles.mediumText, AppStyles.whiteText]}>
            Deposit Request generated successfully. Please go to the nearest
            collection point and deposit the material.
          </Text>
        </View>
      );
    } else if (this.props.promotion.status === 'COMPLETED') {
      return null;
    } else {
      return (
        <View>
          <View style={styles.buttonView}>
            <Button
              buttonText={AppStrings.submit}
              onPress={() => this.viewFunction()}
            />
          </View>
        </View>
      );
    }
  }

  toggleSwitch(value) {
    this.props.promotion.isDonateEnabled = value;
  }

  renderDonate() {
    const {promotion} = this.props;
    if (
      promotion &&
      promotion.donationCorporates &&
      promotion.donationCorporates.length
    ) {
      const corporateDetails = Corporates.get(promotion.donationCorporates[0]);
      return (
        <View>
          <View style={styles.donateView}>
            <View style={styles.donateIconView}>
              <MaterialCommunityIcons size={50} color="#ffffff" name="gift" />
            </View>
            <View style={styles.donateTextView}>
              <Text
                style={[AppStyles.cairoLabelMediumText, AppStyles.whiteText]}>
                Donate
              </Text>
              <Text style={[AppStyles.smallText, AppStyles.whiteText]}>
                {AppStrings.donateInfo + corporateDetails.title}
              </Text>
            </View>
            <View style={styles.donateCheckBoxView}>
              <CheckBox
                iconSize={25}
                iconName="matMix"
                checked={this.props.promotion.isDonateEnabled}
                checkedColor={'#FFFFFF'}
                uncheckedColor={'#FFFFFF'}
                onChange={this.toggleSwitch.bind(this)}
                disabled={
                  this.props.promotion.status === 'ACTIVE' ? true : false
                }
              />
            </View>
          </View>
          <View
            style={[AppStyles.horizontalLine, AppStyles.marginHorizontal]}
          />
        </View>
      );
    } else {
      return null;
    }
  }

  render() {
    if (this.props.promotion.loading) {
      return (
        <View style={AppStyles.container}>
          <Loading />
        </View>
      );
    } else {
      return (
        <View style={AppStyles.container}>
          <ScrollView
            alwaysBounceVertical={false}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollViewContentContainer}>
            <StatusBar
              backgroundColor={AppColors.statusBarBg}
              hidden={false}
              barStyle={AppColors.statusBarStyle}
            />
            <View style={styles.promoHeaderView}>
              <PromotionDetailsHeader promotionItems={this.props.promotion} />
            </View>
            <View
              style={[AppStyles.horizontalLine, AppStyles.marginHorizontal]}
            />
            {this.renderDonate()}
            <View style={styles.materialImageAndLabelview}>
              <View style={styles.materialImageView}>
                <Image
                  style={styles.materialImage}
                  resizeMode={'contain'}
                  source={{
                    uri:
                      'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcT4692lsY_FGn9NhHPis0BVdovCkaqDbDSn4vZLbtqX0dbGay9W&usqp=CAU',
                  }}
                />
              </View>
              <View style={styles.materialLabelview}>
                <Text style={[AppStyles.smallText, AppStyles.darkText]}>
                  Material
                </Text>
                <Text style={[AppStyles.regularBoldText, AppStyles.darkText]}>
                  {this.props.promotion.materialType.name}
                </Text>
              </View>
            </View>
            <View style={styles.labelTextView}>
              <Text
                style={[
                  AppStyles.regularText,
                  styles.rangeAndRewardsTextStyle,
                ]}>
                {this.props.promotion.materialType.perUnit
                  ? AppStrings.materialRangeInfoText.replace(
                      '<condition>',
                      'Per Unit',
                    )
                  : AppStrings.materialRangeInfoText.replace(
                      '<condition>',
                      'Flat Rate',
                    )}
              </Text>
            </View>
            <View style={styles.criteriaView}>
              <FlatList
                data={this.props.promotion.segments}
                keyExtractor={this._keyExtractor}
                renderItem={({item}) => this.renderCriteria(item)}
                extraData={this.props.promotion.segments}
              />
            </View>
            <View style={styles.promoByView}>
              <CorporateDetails
                corporateItems={this.props.promotion.by}
                componentTitle={AppStrings.promoBy}
              />
            </View>
            <View style={AppStyles.horizontalLine} />
            <View style={styles.promoByView}>
              <CorporateDetails
                corporateItems={this.props.promotion.vendor}
                componentTitle={AppStrings.vendor}
              />
            </View>
          </ScrollView>
          {this.renderFooterView()}
        </View>
      );
    }
  }
}

export default MaterialPromotionDetails;
