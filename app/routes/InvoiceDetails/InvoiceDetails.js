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
  Alert,
  Share,
} from 'react-native';
import {observer} from 'mobx-react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {showMessage} from 'react-native-flash-message';

import LoadingShadow from '@components/LoadingShadow';
import LoadingSmall from '@components/LoadingSmall';
import Image from '@components/Image';

import {Dispensations} from '@stores/Dispensations';

import {AppColors, AppStyles} from '@theme';
import {getDateTimeString} from '@lib/utils';
import styles from './styles';

@observer
class InvoiceDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageLoading: true,
      expanded: false,
    };
    this.dispensations = new Dispensations();
  }

  componentDidMount() {
    if (this.props.referenceId) {
      this.dispensations
        .getDispensationDetails(this.props.referenceId)
        .catch(error =>
          showMessage({
            message:
              error && error.details && error.details.displayMessage
                ? error.details.displayMessage
                : 'Something went wrong, try again later',
          }),
        );
    } else {
      showMessage({
        message: 'Something went wrong, try again later',
      });
    }
  }

  onPressDeleteOption() {
    Alert.alert(
      'Delete Invoice',
      'Do you really want to delete this invoice?',
      [
        {
          text: 'No',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => this.deleteDispensation(),
        },
      ],
      {cancelable: false},
    );
  }

  deleteDispensation() {
    if (
      this.dispensations.dispensationDetailsData &&
      this.dispensations.dispensationDetailsData.id
    ) {
      this.props.dispensationsStoreData
        .deleteDispense(this.dispensations.dispensationDetailsData.id)
        .then(() => this.props.renderMyInvoices())
        .catch(error =>
          showMessage({
            message:
              error && error.details && error.details.displayMessage
                ? error.details.displayMessage
                : 'Something went wrong, try again later',
          }),
        );
    } else {
      showMessage({
        message: 'Something went wrong, try again later',
      });
    }
  }

  onPressShareOption = async url => {
    try {
      const result = await Share.share({
        message:
          'Hello, click the link for fuel dispensation invoice details\n' +
          url +
          '\n\nTrack your vehicle mileage and dispense fuel through Oleum Mobile App. Download Now!' +
          '\n\nPlay Store\nhttps://play.google.com/store/apps/details?id=com.oleumx.app&hl=en_IN \n\nAppStore\nhttps://apps.apple.com/in/app/oleum/id1472407892',
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  onPressEditOption() {
    this.props.renderAddInvoice({
      dispensationData: this.dispensations.dispensationDetailsData,
      editInvoice: true,
      dispensationsStoreData: this.props.dispensationsStoreData,
      invoiceDetailsDispensationsStoreData: this.dispensations,
      isFromInvoiceDetails: true,
    });
  }

  renderOption(icon, onPress) {
    return (
      <TouchableHighlight
        activeOpacity={1}
        underlayColor={AppColors.underlayYellow}
        style={styles.optionTouch}
        onPress={onPress}>
        <MaterialCommunityIcons size={20} name={icon} />
      </TouchableHighlight>
    );
  }

  renderAdvertisementView(details) {
    if (details && details.sbu && details.sbu.advertisement) {
      return (
        <View style={styles.bannerImageView}>
          <Image
            resizeMode={'cover'}
            style={styles.bannerImage}
            source={
              details.sbu.advertisement.image &&
              details.sbu.advertisement.image.url
                ? {
                    uri: details.sbu.advertisement.image.url,
                  }
                : null
            }
            onLoadStart={e => this.setState({imageLoading: true})}
            onLoadEnd={e => this.setState({imageLoading: false})}
          />
          {this.state.imageLoading ? (
            <View style={styles.imageLoadingView}>
              <LoadingSmall color={AppColors.brand.secondary} />
            </View>
          ) : null}
        </View>
      );
    } else {
      return null;
    }
  }

  renderROInfo(details) {
    if (details.sbu) {
      return (
        <View style={styles.roDetailsView}>
          {details.sbu.image && details.sbu.image.url ? (
            <View style={styles.roImageView}>
              <Image
                style={[styles.roImage]}
                source={{
                  uri: details.sbu.image.url,
                }}
              />
            </View>
          ) : (
            <View style={styles.roImageView}>
              <View style={styles.letterView}>
                <Text
                  style={[
                    AppStyles.titleBoldText,
                    AppStyles.upperCaseText,
                    styles.titleLetterText,
                  ]}>
                  {details.sbu.name
                    ? details.sbu.name
                        .match(/\b(\w)/g)
                        .join('')
                        .slice(0, 2)
                    : null}
                </Text>
              </View>
            </View>
          )}
          <View style={styles.roNameView}>
            <Text style={[AppStyles.titleBoldText, AppStyles.centerAlignText]}>
              {details.sbu.name ? details.sbu.name : null}
            </Text>
            <Text
              style={[
                AppStyles.titleText,
                styles.textMargin,
                AppStyles.centerAlignText,
              ]}>
              {details.sbu.addressText ? details.sbu.addressText : null}
            </Text>
          </View>
        </View>
      );
    } else {
      return null;
    }
  }

  renderInvoiceItem(label, value) {
    return (
      <View style={styles.invoiceItemMainView}>
        <View style={styles.invoiceItemView}>
          <View style={styles.invoiceItemLabelView}>
            <Text style={AppStyles.regularText}>{label}</Text>
          </View>
          <View style={styles.invoiceItemValueView}>
            <Text style={AppStyles.regularText}>{value}</Text>
          </View>
        </View>
        <View style={[AppStyles.horizontalLine, styles.horizontalLine]} />
      </View>
    );
  }

  renderInvoiceDetails(details) {
    if (details) {
      return (
        <View style={styles.invoiceDetailsView}>
          {this.renderInvoiceItem('Reference Id', details.referenceId)}
          {this.renderInvoiceItem('Receipt', 'E-Receipt')}
          {this.renderInvoiceItem(
            'Vehicle Number',
            details.vehicleDetails && details.vehicleDetails.number,
          )}
          {details.user && details.user.customerNumber
            ? this.renderInvoiceItem(
                'Mobile Number',
                details.user.customerNumber,
              )
            : null}
          {this.renderInvoiceItem(
            'Date, Time',
            getDateTimeString(details.dispensedAt, 'DD MMMM YYYY, HH:mm'),
          )}
          {details.paymentDetails && details.paymentDetails.fuelPointRedeemed
            ? this.renderInvoiceItem(
                'FP',
                details.paymentDetails.fuelPointRedeemed,
              )
            : null}
          {details.agent && details.agent.nozzleId
            ? this.renderInvoiceItem('Nozzle', details.agent.nozzleId)
            : null}
          {this.renderInvoiceItem(
            'Fuel',
            details.product && details.product.title,
          )}
          {this.renderInvoiceItem(
            'Rate',
            details.product &&
              details.product.price &&
              details.product.price.value
              ? '₹ ' + details.product.price.value
              : null,
          )}
          {this.renderInvoiceItem(
            'Sale amount',
            details.paymentDetails &&
              details.paymentDetails.amountPaid &&
              details.paymentDetails.amountPaid.value
              ? '₹ ' + details.paymentDetails.amountPaid.value
              : 0,
          )}
          {details.paymentDetails && details.paymentDetails.modeTitle
            ? this.renderInvoiceItem(
                'Mode of Payment',
                details.paymentDetails.modeTitle,
              )
            : null}
          {this.renderInvoiceItem('Volume', details.dispensedQuantity + ' L')}
        </View>
      );
    } else {
      return null;
    }
  }

  renderInfoHeaderView(details) {
    return (
      <View style={styles.infoView}>
        <View style={AppStyles.flex1}>
          <View style={[AppStyles.row, styles.titleAndOwnerView]}>
            <Text style={[AppStyles.navbarTitle, AppStyles.darkText]}>
              Refueling
            </Text>
            {!this.props.isLocked ? (
              <MaterialCommunityIcons
                style={styles.textMargin}
                size={22}
                name={'account'}
              />
            ) : null}
          </View>
          <Text style={AppStyles.mediumRegularText}>Total cost</Text>
          <Text style={[AppStyles.navbarTitle, AppStyles.darkText]}>
            {details.paymentDetails &&
            details.paymentDetails.amountPaid &&
            details.paymentDetails.totalAmount.value
              ? '₹ ' + details.paymentDetails.totalAmount.value
              : null}
          </Text>
          {details.vehicleDetails && details.vehicleDetails.odometer ? (
            <View style={styles.odometerAndMileageView}>
              <View style={styles.odometerView}>
                <MaterialCommunityIcons size={18} name={'gauge'} />
                <Text style={[AppStyles.mediumRegularText, styles.textMargin]}>
                  {details.vehicleDetails.odometer + ' km'}
                </Text>
              </View>
            </View>
          ) : null}
        </View>
      </View>
    );
  }

  renderOptionsView(details, shareUrl) {
    return (
      <View style={styles.optionsMainView}>
        <View style={styles.dateAndTimeView}>
          <MaterialCommunityIcons size={20} name={'calendar-month'} />
          <Text style={[AppStyles.regularText, styles.textMargin]}>
            {getDateTimeString(details.createdAt, 'DD MMMM YYYY, HH:mm')}
          </Text>
        </View>
        <View style={styles.optionsView}>
          {this.renderOption('share-variant', () =>
            this.onPressShareOption(shareUrl),
          )}
          {!this.props.isLocked
            ? this.renderOption('delete', () => this.onPressDeleteOption())
            : null}
          {!this.props.isLocked
            ? this.renderOption('pencil', () => this.onPressEditOption())
            : null}
        </View>
      </View>
    );
  }

  renderLoading() {
    if (
      this.dispensations.getDispensationDetailsLoading ||
      this.props.dispensationsStoreData.deleteDispenseLoading
    ) {
      return (
        <View style={[styles.loadingContainer]}>
          <LoadingShadow />
        </View>
      );
    }
  }

  render() {
    return (
      <View style={[AppStyles.containerWhite, styles.mainView]}>
        {this.renderInfoHeaderView(this.dispensations.dispensationDetailsData)}
        {this.renderOptionsView(
          this.dispensations.dispensationDetailsData,
          this.props.shareUrl,
        )}
        <ScrollView
          alwaysBounceVertical={false}
          showsVerticalScrollIndicator={false}>
          {this.renderAdvertisementView(
            this.dispensations.dispensationDetailsData,
          )}
          {this.renderROInfo(this.dispensations.dispensationDetailsData)}
          {this.renderInvoiceDetails(
            this.dispensations.dispensationDetailsData,
          )}
        </ScrollView>
        {this.renderLoading()}
      </View>
    );
  }
}

export default InvoiceDetails;
