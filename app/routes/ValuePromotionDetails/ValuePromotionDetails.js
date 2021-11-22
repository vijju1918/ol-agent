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
  FlatList,
  Alert,
  TouchableOpacity,
} from 'react-native';
import {observer} from 'mobx-react';
import ImagePicker from 'react-native-image-crop-picker';
import {showMessage} from 'react-native-flash-message';

import Button from '@components/Button';
import PromotionDetailsHeader from '@components/PromotionDetailsHeader';
import CorporateDetails from '@components/CorporateDetails';
import Criteria from '@components/Criteria';
import Image from '@components/Image';
import NavBarInfoButton from '@components/NavBarInfoButton';

import {getImageDisplayUri} from '../../lib/utils';

import {AppColors, AppStyles} from '@theme';
import {AppResources, AppStrings} from '@config';
import PromotionsStore from '@stores/Promotions';
import styles from './styles';

@observer
class ValuePromotionDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      criteria: {
        checked: true,
      },
      selectedCriteriaId:
        props.promotion &&
        props.promotion.segments &&
        props.promotion.segments.length
          ? props.promotion.segments[0].id
          : '',
      proofImage: '',
      isActive: this.props.promotion.status === 'ACTIVE' ? true : false,
    };
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

  setAcceptAgrementState(value) {
    this.props.promotion.isAgrementChecked = value;
  }

  _keyExtractor = item => item.id;

  renderCriteria(item) {
    return (
      <View style={styles.criteriaItemView}>
        <Criteria
          color1={AppColors.valueColor1}
          color2={AppColors.valueColor2}
          range={this.getRange(item)}
          reward={item.reward + ' FP'}
          selected={this.state.selectedCriteriaId === item.id}
          onPress={() => this.setSelectedCriteria(item.id)}
          checkBox={!this.state.isActive}
          touchDisabled={this.state.isActive}
        />
      </View>
    );
  }

  getRange(item) {
    if (item.minQuantity === item.maxQuantity) {
      return this.props.promotion.valueType.unit + ' ' + item.minQuantity;
    } else {
      return (
        this.props.promotion.valueType.unit +
        ' ' +
        item.minQuantity +
        ' - ' +
        this.props.promotion.valueType.unit +
        ' ' +
        item.maxQuantity
      );
    }
  }

  setSelectedCriteria(id) {
    this.setState({
      selectedCriteriaId: id,
    });
  }

  renderProofImage() {
    let imageSource = '';
    if (this.state.proofImage.sourceURL) {
      imageSource = this.state.proofImage.sourceURL;
    } else if (this.state.proofImage.path) {
      imageSource = this.state.proofImage.path;
    } else {
      imageSource = this.props.promotion.proofImage
        ? this.props.promotion.proofImage.url
        : '';
    }
    if (imageSource) {
      return (
        <View style={[styles.ImageView]}>
          <Text style={[AppStyles.regularBoldText, styles.ImageViewInfoText]}>
            Proof of Purchase
          </Text>
          <Image
            style={[styles.proofImage]}
            source={getImageDisplayUri(imageSource, AppResources.noProfilePic)}
          />
        </View>
      );
    } else {
      return null;
    }
  }

  renderFooterView() {
    if (this.state.isActive) {
      return (
        <View style={styles.waitingView}>
          <Text style={[AppStyles.mediumText, AppStyles.whiteText]}>
            Waiting for approval
          </Text>
        </View>
      );
    } else {
      return (
        <View>
          <View style={styles.uploadButtonView}>
            <TouchableOpacity
              style={styles.buttonTouch}
              activeOpacity={0.5}
              onPress={() => this.upload()}>
              <Text style={[AppStyles.regularText, styles.buttonText]}>
                {this.state.proofImage
                  ? AppStrings.updateBill
                  : AppStrings.uploadBill}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  }

  upload() {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      this.setState({
        proofImage: image,
      });
    });
  }

  validate() {
    if (this.state.selectedCriteriaId) {
      if (this.state.proofImage) {
        this.props.promotion
          .redeemValuePromotion(this.state.selectedCriteriaId)
          .then(data => {
            if (data) {
              PromotionsStore.meteorUploadProofImage(
                this.state.proofImage,
                data,
              ).then(() => {
                Alert.alert(
                  'Success',
                  'Your expression is saved successfully . Please wait for the response from the promoter',
                  [{text: 'OK', onPress: () => this.props.onBack()}],
                  {
                    cancelable: false,
                  },
                );
              });
            } else {
              showMessage({
                message: 'Oops, Something went wrong. Please try again!',
              });
            }
          });
      } else {
        showMessage({
          message: 'Please upload the proof!',
        });
      }
    } else {
      showMessage({
        message: 'Please select a criteria to continue!',
      });
    }
  }

  render() {
    return (
      <View style={AppStyles.container}>
        <ScrollView
          alwaysBounceVertical={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollViewContentContainer}>
          <View style={styles.promoHeaderView}>
            <PromotionDetailsHeader promotionItems={this.props.promotion} />
          </View>
          <View
            style={[AppStyles.horizontalLine, AppStyles.marginHorizontal]}
          />
          <View style={styles.labelTextView}>
            <Text style={[AppStyles.regularText]}>
              {this.props.promotion.valueType.perUnit
                ? AppStrings.purchasePriceInfo.replace(
                    '<condition>',
                    'Per Unit',
                  )
                : AppStrings.purchasePriceInfo.replace(
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
              extraData={this.state.selectedCriteriaId}
              alwaysBounceVertical={false}
            />
          </View>
          {this.renderProofImage()}
          {this.renderFooterView()}
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
        {!this.state.isActive ? (
          <View style={styles.buttonView}>
            <Button
              buttonText={AppStrings.submit}
              onPress={() => this.validate()}
            />
          </View>
        ) : null}
      </View>
    );
  }
}

export default ValuePromotionDetails;
