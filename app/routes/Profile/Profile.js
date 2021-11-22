/**
 * Copyright (c) 2018-present, Oleum. All rights reserved.
 *
 */
'use strict';

import React, {Component} from 'react';
import {
  View,
  TouchableOpacity,
  ScrollView,
  Text,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {observer} from 'mobx-react';
import ImagePicker from 'react-native-image-crop-picker';
import RNGooglePlaces from 'react-native-google-places';
import {showMessage} from 'react-native-flash-message';

import Button from '@components/Button';
import Loading from '@components/Loading';
import CustomTextInput from '@components/CustomTextInput';
import Image from '@components/Image';

import AccountStore, {Profile as ProfileStore} from '@stores/Account';
import {Vehicle} from '@stores/Vehicles';
import Locations from '@stores/Locations';
import {isNumber, isRequired, isEmail} from '@lib/validator';

import {getImageDisplayUri, decodePosition} from '../../lib/utils';
import {fetchAndParseGeoLocationData} from '@lib/geocoder';

import {AppColors, AppStyles, AppFonts} from '@theme';
import AppStrings from '@config/strings';
import {AppResources} from '@config';
import styles from './styles';

@observer
class Profile extends Component {
  constructor(props) {
    super(props);
    this.profile = new ProfileStore(
      JSON.parse(JSON.stringify(AccountStore.profile)),
    );
    this.state = {
      errorName: null,
      errorEmail: null,
      errorPhoneNumber: null,
      errorAddressLineOne: null,
      errorAddressLineTwo: null,
      errorCountry: null,
      errorState: null,
      errorPincode: null,
      errorCity: null,
      profileImage: '',
      licenseImage: '',
      uploadResultProfileImage: '',
      uploadResultLicenseImage: '',
    };
    this.vehicle = new Vehicle();
  }

  openLocationSearchModal() {
    RNGooglePlaces.openAutocompleteModal()
      .then(place => {
        if (place) {
          if (place.address) {
            this.setLocationState({
              latitude: place.location.latitude,
              longitude: place.location.longitude,
              address: place.address,
              name: place.name,
            });
          } else {
            decodePosition({
              lat: place.latitude,
              lng: place.longitude,
            }).then(address => {
              this.setLocationState({
                latitude: place.location.latitude,
                longitude: place.location.longitude,
                address: address,
                name: '',
              });
            });
          }
        }
      })
      .catch(error => console.log(error.message)); // error is a Javascript Error object
  }

  getToSearchData(locationData) {
    let data = [];
    if (locationData) {
      if (locationData.locality && locationData.locality.length) {
        data = data.concat(locationData.locality);
      }
      if (locationData.district && locationData.district.length) {
        data = data.concat(locationData.district);
      }
      if (locationData.state && locationData.state.length) {
        data = data.concat(locationData.state);
      }
      if (locationData.country && locationData.country.length) {
        data = data.concat(locationData.country);
      }
      if (locationData.postalCode && locationData.postalCode.length) {
        data = data.concat(locationData.postalCode);
      }
    }
    return data;
  }

  setLocationState(location) {
    this.profile.address.city = location.name;
    // this.city.setValue(location.name);
    if (!Locations.locationDetails.currentLocation) {
      Locations.locationDetails.currentLocation = {
        cordinates: [location.longitude, location.latitude],
        search: [location.address],
      };
    } else {
      console.log('skipped saving');
    }
    this.setState({
      errorCity: isRequired(location.name).message,
    });

    fetchAndParseGeoLocationData(location.latitude, location.longitude)
      .then(locationData => {
        if (locationData) {
          this.profile.setLocationDetails({
            location: {
              coordinates: [
                Number(location.longitude),
                Number(location.latitude),
              ],
            },
            locationDetails: {
              google: locationData,
              toSearch: this.getToSearchData(locationData),
            },
          });
          this.profile.address.city;
          if (locationData.postalCode) {
            this.profile.address.pincode = locationData.postalCode[0];
            this.setState({
              errorPincode: isNumber(locationData.postalCode[0]).message,
            });
            this.pin.setValue(locationData.postalCode[0]);
          } else {
            console.log('no postalCode');
          }
        } else {
          console.log('no location');
        }
      })
      .catch(error => console.log(error));
  }

  /**
   * Email validation before method call.(Optional)
   *
   * @return {Boolean}
   * @memberof Profile
   */
  isEmailFieldValid() {
    if (this.profile.email) {
      if (!this.state.errorEmail) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  }

  validate() {
    if (
      this.profile.fullName &&
      AccountStore.user.number &&
      this.isEmailFieldValid()
    ) {
      this.profileUpdation();
    } else if (!this.profile.fullName) {
      this.setState({
        errorName: 'Name is required',
      });
      showMessage({
        message: 'Name is required',
      });
    } else if (!this.isEmailFieldValid()) {
      showMessage({
        message: 'Valid email address is required',
      });
    } else if (!this.profile.address.city && !this.profile.address.pincode) {
      this.setState({
        errorPincode: 'Pincode is missing',
        errorCity: 'City is missing',
      });
    } else if (!AccountStore.user.number) {
      this.setState({
        errorPhoneNumber: 'Phone Number is required',
      });
    } else {
      return null;
    }
  }

  profileUpdation() {
    this.profile
      .userProfileUpdation()
      .then(data => {
        if (data) {
          this.profile.loading = false;
          this.props.renderHome();
          showMessage({
            message: 'Profile details successfully updated!',
          });
        } else {
          this.profile.loading = false;
          showMessage({
            message: 'Something went wrong. Please try later',
          });
        }
      })
      .catch(error => {
        this.profile.loading = false;
        showMessage({
          message:
            error && error.details && error.details.displayMessage
              ? error.details.displayMessage
              : 'Unable to update profile details, Please try later',
        });
      });
  }

  upload() {
    ImagePicker.openPicker({
      width: AppStyles.windowSize.width,
      height: AppStyles.windowSize.width,
      cropping: true,
    }).then(image => {
      if (image) {
        this.setState({
          profileImage: image,
        });
        AccountStore.meteorUploadProfileImage(
          image,
          AccountStore.user.endUserId,
          AccountStore.user.type,
        ).then(data => {
          if (data) {
            this.setState({
              uploadResultProfileImage: JSON.parse(data && data.responseBody),
            });
            showMessage({
              message: 'Profile image uploaded Successfully..!!',
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

  uploadLicenseImage() {
    ImagePicker.openPicker({
      width: AppStyles.windowSize.width,
      height: (AppStyles.windowSize.width / 4) * 3,
      cropping: true,
    }).then(image => {
      if (image) {
        this.setState({
          licenseImage: image,
        });
        this.vehicle.meteorUploadLicenseImage(image).then(imageData => {
          if (imageData) {
            this.setState({
              uploadResultLicenseImage: imageData && imageData.data,
            });
            this.profile.licenseImage = {
              id: imageData.data._id,
              url: imageData.data.url,
            };
            showMessage({
              message: 'License uploaded Successfully..!!',
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

  getProfileImageSource() {
    let imageSource = '';
    if (
      this.state.uploadResultProfileImage &&
      this.state.uploadResultProfileImage.data &&
      this.state.uploadResultProfileImage.data.url
    ) {
      imageSource = this.state.uploadResultProfileImage.data.url;
    } else if (this.state.profileImage.sourceURL) {
      imageSource = this.state.profileImage.sourceURL;
    } else if (this.state.profileImage.path) {
      imageSource = this.state.profileImage.path;
    } else {
      imageSource = this.profile.profileImage
        ? this.profile.profileImage.url
        : '';
    }
    if (imageSource) {
      return getImageDisplayUri(imageSource, AppResources.noProfilePic);
    } else {
      return AppResources.noProfilePic;
    }
  }

  getLicenseImageSource() {
    let imageSource = '';
    if (
      this.state.uploadResultLicenseImage &&
      this.state.uploadResultLicenseImage.url
    ) {
      imageSource = this.state.uploadResultLicenseImage.url;
    } else if (this.state.licenseImage.sourceURL) {
      imageSource = this.state.licenseImage.sourceURL;
    } else if (this.state.licenseImage.path) {
      imageSource = this.state.licenseImage.path;
    } else {
      imageSource =
        this.profile.licenseImage && this.profile.licenseImage.url
          ? this.profile.licenseImage.url
          : '';
    }
    if (imageSource) {
      return getImageDisplayUri(imageSource, AppResources.noProfilePic);
    } else {
      return AppResources.noProfilePic;
    }
  }

  renderAddLicenseNumberView() {
    return (
      <TouchableOpacity
        style={AppStyles.row}
        onPress={() => this.uploadLicenseImage()}>
        <Text style={AppStyles.regularText}>
          {(this.state.uploadResultLicenseImage &&
            this.state.uploadResultLicenseImage.url) ||
          (this.profile.licenseImage && this.profile.licenseImage.id)
            ? 'Change'
            : 'Upload'}
        </Text>
        <View style={styles.buttonDarkView}>
          <MaterialCommunityIcons style={styles.buttonIcon} name="plus" />
        </View>
      </TouchableOpacity>
    );
  }

  renderLicenseImage() {
    if (
      (this.state.uploadResultLicenseImage &&
        this.state.uploadResultLicenseImage.url) ||
      (this.profile.licenseImage && this.profile.licenseImage.id)
    ) {
      return (
        <View>
          <Image
            style={[styles.licenseImageView]}
            source={this.getLicenseImageSource()}
            defaultSource={AppResources.noProfilePic}
            resizeMode={'contain'}
          />
        </View>
      );
    } else {
      return null;
    }
  }

  render() {
    if (this.profile.loading) {
      return (
        <View style={AppStyles.container}>
          <Loading />
        </View>
      );
    } else {
      return (
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : ''}
          keyboardVerticalOffset={100}
          style={[AppStyles.containerWhite, styles.mainView]}>
          <StatusBar
            backgroundColor={AppColors.statusBarBg}
            hidden={false}
            barStyle={AppColors.statusBarStyle}
          />
          <ScrollView
            alwaysBounceVertical={false}
            showsVerticalScrollIndicator={false}>
            <View style={styles.profileInfoView}>
              <Text style={[AppStyles.regularText, AppStyles.darkText]}>
                Add your personal details
              </Text>
            </View>
            <View style={styles.profileImageMainView}>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => this.upload()}>
                <View>
                  <Image
                    style={[styles.profileImageView]}
                    source={this.getProfileImageSource()}
                    defaultSource={AppResources.noProfilePic}
                  />
                  <View style={styles.buttonIconView}>
                    <MaterialCommunityIcons
                      style={styles.buttonIcon}
                      name="plus"
                    />
                  </View>
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.profileNameView}>
              <Text style={[AppStyles.cairoLabelText, AppStyles.darkText]}>
                {this.profile.fullName}
              </Text>
              <Text style={[AppStyles.mediumText, AppStyles.darkText]}>
                {AccountStore.user.number}
              </Text>
            </View>
            <View style={styles.detailsInputView}>
              <View style={styles.profileDetailsView}>
                <View style={styles.labelView}>
                  <Text style={[AppStyles.regularBoldText, AppStyles.darkText]}>
                    Personal details
                  </Text>
                </View>
                <View style={AppStyles.paddingHorizontal}>
                  <CustomTextInput
                    label="Full Name*"
                    baseColor={AppColors.inputLable}
                    tintColor={AppColors.brand.primary}
                    labelTextStyle={AppStyles.regularText}
                    fontSize={AppFonts.base.size}
                    autoCapitalize={'words'}
                    maxLength={30}
                    style={[AppStyles.regularText, styles.inputText]}
                    inputContainerStyle={styles.inputContainerStyle}
                    onChangeText={name => {
                      this.profile.fullName = name.replace(
                        /[^a-zA-Z0-9 ]/gi,
                        '',
                      );
                      this.setState({
                        errorName: isRequired(name).message,
                      });
                    }}
                    value={this.profile.fullName ? this.profile.fullName : ''}
                    error={this.state.errorName}
                    returnKeyType="next"
                  />
                  <CustomTextInput
                    ref={ref => {
                      this.emailId = ref;
                    }}
                    label="Email Id"
                    baseColor={AppColors.inputLable}
                    tintColor={AppColors.brand.primary}
                    inputContainerStyle={styles.inputContainerStyle}
                    labelTextStyle={AppStyles.regularText}
                    fontSize={AppFonts.base.size}
                    autoCapitalize={'none'}
                    style={[AppStyles.regularText, styles.inputText]}
                    onChangeText={email => {
                      this.profile.email = email;
                      this.setState({
                        errorEmail: email ? isEmail(email).message : null,
                      });
                    }}
                    value={this.profile.email ? this.profile.email : ''}
                    error={this.state.errorEmail}
                    returnKeyType="next"
                  />
                  <CustomTextInput
                    ref={ref => {
                      this.licenseNumber = ref;
                    }}
                    label="Driving License Number"
                    baseColor={AppColors.inputLable}
                    tintColor={AppColors.brand.primary}
                    inputContainerStyle={styles.inputContainerStyle}
                    labelTextStyle={AppStyles.regularText}
                    fontSize={AppFonts.base.size}
                    autoCapitalize={'none'}
                    maxLength={15}
                    style={[AppStyles.regularText, styles.inputText]}
                    onChangeText={licenseNumber => {
                      this.profile.licenseNumber = licenseNumber.replace(
                        /[^0-9/]/gi,
                        '',
                      );
                      this.forceUpdate();
                    }}
                    value={
                      this.profile.licenseNumber
                        ? this.profile.licenseNumber
                        : ''
                    }
                    returnKeyType="next"
                    renderRightAccessory={() =>
                      this.renderAddLicenseNumberView()
                    }
                  />
                </View>
                {this.renderLicenseImage()}
                <View style={[styles.labelView, styles.locationView]}>
                  <Text style={[AppStyles.regularBoldText, AppStyles.darkText]}>
                    Location
                  </Text>
                </View>
                <View style={AppStyles.paddingHorizontal}>
                  <TouchableOpacity
                    onPress={() => this.openLocationSearchModal()}>
                    <CustomTextInput
                      ref={ref => {
                        this.city = ref;
                      }}
                      label="City"
                      baseColor={AppColors.inputLable}
                      tintColor={AppColors.brand.primary}
                      inputContainerStyle={styles.inputContainerStyle}
                      fontSize={AppFonts.base.size}
                      labelTextStyle={AppStyles.regularText}
                      style={[AppStyles.regularText, styles.inputText]}
                      onChangeText={city => {
                        this.profile.address.city = city;
                        this.setState({
                          errorCity: isRequired(city).message,
                        });
                      }}
                      value={
                        this.profile.address && this.profile.address.city
                          ? this.profile.address.city
                          : ''
                      }
                      // error={this.state.errorCity}
                      returnKeyType="done"
                      editable={false}
                    />
                  </TouchableOpacity>
                  <CustomTextInput
                    ref={ref => {
                      this.pin = ref;
                    }}
                    label="PinCode"
                    baseColor={AppColors.inputLable}
                    tintColor={AppColors.brand.primary}
                    maxLength={6}
                    inputContainerStyle={styles.inputContainerStyle}
                    fontSize={AppFonts.base.size}
                    labelTextStyle={AppStyles.regularText}
                    style={[AppStyles.regularText, styles.inputText]}
                    keyboardType={'number-pad'}
                    onChangeText={pincode => {
                      this.profile.address.pincode = pincode;
                      this.setState({
                        errorPincode: isNumber(pincode).message,
                      });
                    }}
                    value={
                      this.profile.address && this.profile.address.pincode
                        ? this.profile.address.pincode
                        : ''
                    }
                    // error={this.state.errorPincode}
                    returnKeyType="done"
                    onSubmitEditing={() => this.validate()}
                  />
                </View>
              </View>
            </View>
          </ScrollView>
          <View style={styles.buttonView}>
            <Button
              buttonText={AppStrings.save}
              onPress={() => this.validate()}
            />
          </View>
        </KeyboardAvoidingView>
      );
    }
  }
}

export default Profile;
