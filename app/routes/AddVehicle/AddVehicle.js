/**
 * Copyright (c) 2018-present, Oleum. All rights reserved.
 *
 */
'use strict';

import React, {Component} from 'react';
import {
  View,
  ScrollView,
  Text,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {observer} from 'mobx-react';
import ImagePicker from 'react-native-image-crop-picker';
import {showMessage} from 'react-native-flash-message';

import Button from '@components/Button';
import CustomTextField from '@components/CustomTextField';
import CustomSelectField from '@components/CustomSelectField';
import LoadingShadow from '@components/LoadingShadow';
import Image from '@components/Image';

import {Vehicle} from '@stores/Vehicles';
import VehicleDetails from '@stores/VehicleDetails';

import {AppStyles} from '@theme';
import {AppStrings} from '@config';
import styles from './styles';
import {AppResources} from '../../config';
import {isValidVehicleNumber} from '../../lib/utils';

@observer
class AddVehicle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedVehicleId: '',
      isVehicleRegistrationDetailsMethodComplted: false,
      isVehicleRegistrationDetailsMethodSuccess: false,
      vehicleRegistrationDetailsMethodError: '',
      fuelTypeFromMethodCall: '',
      manufactureFromMethodCall: '',
      modelFromMethodCall: '',
      showDetailsView: false,
    };
    this.vehicle = new Vehicle(props.data);
  }

  onPressFuelTypeItem(fuelType) {
    this.vehicle.fuelTypeId = fuelType && fuelType.id;
  }

  onPressVehicleTypeItem(vehicleType) {
    this.vehicle.vehicleType = vehicleType && vehicleType.title;
  }

  onChangeManufacturer(manufacturer) {
    this.vehicle.manufacturer = manufacturer;
  }

  onChangeModel(model) {
    this.vehicle.model = model;
  }

  onChangeMileage(mileage) {
    this.vehicle.recommendedMileage = Number(mileage);
  }

  onPressSave() {
    if (!this.vehicle.number) {
      showMessage({
        message: 'Registration number is missing',
      });
    } else if (!this.vehicle.fuelTypeId) {
      showMessage({
        message: 'Select one fuel type',
      });
    } else if (!this.vehicle.vehicleType) {
      showMessage({
        message: 'Select one vehicle type',
      });
    } else if (!this.vehicle.recommendedMileage) {
      showMessage({
        message: 'Enter vehicle average mileage',
      });
    } else {
      this.vehicle
        .addOrUpdateVehicle()
        .then(data => {
          if (data) {
            this.props.onBack();
            console.log('saving Success');
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
  }

  uploadVehicleImage() {
    ImagePicker.openPicker({
      width: AppStyles.windowSize.width,
      height: (AppStyles.windowSize.width / 4) * 3,
      cropping: true,
    }).then(image => {
      if (image) {
        this.vehicle.meteorUploadVehicleImage(image).then(imageData => {
          if (imageData) {
            this.vehicle.image = {
              id: imageData.data._id,
              url: imageData.data.url,
            };
            showMessage({
              message: 'Vehicle image uploaded Successfully..!!',
            });
          } else {
            showMessage({
              message: 'Oops, Something went wrong. Please try again!',
            });
          }
        });
      } else {
        showMessage({
          message: 'Oops, Something went wrong. Please try again!',
        });
      }
    });
  }

  renderVehicleImageView() {
    if (this.vehicle && this.vehicle.image && this.vehicle.image.url) {
      return (
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.addImageView}
          onPress={this.uploadVehicleImage.bind(this)}>
          <Image
            style={styles.addVehiclePlaceholderImage}
            source={{
              uri: this.vehicle && this.vehicle.image && this.vehicle.image.url,
            }}
          />
          <TouchableHighlight>
            <Text style={[AppStyles.regularBoldText, AppStyles.textSpace]}>
              Update Image
            </Text>
          </TouchableHighlight>
        </TouchableOpacity>
      );
    } else {
      return (
        <View style={styles.addImageView}>
          <TouchableHighlight
            activeOpacity={1}
            underlayColor={'#00000020'}
            style={styles.addImageTouch}
            onPress={this.uploadVehicleImage.bind(this)}>
            <View style={styles.imageAndIconView}>
              <Image
                style={styles.addVehicleImage}
                source={AppResources.vehicle}
              />
              <View style={styles.addIconView}>
                <MaterialCommunityIcons style={styles.addIcon} name="plus" />
              </View>
            </View>
          </TouchableHighlight>
          <Text style={[AppStyles.regularText, styles.addPhotoText]}>
            Add Photo
          </Text>
        </View>
      );
    }
  }

  getFuelName() {
    if (
      VehicleDetails.vehicleInfo &&
      VehicleDetails.vehicleInfo.fuelTypes &&
      VehicleDetails.vehicleInfo.fuelTypes.length
    ) {
      return VehicleDetails.vehicleInfo.fuelTypes.find(
        eachFuel => eachFuel.id === this.vehicle.fuelTypeId,
      )
        ? VehicleDetails.vehicleInfo.fuelTypes.find(
            eachFuel => eachFuel.id === this.vehicle.fuelTypeId,
          ).title
        : '';
    }
    return '';
  }

  getFuelTypeId(fuelTitle) {
    if (
      VehicleDetails.vehicleInfo &&
      VehicleDetails.vehicleInfo.fuelTypes &&
      VehicleDetails.vehicleInfo.fuelTypes.length
    ) {
      return VehicleDetails.vehicleInfo.fuelTypes.find(
        eachFuel => eachFuel.id === fuelTitle,
      )
        ? VehicleDetails.vehicleInfo.fuelTypes.find(
            eachFuel => eachFuel.id === fuelTitle,
          ).id
        : '';
    }
    return '';
  }

  vehicleRegistrationDetails(data) {
    let regData = {
      number: this.vehicle.number,
      fuelType: this.getFuelTypeId(data && data.fuelType),
      manufacturer: data && data.manufacture ? data.manufacture : '',
      model: data && data.model ? data.model : '',
      vehicleType: '',
      recommendedMileage: '',
    };
    return regData;
  }

  onPressGetVehicleDetails() {
    if (isValidVehicleNumber(this.vehicle.number)) {
      this.vehicle
        .getVehicleRegistrationDetails()
        .then(result => {
          this.vehicle.set(this.vehicleRegistrationDetails(result), true);
          this.setState({
            isVehicleRegistrationDetailsMethodComplted: true,
            isVehicleRegistrationDetailsMethodSuccess: true,
            fuelTypeFromMethodCall:
              result && result.fuelType ? result.fuelType : '',
            manufactureFromMethodCall:
              result && result.manufacture ? result.manufacture : '',
            modelFromMethodCall: result && result.model ? result.model : '',
          });
        })
        .catch(error => {
          this.vehicle.set(this.vehicleRegistrationDetails(null), true);
          this.setState({
            isVehicleRegistrationDetailsMethodComplted: true,
            vehicleRegistrationDetailsMethodError:
              error && error.details && error.details.displayMessage
                ? error.details.displayMessage
                : '',
            fuelTypeFromMethodCall: '',
            manufactureFromMethodCall: '',
            modelFromMethodCall: '',
          });
        });
      this.setState({
        showDetailsView: true,
      });
    } else {
      showMessage({
        message: 'Invalid registration number',
      });
    }
  }

  renderGetVehicleDetailsButton() {
    if (
      !this.state.showDetailsView &&
      this.state.isVehicleRegistrationDetailsMethodComplted
    ) {
      return (
        <TouchableOpacity
          style={styles.buttonTouch}
          onPress={() => this.onPressGetVehicleDetails()}>
          <Text style={[AppStyles.regularBoldText, AppStyles.darkText]}>
            Get Vehicle Details
          </Text>
        </TouchableOpacity>
      );
    } else if (
      !this.props.edit &&
      !this.state.isVehicleRegistrationDetailsMethodComplted
    ) {
      return (
        <TouchableOpacity
          style={styles.buttonTouch}
          onPress={() => this.onPressGetVehicleDetails()}>
          <Text style={[AppStyles.regularBoldText, AppStyles.darkText]}>
            Get Vehicle Details
          </Text>
        </TouchableOpacity>
      );
    } else {
      return null;
    }
  }

  onPressChangeNumber() {
    this.setState({
      showDetailsView: false,
    });
    this.vehicle.reset();
  }

  renderChangeNumberButton() {
    if (
      this.state.showDetailsView &&
      !this.props.edit &&
      this.state.isVehicleRegistrationDetailsMethodComplted
    ) {
      return (
        <TouchableOpacity
          style={styles.changeNumberTouch}
          onPress={() => this.onPressChangeNumber()}>
          <Text style={[AppStyles.mediumBoldText, styles.changeNumberText]}>
            Change Number
          </Text>
        </TouchableOpacity>
      );
    }
  }

  renderInputSections() {
    return (
      <View style={styles.detailsInputView}>
        <View style={styles.inputView}>
          <CustomSelectField
            label={'Fuel Type'}
            placeholder={'Select fuel type'}
            value={this.getFuelName()}
            onPress={() =>
              this.props.renderList({
                data:
                  VehicleDetails.vehicleInfo &&
                  VehicleDetails.vehicleInfo.fuelTypes &&
                  VehicleDetails.vehicleInfo.fuelTypes.length
                    ? VehicleDetails.vehicleInfo.fuelTypes
                    : [],
                onPress: this.onPressFuelTypeItem.bind(this),
              })
            }
          />
        </View>
        <View style={styles.inputView}>
          <CustomSelectField
            label={'Vehicle Type'}
            placeholder={'Select vehicle type'}
            value={this.vehicle.vehicleType}
            onPress={() =>
              this.props.renderList({
                data:
                  VehicleDetails.vehicleInfo &&
                  VehicleDetails.vehicleInfo.vehicleTypes &&
                  VehicleDetails.vehicleInfo.vehicleTypes.length
                    ? VehicleDetails.vehicleInfo.vehicleTypes
                    : [],
                onPress: this.onPressVehicleTypeItem.bind(this),
              })
            }
          />
        </View>
        <View style={styles.inputView}>
          <CustomTextField
            label={'Manufacturer'}
            placeholder={'Enter manufacturer'}
            value={this.vehicle.manufacturer}
            onChangeText={manufacturer => {
              this.onChangeManufacturer(manufacturer);
            }}
            autoCapitalize={'characters'}
            maxLength={15}
          />
        </View>
        <View>
          <View style={styles.inputView}>
            <CustomTextField
              label={'Model'}
              placeholder={'Enter model'}
              value={this.vehicle.model}
              onChangeText={model => {
                this.onChangeModel(model);
              }}
              autoCapitalize={'characters'}
              maxLength={15}
            />
          </View>
        </View>
        <View style={styles.inputView}>
          <CustomTextField
            label={'Recommended Mileage (km/l)'}
            placeholder={'Enter recommended mileage of the vehicle'}
            keyboardType="numeric"
            value={this.vehicle.recommendedMileage}
            onChangeText={mileage => {
              this.onChangeMileage(mileage);
            }}
            maxLength={3}
          />
        </View>
        {this.renderVehicleImageView()}
      </View>
    );
  }

  renderVehicleDetailsInputFields() {
    if (this.state.showDetailsView || this.props.edit) {
      return this.renderInputSections();
    } else if (
      this.state.showDetailsView &&
      this.state.isVehicleRegistrationDetailsMethodComplted
    ) {
      return this.renderInputSections();
    } else {
      return null;
    }
  }

  renderWarningMessage() {
    if (
      this.state.showDetailsView &&
      this.state.vehicleRegistrationDetailsMethodError
    ) {
      return (
        <View style={styles.warningMessageView}>
          <Text style={[AppStyles.mediumRegularText, AppStyles.darkText]}>
            Unable to fetch vehicle details. Please enter the details manually
          </Text>
        </View>
      );
    }
  }

  getDisableButtonStatus() {
    if (this.props.edit) {
      return true;
    } else if (
      this.state.isVehicleRegistrationDetailsMethodComplted &&
      this.state.showDetailsView
    ) {
      return true;
    } else {
      return false;
    }
  }

  render() {
    if (
      VehicleDetails.getVehicleDetailsLoading ||
      this.vehicle.getVehicleRegistrationDetailsLoading ||
      this.vehicle.addVehicleLoading
    ) {
      return (
        <View style={AppStyles.container}>
          <LoadingShadow />
        </View>
      );
    } else {
      return (
        <View style={[AppStyles.containerWhite, styles.mainView]}>
          <ScrollView
            alwaysBounceVertical={false}
            showsVerticalScrollIndicator={false}>
            <View style={styles.infoView}>
              <Text style={[AppStyles.regularText, AppStyles.darkText]}>
                Insert Vehicle Details
              </Text>
            </View>
            <View style={styles.inputMainView}>
              <View style={styles.inputView}>
                <CustomTextField
                  label={'Registration Number'}
                  placeholder={'Enter registration number'}
                  value={this.vehicle.formattedNumber}
                  disabled={this.getDisableButtonStatus()}
                  onChangeText={regNumber => {
                    this.vehicle.updateNumber(regNumber);
                  }}
                  autoCapitalize={'characters'}
                  maxLength={15}
                  error={this.state.errorRegistrationNumber}
                />
              </View>
              {this.renderGetVehicleDetailsButton()}
              {this.renderWarningMessage()}
              {this.renderChangeNumberButton()}
            </View>
            {this.renderVehicleDetailsInputFields()}
          </ScrollView>
          {(this.state.showDetailsView &&
            this.state.isVehicleRegistrationDetailsMethodComplted) ||
          this.props.edit ? (
            <View style={styles.saveButtonView}>
              <Button
                buttonText={AppStrings.save}
                onPress={() => this.onPressSave()}
              />
            </View>
          ) : null}
        </View>
      );
    }
  }
}

export default AddVehicle;
