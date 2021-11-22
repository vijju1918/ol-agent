/**
 * Copyright (c) 2018-present, Oleum. All rights reserved.
 *
 */
'use strict';

import React, {Component} from 'react';
import {observer} from 'mobx-react';
import {View, Text, ScrollView} from 'react-native';
import PropTypes from 'prop-types';
import {showMessage} from 'react-native-flash-message';

import Button from '@components/Button';
import DetailsTable from '@components/DetailsTable';
import Loading from '@components/Loading';
import Image from '@components/Image';

import AppStrings from '@config/strings';
import {AppStyles} from '@theme';
import styles from './styles';
import {AppConstants, AppResources} from '@config';

import {DispenseRequest as DispenseRequestStore} from '@stores/DispenseRequests';

@observer
class AgentRequestDetails extends Component {
  constructor(props) {
    super(props);
    this.dispenseRequestStore = new DispenseRequestStore(props.data);
  }

  getMatchedMaterialSegment(quantity) {
    let matchedSegment =
      this.dispenseRequestStore.segments &&
      this.dispenseRequestStore.segments.length &&
      this.dispenseRequestStore.segments.find(
        eachSegment =>
          quantity >= eachSegment.minQuantity &&
          quantity <= eachSegment.maxQuantity,
      );
    return matchedSegment;
  }

  completeRequest(
    quantity,
    vehicleNumber,
    isFullTank,
    fuelNozzleId,
    odometer,
    selectedProduct,
  ) {
    if (Number(quantity) > 0) {
      let fuelQuantity = this.getFuelQuantityValue();
      if (this.dispenseRequestStore.type === 'MATERIAL') {
        this.dispenseRequestStore.setDispensedQuatity(quantity);
        let matchedMaterialSegment = this.getMatchedMaterialSegment(quantity);
        if (matchedMaterialSegment && matchedMaterialSegment.id) {
          this.dispenseRequestStore
            .completeDispenseRequest()
            .then(data => {
              if (data) {
                this.props.renderAgentReceipt({
                  data: new DispenseRequestStore(data, true),
                });
              }
            })
            .catch(error => {
              DispenseRequestStore.loading = false;
              showMessage({
                message:
                  error && error.details && error.details.displayMessage
                    ? error.details.displayMessage
                    : 'Something went wrong! Could not compete the dispensation now. Please try again!',
              });
            });
        } else {
          showMessage({
            message: 'Please enter the quantity with in the range!',
          });
        }
      } else if (Number(quantity) <= fuelQuantity) {
        this.dispenseRequestStore.setDispensedQuatity(quantity);
        this.dispenseRequestStore.vehicleNumber = vehicleNumber;
        this.dispenseRequestStore.isFullTank = isFullTank;
        this.dispenseRequestStore.fuelNozzleId = fuelNozzleId;
        this.dispenseRequestStore.odometer = odometer;
        this.dispenseRequestStore.product = selectedProduct;
        this.dispenseRequestStore
          .completeDispenseRequest()
          .then(data => {
            if (data) {
              this.props.renderAgentReceipt({
                data: new DispenseRequestStore(data, true),
              });
            }
          })
          .catch(error => {
            DispenseRequestStore.loading = false;
            showMessage({
              message:
                error && error.details && error.details.displayMessage
                  ? error.details.displayMessage
                  : 'Something went wrong! Could not compete the dispensation now. Please try again!',
            });
          });
      } else {
        showMessage({
          message: 'Please enter a value less than the requested quantity ',
        });
      }
    } else {
      showMessage({
        message: 'Please add the dispensed quantity',
      });
    }
  }

  renderOrderDetails() {
    if (this.dispenseRequestStore.type === 'MATERIAL') {
      return this.renderMaterialDetails();
    } else {
      return this.renderFuelDispenseDetails();
    }
  }

  getConfirmationText() {
    if (this.dispenseRequestStore.type === 'MATERIAL') {
      return 'Please enter the quantity of material weighed';
    } else {
      return 'Please enter the quantity of fuel dispensed';
    }
  }

  renderMaterialDetails() {
    return (
      <View>
        <View style={styles.labelView}>
          <Text style={[AppStyles.regularBoldText, AppStyles.darkText]}>
            {this.dispenseRequestStore.material.perUnit
              ? AppStrings.materialRangeInfoText.replace(
                  '<condition>',
                  'Per Unit',
                )
              : AppStrings.materialRangeInfoText.replace(
                  '<condition>',
                  'Flat Rate',
                )}
          </Text>
        </View>
        <DetailsTable listData={this.dispenseRequestStore.materialSegments} />
      </View>
    );
  }

  renderFuelDispenseDetails() {
    return (
      <View>
        <View style={styles.labelTextView}>
          <Text style={[AppStyles.regularBoldText, AppStyles.darkText]}>
            {AppStrings.vehicle}
          </Text>
        </View>
        {this.dispenseRequestStore.dispensationVehicle &&
        this.dispenseRequestStore.dispensationVehicle.id ? (
          <View style={[AppStyles.row, styles.vehicleNumberView]}>
            <Text style={[AppStyles.largeText, AppStyles.darkText]}>
              {this.dispenseRequestStore.dispensationVehicle &&
                this.dispenseRequestStore.dispensationVehicle.number}
            </Text>
            <View style={styles.fuelPointView}>
              <Text style={[AppStyles.largeText]}>{this.getFuelPoints()}</Text>
            </View>
          </View>
        ) : null}
      </View>
    );
  }

  getFuelPoints() {
    if (
      this.dispenseRequestStore.valueType ===
      AppConstants.quantityType.fuelPoint
    ) {
      return (
        this.dispenseRequestStore.value +
        ' ' +
        this.dispenseRequestStore.valueUnit
      );
    } else if (
      this.dispenseRequestStore.quantity &&
      this.dispenseRequestStore.quantity.type ===
        AppConstants.quantityType.fuelPoint
    ) {
      return (
        this.dispenseRequestStore.quantity.value +
        ' ' +
        this.dispenseRequestStore.quantity.unit
      );
    } else {
      return '';
    }
  }

  getFuelQuantity() {
    if (
      this.dispenseRequestStore.valueType === AppConstants.quantityType.fuel
    ) {
      return (
        this.dispenseRequestStore.value +
        ' ' +
        this.dispenseRequestStore.valueUnit
      );
    } else if (
      this.dispenseRequestStore.quantity &&
      this.dispenseRequestStore.quantity.type === AppConstants.quantityType.fuel
    ) {
      return (
        this.dispenseRequestStore.quantity.value +
        ' ' +
        this.dispenseRequestStore.quantity.unit
      );
    } else {
      return '';
    }
  }

  showDispensedQuantity() {
    if (
      this.dispenseRequestStore.valueType ===
      AppConstants.quantityType.fuelPoint
    ) {
      return this.dispenseRequestStore.value;
    } else if (
      this.dispenseRequestStore.quantity &&
      this.dispenseRequestStore.quantity.type ===
        AppConstants.quantityType.fuelPoint
    ) {
      return this.dispenseRequestStore.quantity.value;
    } else {
      return '';
    }
  }

  getFuelQuantityValue() {
    if (
      this.dispenseRequestStore.valueType ===
      AppConstants.quantityType.fuelPoint
    ) {
      return this.dispenseRequestStore.value;
    } else if (
      this.dispenseRequestStore.quantity &&
      this.dispenseRequestStore.quantity.type ===
        AppConstants.quantityType.fuelPoint
    ) {
      return this.dispenseRequestStore.quantity.value;
    } else {
      return '';
    }
  }

  onPressNext() {
    if (this.dispenseRequestStore.type === 'MATERIAL') {
      this.props.renderDispenseConfirmation({
        onPressOK: this.completeRequest.bind(this),
        message: this.getConfirmationText(),
        defaultValue: this.showDispensedQuantity(),
      });
    } else {
      this.props.renderDispenseRecord({
        onPressOK: this.completeRequest.bind(this),
        message: this.getConfirmationText(),
        defaultValue: this.showDispensedQuantity(),
        fuelQuantityValue: this.getFuelQuantityValue(),
        defaultVehicleNumber:
          this.dispenseRequestStore.dispensationVehicle &&
          this.dispenseRequestStore.dispensationVehicle.number,
        defaultVehicleFuelType:
          this.dispenseRequestStore.dispensationVehicle &&
          this.dispenseRequestStore.dispensationVehicle.fuelType,
      });
    }
  }

  render() {
    if (this.dispenseRequestStore.loading) {
      return (
        <View style={AppStyles.container}>
          <Loading />
        </View>
      );
    }
    return (
      <View style={AppStyles.container}>
        <View style={styles.infoView}>
          <Text style={[AppStyles.regularText, AppStyles.darkText]}>
            {this.dispenseRequestStore.type === 'MATERIAL'
              ? 'Material deposit request details'
              : 'Fuel dispensation request details'}
          </Text>
        </View>
        <ScrollView
          alwaysBounceVertical={false}
          showsVerticalScrollIndicator={false}>
          <View style={styles.labelTextView}>
            <Text style={[AppStyles.regularBoldText, AppStyles.darkText]}>
              {AppStrings.customer}
            </Text>
          </View>
          <View style={styles.agentDetailsView}>
            <View style={styles.agentImageView}>
              <Image
                style={[styles.profilePicImage]}
                source={
                  this.dispenseRequestStore.user.image
                    ? {
                        uri: this.dispenseRequestStore.user.image.url,
                      }
                    : AppResources.noProfilePic
                }
              />
            </View>
            <View style={styles.agentNameAndDesignationView}>
              <Text style={[AppStyles.subTitleText, AppStyles.darkText]}>
                {this.dispenseRequestStore.user.name}
              </Text>
            </View>
          </View>
          {this.renderOrderDetails()}
          <View style={styles.labelView}>
            <Text style={[AppStyles.regularBoldText, AppStyles.darkText]}>
              {AppStrings.details}
            </Text>
          </View>
          <View style={styles.detailsTableView}>
            <DetailsTable
              listData={
                this.dispenseRequestStore.type === 'MATERIAL'
                  ? this.dispenseRequestStore.materialDispensationDetailsAgent
                  : this.dispenseRequestStore.dispensationDetailsAgent
              }
            />
          </View>
        </ScrollView>
        <View style={styles.buttonView}>
          <Button
            buttonText={AppStrings.next}
            onPress={() => this.onPressNext()}
          />
        </View>
      </View>
    );
  }
}

AgentRequestDetails.propTypes = {
  data: PropTypes.object.isRequired,
};

export default AgentRequestDetails;
