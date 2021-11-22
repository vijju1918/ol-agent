/**
 * Copyright (c) 2018-present, Oleum. All rights reserved.
 *
 */
/* eslint-disable react/no-string-refs */

'use strict';

import React, {Component} from 'react';

import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  KeyboardAvoidingView,
  SafeAreaView,
  Platform,
} from 'react-native';
import CodeInput from 'react-native-confirmation-code-input';
import {showMessage} from 'react-native-flash-message';
import RNOtpVerify from 'react-native-otp-verify';
import moment from 'moment-timezone';

import {AppStyles, AppColors} from '@theme';
import AppStrings from '@config/strings';
import {AppResources} from '@config';
import styles from './styles';

import Account from '@stores/Account';

import Button from '@components/Button';
import LoadingShadow from '@components/LoadingShadow';
import LoadingSmall from '@components/LoadingSmall';
import Image from '@components/Image';

class VerifyOTP extends Component {
  constructor(props) {
    super(props);

    this.state = {
      resendOTP: true,
      otpFetchLoading: true,
      isOTPSubmitted: false,
      otp: '',
      timer: moment.duration(30, 's'),
    };
  }

  componentDidMount() {
    if (Platform.OS !== 'ios') {
      RNOtpVerify.getOtp()
        .then(() => RNOtpVerify.addListener(this.otpHandler.bind(this)))
        .catch(external => console.log(external));
    }
    this.startResendTimer();
  }

  componentWillUnmount() {
    if (Platform.OS !== 'ios') {
      RNOtpVerify.removeListener();
    }
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  otpHandler = message => {
    if (Platform.OS !== 'ios') {
      if (message) {
        let otpFromMessage = /(\d{6})/g.exec(message);
        if (otpFromMessage && otpFromMessage.length) {
          const otp = otpFromMessage[1];
          if (otp) {
            this.setState({
              otpFetchLoading: false,
            });
            this.setOtpToCodeInput(otp);
            this._onFinish(otp);
          }
        }
      }
      RNOtpVerify.removeListener();
    }
  };

  setOtpToCodeInput(verificationCode) {
    const tmp = [...verificationCode];
    this.refs.otpValueRef.setState({codeArr: tmp, currentIndex: 5});
  }

  _onFinish(code) {
    if (code.length === 6) {
      this.setState({
        isOTPSubmitted: true,
        otp: code,
      });
      this.checkOTP(code);
    } else {
      showMessage({
        message: 'Please enter a 6 digit OTP received in your phone number',
      });
    }
  }

  checkOTP(code) {
    this.props
      .login({
        user: this.props.user,
        code: code,
      })
      .catch(e => {
        console.log(e);
        this.setState({
          isOTPSubmitted: false,
          otp: '',
        });
        this.refs.otpValueRef.clear();
        showMessage({
          message: 'Invalid OTP. Please try again!',
        });
      });
  }

  setResendOTPStatus() {
    this.setState({
      resendOTP: true,
      otpFetchLoading: false,
    });
  }

  startResendTimer() {
    if (this.state.resendOTP) {
      this.state.resendOTP = false;
      this.setState({
        otpFetchLoading: true,
      });
      this.timer = setInterval(this.counter.bind(this), 1000);
    }
  }

  renderCounter() {
    if (!this.state.resendOTP) {
      return (
        <View style={styles.counterView}>
          <Text style={AppStyles.regularText}>{this.getTimer()}</Text>
        </View>
      );
    } else {
      return null;
    }
  }

  counter() {
    if (this.state.timer.as('seconds') > 1) {
      this.setState({
        timer: this.state.timer.subtract(1, 's'),
      });
    } else {
      this.setState({
        timer: moment.duration(1, 'm'),
        resendOTP: true,
      });
      clearInterval(this.timer);
    }
  }

  getTimer() {
    if (!this.state.resendOTP) {
      return (
        '(' +
        moment.utc(this.state.timer.as('milliseconds')).format('mm:ss') +
        ')'
      );
    } else {
      return '';
    }
  }

  onPressResendOTP() {
    this.refs.otpValueRef.clear();
    this.startResendTimer();
    Account.sendVerificationCode(this.props.user);
    showMessage({
      message: 'An OTP has been sent to your mobile number',
    });
  }

  onPressNext() {
    if (this.state.isOTPSubmitted) {
      this.checkOTP(this.state.otp);
    } else {
      showMessage({
        message: 'Please enter the OTP received in your phone',
      });
    }
  }

  renderLoading(loading) {
    if (loading) {
      return <LoadingShadow />;
    } else {
      return null;
    }
  }

  renderAutoFetchingView() {
    if (this.state.otpFetchLoading && Platform.OS !== 'ios') {
      if (!this.state.resendOTP) {
        return (
          <View style={styles.autoFetchingOTPView}>
            <LoadingSmall color={AppColors.brand.primary} />
            <Text style={[AppStyles.regularBoldText, styles.otpFetchingText]}>
              Auto detecting OTP...
            </Text>
          </View>
        );
      }
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
            {this.renderAutoFetchingView()}
            <View style={styles.logoTopView}>
              <Image style={[styles.mrCanLogo]} source={AppResources.mrCan} />
              <View style={styles.imageView}>
                <Image
                  style={[AppStyles.appLogo, styles.appLogo]}
                  source={AppResources.sms}
                />
              </View>
              <Text style={[AppStyles.regularBoldText, styles.tagLine]}>
                {AppStrings.verifyNumber}
              </Text>
              <Text style={[AppStyles.regularText, styles.tagInfoLine]}>
                {AppStrings.otpInfo.replace(
                  '<number>',
                  this.props.user.internationalFormatNumber,
                )}
              </Text>
            </View>
          </ImageBackground>
          <View style={styles.otpInputView}>
            <CodeInput
              ref="otpValueRef"
              codeLength={6}
              activeColor={AppColors.brand.secondary}
              inactiveColor={AppColors.inputUnderline}
              autoFocus={false}
              keyboardType="numeric"
              ignoreCase={true}
              inputPosition="center"
              size={50}
              onFulfill={isValid => this._onFinish(isValid)}
              containerStyle={styles.containerStyle}
              codeInputStyle={[
                AppStyles.regularBoldText,
                styles.codeInputStyle,
              ]}
            />
          </View>
          <View style={styles.actionButtonView}>
            <TouchableOpacity
              activeOpacity={0.5}
              style={styles.actionTouch}
              disabled={!this.state.resendOTP}
              onPress={() => this.onPressResendOTP()}>
              <Text style={[AppStyles.mediumRegularText, styles.actionText]}>
                {AppStrings.textNotReceived}
              </Text>
              {this.state.resendOTP ? (
                <Text style={[AppStyles.mediumBoldText, AppStyles.darkText]}>
                  {AppStrings.resend}
                </Text>
              ) : null}
              {this.renderCounter()}
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.5}
              style={styles.changeNumberTouch}
              onPress={() => this.props.onBack()}>
              <Text
                style={[
                  AppStyles.mediumBoldText,
                  AppStyles.darkText,
                  {
                    color: AppColors.brand.primary,
                  },
                ]}>
                {AppStrings.changeNumber}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <SafeAreaView style={styles.signInButtonView}>
          <Button
            onPress={() => this.onPressNext()}
            buttonText={AppStrings.next}
            disabled={!this.state.isOTPSubmitted}
          />
        </SafeAreaView>
        {this.renderLoading(this.state.isOTPSubmitted)}
      </KeyboardAvoidingView>
    );
  }
}

export default VerifyOTP;
