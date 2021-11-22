/**
 * Copyright (c) 2018-present, Oleum. All rights reserved.
 *
 */

'use strict';

import React, {Component} from 'react';
import {
  View,
  ScrollView,
  FlatList,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import {observer} from 'mobx-react';
import {OpenMapDirections} from 'react-native-navigation-directions';

import ROListItem from '@components/ROListItem';
import Loading from '@components/Loading';
import NavbarRightIcons from '@components/NavbarRightIcons';

import {AppConstants} from '@config';
import {AppStyles, AppColors} from '@theme';
import styles from './styles';

@observer
class ROList extends Component {
  componentWillMount() {
    this.props.data.userCurrentLocation().then(data => {
      if (data) {
        this.props.data.updateSbuList();
      }
    });
    this.props.navigation.setParams({
      right: (
        <NavbarRightIcons
          viewFilterList={() =>
            this.props.viewFilterList({
              data:
                this.props.data.type === AppConstants.material
                  ? AppConstants.materialSbuFilter
                  : AppConstants.sbuFilter,
              onPress: this.filterSBU.bind(this),
            })
          }
          page="ROlist"
        />
      ),
    });
  }

  filterSBU(filterItem) {
    this.props.data.filter = filterItem.value;
  }

  openDirectionsInMap(item) {
    if (
      item.location &&
      item.location.coordinates &&
      item.location.coordinates.length
    ) {
      const endPoint = {
        longitude: item.location.coordinates[0],
        latitude: item.location.coordinates[1],
      };
      OpenMapDirections(null, endPoint, 'd');
    }
  }

  renderNearbyCollectionPoints(item) {
    if (this.props.data.type === AppConstants.material) {
      return (
        <TouchableOpacity onPress={() => this.openDirectionsInMap(item)}>
          <ROListItem data={item} isCP={true} />
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity onPress={() => this.openDirectionsInMap(item)}>
          <ROListItem
            data={item}
            slectedProductSBUPrice={this.props.data.slectedProductSBUPrice(
              item._id,
            )}
            slectedQuantityFP={this.props.data.slectedQuantityFP(item._id)}
            slectedQuantityFPUnit={this.props.data.slectedQuantityFPUnit()}
            distance={this.props.data.getdistance(item.location)}
            showNavIcon={true}
          />
        </TouchableOpacity>
      );
    }
  }

  render() {
    if (!this.props.data.loading) {
      return (
        <View style={[AppStyles.container, styles.mainView]}>
          <ScrollView
            alwaysBounceVertical={false}
            showsVerticalScrollIndicator={false}>
            <StatusBar
              backgroundColor={AppColors.statusBarBg}
              hidden={false}
              barStyle={AppColors.statusBarStyle}
            />
            <FlatList
              data={
                this.props.data.type === AppConstants.material
                  ? this.props.data.filterdMaterialSbulist
                  : this.props.data.filterdSbulist
              }
              extraData={JSON.stringify({
                filter: this.props.data.filter,
                value: this.props.data.getValue,
                valueType: this.props.data.valueType,
                product: this.props.data.selectedProductDetails,
                list: this.props.data.filterdSbulist,
              })}
              renderItem={({item}) => this.renderNearbyCollectionPoints(item)}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.promoContentContainerStyle}
              keyExtractor={this._keyExtractor}
              bounces={true}
            />
          </ScrollView>
        </View>
      );
    } else {
      return <Loading />;
    }
  }
}

export default ROList;
