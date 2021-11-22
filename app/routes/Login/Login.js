/**
 * Copyright (c) 2018-present, Oleum. All rights reserved.
 *
 */
'use strict';

import React, {Component} from 'react';
import {
  View,
  ImageBackground,
  Text,
  TextInput,
  StatusBar,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import {Actions} from 'react-native-router-flux';
import {observer} from 'mobx-react';

import {AppStyles, AppColors} from '@theme';
import AppStrings from '@config/strings';
import styles from './styles';
import {AppResources} from '@config';
import {User} from '@stores/Account';

import Button from '@components/Button';
import LoadingShadow from '@components/LoadingShadow';
import NavBarTitle from '@components/NavBarTitle';
import Image from '@components/Image';

@observer
class Login extends Component {
  constructor(props) {
    super(props);
    this.user = new User();
    this.state = {
      loading: false,
    };
  }

  sendOTP() {
    if (this.user.number.length >= 10 && this.user.number.indexOf('0') !== 0) {
      this.setState({
        loading: true,
      });
      this.props
        .sendOTP(this.user)
        .then(() => {
          this.setState({
            loading: false,
          });
          this.props.viewVerifyOTP({
            user: this.user,
          });
        })
        .catch(() => {
          this.setState({
            loading: false,
          });
        });
    } else {
      showMessage({
        message: 'Please enter a valid phone number and try again!',
      });
    }
    Keyboard.dismiss();
  }

  viewTermsAndConditions() {
    Actions.webViewPage({
      renderTitle: <NavBarTitle title={AppStrings.termsAndConditions} />,
      url: 'https://oleumx.com/terms.html',
    });
  }

  viewPrivacyPolicy() {
    Actions.webViewPage({
      renderTitle: <NavBarTitle title={AppStrings.privacyPolicy} />,
      url: 'https://oleumx.com/privacy.html',
    });
  }

  renderLoading(loading) {
    if (loading) {
      return <LoadingShadow />;
    } else {
      return null;
    }
  }

  render() {
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : ''}
        keyboardVerticalOffset={0}
        style={[AppStyles.containerWhite]}>
        <StatusBar
          backgroundColor={AppColors.statusBarBg}
          hidden={false}
          barStyle={AppColors.statusBarStyle}
        />
        <ScrollView>
          <ImageBackground
            resizeMode="cover"
            style={styles.loginBgImage}
            source={AppResources.loginBg}>
            <View style={styles.logoTopView}>
              <Image style={[styles.mrCanLogo]} source={AppResources.mrCan} />
              <View style={styles.imageView}>
                <Image
                  style={[AppStyles.appLogo, styles.appLogo]}
                  source={AppResources.appLogoDrop}
                />
              </View>
              <Text style={[AppStyles.regularBoldText, styles.tagLine]}>
                {AppStrings.loginWithNumber}
              </Text>
              <Text style={[AppStyles.regularText, styles.tagInfoLine]}>
                {AppStrings.verifyNumberInfo}
              </Text>
            </View>
          </ImageBackground>
          <View style={styles.inputMainView}>
            <View style={styles.numberInputView}>
              <View style={styles.contryCodeView}>
                <TextInput
                  style={[AppStyles.regularText, styles.input]}
                  placeholder={'+91'}
                  underlineColorAndroid="transparent"
                  returnKeyType={'next'}
                  value={'+91'}
                  editable={false}
                />
                <View style={AppStyles.horizontalLine} />
              </View>
              <View style={styles.loginInputView}>
                <TextInput
                  style={[AppStyles.regularText, styles.input]}
                  placeholder={'Phone Number'}
                  // autoFocus={true}
                  keyboardType={'phone-pad'}
                  underlineColorAndroid="transparent"
                  onChangeText={this.user.updateNumber.bind(this)}
                  value={this.user.numberFormat}
                  returnKeyType={'next'}
                  maxLength={10}
                />
                <View style={AppStyles.horizontalLine} />
              </View>
            </View>
          </View>
        </ScrollView>
        <View style={styles.signInButtonView}>
          <Button
            onPress={() => this.sendOTP()}
            buttonText={AppStrings.sendCode}
            disabled={this.state.loading}
          />
        </View>
        <View style={styles.footerView}>
          <Text style={[AppStyles.smallText]}>
            <Text>By logging in you are agreeing to our</Text>
            <Text
              style={[AppStyles.smallText, styles.tcView]}
              onPress={() => this.viewPrivacyPolicy()}>
              {' Privacy Policy'}
            </Text>
            <Text>{' & '}</Text>
            <Text
              style={[AppStyles.smallText, styles.tcView]}
              onPress={() => this.viewTermsAndConditions()}>
              {' Terms and Conditions'}
            </Text>
          </Text>
        </View>
        {this.renderLoading(this.state.loading)}
      </KeyboardAvoidingView>
    );
  }
}

export default Login;
