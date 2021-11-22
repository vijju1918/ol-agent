/**
 * Copyright (c) 2018-present, Oleum. All rights reserved.
 *
 */

'use strict';

import React, { Component } from 'react';

import {
  View,
  StatusBar,
  Text,
  FlatList,
  Linking,
  Platform,
  Alert,
} from 'react-native';
import { observer } from 'mobx-react';
import { showMessage } from 'react-native-flash-message';
import IntentLauncher from 'react-native-intent-launcher';

import { AppColors, AppStyles } from '@theme';
import { AppConstants, AppResources } from '@config';
import styles from './styles';
import Header from '@components/Header';
import NavbarRightIcons from '@components/NavbarRightIcons';
import TouchableOpacity from '@components/TouchableOpacity';
import LoadingShadow from '@components/LoadingShadow';
import Image from '@components/Image';

import Promotions from '@stores/Promotions';
import Ratings from '@stores/Ratings';
import Account from '@stores/Account';
import Cans from '@stores/Cans';
import Vehicles from '@stores/Vehicles';
import Corporates from '@stores/Corporates';

@observer
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      homeLoading: true,
      homeContent: [
        {
          icon: AppResources.addFuel,
          title: 'Buy Fuel',
          onPress: () => this.props.renderAddFuel(),
        },
        {
          icon: AppResources.myCan,
          title: 'My Can',
          onPress: () => this.props.renderMyCan(),
        },
        {
          icon: AppResources.createDR,
          title: 'Dispense',
          onPress: () => this.renderCreateDispense(),
        },
        {
          icon: AppResources.myCar,
          title: 'My Vehicles',
          onPress: () => this.props.renderMyVehicles(),
        },
        {
          icon: AppResources.myMileage,
          title: 'My Mileage',
          onPress: () => this.props.renderMyMileage(),
        },
        {
          icon: AppResources.fuelStations,
          title: 'Fuel Stations',
          onPress: () => this.props.renderFuelStations(),
        },
        {
          icon: AppResources.myInvoice,
          title: 'My Invoices',
          onPress: () => this.props.renderMyInvoices(),
        },
        {
          icon: AppResources.transfer,
          title: 'Transfer FP',
          onPress: () => this.props.renderTransferFP(),
        },
        {
          icon: AppResources.game,
          title: 'Fuel Tambola',
          onPress: () => this.playGame(),
        },
        {
          icon: AppResources.scan,
          title: 'Scan',
          onPress: () => this.renderPromotionDetails(),
        },
        {
          icon: AppResources.rewards,
          title: 'My Rewards',
          onPress: () => this.props.renderMyRewards(),
        },
        {
          icon: AppResources.offers,
          title: 'Offers',
          onPress: () => this.props.renderOffers(),
        },
      ],
    };
  }

  /**
   * Game coming soon alert.
   *
   * @memberof Home
   */
  gameComingSoonAlert() {
    Alert.alert('Coming Soon', 'Thambola game is coming soon to iOS.', [
      {
        text: 'OK',
      },
    ]);
  }

  /**
   * Open the fuel Tambola game in web
   *
   * @memberof Home
   */
  openFuelTambolaWeb() {
    Linking.canOpenURL(AppConstants.fuelTambolaUrl).then(supported => {
      if (supported) {
        Linking.openURL(AppConstants.fuelTambolaUrl);
      }
    });
  }

  /**
   * Open the fuel Tambola game application
   *
   * @memberof Home
   */
  openFuelTambolaApp() {
    IntentLauncher.startAppByPackageName(AppConstants.fuelTambolaPackageName)
      .then(result => {
        console.log('App Started');
      })
      .catch(error => console.log('Could not open app', error));
  }

  /**
   * Action on play game.
   *
   * @memberof Home
   */
  playGame() {
    if (Platform.OS === 'ios') {
      this.gameComingSoonAlert();
    } else {
      IntentLauncher.isAppInstalled(AppConstants.fuelTambolaPackageName)
        .then(isAppInstalled => {
          console.log('App Installed', isAppInstalled);
          if (isAppInstalled) {
            this.openFuelTambolaApp();
          }
        })
        .catch(error => {
          console.log('App Not Installed', error);
          this.openFuelTambolaWeb();
        });
    }
  }

  componentDidMount() {
    Promotions.updatePubSub();
    Account.sleep(2000).then(() => {
      // this.checkRating();
    });
  }

  componentWillMount() {
    this.setState({
      loading: false,
    });
    this.props.navigation.setParams({
      right: (
        <NavbarRightIcons
          page={'home'}
          viewActive={() => this.props.viewActive()}
          viewNotification={() => this.props.viewNotification()}
          renderPendingDR={() => this.props.renderPendingDR()}
        />
      ),
    });
  }

  checkRating() {
    if (Ratings.checkRatingStatus) {
      this.props.viewRatingSBU({
        data: Ratings.checkRatingStatus,
      });
    } else {
      this.checkPromoRating();
    }
  }

  checkPromoRating() {
    if (Promotions.unratedCompletedPromo) {
      this.props.viewRatingPromo({
        data: Promotions.unratedCompletedPromo,
      });
    }
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

  renderHomeContents() {
    return (
      <View>
        <StatusBar
          backgroundColor={AppColors.statusBarBg}
          hidden={false}
          barStyle={AppColors.statusBarStyle}
        />
        <View style={styles.homeContentView}>
          <FlatList
            data={this.state.homeContent}
            alwaysBounceVertical={false}
            extraData={this.state.homeContent}
            numColumns={3}
            renderItem={({ item, i }) => this.renderHomeItem(item, i)}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.homeItemContentContainerStyle}
            keyExtractor={this._keyExtractor}
            bounces={true}
          />
        </View>
        {this.renderLoading()}
      </View>
    );
  }

  renderLoading() {
    if (this.state.loading) {
      return <LoadingShadow />;
    }
  }

  renderHomeItem(item) {
    return (
      <View style={styles.itemMainView}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.tileTouch}
          onPress={() => item.onPress()}>
          <Image source={item.icon} style={styles.itemImage} />
          <Text
            style={[
              AppStyles.regularText,
              styles.labelText,
              AppStyles.centerAlignText,
            ]}>
            {item.title}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  renderPromotionDetails() {
    this.props.renderQRScan({
      qrData: this.renderNavPromotionDetails.bind(this),
    });
  }

  renderNavPromotionDetails(refData) {
    try {
      this.setState({
        loading: true,
      });
      Account.sleep(2000).then(() => {
        let scanDetails;
        try {
          scanDetails = JSON.parse(refData);
        } catch (e) {
          this.setState({
            loading: false,
          });
          showMessage({
            message: 'Sorry, this is not an Oleum QR code!',
          });
          return;
        }
        if (scanDetails.type === 'PROMOTION') {
          let scannedPromo = Promotions.getScannedPromotion(scanDetails.ref);
          if (scannedPromo) {
            this.checkPromoStatus(scannedPromo);
            this.setState({
              loading: false,
            });
          } else {
            this.setState({
              loading: false,
            });
            showMessage({
              message:
                'Oops! May be this promotion is not for you. Please try another.',
            });
          }
        } else {
          this.setState({
            loading: false,
          });
          showMessage({
            message: 'Sorry, please scan another QR code',
          });
        }
      });
    } catch (e) {
      this.setState({
        loading: false,
      });
      showMessage({
        message: 'Sorry, this is not an Oleum QR code!',
      });
    }
  }

  checkPromoStatus(data) {
    if (data.status === 'PUBLISHED') {
      this.openPromotionDetails(data);
    } else {
      this.setState({
        loading: false,
      });
      showMessage({
        message: 'Sorry, this promotion is not available now!',
      });
    }
  }

  renderCreateDispense() {
    if (Ratings.checkRatingStatus) {
      this.props.viewRatingSBU({
        data: Ratings.checkRatingStatus,
      });
    } else {
      this.props.viewDispenseRequest();
    }
  }

  render() {
    return (
      <View style={AppStyles.container}>
        <StatusBar
          backgroundColor={AppColors.statusBarBg}
          hidden={false}
          barStyle={AppColors.statusBarStyle}
        />
        <View style={styles.headerView}>
          <Header
            isHome={true}
            loading={
              !(
                Account.connectionReady &&
                Cans.ready &&
                Promotions.promotionReady &&
                Promotions.activePromotionReady &&
                Vehicles.ready &&
                Corporates.ready
              )
            }
            onClickAddFP={() =>
              this.props.viewAddFP({
                onPaymentCompleted: data => {
                  this.props.openPaymentRecept({
                    payment: data,
                  });
                },
              })
            }
          />
        </View>
        {this.renderHomeContents()}
      </View>
    );
  }
}

export default Home;
