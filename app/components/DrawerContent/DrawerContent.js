/**
 * Copyright (c) 2018-present, Evolvier Technologies. All rights reserved.
 *
 */

'use strict';

import React, {Component} from 'react';
import {View, Text, ScrollView, SafeAreaView} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Accordion from 'react-native-collapsible/Accordion';
import {observer} from 'mobx-react';
import {Actions} from 'react-native-router-flux';
import {createIconSetFromFontello} from 'react-native-vector-icons';

import {getImageDisplayUri} from '../../lib/utils';

import {AppStyles} from '@theme';
import styles from './styles';
import {AppResources, AppIconFonts} from '@config';
import DrawerStore from '@stores/Drawer';
import Account from '@stores/Account';

import TouchableOpacity from '@components/TouchableOpacity';
import Image from '@components/Image';

const Icon = createIconSetFromFontello(AppIconFonts);

@observer
class DrawerContent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeSections: [],
    };
  }

  _renderSectionTitle = section => {
    if (section.divider) {
      return <View style={AppStyles.horizontalLine} />;
    } else {
      return null;
    }
  };

  _renderHeader = (section, index, isActive) => {
    return (
      <TouchableOpacity
        key={index}
        onPress={
          section.type === 'single'
            ? section.onPress
              ? section.onPress
              : null
            : () => {
                this.setState({
                  activeSections: this.state.activeSections.includes(index)
                    ? []
                    : [index],
                });
              }
        }
        style={styles.drawerItemView}>
        <View style={styles.iconView}>
          {section.materialIcon ? (
            <SimpleLineIcons
              style={[AppStyles.drawerIcons]}
              name={section.icon}
            />
          ) : (
            <Icon style={[AppStyles.drawerIcons]} name={section.icon} />
          )}
        </View>
        <View style={styles.drawerItemNameView}>
          <Text style={[AppStyles.regularText, AppStyles.darkText]}>
            {section.title}
          </Text>
        </View>
        {section.type === 'group' ? (
          <View style={styles.iconView}>
            <MaterialCommunityIcons
              style={[AppStyles.drawerIcons]}
              name={isActive ? 'chevron-up' : 'chevron-down'}
            />
          </View>
        ) : (
          <View style={styles.iconView} />
        )}
      </TouchableOpacity>
    );
  };

  drawerSubItem = (item, i) => {
    return (
      <TouchableOpacity
        style={styles.drawerItemView}
        key={i}
        onPress={item.onPress ? item.onPress : null}>
        <View style={styles.iconView} />
        <View style={styles.drawerItemNameView}>
          <Text
            style={[
              AppStyles.regularText,
              styles.drawerItemText,
              AppStyles.darkText,
            ]}>
            {item.title}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  _renderContent = section => {
    if (section.data) {
      return (
        <View style={styles.content}>
          {section.data.map((item, i) => this.drawerSubItem(item, i))}
        </View>
      );
    } else {
      return null;
    }
  };

  _updateSections = activeSections => {
    if (
      DrawerStore.content[activeSections[0]] &&
      DrawerStore.content[activeSections[0]].type === 'single' &&
      DrawerStore.content[activeSections[0]].onPress
    ) {
      this.setState({
        activeSections: [],
      });
    } else {
      this.setState({
        activeSections,
      });
    }
  };

  renderSwitch() {
    if (Account.isAgent()) {
      return (
        <TouchableOpacity
          style={[styles.switchTouch]}
          activeOpacity={0.7}
          onPress={() => Actions.selectRole()}>
          <View style={styles.drawerItemView}>
            <View style={styles.iconView}>
              <MaterialCommunityIcons
                style={[AppStyles.drawerIcons]}
                name={'compare'}
              />
            </View>
            <View style={styles.drawerItemNameView}>
              <Text style={[AppStyles.regularText, AppStyles.darkText]}>
                Switch Role
              </Text>
            </View>
            <View style={styles.iconView} />
          </View>
        </TouchableOpacity>
      );
    } else {
      return null;
    }
  }

  render() {
    return (
      <View>
        <ScrollView alwaysBounceVertical={false}>
          <View>
            <View style={styles.profileHeaderView}>
              <SafeAreaView style={AppStyles.row}>
                <View style={styles.profilePicView}>
                  <Image
                    style={[styles.profilePicImage]}
                    source={getImageDisplayUri(
                      Account.profile.profileImage
                        ? Account.profile.profileImage.url
                        : null,
                      AppResources.noProfilePic,
                    )}
                  />
                </View>
                <View style={styles.profileNameView}>
                  <Text
                    style={[AppStyles.regularBoldText, styles.profileNameText]}>
                    {Account.profile.fullName}
                  </Text>
                  <Text style={[AppStyles.regularText, styles.phoneNumberText]}>
                    {Account.user.number}
                  </Text>
                </View>
              </SafeAreaView>
            </View>
            {this.renderSwitch()}
            <View>
              <Accordion
                sections={DrawerStore.content}
                activeSections={this.state.activeSections}
                renderHeader={this._renderHeader}
                renderContent={this._renderContent}
                renderSectionTitle={this._renderSectionTitle}
                onChange={this._updateSections}
                underlayColor={'#00000020'}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default DrawerContent;
