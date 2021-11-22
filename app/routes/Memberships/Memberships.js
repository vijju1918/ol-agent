/**
 * Copyright (c) 2018-present, Oleum. All rights reserved.
 *
 */
'use strict';

import React, {Component} from 'react';
import {View, FlatList, Text, TouchableHighlight} from 'react-native';
import {observer} from 'mobx-react';
import {showMessage} from 'react-native-flash-message';

import NoData from '@components/NoData';
import LoadingShadow from '@components/LoadingShadow';
import Image from '@components/Image';

import Vehicles from '@stores/Vehicles';
import {Beneficiaries} from '@stores/Beneficiaries';
import Corporates from '@stores/Corporates';
import Account from '@stores/Account';

import {AppColors, AppStyles} from '@theme';
import {AppConstants, AppResources} from '@config';
import styles from './styles';

@observer
class Memberships extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      // isCommunityTab: true,
      isCommunityTab: true,
      isBeneficiaryTab: false,
      communityList: [],
      beneficiaryList: [],
    };
    this.beneficiaries = new Beneficiaries();
  }

  componentDidMount() {
    // this.getBeneficiariesParentCorporate();
    if (Account.connectionReady && Vehicles.ready) {
      this.getCommunityList();
    } else {
      this.timer = setInterval(() => {
        if (Account.connectionReady && Vehicles.ready) {
          this.getCommunityList();
          clearInterval(this.timer);
        }
      }, 500);
    }
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  getCommunityList() {
    if (
      Account.connectionReady &&
      Vehicles.ready &&
      Vehicles.list &&
      Vehicles.list.length
    ) {
      this.getCommunityListMethod();
    }
  }

  getCommunityListMethod() {
    this.beneficiaries
      .getCommunityList(this.getVehiclesData(Vehicles.list))
      .catch(error =>
        showMessage({
          message:
            error && error.details && error.details.displayMessage
              ? error.details.displayMessage
              : 'Something went wrong, try again later',
        }),
      );
  }

  getBeneficiariesParentCorporate() {
    if (
      Account.connectionReady &&
      Vehicles.ready &&
      Vehicles.list &&
      Vehicles.list.length
    ) {
      this.getBeneficiariesParentCorporateMethod();
    }
  }

  getBeneficiariesParentCorporateMethod() {
    this.beneficiaries
      .getBeneficiariesParentCorporate(this.getVehiclesData(Vehicles.list))
      .catch(error =>
        showMessage({
          message:
            error && error.details && error.details.displayMessage
              ? error.details.displayMessage
              : 'Something went wrong, try again later',
        }),
      );
  }

  getVehiclesData(vehicles) {
    if (vehicles && vehicles.length) {
      let vehicleData = vehicles.map(eachVehicle => {
        return {id: eachVehicle.id, type: AppConstants.vehicle};
      });
      return vehicleData;
    } else {
      return [];
    }
  }

  onPressCommunityTab() {
    this.setState({
      isCommunityTab: true,
      isBeneficiaryTab: false,
    });
    this.getCommunityList();
  }

  onPressBeneficiaryTab() {
    this.setState({
      isCommunityTab: false,
      isBeneficiaryTab: true,
    });
    this.getBeneficiariesParentCorporate();
  }

  renderListView() {
    if (this.state.isCommunityTab) {
      if (
        this.beneficiaries.getCommunitiesLoading &&
        !this.beneficiaries.communityList.length
      ) {
        return (
          <View style={[AppStyles.container, AppStyles.containerCentered]}>
            <LoadingShadow />
          </View>
        );
      } else if (
        this.beneficiaries.communityList &&
        !this.beneficiaries.communityList.length
      ) {
        return (
          <View style={[AppStyles.container, AppStyles.containerCentered]}>
            <NoData
              image={AppResources.membership}
              title={'No Communities !'}
            />
          </View>
        );
      } else {
        return (
          <View style={styles.listView}>
            <FlatList
              data={this.beneficiaries.communityList}
              alwaysBounceVertical={false}
              extraData={this.beneficiaries.communityList}
              renderItem={({item, i}) => this.renderCommunityItem(item, i)}
              ItemSeparatorComponent={() => this.renderItemSeparator()}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.listContentContainerStyle}
              keyExtractor={this._keyExtractor}
              bounces={true}
            />
          </View>
        );
      }
    } else {
      if (this.beneficiaries.loading && !this.beneficiaries.list.length) {
        return (
          <View style={[AppStyles.container, AppStyles.containerCentered]}>
            <LoadingShadow />
          </View>
        );
      } else if (this.beneficiaries.list && !this.beneficiaries.list.length) {
        return (
          <View style={[AppStyles.container, AppStyles.containerCentered]}>
            <NoData
              image={AppResources.membership}
              title={'No Beneficiaries !'}
            />
          </View>
        );
      } else {
        return (
          <View style={styles.listView}>
            <FlatList
              data={this.beneficiaries.list}
              alwaysBounceVertical={false}
              extraData={this.beneficiaries.list}
              renderItem={({item, i}) => this.renderBeneficiaryItem(item, i)}
              ItemSeparatorComponent={() => this.renderItemSeparator()}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.listContentContainerStyle}
              keyExtractor={this._keyExtractor}
              bounces={true}
            />
          </View>
        );
      }
    }
  }

  getCanImage(community) {
    let corporate = Corporates.list.find(
      item => community.corporate && item.id === community.corporate._id,
    );
    if (corporate) {
      return corporate.companyLogo;
    }
    return '';
  }

  renderCommunityItem(community) {
    return (
      <View style={styles.communityItemMainView}>
        <View style={[AppStyles.row, AppStyles.flex2, styles.nameView]}>
          {this.getCanImage(community) ? (
            <View style={styles.communityLogoView}>
              <Image
                style={styles.communityLogo}
                source={
                  this.getCanImage(community)
                    ? {uri: this.getCanImage(community)}
                    : AppResources.noImage
                }
              />
            </View>
          ) : (
            <View style={styles.communityLogoView}>
              <View style={styles.letterView}>
                <Text
                  style={[
                    AppStyles.titleBoldText,
                    AppStyles.upperCaseText,
                    styles.titleLetterText,
                  ]}>
                  {community &&
                    community.communityTitle
                      .match(/\b(\w)/g)
                      .join('')
                      .slice(0, 2)}
                </Text>
              </View>
            </View>
          )}
          <Text style={[AppStyles.regularBoldText, styles.communityNameText]}>
            {community.communityTitle}
          </Text>
        </View>
        <View style={[AppStyles.flex1, styles.fpView]}>
          <Text style={AppStyles.regularBoldText}>
            {community.totalQuantity + ' FP'}
          </Text>
        </View>
      </View>
    );
  }

  renderBeneficiaryItem(community) {
    return (
      <View style={styles.communityItemMainView}>
        {this.getCanImage(community) ? (
          <View style={styles.communityLogoView}>
            <Image
              style={styles.communityLogo}
              source={
                this.getCanImage(community)
                  ? {uri: this.getCanImage(community)}
                  : AppResources.noImage
              }
            />
          </View>
        ) : (
          <View style={styles.communityLogoView}>
            <View style={styles.letterView}>
              <Text
                style={[
                  AppStyles.titleBoldText,
                  AppStyles.upperCaseText,
                  styles.titleLetterText,
                ]}>
                {community.corporate &&
                  community.corporate.title
                    .match(/\b(\w)/g)
                    .join('')
                    .slice(0, 2)}
              </Text>
            </View>
          </View>
        )}
        <View style={styles.communityDetailsView}>
          <View style={styles.communityNameView}>
            <Text style={[AppStyles.labelText, AppStyles.upperCaseText]}>
              {community.corporate && community.corporate.title}
            </Text>
          </View>
          <View style={styles.communityLocationView}>
            <Text style={AppStyles.mediumRegularText}>
              {this.getLocation(community)}
            </Text>
          </View>
          {this.renderCanTypeDetails(community)}
        </View>
        <View style={styles.communityPointsView}>
          <Text style={AppStyles.regularBoldText}>
            {community.fuelPoints + ' FP'}
          </Text>
        </View>
      </View>
    );
  }

  renderCanTypeDetails(community) {
    if (community.user && community.user.type === 'vehicle') {
      return (
        <View style={styles.communityLocationView}>
          <Text style={[AppStyles.smallBoldText, AppStyles.textSpace]}>
            {'Vehicle: ' + community.vehicleNumber}
          </Text>
        </View>
      );
    }
  }

  getLocation(community) {
    if (
      community.corporate &&
      community.corporate.address &&
      community.corporate.address.street
    ) {
      return community.corporate.address.street;
    } else if (
      community.corporate &&
      community.corporate.address &&
      community.corporate.address.line2
    ) {
      return community.corporate.address.line2;
    } else if (
      community.corporate &&
      community.corporate.address &&
      community.corporate.address.line1
    ) {
      community.corporate.address.line1;
    } else {
      return community.corporate && community.corporate.address.district;
    }
  }

  renderItemSeparator() {
    return <View style={[AppStyles.horizontalLine, styles.itemSeparator]} />;
  }

  renderTabView() {
    return (
      <View>
        <View style={styles.tabView}>
          <TouchableHighlight
            activeOpacity={1}
            underlayColor={
              this.state.isCommunityTab
                ? AppColors.whiteIcon
                : AppColors.underlayYellow
            }
            style={
              this.state.isCommunityTab
                ? styles.tabTouchSelected
                : styles.tabTouch
            }
            onPress={() => this.onPressCommunityTab()}>
            <Text style={AppStyles.regularBoldText}>Community</Text>
          </TouchableHighlight>
          <TouchableHighlight
            activeOpacity={1}
            underlayColor={
              this.state.isBeneficiaryTab
                ? AppColors.whiteIcon
                : AppColors.underlayYellow
            }
            style={
              this.state.isBeneficiaryTab
                ? styles.tabTouchSelected
                : styles.tabTouch
            }
            onPress={() => this.onPressBeneficiaryTab()}>
            <Text style={AppStyles.regularBoldText}>Beneficiary</Text>
          </TouchableHighlight>
        </View>
        <View style={[AppStyles.horizontalLine, styles.horizontalLine]} />
      </View>
    );
  }

  render() {
    return (
      <View style={[AppStyles.containerWhite, styles.mainView]}>
        {this.renderTabView()}
        {this.renderListView()}
      </View>
    );
  }
}

export default Memberships;
