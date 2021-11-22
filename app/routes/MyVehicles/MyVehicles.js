/**
 * Copyright (c) 2018-present, Oleum. All rights reserved.
 *
 */

'use strict';

import React, {Component} from 'react';

import {
  View,
  Text,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Platform,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {observer} from 'mobx-react';
import {createIconSetFromFontello} from 'react-native-vector-icons';
import {showMessage} from 'react-native-flash-message';

import VehicleListItem from '@components/VehicleListItem';
import NavBarAddButton from '@components/NavBarAddButton';
import NoData from '@components/NoData';
import LoadingShadow from '@components/LoadingShadow';

import Vehicles, {Vehicle} from '@stores/Vehicles';
import VehicleDetails from '@stores/VehicleDetails';
import Account from '@stores/Account';

import {AppColors, AppStyles} from '@theme';
import {AppResources} from '@config';
import styles from './styles';
import {AppIconFonts} from '@config';

const Icon = createIconSetFromFontello(AppIconFonts);

@observer
class MyVehicles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedVehicleId: '',
    };
    this.vehicle = new Vehicle();
  }

  componentWillMount() {
    this.props.navigation.setParams({
      right: <NavBarAddButton onClick={() => this.props.renderAddVehicle()} />,
    });
  }

  onPressItem(item) {
    if (
      this.state.selectedVehicleId &&
      this.state.selectedVehicleId === item.id
    ) {
      this.setState({
        selectedVehicleId: '',
      });
    } else {
      this.setState({
        selectedVehicleId: item.id,
      });
    }
  }

  renderVehicleItem(item) {
    return (
      <View>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => this.onPressItem(item)}>
          <VehicleListItem
            modelName={item && item.model}
            regNumber={item && item.number}
            image={item.image && item.image.url}
            mileage={item.mileage && item.mileage.average}
          />
        </TouchableOpacity>
        {this.state.selectedVehicleId &&
        this.state.selectedVehicleId === item.id
          ? this.renderExpandedItemView(item)
          : null}
        <View style={[AppStyles.horizontalLine, styles.horizontalLine]} />
      </View>
    );
  }

  onPressEdit(item) {
    this.props.renderAddVehicle(item, true);
  }

  removeVehicle(item) {
    Vehicles.removeVehicle(item.id)
      .then(data => {
        if (data) {
          this.setState({
            selectedVehicleId: '',
          });
          console.log('Removing Success');
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
  }

  onPressRemove(item) {
    Alert.alert(
      'Delete Vehicle',
      'Do you really want to delete this vehicle?',
      [
        {
          text: 'No',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'Delete', onPress: () => this.removeVehicle(item)},
      ],
      {cancelable: false},
    );
  }

  renderExpandedItemView(item) {
    return (
      <View style={[AppStyles.row, styles.expandedView]}>
        <View style={AppStyles.flex1} />
        <View style={styles.displayView}>
          <View style={styles.margin}>
            {this.renderExpandedItem(
              'oleum_registration-number-',
              'Registration Number',
              item && item.number,
            )}
          </View>
          <View style={styles.margin}>
            {this.renderExpandedItem(
              'oleum_fuel-type',
              'Fuel Type',
              this.getFuelName(item && item.fuelTypeId),
            )}
          </View>
          <View style={styles.margin}>
            {this.renderExpandedItem(
              Platform.OS === 'ios' ? 'oleum_vehicle-type' : 'oleum_update',
              'Vehicle Type',
              item && item.vehicleType,
            )}
          </View>
          {item && item.manufacturer ? (
            <View style={styles.margin}>
              {this.renderExpandedItem(
                'oleum_manufacturer',
                'Manufacturer',
                item && item.manufacturer,
              )}
            </View>
          ) : null}
          {item && item.model ? (
            <View style={styles.margin}>
              {this.renderExpandedItem(
                'oleum_model',
                'Model',
                item && item.model,
              )}
            </View>
          ) : null}
          <View style={[AppStyles.row, styles.controlMainView]}>
            <TouchableOpacity
              style={styles.controlTouch}
              onPress={() => this.onPressEdit(item)}>
              <Icon style={styles.icons} name={'oleum_edit'} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.controlTouch}
              onPress={() => this.onPressRemove(item)}>
              <Icon style={styles.icons} name={'oleum_trash'} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  renderExpandedItem(icon, label, value) {
    return (
      <View style={styles.expandedItemMainView}>
        <View style={styles.textFieldLabelMainView}>
          <View style={styles.iconView}>
            <Icon size={30} name={icon} />
          </View>
          <View style={styles.labelView}>
            <Text style={[AppStyles.regularText, styles.labelText]}>
              {label}
            </Text>
          </View>
        </View>
        <View style={[styles.textFieldLabelMainView, styles.valueView]}>
          <View style={styles.labelView}>
            <Text style={[AppStyles.regularBoldText, styles.valueText]}>
              {value}
            </Text>
          </View>
        </View>
        <View style={[AppStyles.horizontalLine, styles.horizontalLine]} />
      </View>
    );
  }

  getFuelName(fuelTypeId) {
    if (
      VehicleDetails.vehicleInfo &&
      VehicleDetails.vehicleInfo.fuelTypes &&
      VehicleDetails.vehicleInfo.fuelTypes.length
    ) {
      return VehicleDetails.vehicleInfo.fuelTypes.find(
        eachFuel => eachFuel.id === fuelTypeId,
      )
        ? VehicleDetails.vehicleInfo.fuelTypes.find(
            eachFuel => eachFuel.id === fuelTypeId,
          ).title
        : '';
    }
  }

  render() {
    if (
      this.vehicle.removeVehicleLoading ||
      VehicleDetails.getVehicleDetailsLoading
    ) {
      return (
        <View style={AppStyles.container}>
          <LoadingShadow />
        </View>
      );
    } else if (Vehicles.list && Vehicles.list.length) {
      return (
        <View style={AppStyles.container}>
          <View style={styles.infoView}>
            <View style={styles.infoTextView}>
              <Text style={[AppStyles.regularText, AppStyles.darkText]}>
                Your vehicle list
              </Text>
            </View>
            <ActivityIndicator
              animating={!(Account.connectionReady && Vehicles.ready)}
              size="small"
              color={AppColors.brand.accentSecondary}
            />
          </View>
          <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
            <StatusBar
              backgroundColor={AppColors.statusBarBg}
              hidden={false}
              barStyle={AppColors.statusBarStyle}
            />
            <View style={styles.vehicleListView}>
              <FlatList
                data={
                  Vehicles.list && Vehicles.list.length ? Vehicles.list : []
                }
                alwaysBounceVertical={false}
                extraData={
                  Vehicles.list && Vehicles.list.length ? Vehicles.list : []
                }
                renderItem={({item, i}) => this.renderVehicleItem(item, i)}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.vehicleListContentContainerStyle}
                keyExtractor={this._keyExtractor}
                bounces={true}
              />
            </View>
          </ScrollView>
        </View>
      );
    } else if (!(Account.connectionReady && Vehicles.ready)) {
      return (
        <View style={AppStyles.container}>
          <LoadingShadow />
        </View>
      );
    } else {
      return (
        <View style={[AppStyles.container, AppStyles.containerCentered]}>
          <StatusBar
            backgroundColor={AppColors.statusBarBg}
            hidden={false}
            barStyle={AppColors.statusBarStyle}
          />
          <NoData
            image={AppResources.myCar}
            title={'No Vehicles !'}
            content={'Click on plus button to add new vehicle'}
          />
        </View>
      );
    }
  }
}

export default MyVehicles;
