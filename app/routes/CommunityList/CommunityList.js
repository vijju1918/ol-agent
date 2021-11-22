/**
 * Copyright (c) 2018-present, Oleum. All rights reserved.
 *
 */
'use strict';

import React, {Component} from 'react';
import {View, ScrollView, Text, FlatList, TouchableOpacity} from 'react-native';
import {observer} from 'mobx-react';

import Button from '@components/Button';

import {AppStyles} from '@theme';
import AppStrings from '@config/strings';
import styles from './styles';

@observer
class CommunityList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      communityList: [
        {
          name: 'St Marys Church',
          location: 'Thiruvalla',
        },
        {
          name: 'Xx xxxxx xxxxx',
          location: 'Thiruvalla',
        },
        {
          name: 'Xx xxxxx xxxxx',
          location: 'Thiruvalla',
        },
        {
          name: 'Xx xxxxx xxxxx',
          location: 'Thiruvalla',
        },
        {
          name: 'Xx xxxxx xxxxx',
          location: 'Thiruvalla',
        },
      ],
    };
  }

  onPressSelectItem() {}

  renderCommunityItem(item) {
    return (
      <TouchableOpacity
        activeOpacity={0.5}
        style={styles.itemTouch}
        onPress={() => {}}>
        <View style={styles.itemMainView}>
          <View style={styles.selectView} />
          <Text style={[AppStyles.regularBoldText]}>{item.name + ', '}</Text>
          <Text style={[AppStyles.regularText]}>{item.location}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <View style={[AppStyles.containerWhite, styles.mainView]}>
        <ScrollView
          alwaysBounceVertical={false}
          showsVerticalScrollIndicator={false}>
          <View style={styles.infoView}>
            <Text style={[AppStyles.titleBoldText, AppStyles.darkText]}>
              My Can
            </Text>
          </View>
          <View style={styles.listMainView}>
            <FlatList
              data={this.state.communityList}
              alwaysBounceVertical={false}
              extraData={this.state.communityList}
              renderItem={({item, i}) => this.renderCommunityItem(item, i)}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.communityListContentContainerStyle}
              keyExtractor={this._keyExtractor}
              bounces={true}
            />
          </View>
          <View style={styles.buttonsView}>
            <View style={styles.buttonView}>
              <Button buttonText={AppStrings.skip} onPress={() => {}} />
            </View>
            <View style={styles.buttonSpacing} />
            <View style={styles.buttonView}>
              <Button buttonText={AppStrings.next} onPress={() => {}} />
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default CommunityList;
