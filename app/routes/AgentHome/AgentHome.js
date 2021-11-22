/**
 * Copyright (c) 2018-present, Oleum. All rights reserved.
 *
 */

'use strict';

import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  StatusBar,
  TouchableHighlight,
  TouchableOpacity,
  Switch,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import {observer} from 'mobx-react';
import {Actions} from 'react-native-router-flux';
import {createIconSetFromFontello} from 'react-native-vector-icons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {showMessage} from 'react-native-flash-message';
import Button from '@components/Button';
import NavBarTitle from '@components/NavBarTitle';
import Loading from '@components/LoadingShadow';
import NoData from '@components/NoData';
import NavBarInfoButton from '@components/NavBarInfoButton';
import {getDateTimeString, isValidVehicleNumber} from '../../lib/utils';
import {AppStrings, AppResources, AppIconFonts, AppConstants } from '@config';
import {AppColors, AppStyles} from '@theme';
import styles from './styles';
import DispenseRequestStore, {DispenseRequest} from '@stores/DispenseRequests';
import Dispensations, {Dispensation} from '@stores/Dispensations';
import AgentPriceIntervalUpdate from '@stores/Agents';
import AccountStore from '@stores/Account';
import Notifications from '@stores/Notifications';
import Products, {SbuProducts} from '@stores/Products';


const Icon = createIconSetFromFontello(AppIconFonts);

@observer
class AgentHome extends Component { 

  constructor(props) {
    super(props);
    this.sbuDetails = AccountStore.profile;
    this.state = {
      referenceId: '',
      vehicleNumber: '',
      renderContent: undefined
    };
    if (this.sbuDetails && this.sbuDetails.sbu) {
      Actions.refresh({
        renderTitle: <NavBarTitle title={this.sbuDetails.sbu.title} />,
      });
    } else {
      Actions.refresh({
        renderTitle: (
          <NavBarTitle
            title={'SBU'}
            subTitle={'Location'}
            showSubtitle={true}
          />
        ),
      });
    }
  }

  componentWillMount() {
    this.props.navigation.setParams({
      right: (
        <View style={styles.navBarRightIconsView}>
          {this.renderNotificationIcon()}
          <NavBarInfoButton onClick={this.props.onClickInfoButton.bind(this)} />
        </View>
      ),
    });
  }

  componentDidMount(){
    Products.load();
    this.setSbuProducts();
  }

  setSbuProducts() {
      if (
        Products.sbuAndProductLinkedList &&
        Products.sbuAndProductLinkedList.length
      ) {
      let sbuProducts = [];
      Products.sbuAndProductLinkedList.forEach(data => {
        let item = new SbuProducts(data, false);
        if (!sbuProducts.find(listItem => listItem.id === item.id)) {
          if (
            item.status === AppConstants.productStatus.deactivated &&
            item.price &&
            item.price.value &&
            item.price.value > 0
          ) {
            item.price.value = 0;
          }
          sbuProducts.push(item);
        }
      });
      let keepGoing = true;
      sbuProducts.length > 0 && sbuProducts.forEach(sbuProduct => {
        if(keepGoing){
          if(this.isProductItemDeactivated(sbuProduct.status)){
            keepGoing = false;
              try{
                AgentPriceIntervalUpdate.addAgentPriceInterval().then(data => { 
                  if(data){
                    this.showPriceUpdateAlert();
                  }  
                })
              }catch(e){   
                console.log(JSON.stringify(e))   
              }  
          } 
        }
     })
    }
  }

  showPriceUpdateAlert = () => {
    showMessage({
      message: 'Please update your Prices to proceed further',
    }); 
    this.props.renderPriceUpdate();
  }


  isProductItemDeactivated(itemStatus) {
    if (itemStatus === AppConstants.productStatus.deactivated) {
      return true;
    } else {
      return false;
    }
  }

  renderNotificationIcon() {
    return (
      <TouchableHighlight
        style={[AppStyles.buttonTouch, styles.mainView]}
        activeOpacity={1}
        underlayColor={AppColors.iconBg}
        onPress={() => this.onPressNotification()}>
        <View>
          <SimpleLineIcons style={AppStyles.navBarIcons} name="bell" />
          {Notifications.getUnReadNotificatonCount ? (
            <View style={AppStyles.countView}>
              <Text
                style={
                  Platform.OS === 'ios'
                    ? [AppStyles.extraSmallBoldText, styles.countText]
                    : [AppStyles.extraSmallBoldText, styles.countText]
                }>
                {Notifications.getUnReadNotificatonCount}
              </Text>
            </View>
          ) : null}
        </View>
      </TouchableHighlight>
    );
  }

  onPressNotification() {
    this.props.viewNotifications();
  }

  checkId() {
    if (this.state.referenceId === '') {
      return true;
    } else {
      return false;
    }
  }

  locateRequest() {
    if (!this.state.referenceId && !this.state.vehicleNumber) {
      if (this.sbuDetails.isDSMOnline) {
        showMessage({
          message:
            'Please enter a valid reference id or vehicle number to locate request',
        });
      } else {
        showMessage({
          message: 'Please enter a valid reference id to locate request',
        });
      }
    } else if (this.state.referenceId) {
      DispenseRequestStore.getDispenseRequest(this.state.referenceId).then(
        data => {
          if (data) {
            this.props.renderAgentRequestDetails({
              data: new DispenseRequest(data, true),
            });
          } else {
            showMessage({
              message: 'Please enter a valid reference id',
            });
          }
        },
      );
    } else if (
      this.state.vehicleNumber &&
      isValidVehicleNumber(this.state.vehicleNumber)
    ) {
      Dispensations.getVehicleDetailsForDispense(this.state.vehicleNumber)
        .then(data => {
          if (data) {
            this.props.renderNewDispensation({
              data: new Dispensation(data, true),
            });
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
    } else if (!isValidVehicleNumber(this.state.vehicleNumber)) {
      showMessage({
        message: 'Invalid registration number',
      });
    } else {
      return null;
    }
  }

  goOnlineDSMRequest() {
    this.sbuDetails.loading = true;
    this.sbuDetails
      .goDSMOnlineRequest()
      .then(data => {
        if (data) {
          this.sbuDetails.loading = false;
        } else {
          this.sbuDetails.loading = false;
        }
      })
      .catch(error => {
        this.sbuDetails.loading = false;
        showMessage({
          message:
            error.details && error.details.displayMessage
              ? error.details.displayMessage
              : 'Unable to go online, try again later',
        });
      });
  }

  goOnlineMCARequest() {
    this.sbuDetails.loading = true;
    this.sbuDetails
      .goMCAOnlineRequest()
      .then(data => {
        if (data) {
          this.sbuDetails.loading = false;
        } else {
          this.sbuDetails.loading = false;
        }
      })
      .catch(error => {
        this.sbuDetails.loading = false;
        showMessage({
          message:
            error.details && error.details.displayMessage
              ? error.details.displayMessage
              : 'Unable to go online, try again later',
        });
      });
  }

  onPressOnline(role) {
    if (role === 'DSM') {
      this.goOnlineDSMRequest();
    } else {
      this.goOnlineMCARequest();
    }
  }

  renderOnlineOfflineStatus(title, isOnline) {
    return (
      <View style={[AppStyles.row, styles.onLineOfflineStatus]}>
        <View style={[AppStyles.row, styles.switchView]}>
          <Text style={[AppStyles.titleBoldText, AppStyles.darkText]}>
            {title}
          </Text>
          <View style={styles.switch}>
            <Switch
              trackColor={{false: 'white', true: 'white'}}
              thumbColor={isOnline ? AppColors.brand.primary : '#616577'}
              ios_backgroundColor="white"
              onValueChange={() => this.onPressOnline(title)}
              value={isOnline}
              disabled={this.sbuDetails.loading}
            />
          </View>
        </View>
        <View style={[styles.buttonView]}>

        </View>
        {isOnline ? (
          <TouchableOpacity
            style={[styles.barIconView]}
            onPress={() =>
              this.props.renderQRScan({
                qrData: this.setReferenceId.bind(this),
              })
            }>
            {this.renderButtonView('Scan QR', 'oleum_scan')}
          </TouchableOpacity>
        ) : null}
        {this.sbuDetails && this.sbuDetails.isAbleToUpdatePrice ? (
          <TouchableOpacity
            style={[styles.barIconView,styles.buttonSpace]}
            onPress={() => this.props.renderPriceUpdate()}>
            {this.renderButtonView(
              'Update Price',
              Platform.OS === 'ios' ? 'oleum_update' : 'oleum_vehicle-type',
            )}
          </TouchableOpacity>
        ) : null}
        
      </View>
    );
  }

  renderButtonView(title, icon) {
    return (
      <View style={styles.buttonMainView}>
        <Icon style={styles.buttonIcon} name={icon} style={{fontSize:40}} />
        <Text>{title}</Text>
      </View>
    );
  }

  renderDsmMcaStatus() {
    return (
      <View style={styles.dsmMcaStatusMainView}>
        <View style={styles.dsmMcaStatusView}>
          <View style={styles.typeView}>{this.renderDsmMca()}</View>
          <View style={styles.typeView}>{this.renderDsmMca()}</View>
        </View>
        <Text style={[AppStyles.mediumText]}>
          {getDateTimeString(new Date(), 'DD MMMM YYYY, hh:mm a')}
        </Text>
      </View>
    );
  }

  setReferenceId(referenceId) {
    if (referenceId.length === 8) {
      this.state.referenceId = referenceId;
      this.setState({
        referenceId: referenceId,
      });
      this.locateRequest();
    } else {
      showMessage({
        message: 'This is not a valid QR code. Please try again!',
      });
    }
  }

  getRenderContentStatus() {
    if (this.sbuDetails.isDSM && this.sbuDetails.isDSMOnline) {
      return true;
    } else if (this.sbuDetails.isMCA && this.sbuDetails.isMCAOnline) {
      return true;
    } else if (this.sbuDetails.isMCADSM && this.sbuDetails.isDSMOnline) {
      return true;
    } else if (this.sbuDetails.isMCADSM && this.sbuDetails.isMCAOnline) {
      return true;
    } else {
      return false;
    }
  }

  renderHomeContent() {
    if (this.getRenderContentStatus()) {
      return (
        <KeyboardAvoidingView>
          <View style={styles.idAndScanView}>
            {!this.sbuDetails.isMCA ? (
              <View>
                <View style={styles.vehicleNumberView}>
                  <View style={styles.referenceIdTextView}>
                    <Text style={AppStyles.labelText}>
                      {AppStrings.enterVehicleNumber}
                    </Text>
                  </View>
                  <TextInput
                    style={[styles.idInputBoxStyle, AppStyles.regularBoldText]}
                    placeholder="Eg: KK11AA1111"
                    placeholderTextColor={AppColors.textSecondary}
                    autoCapitalize={'characters'}
                    maxLength={15}
                    keyboardType={'default'}
                    value={this.state.vehicleNumber}
                    onChangeText={vehicleNumber =>
                      this.setState({
                        vehicleNumber: vehicleNumber.replace(
                          /[^a-zA-Z0-9]/g,
                          '',
                        ),
                        referenceId: '',
                      })
                    }
                  />
                </View>
                <View style={styles.orView}>
                  <Text style={AppStyles.regularBoldText}>{'OR'}</Text>
                </View>
              </View>
            ) : null}
            <View style={styles.referenceIdView}>
              <View style={styles.referenceIdTextView}>
                <Text style={AppStyles.labelText}>{AppStrings.enterId}</Text>
              </View>
              <TextInput
                style={[styles.idInputBoxStyle, AppStyles.regularBoldText]}
                placeholder="Eg: TYD78997"
                placeholderTextColor={AppColors.textSecondary}
                autoCapitalize={'characters'}
                value={this.state.referenceId}
                onChangeText={referenceId =>
                  this.setState({
                    referenceId: referenceId
                      .toUpperCase()
                      .replace(/[^a-zA-Z0-9]/g, ''),
                    vehicleNumber: '',
                  })
                }
              />
            </View>
          </View>
          <View style={styles.locateRequestButtonView}>
            <Button
              buttonText={AppStrings.locateRequest}
              isActive={this.checkId()}
              onPress={() => {
                this.locateRequest();
              }}
            />
          </View>
        </KeyboardAvoidingView>
      );
    } else {
      return (
        <View style={styles.offLineView}>
          <NoData
            image={AppResources.offline}
            title={'You are Offline'}
            content={'Please go online to serve customers'}
          />
        </View>
      );
    }
  }

  checkAgentType() {
    if (this.sbuDetails.isMCA && this.sbuDetails.isDSM) {
      return (
        <View>
          {this.renderOnlineOfflineStatus('DSM', this.sbuDetails.isDSMOnline)}
          {this.renderOnlineOfflineStatus('MCA', this.sbuDetails.isMCAOnline)}
        </View>
      );
    } else if (this.sbuDetails.isMCA) {
      return this.renderOnlineOfflineStatus('MCA', this.sbuDetails.isMCAOnline);
    } else {
      return this.renderOnlineOfflineStatus('DSM', this.sbuDetails.isDSMOnline);
    }
  }

  loading() {
    if (
      DispenseRequest.loading ||
      Dispensations.getVehicleDetailsForDispenseLoading ||
      this.sbuDetails.loading
    ) {
      return <Loading />;
    }
  }

 

  render() {
    return (
      
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={100}
        style={AppStyles.container}>
        <StatusBar
          backgroundColor={AppColors.statusBarBg}
          hidden={false}
          barStyle={AppColors.statusBarStyle}
        />
        
        {this.checkAgentType()}
        {this.renderHomeContent()}
        {this.loading()}
      </KeyboardAvoidingView>
    );
  }
}

export default AgentHome;
