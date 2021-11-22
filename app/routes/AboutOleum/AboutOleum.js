/**
 * Copyright (c) 2018-present, Oleum. All rights reserved.
 *
 */

'use strict';

import React, {Component} from 'react';
import {View, Text, Linking} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import {createIconSetFromFontello} from 'react-native-vector-icons';
import {Actions} from 'react-native-router-flux';

import NavBarTitle from '@components/NavBarTitle';
import TouchableOpacity from '@components/TouchableOpacity';
import Image from '@components/Image';

import styles from './styles';
import {AppStyles} from '@theme';
import AppStrings from '@config/strings';
import {AppResources, AppIconFonts} from '@config';

const Icon = createIconSetFromFontello(AppIconFonts);

class AboutOleum extends Component {
  openURL(url) {
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      }
    });
  }

  openWebView(name, url) {
    Actions.webViewPage({
      renderTitle: <NavBarTitle title={name} />,
      url: url,
    });
  }

  listItem(title, icon, url) {
    return (
      <TouchableOpacity
        onPress={() => this.openWebView(title, url)}
        style={[AppStyles.row, AppStyles.centerAligned]}>
        <View style={[AppStyles.flex3]}>
          <Text style={[AppStyles.regularText, AppStyles.darkText]}>
            {title}
          </Text>
        </View>
        <View style={[AppStyles.flex1, AppStyles.rightAligned]}>
          <Icon style={[AppStyles.icons, styles.backIcon]} name={icon} />
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <View style={[AppStyles.container, styles.aboutMainView]}>
        <View style={styles.imageView}>
          <Image
            style={[styles.appLogo]}
            resizeMode={'contain'}
            source={AppResources.appLogoBlack}
          />
        </View>
        <View style={styles.socialView}>
          <View style={AppStyles.centerAligned}>
            <Text style={[AppStyles.regularBoldText, AppStyles.darkText]}>
              Follow us on
            </Text>
          </View>

          <View style={[AppStyles.row, styles.iconView]}>
            <TouchableOpacity
              style={[[AppStyles.flex1, AppStyles.centerAligned]]}
              onPress={() => this.openURL('https://www.facebook.com/OLEUMX/')}>
              <Image style={styles.iconImage} source={AppResources.fb} />
            </TouchableOpacity>
            <TouchableOpacity
              style={[AppStyles.flex1, AppStyles.centerAligned]}
              onPress={() =>
                this.openURL('https://www.instagram.com/oleumfuelapp/')
              }>
              <Image style={styles.iconImage} source={AppResources.instagram} />
            </TouchableOpacity>
            <TouchableOpacity
              style={[AppStyles.flex1, AppStyles.centerAligned]}
              onPress={() =>
                this.openURL('https://www.linkedin.com/in/ranjan-oleum/')
              }>
              <Image style={styles.iconImage} source={AppResources.linkedIn} />
            </TouchableOpacity>
            <TouchableOpacity
              style={[AppStyles.flex1, AppStyles.centerAligned]}
              onPress={() => this.openURL('https://twitter.com/Oleumx')}>
              <Image style={styles.iconImage} source={AppResources.twitter} />
            </TouchableOpacity>
            <TouchableOpacity
              style={[AppStyles.flex1, AppStyles.centerAligned]}
              onPress={() =>
                this.openURL(
                  'https://api.whatsapp.com/send?phone=918746966666&text=WEBSITE:%20I%20need%20details%20of%20Oleum%20Fuel%20App',
                )
              }>
              <Image style={styles.iconImage} source={AppResources.whatsApp} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.aboutItemView}>
          {this.listItem(
            'Terms and Conditions',
            'oleum_right-arrow',
            'https://oleumx.com/terms.html',
          )}
          <View style={[AppStyles.horizontalLine, styles.line]} />
          {this.listItem(
            'Privacy Policy',
            'oleum_right-arrow',
            'https://oleumx.com/privacy.html',
          )}
          <View style={[AppStyles.horizontalLine, styles.line]} />
          {this.listItem(
            "FAQ's",
            'oleum_right-arrow',
            'https://oleumx.com/faqs.html',
          )}
          <View style={[AppStyles.horizontalLine, styles.line]} />
          {this.listItem(
            'Website',
            'oleum_right-arrow',
            'https://oleumx.com/index.html',
          )}
          <View style={[AppStyles.horizontalLine, styles.line]} />
        </View>
        <View style={styles.footerView}>
          <Text style={[AppStyles.regularText, AppStyles.darkText]}>
            {'Version: ' + DeviceInfo.getVersion()}
          </Text>
          <Text
            style={[
              AppStyles.mediumRegularText,
              AppStyles.darkText,
              AppStyles.textSpace,
            ]}>
            {AppStrings.copyrightText}
          </Text>
          <Text
            style={[
              AppStyles.mediumRegularText,
              AppStyles.darkText,
              AppStyles.textSpace,
            ]}>
            {AppStrings.rightsText}
          </Text>
        </View>
      </View>
    );
  }
}

export default AboutOleum;
