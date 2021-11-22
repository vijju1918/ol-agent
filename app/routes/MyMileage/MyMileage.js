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
  Text,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import {observer} from 'mobx-react';
import Speedometer from 'react-native-speedometer-chart';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import LoadingSmall from '@components/LoadingSmall';
import NoData from '@components/NoData';
import LoadingShadow from '@components/LoadingShadow';
import Image from '@components/Image';

import Vehicles from '@stores/Vehicles';
import {Dispensations} from '@stores/Dispensations';
import Account from '@stores/Account';

import {AppColors, AppStyles} from '@theme';
import {AppResources} from '@config';
import styles from './styles';
import {getDateTimeString} from '@lib/utils';

@observer
class MyMileage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageLoading: true,
    };
    this.dispensations = new Dispensations();
  }

  componentDidMount() {
    this.initializeMileageData();
  }

  _keyExtractor = item => item.id;

  initializeMileageData() {
    if (Vehicles.list && Vehicles.list.length) {
      this.dispensations.updateVehicle(Vehicles.list[0]);
    }
  }

  onPressVehicleItem(vehicle) {
    this.dispensations.updateVehicle(vehicle);
  }

  renderDispensationItem(item) {
    return (
      <View style={styles.dispensationItemMainView}>
        <View style={styles.roAndOdometerView}>
          <View style={[styles.odometerAndQuantityView, AppStyles.textSpace]}>
            {item.vehicleDetails && item.vehicleDetails.odometer ? (
              <Text style={AppStyles.regularText}>
                {'Odometer: '}
                <Text style={AppStyles.regularBoldText}>
                  {item.vehicleDetails.odometer + ' km'}
                </Text>
              </Text>
            ) : null}
          </View>
          {item.vehicleDetails &&
          item.vehicleDetails.mileage &&
          item.vehicleDetails.mileage.totalDistance ? (
            <Text style={AppStyles.regularText}>
              {'Distance travelled: '}
              <Text style={AppStyles.regularBoldText}>
                {item.vehicleDetails.mileage.totalDistance.toFixed(1) + ' km'}
              </Text>
            </Text>
          ) : null}
          {item.vehicleDetails &&
          item.vehicleDetails.mileage &&
          item.vehicleDetails.mileage.totalQuantity ? (
            <Text style={AppStyles.regularText}>
              {'Fuel Consumed: '}
              <Text style={AppStyles.regularBoldText}>
                {item.vehicleDetails.mileage.totalQuantity.toFixed(1) + ' L'}
              </Text>
            </Text>
          ) : null}
          {item.dispensedAt ? (
            <View style={styles.dispensationDateView}>
              <Text style={AppStyles.mediumRegularText}>
                {getDateTimeString(item.dispensedAt, 'DD MMMM YYYY, hh:mm a')}
              </Text>
            </View>
          ) : null}
        </View>
        <View style={styles.meterView}>
          <Speedometer
            showIndicator
            size={100}
            outerColor={AppColors.brand.primary}
            internalColor={AppColors.brand.secondary}
            indicatorColor={AppColors.brand.primary}
            totalValue={
              this.dispensations.selectedVehicle &&
              this.dispensations.selectedVehicle.mileage &&
              this.dispensations.selectedVehicle.mileage.recommended
                ? this.dispensations.selectedVehicle.mileage.recommended
                : 1
            }
            value={
              item.vehicleDetails &&
              item.vehicleDetails.mileage &&
              item.vehicleDetails.mileage.value
                ? item.vehicleDetails.mileage.value
                : 0
            }
          />
          <Text style={[AppStyles.regularBoldText, AppStyles.textSpace]}>
            {this.getMileageValue(item)}
          </Text>
        </View>
      </View>
    );
  }

  getMileageValue(item) {
    if (
      item.vehicleDetails &&
      item.vehicleDetails.mileage &&
      item.vehicleDetails.mileage.value
    ) {
      return item.vehicleDetails.mileage.value + ' km/l';
    }
  }

  renderItemSeparator() {
    return <View style={[AppStyles.horizontalLine, styles.horizontalLine]} />;
  }

  render() {
    if (Vehicles.list && Vehicles.list.length) {
      return (
        <View style={[AppStyles.containerWhite, styles.mainView]}>
          <TouchableOpacity
            style={styles.infoView}
            onPress={() =>
              this.props.renderList({
                data: Vehicles.list,
                onPress: this.onPressVehicleItem.bind(this),
              })
            }>
            <View style={styles.vehicleNameView}>
              <Text style={[AppStyles.regularBoldText, AppStyles.darkText]}>
                {this.dispensations.selectedVehicle &&
                  this.dispensations.selectedVehicle.number}
              </Text>
              <Text style={[AppStyles.regularText, styles.vehicleNameText]}>
                {this.dispensations.selectedVehicle &&
                  this.dispensations.selectedVehicle.manufacturer}{' '}
                {this.dispensations.selectedVehicle &&
                  this.dispensations.selectedVehicle.model}
              </Text>
            </View>
            <View style={styles.downIconView}>
              <MaterialCommunityIcons
                style={[styles.downIcon]}
                name="chevron-down"
              />
            </View>
          </TouchableOpacity>
          <ScrollView
            alwaysBounceVertical={false}
            showsVerticalScrollIndicator={false}>
            <View style={styles.mileageDetailsMainView}>
              {this.dispensations.selectedVehicle &&
              this.dispensations.selectedVehicle.image &&
              this.dispensations.selectedVehicle.image.url ? (
                <View style={styles.vehicleImageView}>
                  <Image
                    style={[styles.vehicleImage]}
                    onLoadStart={e => this.setState({imageLoading: true})}
                    onLoadEnd={e => this.setState({imageLoading: false})}
                    source={{
                      uri:
                        this.dispensations.selectedVehicle &&
                        this.dispensations.selectedVehicle.image &&
                        this.dispensations.selectedVehicle.image.url,
                    }}
                  />
                  {this.state.imageLoading ? (
                    <View style={styles.imageLoadingView}>
                      <LoadingSmall color={AppColors.brand.secondary} />
                    </View>
                  ) : null}
                </View>
              ) : null}
              <View style={styles.mileageView}>
                <View style={styles.mileageMeterView}>
                  <Speedometer
                    showIndicator
                    size={250}
                    outerColor={AppColors.brand.primary}
                    internalColor={AppColors.brand.secondary}
                    indicatorColor={AppColors.brand.primary}
                    totalValue={
                      this.dispensations.selectedVehicle &&
                      this.dispensations.selectedVehicle.mileage &&
                      this.dispensations.selectedVehicle.mileage.recommended
                        ? this.dispensations.selectedVehicle.mileage.recommended
                        : 1
                    }
                    value={
                      this.dispensations.selectedVehicle &&
                      this.dispensations.selectedVehicle.mileage &&
                      this.dispensations.selectedVehicle.mileage.average
                        ? this.dispensations.selectedVehicle.mileage.average
                        : 0
                    }
                  />
                </View>
                <Text style={[AppStyles.regularBoldText, styles.labelText]}>
                  Your average mileage*
                </Text>
                {this.dispensations.selectedVehicle &&
                this.dispensations.selectedVehicle.mileage &&
                this.dispensations.selectedVehicle.mileage.average ? (
                  <Text style={[AppStyles.largeText, styles.valueText]}>
                    {this.dispensations.selectedVehicle.mileage.average.toFixed(
                      1,
                    ) + ' km/l'}
                  </Text>
                ) : (
                  <Text style={[AppStyles.largeText, styles.valueText]}>
                    0 km/l
                  </Text>
                )}
                <Text style={[AppStyles.regularBoldText, styles.labelText]}>
                  Recommended mileage
                </Text>
                {this.dispensations.selectedVehicle &&
                this.dispensations.selectedVehicle.mileage &&
                this.dispensations.selectedVehicle.mileage.recommended ? (
                  <Text style={[AppStyles.semiLargeText, styles.valueText]}>
                    {this.dispensations.selectedVehicle.mileage.recommended.toFixed(
                      1,
                    ) + ' km/l'}
                  </Text>
                ) : (
                  <Text style={[AppStyles.semiLargeText, styles.valueText]}>
                    0 km/l
                  </Text>
                )}
              </View>
            </View>
            <View style={styles.averageMileageInfoView}>
              <Text style={AppStyles.mediumRegularText}>
                * Average mileage for two consecutive top up fueling and depend
                on the accuracy of odometer reading
              </Text>
            </View>
            {this.dispensations.selectedVehicle &&
            this.dispensations.selectedVehicle.dispensations &&
            this.dispensations.selectedVehicle.dispensations.length ? (
              <View style={styles.dispensationDetailsView}>
                <View style={styles.dispensationsLabelView}>
                  <Text style={AppStyles.titleBoldText}>Recent Readings</Text>
                </View>
                <FlatList
                  scrollEnabled={false}
                  data={this.dispensations.selectedVehicle.dispensations}
                  keyExtractor={this._keyExtractor}
                  renderItem={({item}) => this.renderDispensationItem(item)}
                  ItemSeparatorComponent={() => this.renderItemSeparator()}
                  contentContainerStyle={styles.listContentContainerStyle}
                  extraData={JSON.stringify(
                    this.dispensations.selectedVehicle.dispensations,
                  )}
                />
              </View>
            ) : null}
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
            content={
              'Please add vehicles and record dispensations to see the mileage'
            }
          />
        </View>
      );
    }
  }
}

export default MyMileage;
