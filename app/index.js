/**
 * Copyright (c) 2018-present, Oleum. All rights reserved.
 *
 */

'use strict';

import React, { Component } from 'react';
import {
  Router,
  Scene,
  Stack,
  Lightbox,
  Actions,
  Drawer,
} from 'react-native-router-flux';
import { View, ToastAndroid, Linking, AppState, Platform } from 'react-native';
import FlashMessage from 'react-native-flash-message';
import OneSignal from 'react-native-onesignal';
import parse from 'url-parse';
import NetInfo from '@react-native-community/netinfo';
import RNPermissions, { PERMISSIONS, RESULTS } from 'react-native-permissions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNExitApp from 'react-native-exit-app';

import SplashScreen from '@routes/SplashScreen';
import Login from '@routes/Login';
import Profile from '@routes/Profile';
import AppIntro from '@routes/AppIntro';
import AllTransactions from '@routes/AllTransactions';
import AgentProfile from '@routes/AgentProfile';
import VerifyOTP from '@routes/VerifyOTP';
import AboutOleum from '@routes/AboutOleum';
import ActivePromosList from '@routes/ActivePromosList';
import WebViewPage from '@routes/WebViewPage';
import AgentHome from '@routes/AgentHome';
import AgentDispensationHistory from '@routes/AgentDispensationHistory';
import AgentReceipt from '@routes/AgentReceipt';
import Home from '@routes/Home';
import PendingDR from '@routes/PendingDR';
import MyCan from '@routes/MyCan';
import MyDonations from '@routes/MyDonations';
import Transfer from '@routes/Transfer';
import DonateFuelPoints from '@routes/DonateFuelPoints';
import DispenseRequest from '@routes/DispenseRequest';
import DrSummary from '@routes/DrSummary';
import DrReceipt from '@routes/DrReceipt';
import PromotionDetails from '@routes/PromotionDetails';
import ValuePromotionDetails from '@routes/ValuePromotionDetails';
import ValuePromoReceipt from '@routes/ValuePromoReceipt';
import ValuePromotionPaymentDetails from '@routes/ValuePromotionPaymentDetails';
import ValuePromotionPaymentReceipt from '@routes/ValuePromotionPaymentReceipt';
import MaterialPromotionDetails from '@routes/MaterialPromotionDetails';
import PurchaseFuelPromoDetails from '@routes/PurchaseFuelPromoDetails';
import MyRewardsHistory from '@routes/MyRewardsHistory';
import RoleSelection from '@routes/RoleSelection';
import AgentRequestDetails from '@routes/AgentRequestDetails';
import MyTransferHistory from '@routes/MyTransferHistory';
import TransferDetailsReceipt from '@routes/TransferDetailsReceipt';
import PendingDRDetails from '@routes/PendingDRDetails';
import MyDispensationsHistory from '@routes/MyDispensationsHistory';
import MyPurchaseHistory from '@routes/MyPurchaseHistory';
import MyDispensationsHistoryDetails from '@routes/MyDispensationsHistoryDetails';
import MyTransferHistoryDetails from '@routes/MyTransferHistoryDetails';
import DepositRequestReceipt from '@routes/DepositRequestReceipt';
import ROList from '@routes/ROList';
import CanDetails from '@routes/CanDetails';
import SbuRatingList from '@routes/SbuRatingList';
import PromoRatingList from '@routes/PromoRatingList';
import MyLocations from '@routes/MyLocations';
import SelectLocation from '@routes/SelectLocation';
import Notification from '@routes/Notification';
import MyVehicles from '@routes/MyVehicles';
import MyMileage from '@routes/MyMileage';
import AddInvoice from '@routes/AddInvoice';
import MyInvoices from '@routes/MyInvoices';
import InvoiceDetails from '@routes/InvoiceDetails';
import AddVehicle from '@routes/AddVehicle';
import AddFuel from '@routes/AddFuel';
import Memberships from '@routes/Memberships';
import Offers from '@routes/Offers';
import MyRewards from '@routes/MyRewards';
import NewDispensation from '@routes/NewDispensation';
import CommunityList from '@routes/CommunityList';
import FuelPriceUpdate from '@routes/FuelPriceUpdate';
import FuelStations from '@routes/FuelStations';
import NewDispensationReceipt from '@routes/NewDispensationReceipt';
import ROSearch from '@routes/ROSearch';
import TransferToVehicleCan from '@routes/TransferToVehicleCan';

import DrawerIcon from '@components/DrawerIcon';
import NavBarTitle from '@components/NavBarTitle';
import NavBarTitlePadding from '@components/NavBarTitlePadding';
import DrawerContent from '@components/DrawerContent';
import BackButton from '@components/BackButton';
import NavbarRightIcons from '@components/NavbarRightIcons';
import NavBarImage from '@components/NavBarImage';

import CanList from '@components/LightBox/CanList';
import DispenseConfirmation from '@components/LightBox/DispenseConfirmation';
import FeatureIntro from '@components/LightBox/FeatureIntro';
import List from '@components/LightBox/List';
import VehicleList from '@components/LightBox/VehicleList';
import VideoPlayer from '@components/LightBox/VideoPlayer';
import QRCodeReader from '@components/LightBox/QRCodeReader';
import Contacts from '@components/LightBox/Contacts'; 
import Corporates from '@components/LightBox/Corporates';
import RatingPromo from '@components/LightBox/RatingPromo';
import RatingSBU from '@components/LightBox/RatingSBU';
import DispenseRecord from '@components/LightBox/DispenseRecord';
import ListWithThumbnail from '@components/LightBox/ListWithThumbnail';
import NoConnection from '@components/LightBox/NoConnection';
import Update from '@components/LightBox/Update';
import AddFP from '@components/LightBox/AddFP';

import { storeData } from '@lib/utils';
import { openPromotionPageFromRef } from '@lib/navigation';
import { AppStyles } from '@theme';
import { AppConstants, AppStrings, AppConfig } from '@config';
import { TabIcon } from './config/icons';
 
import { connect } from '@stores';
import Config from '@stores/Config';
import Account from '@stores/Account';
import ContactsStore from '@stores/Contacts';
import { Transfer as TransferStore } from '@stores/Transfers';



class Oleum extends Component {
  constructor(props) {
    super(props);

    OneSignal.setLogLevel(6, 0);
    OneSignal.setAppId(AppConfig.oneSignalAppId);

    OneSignal.promptForPushNotificationsWithUserResponse(response => {
      console.log('Prompt response:', response);
    });
    OneSignal.setNotificationWillShowInForegroundHandler(
      notificationReceivedEvent => {
        console.log(
          'OneSignal: notification will show in foreground:',
          notificationReceivedEvent,
        );
      },
    );

    OneSignal.setNotificationOpenedHandler(notification => {
      console.log('OneSignal: notification opened:', notification);
    });

    OneSignal.getDeviceState().then(deviceState => {
      console.log('Device info: ', deviceState);
      if (deviceState && deviceState.userId) {
        storeData('oneSignalId', deviceState.userId);
      }
    });


  }

  componentDidMount() {
    const currentScene = Actions.currentScene.replace('_', '');
    NetInfo.addEventListener(state => {
      if (!state.isConnected) {
        currentScene !== 'noConnection' ? Actions.noConnection() : null;
      }
    });
    this.isAppFirstOpened = true;
    Linking.addEventListener('url', this.handleDeepLink.bind(this));
    Linking.getInitialURL().then(url => {
      if (url) {
        this.handleDeepLink({ url });
      }
    });
    AppState.addEventListener('change', this._handleAppStateChange);
  }

  componentWillUnmount() {
    Linking.removeEventListener('url', this.handleDeepLink.bind(this));
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

  handleDeepLink({ url }) {
    let urlParsed = parse(url, true);
    let paths = [];
    if (urlParsed && urlParsed.pathname) {
      paths = urlParsed.pathname.split('/').filter(value => value);
    }
    if (paths && paths.length > 1) {
      this.openNavigation(paths[0], paths[1], urlParsed.query);
    }
  }

  _handleAppStateChange = nextAppState => {
    if (nextAppState === 'active') {
      let permission;
      if (Platform.OS === 'ios') {
        permission = PERMISSIONS.IOS.CONTACTS;
      } else {
        permission = PERMISSIONS.ANDROID.READ_CONTACTS;
      }

      RNPermissions.check(permission).then(result => {
        switch (result) {
          // case RESULTS.UNAVAILABLE:
          //   Contacts.contactPermission = RESULTS.UNAVAILABLE;
          //   break;
          case RESULTS.GRANTED:
            ContactsStore.load();
            break;
          // case RESULTS.DENIED:
          //   Contacts.contactPermission = RESULTS.DENIED;
          //   break;
          // case RESULTS.BLOCKED:
          //   Contacts.contactPermission = RESULTS.BLOCKED;
          //   break;
        }
      });
    }
  };

  openDynamicNaviagtion(
    type,
    action = null,
    query = null,
    hasCredentials = Account.hasCredentials(),
  ) {
    if (hasCredentials) {
      switch (type) {
        case 'home':
          Account.user.currentRole = AppConstants.endUser;
          Actions.user();
          break;
        case 'selectRole':
          this.chooseNavigation();
          break;
        case 'promotions':
          openPromotionPageFromRef(query);
          break;
      }
    }
  }

  openCurrentRoleHome(
    type,
    hasCredentials = Account.hasCredentials(),
    isAgent = true,
  ) {
    if (hasCredentials) {
      switch (type) {
        // case "agentProfile":
        //   if(!Account.user.currentRole || (Account.user.currentRole === AppConstants.endUser && isAgent)) {
        //     Account.user.currentRole === AppConstants.agent;
        //     Actions.agent();
        //   }
        //   break;
        case 'promotions':
          if (
            !Account.user.currentRole ||
            Account.user.currentRole === AppConstants.agent
          ) {
            Account.user.currentRole = AppConstants.endUser;
            Actions.user();
          }
      }
    }
  }

  openNavigation(type, action = null, query = null) {
    if ((type === 'home' || type === 'selectRole') && this.isAppFirstOpened) {
      this.isAppFirstOpened = false;
      if (!this.type) {
        this.type = type;
      } else {
        this.openCurrentRoleHome(this.type);
      }
      this.openDynamicNaviagtion(this.type, this.paths, this.query);
      this.type = null;
      this.paths = null;
      this.query = null;
    } else if (this.isAppFirstOpened) {
      this.type = type;
      this.action = action;
      this.query = query;
    } else {
      this.openCurrentRoleHome(type);
      this.openDynamicNaviagtion(type, action, query);
    }
  }

  onAndroidBack() {
    const currentScene = Actions.currentScene.replace('_', '');
    if (this.isExitScene(currentScene) && Config.isExitOnAndroidBack()) {
      RNExitApp.exitApp();
    } else if (this.isExitScene(currentScene)) {
      ToastAndroid.show('Press back again to exit', ToastAndroid.SHORT);
    } else if (currentScene === 'progressBarLightbox') {
      ToastAndroid.show(
        'Please wait until the update complete',
        ToastAndroid.SHORT,
      );
    } else if (this.isNoBackScene(currentScene)) {
      return true;
    } else {
      Actions.pop();
    }
    return true;
  }

  isExitScene(currentScene) {
    switch (currentScene) {
      case 'home':
        return true;
      case 'login':
        return true;
      case 'agentHome':
        return true;
      case 'selectRole':
        return true;
      default:
        return false;
    }
  }

  isNoBackScene(currentScene) {
    switch (currentScene) {
      case 'login':
        return true;
      case 'verifyOTP':
        return true;
      case 'drReceipt':
        return true;
      case 'agentReceipt':
        return true;
      case 'valuePromoReceipt':
        return true;
      case 'valuePromotionPaymentReceipt':
        return true;
      case 'transferDetailsReceipt':
        return true;
      case 'depositRequestReceipt':
        return true;
      case 'newDispensationReceipt':
        return true;
      case 'videoPlayer':
        return true;
      case 'update':
        return true;
      default:
        return false;
    }
  }

  doCheck() {
    if (Account.hasCredentials()) {
      this.load();
    } else {
      Actions.login();
    }
  }

  doAuth(auth) {
    return Account.login(auth).then(status => {
      if (status) {
        this.load(auth);
      }
    });
  }

  resetPhoneNumber(auth) {
    if (auth && auth.user && auth.user.number) {
      auth.user.number = '';
    }
  }

  connect() {
    return connect();
  }

  load(auth) {
    if (Account.hasProfile()) {
      this.doSelectRole();
      this.resetPhoneNumber(auth);
    } else {
      Actions.editProfile();
      this.resetPhoneNumber(auth);
    }
  }

  //Return last selected role from AsyncStorage
  lastSelectedUserRoleFromAsyncStorage = async () => {
    let userRole = '';
    try {
      userRole = await AsyncStorage.getItem(
        AppConstants.asyncStorageKeys.lastSelectedUserRole,
      );
    } catch (error) {
      console.log(error.message);
    }
    return userRole;
  };

  chooseNavigation = async () => {
    let lastSelectedUserRole = '';
    await this.lastSelectedUserRoleFromAsyncStorage().then(result => {
      if (result) {
        lastSelectedUserRole = result;
      }
    });
    if (lastSelectedUserRole && lastSelectedUserRole === AppConstants.agent) {
      Actions.agent();
    } else if (
      lastSelectedUserRole &&
      lastSelectedUserRole === AppConstants.endUser
    ) {
      Actions.user();
    } else {
      Actions.selectRole();
    }
  };

  doSelectRole() {
    if (Account.isAgent()) {
      this.openNavigation('selectRole');
    } else {
      this.openNavigation('home');
    }
  }

  renderAppIntro(key, data) {
    Account.isFirstOpen(key).then(status => {
      if (status) {
        Actions.appIntro({
          featureList: data,
        });
      }
    });
  }

  renderIntro(key, data, page, openAlways = false) {
    if (openAlways) {
      Actions.featureIntroLightBox({
        featureList: data,
        pageTitle: page,
      });
    } else {
      Account.isFirstOpen(key).then(status => {
        if (status) {
          Actions.featureIntroLightBox({
            featureList: data,
            pageTitle: page,
          });
        }
      });
    }
  }

  render() {
    return (
      <View style={AppStyles.container}>
        <Router sceneStyle={{}} backAndroidHandler={() => this.onAndroidBack()}>
          <Lightbox>
            <Stack
              key="root"
              hideNavBar
              rightButtonTextStyle={AppStyles.navBarRightTextButton}>
              <Scene
                key="loading"
                on={this.connect}
                type="reset"
                component={SplashScreen}
                success={this.doCheck.bind(this)}
                hideNavBar={true}
                navigationBarStyle={AppStyles.navbarTransparent}
                initial
              />
              <Scene
                key="appIntro"
                component={AppIntro}
                hideNavBar={true}
                onComplete={() => Actions.login()}
              />
              <Scene
                key="login"
                type="replace"
                component={Login}
                sendOTP={Account.sendVerificationCode}
                hideNavBar={true}
                viewVerifyOTP={data => Actions.verifyOTP(data)}
              />
              <Scene
                key="verifyOTP"
                component={VerifyOTP}
                login={this.doAuth.bind(this)}
                hideNavBar={true}
                onBack={() => Actions.pop()}
              />
              <Scene
                key="selectRole"
                component={RoleSelection}
                hideNavBar={false}
                type="replace"
                back={false}
                renderTitle={
                  <NavBarTitlePadding title={AppStrings.selectRole} />
                }
                renderBackButton={() => <View />}
                navigationBarStyle={AppStyles.navbar}
                onSelectAgent={() => Actions.agent()}
                onSelectUser={() => Actions.user()}
                onBack={() => Actions.pop()}
              />
              <Scene
                key="editProfile"
                type="replace"
                component={Profile}
                back={false}
                hideNavBar={false}
                renderTitle={<NavBarTitlePadding title={AppStrings.profile} />}
                navigationBarStyle={AppStyles.navbar}
                renderHome={this.doSelectRole.bind(this)}
              />
              <Scene
                key="webViewPage"
                component={WebViewPage}
                hideNavBar={false}
                back={true}
                renderBackButton={() => (
                  <BackButton onBack={() => Actions.pop()} />
                )}
                navigationBarStyle={AppStyles.navbar}
                onBack={() => Actions.pop()}
              />
              <Stack
                key="user"
                hideNavBar
                rightButtonTextStyle={AppStyles.navBarRightTextButton}
                type="replace">
                <Drawer
                  drawerIcon={<DrawerIcon />}
                  hideDrawerButton={true}
                  contentComponent={DrawerContent}>
                  <Scene
                    key="home"
                    component={Home}
                    hideNavBar={false}
                    renderLeftButton={<DrawerIcon />}
                    renderTitle={<NavBarImage />}
                    // renderRightButton={
                    //   <NavbarRightIcons
                    //     viewActive={() => Actions.activePromosList()}
                    //     viewNotification={() => Actions.notification()}
                    //   />
                    // }
                    navigationBarStyle={AppStyles.navbar}
                    tabBarLabel="Home"
                    icon={TabIcon}
                    title={AppStrings.appName}
                    renderAppIntro={() =>
                      this.renderIntro(
                        AppConstants.customerIntroKey,
                        AppConstants.customerIntro,
                      )
                    }
                    viewDispenseRequest={() => Actions.dispenseRequest()}
                    renderActivePromoList={() => Actions.activePromosList()}
                    viewPromotionsDetails={data =>
                      Actions.promotionDetails(data)
                    }
                    viewValuePromotionDetails={data =>
                      Actions.valuePromotionDetails(data)
                    }
                    viewMaterialPromotionDetails={data =>
                      Actions.materialPromotionDetails(data)
                    }
                    viewPurchaseFuelPromotionDetails={data =>
                      Actions.purchaseFuelPromoDetails(data)
                    }
                    viewRatingSBU={data => Actions.ratingSBU(data)}
                    viewRatingPromo={data => Actions.ratingPromo(data)}
                    renderMyCan={data => Actions.myCan(data)}
                    renderMyVehicles={data => Actions.myVehicles(data)}
                    renderMyMileage={data => Actions.myMileage(data)}
                    renderMyInvoices={data => Actions.myInvoices(data)}
                    renderAddFuel={data => Actions.addFuel(data)}
                    renderMemberships={data => Actions.memberships(data)}
                    renderMyRewards={data => Actions.myRewards(data)}
                    renderOffers={data => Actions.offers(data)}
                    renderQRScan={data => Actions.qrCodeReader(data)}
                    renderTransferFP={data => Actions.transfer(data)}
                    renderPendingDR={data => Actions.dr(data)}
                    viewActive={() => Actions.activePromosList()}
                    viewNotification={() => Actions.notification()}
                    viewFilterList={data => Actions.listLightBox(data)}
                    renderFuelStations={data => Actions.fuelStations(data)}
                    viewAddFP={data => Actions.addFP(data)}
                    openPaymentRecept={data =>
                      Actions.valuePromotionPaymentReceipt(data)
                    }
                  />
                </Drawer>
                <Scene
                  key="dr"
                  component={PendingDR}
                  hideNavBar={false}
                  back={true}
                  renderBackButton={() => (
                    <BackButton onBack={() => Actions.pop()} />
                  )}
                  renderTitle={<NavBarTitle title={AppStrings.dr} />}
                  navigationBarStyle={AppStyles.navbar}
                  renderPendingDRDetails={data =>
                    Actions.pendingDRDetails(data)
                  }
                  tabBarLabel="DR"
                  title="DR"
                  icon={TabIcon}
                />
                <Scene
                  key="myCan"
                  component={MyCan}
                  hideNavBar={false}
                  back={true}
                  renderBackButton={() => (
                    <BackButton onBack={() => Actions.pop()} />
                  )}
                  renderTitle={<NavBarTitle title={AppStrings.myCan} />}
                  navigationBarStyle={AppStyles.navbar}
                  tabBarLabel={AppStrings.myCan}
                  title={AppStrings.myCan}
                  icon={TabIcon}
                  viewPromotionsHome={() => Actions.promotionsHome()}
                  viewCanTransactionsDetails={data => Actions.canDetails(data)}
                  viewDispenseRequest={data => Actions.dispenseRequest(data)}
                  renderAddFuel={data => Actions.addFuel(data)}
                  renderTransferToVehicleCan={data =>
                    Actions.transferToVehicleCan(data)
                  }
                  viewAddFP={data => Actions.addFP(data)}
                  openPaymentRecept={data =>
                    Actions.valuePromotionPaymentReceipt(data)
                  }
                />
                <Scene
                  key="transfer"
                  component={Transfer}
                  hideNavBar={false}
                  back={true}
                  renderBackButton={() => (
                    <BackButton onBack={() => Actions.pop()} />
                  )}
                  renderTitle={<NavBarTitle title={AppStrings.transferFP} />}
                  navigationBarStyle={AppStyles.navbar}
                  tabBarLabel={AppStrings.transfer}
                  title={AppStrings.transfer}
                  icon={TabIcon}
                  renderTransferDetailsReceipt={data =>
                    Actions.transferDetailsReceipt(data)
                  }
                  renderCanList={data => Actions.canListLightBox(data)}
                  renderContacts={data => Actions.contacts(data)}
                  renderIntro={() =>
                    this.renderIntro(
                      AppConstants.transferIntroKey,
                      AppConstants.transferIntro,
                      AppConstants.transferIntroTitle,
                    )
                  }
                  onClickInfoButton={() =>
                    this.renderIntro(
                      AppConstants.transferIntroKey,
                      AppConstants.transferIntro,
                      AppConstants.transferIntroTitle,
                      true,
                    )
                  }
                  onBack={() => Actions.pop()}
                />
                <Scene
                  key="donate"
                  component={DonateFuelPoints}
                  hideNavBar={false}
                  back={true}
                  renderBackButton={() => (
                    <BackButton onBack={() => Actions.pop()} />
                  )}
                  renderTitle={<NavBarTitle title={AppStrings.donate} />}
                  navigationBarStyle={AppStyles.navbar}
                  tabBarLabel={AppStrings.donateTitle}
                  title={AppStrings.donateTitle}
                  icon={TabIcon}
                  renderTransferDetailsReceipt={data =>
                    Actions.transferDetailsReceipt(data)
                  }
                  renderCanList={data => Actions.canListLightBox(data)}
                  renderContacts={data => Actions.corporates(data)}
                  renderIntro={() =>
                    this.renderIntro(
                      AppConstants.donateIntroKey,
                      AppConstants.donateIntro,
                      AppConstants.donateIntroTitle,
                    )
                  }
                  onClickInfoButton={() =>
                    this.renderIntro(
                      AppConstants.donateIntroKey,
                      AppConstants.donateIntro,
                      AppConstants.donateIntroTitle,
                      true,
                    )
                  }
                  onBack={() => Actions.pop()}
                />
                <Scene
                  key="aboutOleum"
                  component={AboutOleum}
                  hideNavBar={false}
                  back={true}
                  renderBackButton={() => (
                    <BackButton onBack={() => Actions.pop()} />
                  )}
                  renderTitle={<NavBarTitle title={AppStrings.aboutOleum} />}
                  navigationBarStyle={AppStyles.navbar}
                  onBack={() => Actions.pop()}
                />
                <Scene
                  key="notification"
                  component={Notification}
                  hideNavBar={false}
                  back={true}
                  renderBackButton={() => (
                    <BackButton onBack={() => Actions.pop()} />
                  )}
                  renderTitle={<NavBarTitle title={AppStrings.notification} />}
                  navigationBarStyle={AppStyles.navbar}
                  onBack={() => Actions.pop()}
                />
                <Scene
                  key="activePromosList"
                  component={ActivePromosList}
                  hideNavBar={false}
                  back={true}
                  renderBackButton={() => (
                    <BackButton onBack={() => Actions.pop()} />
                  )}
                  renderTitle={
                    <NavBarTitle title={AppStrings.activePromosList} />
                  }
                  navigationBarStyle={AppStyles.navbar}
                  onBack={() => Actions.pop()}
                  viewPromotionsDetails={data => Actions.promotionDetails(data)}
                  viewValuePromotionDetails={data =>
                    Actions.valuePromotionDetails(data)
                  }
                  viewMaterialPromotionDetails={data =>
                    Actions.materialPromotionDetails(data)
                  }
                  viewPurchaseFuelPromotionDetails={data =>
                    Actions.purchaseFuelPromoDetails(data)
                  }
                />
                <Scene
                  key="dispenseRequest"
                  component={DispenseRequest}
                  hideNavBar={false}
                  back={true}
                  renderLeftButton={<DrawerIcon />}
                  renderBackButton={() => (
                    <BackButton onBack={() => Actions.pop()} />
                  )}
                  renderTitle={
                    <NavBarTitle title={AppStrings.dispenseRequest} />
                  }
                  navigationBarStyle={AppStyles.navbar}
                  onBack={() => Actions.pop()}
                  onRightPressed={data => Actions.drSummary(data)}
                  renderCanList={data => Actions.canListLightBox(data)}
                  renderList={data => Actions.listLightBox(data)}
                  renderVehicleList={data => Actions.vehicleListLightBox(data)}
                  renderSelectLocation={data => Actions.selectLocation(data)}
                  renderIntro={() =>
                    this.renderIntro(
                      AppConstants.drIntroKey,
                      AppConstants.dispenseRequestIntro,
                      AppConstants.drIntroTitle,
                    )
                  }
                  onClickInfoButton={() =>
                    this.renderIntro(
                      AppConstants.drIntroKey,
                      AppConstants.dispenseRequestIntro,
                      AppConstants.drIntroTitle,
                      true,
                    )
                  }
                />
                <Scene
                  key="drSummary"
                  component={DrSummary}
                  hideNavBar={false}
                  back={true}
                  renderLeftButton={<DrawerIcon />}
                  renderBackButton={() => (
                    <BackButton onBack={() => Actions.pop()} />
                  )}
                  renderTitle={<NavBarTitle title={AppStrings.drSummary} />}
                  renderReceipt={data => Actions.drReceipt(data)}
                  navigationBarStyle={AppStyles.navbar}
                  onBack={() => Actions.pop()}
                />
                <Scene
                  key="drReceipt"
                  component={DrReceipt}
                  hideNavBar={false}
                  back={false}
                  renderBackButton={() => <View />}
                  panHandlers={null}
                  renderTitle={
                    <NavBarTitle
                      title={AppStrings.drReceipt}
                      isTitleOnly={true}
                    />
                  }
                  navigationBarStyle={AppStyles.navbar}
                  renderHome={() => Actions.home()}
                />
                <Scene
                  key="myLocations"
                  component={MyLocations}
                  hideNavBar={false}
                  back={true}
                  renderBackButton={() => (
                    <BackButton onBack={() => Actions.pop()} />
                  )}
                  renderTitle={<NavBarTitle title={AppStrings.myLocations} />}
                  navigationBarStyle={AppStyles.navbar}
                  onBack={() => Actions.pop()}
                />
                <Scene
                  key="selectLocation"
                  component={SelectLocation}
                  hideNavBar={false}
                  back={true}
                  renderBackButton={() => (
                    <BackButton onBack={() => Actions.pop()} />
                  )}
                  renderTitle={
                    <NavBarTitle title={AppStrings.selectLocation} />
                  }
                  navigationBarStyle={AppStyles.navbar}
                  onBack={() => Actions.pop()}
                />
                <Scene
                  key="pendingDRDetails"
                  component={PendingDRDetails}
                  hideNavBar={false}
                  back={true}
                  renderBackButton={() => (
                    <BackButton onBack={() => Actions.pop()} />
                  )}
                  panHandlers={null}
                  navigationBarStyle={AppStyles.navbar}
                  renderTitle={
                    <NavBarTitle
                      title={AppStrings.drDetails}
                      isTitleOnly={true}
                    />
                  }
                  renderROList={data => Actions.roList(data)}
                />
                <Scene
                  key="myTransferHistory"
                  component={MyTransferHistory}
                  hideNavBar={false}
                  back={true}
                  renderLeftButton={<DrawerIcon />}
                  renderBackButton={() => (
                    <BackButton onBack={() => Actions.pop()} />
                  )}
                  renderTitle={
                    <NavBarTitle title={AppStrings.transferDetails} />
                  }
                  navigationBarStyle={AppStyles.navbar}
                  onBack={() => Actions.pop()}
                  renderTransferHistoryDetails={data =>
                    Actions.myTransferHistoryDetails(data)
                  }
                />
                <Scene
                  key="transferDetailsReceipt"
                  component={TransferDetailsReceipt}
                  hideNavBar={false}
                  renderBackButton={() => <View />}
                  renderTitle={
                    <NavBarTitle title={AppStrings.transferDetailsReceipt} />
                  }
                  navigationBarStyle={AppStyles.navbar}
                  onBack={() => Actions.pop()}
                  renderHome={() => Actions.home()}
                />
                <Scene
                  key="myDispensationsHistory"
                  component={MyDispensationsHistory}
                  hideNavBar={false}
                  back={true}
                  renderBackButton={() => (
                    <BackButton onBack={() => Actions.pop()} />
                  )}
                  renderTitle={
                    <NavBarTitle title={AppStrings.myDispensationsHistory} />
                  }
                  navigationBarStyle={AppStyles.navbar}
                  onBack={() => Actions.pop()}
                  renderDispensationsHistoryDetails={data =>
                    Actions.myDispensationsHistoryDetails(data)
                  }
                />
                <Scene
                  key="myDispensationsHistoryDetails"
                  component={MyDispensationsHistoryDetails}
                  hideNavBar={false}
                  back={true}
                  renderBackButton={() => (
                    <BackButton onBack={() => Actions.pop()} />
                  )}
                  renderTitle={
                    <NavBarTitle
                      title={AppStrings.myDispensationsHistoryDetails}
                    />
                  }
                  navigationBarStyle={AppStyles.navbar}
                  onBack={() => Actions.pop()}
                />
                <Scene
                  key="myDonations"
                  component={MyDonations}
                  hideNavBar={false}
                  back={true}
                  renderBackButton={() => (
                    <BackButton onBack={() => Actions.pop()} />
                  )}
                  renderTitle={<NavBarTitle title={AppStrings.myDonations} />}
                  navigationBarStyle={AppStyles.navbar}
                  onBack={() => Actions.pop()}
                />
                <Scene
                  key="allTransactions"
                  component={AllTransactions}
                  hideNavBar={false}
                  back={true}
                  renderBackButton={() => (
                    <BackButton onBack={() => Actions.pop()} />
                  )}
                  renderTitle={
                    <NavBarTitle title={AppStrings.allTransactions} />
                  }
                  navigationBarStyle={AppStyles.navbar}
                  onBack={() => Actions.pop()}
                />
                <Scene
                  key="myTransferHistoryDetails"
                  component={MyTransferHistoryDetails}
                  hideNavBar={false}
                  back={true}
                  renderBackButton={() => (
                    <BackButton onBack={() => Actions.pop()} />
                  )}
                  renderTitle={
                    <NavBarTitle title={AppStrings.myTransferHistoryDetails} />
                  }
                  navigationBarStyle={AppStyles.navbar}
                  onBack={() => Actions.pop()}
                />
                <Scene
                  key="promotionDetails"
                  component={PromotionDetails}
                  hideNavBar={false}
                  back={true}
                  renderBackButton={() => (
                    <BackButton onBack={() => Actions.pop()} />
                  )}
                  renderTitle={
                    <NavBarTitle title={AppStrings.promotionDetails} />
                  }
                  navigationBarStyle={AppStyles.navbar}
                  onBack={() => Actions.pop()}
                  renderWebPage={pageName => Actions.webViewPage(pageName)}
                  renderVideoPlayer={url => Actions.videoPlayer(url)}
                  renderIntro={() =>
                    this.renderIntro(
                      AppConstants.actionPromoIntroKey,
                      AppConstants.actionPromoIntro,
                      AppConstants.actionPromoIntroTitle,
                    )
                  }
                  onClickInfoButton={() =>
                    this.renderIntro(
                      AppConstants.actionPromoIntroKey,
                      AppConstants.actionPromoIntro,
                      AppConstants.actionPromoIntroTitle,
                      true,
                    )
                  }
                />
                <Scene
                  key="promoRatingList"
                  component={PromoRatingList}
                  hideNavBar={false}
                  back={true}
                  renderBackButton={() => (
                    <BackButton onBack={() => Actions.pop()} />
                  )}
                  renderTitle={
                    <NavBarTitle title={AppStrings.promoRatingList} />
                  }
                  navigationBarStyle={AppStyles.navbar}
                  onBack={() => Actions.pop()}
                />
                <Scene
                  key="materialPromotionDetails"
                  component={MaterialPromotionDetails}
                  hideNavBar={false}
                  back={true}
                  renderBackButton={() => (
                    <BackButton onBack={() => Actions.pop()} />
                  )}
                  renderTitle={
                    <NavBarTitle title={AppStrings.materialPromotionDetails} />
                  }
                  navigationBarStyle={AppStyles.navbar}
                  renderDepositRequestReceipt={data =>
                    Actions.depositRequestReceipt(data)
                  }
                  viewRatingSBU={data => Actions.ratingSBU(data)}
                  renderIntro={() =>
                    this.renderIntro(
                      AppConstants.materialPromoIntroKey,
                      AppConstants.materialPromoIntro,
                      AppConstants.materialPromoIntroTitle,
                    )
                  }
                  onClickInfoButton={() =>
                    this.renderIntro(
                      AppConstants.materialPromoIntroKey,
                      AppConstants.materialPromoIntro,
                      AppConstants.materialPromoIntroTitle,
                      true,
                    )
                  }
                  onBack={() => Actions.pop()}
                />
                <Scene
                  key="purchaseFuelPromoDetails"
                  component={PurchaseFuelPromoDetails}
                  hideNavBar={false}
                  back={true}
                  renderBackButton={() => (
                    <BackButton onBack={() => Actions.pop()} />
                  )}
                  renderTitle={<NavBarTitle title={'Promotion Details'} />}
                  navigationBarStyle={AppStyles.navbar}
                  renderPaymentDetails={data =>
                    Actions.valuePromotionPaymentDetails(data)
                  }
                  renderIntro={() =>
                    this.renderIntro(
                      AppConstants.purchaseFuelIntroKey,
                      AppConstants.purchaseFuelPromoIntro,
                      AppConstants.purchaseFuelIntroTitle,
                    )
                  }
                  onClickInfoButton={() =>
                    this.renderIntro(
                      AppConstants.purchaseFuelIntroKey,
                      AppConstants.purchaseFuelPromoIntro,
                      AppConstants.purchaseFuelIntroTitle,
                      true,
                    )
                  }
                  onBack={() => Actions.pop()}
                  renderVehicleList={data => Actions.vehicleListLightBox(data)}
                  openPaymentRecept={data =>
                    Actions.valuePromotionPaymentReceipt(data)
                  }
                />
                <Scene
                  key="myRewardsHistory"
                  component={MyRewardsHistory}
                  hideNavBar={false}
                  back={true}
                  renderBackButton={() => (
                    <BackButton onBack={() => Actions.pop()} />
                  )}
                  renderTitle={
                    <NavBarTitle title={AppStrings.promotionsAndRewards} />
                  }
                  navigationBarStyle={AppStyles.navbar}
                />
                <Scene
                  key="myPurchaseHistory"
                  component={MyPurchaseHistory}
                  hideNavBar={false}
                  back={true}
                  renderBackButton={() => (
                    <BackButton onBack={() => Actions.pop()} />
                  )}
                  renderTitle={
                    <NavBarTitle title={AppStrings.myPurchaseHistory} />
                  }
                  navigationBarStyle={AppStyles.navbar}
                />
                <Scene
                  key="depositRequestReceipt"
                  component={DepositRequestReceipt}
                  hideNavBar={false}
                  back={false}
                  renderBackButton={() => <View />}
                  renderTitle={
                    <NavBarTitle title={AppStrings.depositRequestReceipt} />
                  }
                  navigationBarStyle={AppStyles.navbar}
                  renderViewHome={() => Actions.home()}
                  onBack={() => Actions.pop()}
                />
                <Scene
                  key="profile"
                  component={Profile}
                  hideNavBar={false}
                  back={true}
                  renderTitle={<NavBarTitle title={AppStrings.profile} />}
                  renderBackButton={() => (
                    <BackButton onBack={() => Actions.pop()} />
                  )}
                  navigationBarStyle={AppStyles.navbar}
                  onBack={() => Actions.pop()}
                  renderHome={() => Actions.home()}
                />
                <Scene
                  key="valuePromotionDetails"
                  component={ValuePromotionDetails}
                  hideNavBar={false}
                  back={true}
                  renderBackButton={() => (
                    <BackButton onBack={() => Actions.pop()} />
                  )}
                  renderTitle={
                    <NavBarTitle title={AppStrings.promotionDetails} />
                  }
                  navigationBarStyle={AppStyles.navbar}
                  onBack={() => Actions.pop()}
                  renderValuePromoReceipt={() => Actions.valuePromoReceipt()}
                  renderIntro={() =>
                    this.renderIntro(
                      AppConstants.valuePromoIntroKey,
                      AppConstants.valuePromoIntro,
                      AppConstants.valuePromoIntroTitle,
                    )
                  }
                  onClickInfoButton={() =>
                    this.renderIntro(
                      AppConstants.valuePromoIntroKey,
                      AppConstants.valuePromoIntro,
                      AppConstants.valuePromoIntroTitle,
                      true,
                    )
                  }
                />
                <Scene
                  key="valuePromoReceipt"
                  component={ValuePromoReceipt}
                  hideNavBar={false}
                  back={false}
                  renderBackButton={() => <View />}
                  renderTitle={<NavBarTitle title={'Receipt'} />}
                  navigationBarStyle={AppStyles.navbar}
                  renderHome={() => Actions.home()}
                  onBack={() => Actions.pop()}
                />
                <Scene
                  key="valuePromotionPaymentDetails"
                  component={ValuePromotionPaymentDetails}
                  hideNavBar={false}
                  back={true}
                  renderBackButton={() => (
                    <BackButton onBack={() => Actions.pop()} />
                  )}
                  renderTitle={
                    <NavBarTitle title={AppStrings.paymentDetails} />
                  }
                  navigationBarStyle={AppStyles.navbar}
                  onBack={() => Actions.pop()}
                  openPaymentRecept={data =>
                    Actions.valuePromotionPaymentReceipt(data)
                  }
                  renderVehicleList={data => Actions.vehicleListLightBox(data)}
                />
                <Scene
                  key="valuePromotionPaymentReceipt"
                  component={ValuePromotionPaymentReceipt}
                  hideNavBar={false}
                  back={false}
                  renderBackButton={() => <View />}
                  renderTitle={<NavBarTitle title={'Receipt'} />}
                  navigationBarStyle={AppStyles.navbar}
                  onBack={() => Actions.pop()}
                  renderHome={() => Actions.home()}
                />
                <Scene
                  key="roList"
                  component={ROList}
                  hideNavBar={false}
                  back={true}
                  renderBackButton={() => (
                    <BackButton onBack={() => Actions.pop()} />
                  )}
                  renderRightButton={<NavbarRightIcons />}
                  renderTitle={<NavBarTitle title={AppStrings.outlets} />}
                  navigationBarStyle={AppStyles.navbar}
                  onBack={() => Actions.pop()}
                  viewFilterList={data => Actions.listLightBox(data)}
                />
                <Scene
                  key="canDetails"
                  component={CanDetails}
                  hideNavBar={false}
                  back={true}
                  renderBackButton={() => (
                    <BackButton onBack={() => Actions.pop()} />
                  )}
                  renderTitle={
                    <NavBarTitle title={AppStrings.transactiondetails} />
                  }
                  navigationBarStyle={AppStyles.navbar}
                  onBack={() => Actions.pop()}
                />
                <Scene
                  key="sbuRatingList"
                  component={SbuRatingList}
                  hideNavBar={false}
                  back={true}
                  renderBackButton={() => (
                    <BackButton onBack={() => Actions.pop()} />
                  )}
                  renderTitle={<NavBarTitle title={AppStrings.sbuRatingList} />}
                  navigationBarStyle={AppStyles.navbar}
                  onBack={() => Actions.pop()}
                />
                <Scene
                  key="myVehicles"
                  component={MyVehicles}
                  hideNavBar={false}
                  back={true}
                  renderBackButton={() => (
                    <BackButton onBack={() => Actions.pop()} />
                  )}
                  renderTitle={<NavBarTitle title={'My Vehicles'} />}
                  navigationBarStyle={AppStyles.navbar}
                  onBack={() => Actions.pop()}
                  renderAddVehicle={(data, edit = false) => {
                    Actions.addVehicle({ data: data, edit: edit });
                  }}
                />
                <Scene
                  key="addVehicle"
                  component={AddVehicle}
                  hideNavBar={false}
                  back={true}
                  renderBackButton={() => (
                    <BackButton onBack={() => Actions.pop()} />
                  )}
                  renderTitle={<NavBarTitle title={'Add Vehicle'} />}
                  renderList={data => Actions.listLightBox(data)}
                  navigationBarStyle={AppStyles.navbar}
                  onBack={() => Actions.pop()}
                />
                <Scene
                  key="myMileage"
                  component={MyMileage}
                  hideNavBar={false}
                  back={true}
                  renderBackButton={() => (
                    <BackButton onBack={() => Actions.pop()} />
                  )}
                  renderTitle={<NavBarTitle title={'My Mileage'} />}
                  navigationBarStyle={AppStyles.navbar}
                  onBack={() => Actions.pop()}
                  renderList={data => Actions.listLightBox(data)}
                />
                <Scene
                  key="myInvoices"
                  component={MyInvoices}
                  hideNavBar={false}
                  back={true}
                  renderBackButton={() => (
                    <BackButton onBack={() => Actions.pop()} />
                  )}
                  renderTitle={<NavBarTitle title={'My Invoices'} />}
                  renderInvoiceDetails={data => Actions.invoiceDetails(data)}
                  renderList={data => Actions.listLightBox(data)}
                  navigationBarStyle={AppStyles.navbar}
                  onBack={() => Actions.pop()}
                />
                <Scene
                  key="invoiceDetails"
                  component={InvoiceDetails}
                  hideNavBar={false}
                  back={true}
                  renderBackButton={() => (
                    <BackButton onBack={() => Actions.pop()} />
                  )}
                  renderAddInvoice={data => Actions.addInvoice(data)}
                  renderMyInvoices={() => Actions.popTo('myInvoices')}
                  renderTitle={<NavBarTitle title={'Invoice Details'} />}
                  navigationBarStyle={AppStyles.navbar}
                  onBack={() => Actions.pop()}
                />
                <Scene
                  key="addInvoice"
                  component={AddInvoice}
                  hideNavBar={false}
                  back={true}
                  renderBackButton={() => (
                    <BackButton onBack={() => Actions.pop()} />
                  )}
                  renderTitle={<NavBarTitle title={'Add Invoice'} />}
                  renderList={data => Actions.listLightBox(data)}
                  renderROSearch={data => Actions.roSearch(data)}
                  navigationBarStyle={AppStyles.navbar}
                  onBack={() => Actions.pop()}
                />
                <Scene
                  key="addFuel"
                  component={AddFuel}
                  hideNavBar={false}
                  back={true}
                  renderBackButton={() => (
                    <BackButton onBack={() => Actions.pop()} />
                  )}
                  renderTitle={<NavBarTitle title={'Buy Fuel'} />}
                  navigationBarStyle={AppStyles.navbar}
                  viewPurchaseFuelPromotionDetails={data =>
                    Actions.purchaseFuelPromoDetails(data)
                  }
                  onBack={() => Actions.pop()}
                />
                <Scene
                  key="memberships"
                  component={Memberships}
                  hideNavBar={false}
                  back={true}
                  renderBackButton={() => (
                    <BackButton onBack={() => Actions.pop()} />
                  )}
                  renderTitle={<NavBarTitle title={'Memberships'} />}
                  navigationBarStyle={AppStyles.navbar}
                  onBack={() => Actions.pop()}
                />
                <Scene
                  key="offers"
                  component={Offers}
                  hideNavBar={false}
                  back={true}
                  renderBackButton={() => (
                    <BackButton onBack={() => Actions.pop()} />
                  )}
                  renderTitle={<NavBarTitle title={'Offers'} />}
                  navigationBarStyle={AppStyles.navbar}
                  viewPromotionsDetails={data => Actions.promotionDetails(data)}
                  viewValuePromotionDetails={data =>
                    Actions.valuePromotionDetails(data)
                  }
                  viewMaterialPromotionDetails={data =>
                    Actions.materialPromotionDetails(data)
                  }
                  viewPurchaseFuelPromotionDetails={data =>
                    Actions.purchaseFuelPromoDetails(data)
                  }
                  onBack={() => Actions.pop()}
                  viewFilterList={data => Actions.listLightBox(data)}
                  viewActive={() => Actions.activePromosList()}
                  viewRatingPromo={data => Actions.ratingPromo(data)}
                />
                <Scene
                  key="myRewards"
                  component={MyRewards}
                  hideNavBar={false}
                  back={true}
                  renderBackButton={() => (
                    <BackButton onBack={() => Actions.pop()} />
                  )}
                  renderTitle={<NavBarTitle title={'My Rewards'} />}
                  navigationBarStyle={AppStyles.navbar}
                  onBack={() => Actions.pop()}
                />
                <Scene
                  key="fuelStations"
                  component={FuelStations}
                  hideNavBar={false}
                  back={true}
                  renderBackButton={() => (
                    <BackButton onBack={() => Actions.pop()} />
                  )}
                  renderTitle={<NavBarTitle title={'Fuel Stations'} />}
                  navigationBarStyle={AppStyles.navbar}
                  onBack={() => Actions.pop()}
                />
                <Scene
                  key="roSearch"
                  component={ROSearch}
                  onBack={() => Actions.pop()}
                />
                <Scene
                  key="transferToVehicleCan"
                  component={TransferToVehicleCan}
                  hideNavBar={false}
                  back={true}
                  renderBackButton={() => (
                    <BackButton onBack={() => Actions.pop()} />
                  )}
                  renderTitle={<NavBarTitle title={AppStrings.transferFP} />}
                  navigationBarStyle={AppStyles.navbar}
                  renderCanList={data => Actions.canListLightBox(data)}
                  renderVehicleList={data => Actions.vehicleListLightBox(data)}
                  renderContacts={data => Actions.contacts(data)}
                  renderIntro={() =>
                    this.renderIntro(
                      AppConstants.transferIntroKey,
                      AppConstants.transferIntro,
                      AppConstants.transferIntroTitle,
                    )
                  }
                  onClickInfoButton={() =>
                    this.renderIntro(
                      AppConstants.transferIntroKey,
                      AppConstants.transferIntro,
                      AppConstants.transferIntroTitle,
                      true,
                    )
                  }
                  onBack={() => Actions.pop()}
                  renderTransferDetailsReceipt={data =>
                    Actions.transferDetailsReceipt(data)
                  }
                />
              </Stack>
              <Stack
                key="agent"
                type="replace"
                hideNavBar
                rightButtonTextStyle={AppStyles.navBarRightTextButton}>
                <Drawer
                  drawerIcon={<DrawerIcon />}
                  hideDrawerButton={true}
                  contentComponent={DrawerContent}>
                  <Stack>
                    <Scene
                      key="agentHome"
                      component={AgentHome}
                      hideNavBar={false}
                      back={true}
                      renderLeftButton={<DrawerIcon />}
                      renderBackButton={() => <DrawerIcon />}
                      renderTitle={<NavBarTitle title={AppStrings.agentHome} />}
                      navigationBarStyle={AppStyles.navbar}
                      onBack={() => Actions.pop()}
                      renderAppIntro={() =>
                        this.renderIntro(
                          AppConstants.agentIntroKey,
                          AppConstants.agentIntro,
                          AppConstants.agentIntroTitle,
                        )
                      }
                      onClickInfoButton={() =>
                        this.renderIntro(
                          AppConstants.agentIntroKey,
                          AppConstants.agentIntro,
                          AppConstants.agentIntroTitle,
                          true,
                        )
                      }
                      viewNotifications={() => Actions.agentNotifications()} 
                      renderAgentRequestDetails={data =>
                        Actions.agentRequestDetails(data)
                      }
                      renderQRScan={data => Actions.qrCodeReader(data)}
                      renderNewDispensation={data =>
                        Actions.newDispensation(data)
                      }
                      renderPriceUpdate={data => Actions.fuelPriceUpdate(data)}
                    />
                    <Scene
                      key="agentProfile"
                      component={AgentProfile}
                      hideNavBar={false}
                      back={true}
                      renderTitle={<NavBarTitle title={AppStrings.profile} />}
                      renderBackButton={() => (
                        <BackButton onBack={() => Actions.pop()} />
                      )}
                      navigationBarStyle={AppStyles.navbar}
                      onBack={() => Actions.pop()}
                      renderViewAgentHome={() => Actions.agentHome()}
                    />
                    <Scene
                      key="agentReceipt"
                      component={AgentReceipt}
                      hideNavBar={false}
                      back={false}
                      type="replace"
                      renderBackButton={() => <View />}
                      renderTitle={
                        <NavBarTitle title={AppStrings.agentReceipt} />
                      }
                      navigationBarStyle={AppStyles.navbar}
                      renderAgentHome={() =>
                        Actions.agentHome({
                          type: 'reset',
                        })
                      }
                      onBack={() => Actions.pop()}
                    />
                    <Scene
                      key="agentRequestDetails"
                      component={AgentRequestDetails}
                      hideNavBar={false}
                      back={true}
                      renderBackButton={() => (
                        <BackButton onBack={() => Actions.pop()} />
                      )}
                      renderTitle={
                        <NavBarTitle title={AppStrings.agentRequestDetails} />
                      }
                      navigationBarStyle={AppStyles.navbar}
                      onBack={() => Actions.pop()}
                      renderDispenseConfirmation={data =>
                        Actions.dispenseConfirmationLightBox(data)
                      }
                      renderDispenseRecord={data =>
                        Actions.dispenseRecord(data)
                      }
                      renderAgentReceipt={data => Actions.agentReceipt(data)}
                      renderAgentHome={() =>
                        Actions.agentHome({
                          type: 'reset',
                        })
                      }
                    />
                    <Scene
                      key="agentDispensationHistory"
                      component={AgentDispensationHistory}
                      hideNavBar={false}
                      back={true}
                      renderBackButton={() => (
                        <BackButton onBack={() => Actions.pop()} />
                      )}
                      renderTitle={
                        <NavBarTitle
                          title={AppStrings.agentDispensationHistory}
                        />
                      }
                      navigationBarStyle={AppStyles.navbar}
                      onBack={() => Actions.pop()}
                    />
                    <Scene
                      key="agentNotifications"
                      component={Notification}
                      hideNavBar={false}
                      back={true}
                      renderBackButton={() => (
                        <BackButton onBack={() => Actions.pop()} />
                      )}
                      renderTitle={
                        <NavBarTitle title={AppStrings.notification} />
                      }
                      navigationBarStyle={AppStyles.navbar}
                      onBack={() => Actions.pop()}
                    />
                    <Scene
                      key="newDispensation"
                      component={NewDispensation}
                      hideNavBar={false}
                      back={true}
                      renderBackButton={() => (
                        <BackButton onBack={() => Actions.pop()} />
                      )}
                      renderTitle={<NavBarTitle title={'New Dispensation'} />}
                      renderList={data => Actions.listLightBox(data)}
                      renderListWithThumbnail={data =>
                        Actions.listWithThumbnail(data)
                      }
                      renderCommunityList={data => Actions.communityList(data)}
                      renderReceipt={data =>
                        Actions.newDispensationReceipt(data)
                      }
                      navigationBarStyle={AppStyles.navbar}
                      onBack={() => Actions.pop()}
                    />
                    <Scene
                      key="communityList"
                      component={CommunityList}
                      hideNavBar={false}
                      back={true}
                      renderBackButton={() => (
                        <BackButton onBack={() => Actions.pop()} />
                      )}
                      renderTitle={<NavBarTitle title={'Community'} />}
                      navigationBarStyle={AppStyles.navbar}
                      onBack={() => Actions.pop()}
                    />
                    <Scene
                      key="fuelPriceUpdate"
                      component={FuelPriceUpdate}
                      hideNavBar={false}
                      back={true}
                      renderBackButton={() => (
                        <BackButton onBack={() => Actions.pop()} />
                      )}
                      renderTitle={<NavBarTitle title={'Update Price'} />}
                      navigationBarStyle={AppStyles.navbar}
                      onBack={() => Actions.pop()}
                    />
                    <Scene
                      key="dispenseRecord"
                      component={DispenseRecord}
                      hideNavBar={false}
                      back={true}
                      renderBackButton={() => (
                        <BackButton onBack={() => Actions.pop()} />
                      )}
                      renderTitle={<NavBarTitle title={'Dispense Details'} />}
                      navigationBarStyle={AppStyles.navbar}
                      renderList={data => Actions.listLightBox(data)}
                      renderAgentReceipt={data => Actions.agentReceipt(data)}
                      onBack={() => Actions.pop()}
                    />
                    <Scene
                      key="newDispensationReceipt"
                      component={NewDispensationReceipt}
                      hideNavBar={false}
                      back={true}
                      renderBackButton={() => <View />}
                      renderTitle={<NavBarTitle title={'Receipt'} />}
                      navigationBarStyle={AppStyles.navbar}
                      renderAgentHome={() =>
                        Actions.agentHome({
                          type: 'reset',
                        })
                      }
                      onBack={() => Actions.pop()}
                    />
                  </Stack>
                </Drawer>
              </Stack>
            </Stack>
            <Scene key="logout" on={Account.logout} success="login" />
            <Scene
              key="canListLightBox"
              component={CanList}
              onBack={() => Actions.pop()}
            />
            <Scene
              key="vehicleListLightBox"
              component={VehicleList}
              onBack={() => Actions.pop()}
            />
            <Scene
              key="dispenseConfirmationLightBox"
              component={DispenseConfirmation}
              onBack={() => Actions.pop()}
            />
            <Scene
              key="featureIntroLightBox"
              component={FeatureIntro}
              onBack={() => Actions.pop()}
            />
            <Scene
              key="listLightBox"
              component={List}
              onBack={() => Actions.pop()}
            />
            <Scene
              key="videoPlayer"
              component={VideoPlayer}
              onBack={() => Actions.pop()}
            />
            <Scene
              key="qrCodeReader"
              component={QRCodeReader}
              onBack={() => Actions.pop()}
            />
            <Scene
              key="contacts"
              component={Contacts}
              on={ContactsStore.reset}
              onBack={() => Actions.pop()}
            />
            <Scene
              key="corporates"
              component={Corporates}
              on={TransferStore.reset}
              onBack={() => Actions.pop()}
            />
            <Scene
              key="ratingSBU"
              component={RatingSBU}
              onBack={() => Actions.pop()}
            />
            <Scene
              key="ratingPromo"
              component={RatingPromo}
              onBack={() => Actions.pop()}
            />
            <Scene
              key="listWithThumbnail"
              component={ListWithThumbnail}
              onBack={() => Actions.pop()}
            />
            <Scene
              key="noConnection"
              component={NoConnection}
              onBack={() => Actions.pop()}
            />
            <Scene
              key="update"
              component={Update}
              onBack={() => Actions.pop()}
            />
            <Scene key="addFP" component={AddFP} onBack={() => Actions.pop()} />
          </Lightbox>
        </Router>
        <FlashMessage
          style={AppStyles.waringBoxStyle}
          textStyle={[AppStyles.regularText]}
        />
      </View>
    );
  }
}
export default Oleum;
