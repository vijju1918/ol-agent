/**
 * Copyright (c) 2018-present, Evolvier Technologies. All rights reserved.
 *
 */

'use strict';

import React, {Component} from 'react';
import {View, ScrollView, Text, FlatList} from 'react-native';
import {Actions} from 'react-native-router-flux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {observer} from 'mobx-react';
import CheckBox from 'react-native-checkbox-heaven';
import {createIconSetFromFontello} from 'react-native-vector-icons';
import {showMessage} from 'react-native-flash-message';

import NavBarTitle from '@components/NavBarTitle';
import PromotionDetailsHeader from '@components/PromotionDetailsHeader';
import TouchableOpacity from '@components/TouchableOpacity';
import CorporateDetails from '@components/CorporateDetails';

import NavBarInfoButton from '@components/NavBarInfoButton';

import Corporates from '@stores/Corporates';

import {AppConstants, AppIconFonts} from '@config';
import {AppStyles} from '@theme';
import {AppStrings} from '@config';
import styles from './styles';

const Icon = createIconSetFromFontello(AppIconFonts);

@observer
class PromotionDetails extends Component {
  constructor(props) {
    super(props);
    if (
      this.props.promotion &&
      this.props.promotion.donationCorporates &&
      this.props.promotion.donationCorporates.length
    ) {
      this.props.promotion.isDonateEnabled = true;
    }
    this.state = {
      refresh: false,
      disable: false,
    };
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

  setAcceptAgrementState(value) {
    this.props.promotion.isAgrementChecked = value;
  }

  videoClose(item) {
    this.props.promotion.redeemActionPromotion(item.id);
  }

  actionComplete() {
    this.setState({
      refresh: !this.state.refresh,
      disable: true,
    });
  }

  completeAndupdate(item) {
    this.setState({
      disable: true,
    });
    this.actionComplete();
    this.videoClose(item);
  }

  onPressViewDetails(item) {
    if (
      this.props.promotion.status === AppConstants.promotionStatus.published
    ) {
      if (item.actionType === AppStrings.actionLinkType) {
        Actions.webViewPage({
          renderTitle: <NavBarTitle title={AppStrings.linkDescription} />,
          url: item.url,
          actionComplete: () => this.completeAndupdate(item),
        });
      }
      if (item.actionType === AppStrings.actionVedioType) {
        this.props.renderVideoPlayer({
          url: item.url,
          duration: item.minDuration,
          videoClose: () => this.videoClose(item),
          actionComplete: () => this.actionComplete(),
        });
      }
      if (item.actionType === AppStrings.actionOthersType) {
        this.renderOthers();
      }
    } else if (
      this.props.promotion.status === AppConstants.promotionStatus.active ||
      this.props.promotion.status === AppConstants.promotionStatus.claimed
    ) {
      if (item.actionType === AppStrings.actionLinkType) {
        Actions.webViewPage({
          renderTitle: <NavBarTitle title={AppStrings.linkDescription} />,
          url: item.url,
          actionComplete: () => this.completeAndupdate(item),
        });
      }
      if (item.actionType === AppStrings.actionVedioType) {
        this.props.renderVideoPlayer({
          url: item.url,
          duration: item.minDuration,
          videoClose: () => this.videoClose(item),
          actionComplete: () => this.actionComplete(),
        });
      }
      if (item.actionType === AppStrings.actionOthersType) {
        this.renderOthers();
      }
    } else {
      showMessage({
        message: 'Please accept terms and conditions to continue!',
      });
    }
  }

  renderOthers() {}

  _keyExtractor = item => item.id;
  renderActionItem(item) {
    if (item.actionType === AppStrings.actionLinkType) {
      return this.clickLinkView(item);
    } else if (item.actionType === AppStrings.actionVedioType) {
      return this.watchVideoView(item);
    } else if (item.actionType === AppStrings.actionOtherType) {
      return this.otherActionView(item);
    } else {
      return null;
    }
  }

  clickLinkView(item) {
    return (
      <View>
        <TouchableOpacity
          style={styles.clickLinkMainView}
          activeOpacity={0.5}
          onPress={() => this.onPressViewDetails(item)}>
          <View style={styles.actionIconView}>
            <Icon style={styles.buttonIcon} name="oleum_click" />
          </View>
          <View style={[AppStyles.row, styles.promoInfoView]}>
            <Text style={[AppStyles.titleText, AppStyles.darkText]}>
              Click and get
            </Text>
            <Text> </Text>
            <Text style={[AppStyles.titleBoldText, AppStyles.darkText]}>
              {item.reward + ' FP'}
            </Text>
          </View>
          {item.actionStatus === true ? (
            <View style={styles.navIconView}>
              <MaterialCommunityIcons
                style={styles.buttonIcon}
                name={'check'}
              />
            </View>
          ) : null}
        </TouchableOpacity>
      </View>
    );
  }

  watchVideoView(item) {
    return (
      <View>
        <TouchableOpacity
          style={styles.watchVideoMainView}
          activeOpacity={0.5}
          onPress={() => this.onPressViewDetails(item)}>
          <View style={styles.actionIconView}>
            <Icon style={styles.buttonIcon} name="oleum_play" />
          </View>
          <View style={[AppStyles.row, styles.promoInfoView]}>
            <Text style={[AppStyles.titleText, AppStyles.darkText]}>
              Watch this video and get
            </Text>
            <Text> </Text>
            <Text style={[AppStyles.titleBoldText, AppStyles.darkText]}>
              {item.reward + ' FP'}
            </Text>
          </View>
          {item.actionStatus === true ? (
            <View style={styles.navIconView}>
              <MaterialCommunityIcons
                style={styles.buttonIcon}
                name={'check'}
              />
            </View>
          ) : null}
        </TouchableOpacity>
      </View>
    );
  }

  otherActionView(item) {
    if (item) {
      return (
        <View>
          <TouchableOpacity
            style={styles.otherActionMainView}
            activeOpacity={0.5}
            onPress={() => this.onPressViewDetails(item)}>
            <View style={styles.actionIconView}>
              <MaterialCommunityIcons
                style={styles.buttonIcon}
                name="arrow-up"
              />
            </View>
            <View style={styles.promoInfoView}>
              <Text style={[AppStyles.titleText, AppStyles.whiteText]}>
                {item.description}
              </Text>
              <Text style={[AppStyles.titleBoldText, AppStyles.whiteText]}>
                {item.reward + ' FP'}
              </Text>
            </View>
            <View style={styles.navIconView}>
              <MaterialCommunityIcons
                style={styles.buttonIcon}
                name="chevron-right"
              />
            </View>
          </TouchableOpacity>
        </View>
      );
    } else {
      return null;
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
                  this.props.promotion.status === 'CLAIMED' ||
                  this.props.promotion.status === 'ACTIVE' ||
                  this.state.disable === true
                    ? true
                    : false
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
    let segmentsLength = this.props.promotion.segments.length;
    return (
      <View style={[AppStyles.container]}>
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
          {this.renderDonate()}
          <View style={styles.actionsView}>
            <View style={styles.labelView}>
              <Text style={[AppStyles.labelText, AppStyles.darkText]}>
                {AppStrings.actions.replace('<number>', segmentsLength)}
              </Text>
              <Text style={AppStyles.regularText}>
                {this.props.promotion.redeemType === AppStrings.redeemSingleType
                  ? AppStrings.singleActionInfo
                  : AppStrings.multiActionInfo}
              </Text>
            </View>
            <FlatList
              data={this.props.promotion.segments}
              renderItem={({item}) => this.renderActionItem(item)}
              showsVerticalScrollIndicator={false}
              scrollEnabled={false}
              keyExtractor={this._keyExtractor}
              extraData={this.state.refresh}
            />
          </View>
          <View style={styles.promoByView}>
            <CorporateDetails
              corporateItems={this.props.promotion.by}
              componentTitle={AppStrings.promoBy}
            />
          </View>
          <View
            style={[AppStyles.horizontalLine, AppStyles.marginHorizontal]}
          />
          <View style={styles.promoByView}>
            <CorporateDetails
              corporateItems={this.props.promotion.vendor}
              componentTitle={AppStrings.vendor}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default PromotionDetails;
