/**
 * Copyright (c) 2018-present, Oleum. All rights reserved.
 *
 */

'use strict';

import React, {Component} from 'react';
import {View, Text, ScrollView, TouchableOpacity, FlatList} from 'react-native';
import {observer} from 'mobx-react';
import {showMessage} from 'react-native-flash-message';
import CustomTextInput from '@components/CustomTextInput';
import LoadingShadow from '@components/LoadingShadow'; 
import LoadingSmall from '@components/LoadingSmall';
import Products, {SbuProducts} from '@stores/Products';
import {AppColors, AppStyles, AppFonts} from '@theme';
import styles from './styles';
import {AppConstants} from '@config';

@observer
class FuelPriceUpdate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sbuProducts: [],
    };
  }

  componentDidMount() {
    Products.load();
    this.setSbuProducts();
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      Products.sbuAndProductLinkedList &&
      Products.sbuAndProductLinkedList.length
    ) {
      let sbuProducts = prevState.sbuProducts;
      Products.sbuAndProductLinkedList.forEach(data => {
        let item = new SbuProducts(data, false);
        if (!sbuProducts.find(listItem => listItem.id === item.id)) {
          if (
            item.status === AppConstants.productStatus.deactivated &&
            item.price &&
            item.price.value &&
            item.price.value > 0
          ) {
            item.price.value = 0;
          }
          sbuProducts.push(item);
        } else if (
          sbuProducts.find(listItem => {
            if (listItem.id === item.id && listItem.status !== item.status) {
              return true;
            }
          })
        ) {
          let matchedItem = sbuProducts.find(listItem => {
            if (listItem.id === item.id && listItem.status !== item.status) {
              return true;
            }
          });
          let index = sbuProducts.indexOf(matchedItem);
          if (index !== -1) {
            sbuProducts[index] = item;
          }
        }
      });
      return {
        sbuProducts: sbuProducts,
      };
    }
  }

  setSbuProducts() {
    if (
      Products.sbuAndProductLinkedList &&
      Products.sbuAndProductLinkedList.length
    ) {
      let sbuProducts = this.state.sbuProducts;
      Products.sbuAndProductLinkedList.forEach(data => {
        let item = new SbuProducts(data, false);
        if (!sbuProducts.find(listItem => listItem.id === item.id)) {
          if (
            item.status === AppConstants.productStatus.deactivated &&
            item.price &&
            item.price.value &&
            item.price.value > 0
          ) {
            item.price.value = 0;
          }
          sbuProducts.push(item);
        }
      });
      this.setState({sbuProducts: sbuProducts});
    }
  }

  isPriceValueValid(price) {
    const pattern = new RegExp(/^((\d{0,3}\.\d{0,2})|(\d{0,3}))$/g);
    if (price) {
      return pattern.test(price);
    }
  }

  onPressUpdate(item) {
    if (item.price && item.price.value && item.price.value > 0) {
      item
        .updateFuelPrice()
        .then(() => {
          showMessage({
            message: 'Price updated',
          });
        })
        .catch(error => {
          showMessage({
            message:
              error && error.details && error.details.displayMessage
                ? error.details.displayMessage
                : 'Something went wrong, try again later',
          });
        });
    } else if (item.price && item.price.value <= 0) {
      showMessage({
        message: 'Please add a valid fuel prize to update',
      });
    } else {
      showMessage({
        message: 'Something went wrong, try again later',
      });
    }
  }

  setPrice(price, itemId) {
    let sbuProducts = this.state.sbuProducts;
    if (sbuProducts && sbuProducts.length) {
      sbuProducts.find(item => item.id === itemId).price = {
        value: price && price.trim(),
        unit: 'INR',
      };
    }
    this.setState({sbuProducts: sbuProducts});
  }

  isProductItemDeactivated(itemStatus) {
    if (itemStatus === AppConstants.productStatus.deactivated) {
      return true;
    } else {
      return false;
    }
  }

  setPriceEditingFlag(itemId, itemStatus) {
    let sbuProducts = this.state.sbuProducts;
    if (
      sbuProducts &&
      sbuProducts.length &&
      itemStatus === AppConstants.productStatus.deactivated
    ) {
      sbuProducts.find(item => item.id === itemId).priceEditingFlag = true;
    }
    this.setState({sbuProducts: sbuProducts});
  }

  getButtonStyle(item) {
    if (item.updateFuelPriceLoading) {
      return styles.updateLoadingTouch;
    } else if (!this.isProductItemDeactivated(item && item.status)) {
      return styles.updateTouchDisabled;
    } else {
      return styles.updateTouch;
    }
  }

  renderProductItem(item) {
    return (
      <View style={AppStyles.row}>
        <View style={[AppStyles.flex3, styles.itemTypeTextView]}>
          <Text style={[AppStyles.regularBoldText, AppStyles.darkText]}>
            {item && item.title}
          </Text>
        </View>
        <View style={[styles.inputView, AppStyles.flex3]}>
          <CustomTextInput
            placeholder={'Rs: 00.00'}
            value={
              item &&
              item.price &&
              item.price.value &&
              !this.isProductItemDeactivated(item && item.status)
                ? item.price.value
                : this.isProductItemDeactivated(item && item.status) &&
                  item.priceEditingFlag
                ? item.price.value
                : ''
            }
            onChangeText={price => {
              if (!price || this.isPriceValueValid(Number(price))) {
                this.setPriceEditingFlag(item && item.id, item && item.status);
                this.setPrice(price, item && item.id);
              } else {
                this.forceUpdate();
              }
            }}
            baseColor={AppColors.inputLable}
            tintColor={AppColors.brand.primary}
            labelTextStyle={AppStyles.regularText}
            fontSize={AppFonts.base.size}
            keyboardType={'numeric'}
            maxLength={30}
            style={[AppStyles.regularBoldText, styles.inputText]}
            inputContainerStyle={styles.inputContainerStyle}
            lineWidth={0}
            activeLineWidth={0}
            disabled={
              !this.isProductItemDeactivated(item && item.status) ? true : false
            }
            disabledLineWidth={0}
          />
        </View>
        <View style={[styles.buttonView, AppStyles.flex3]}>
          <TouchableOpacity
            style={this.getButtonStyle(item)}
            onPress={() => this.onPressUpdate(item)}
            disabled={
              !this.isProductItemDeactivated(item && item.status) ? true : false
            }>
            {!item.updateFuelPriceLoading ? (
              <Text
                style={
                  !this.isProductItemDeactivated(item && item.status)
                    ? [AppStyles.regularBoldText, styles.disabledText]
                    : [
                        AppStyles.regularBoldText,
                        AppStyles.darkText,
                        styles.updateText,
                      ]
                }>
                UPDATE
              </Text>
            ) : (
              <LoadingSmall />
            )}
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  renderLoading() {
    if (Products.updateFuelPriceLoading) {
      return (
        <View style={AppStyles.container}>
          <LoadingShadow />
        </View>
      );
    }
  }

  render() {
    return (
      <View style={AppStyles.container}>
        <View style={styles.infoView}>
          <Text style={[AppStyles.regularText, AppStyles.darkText]}>
            Enter the updated fuel price here
          </Text>
        </View>
        <View style={styles.warningView}>
          <Text style={[AppStyles.mediumText, AppStyles.darkText]}>
            You are not allowed to update the fuel price more than once in a day
          </Text>
        </View>
        <View
          style={[
            AppStyles.row,
            AppStyles.paddingHorizontal,
            styles.inputWrapperView,
          ]}>
          <ScrollView keyboardShouldPersistTaps={'handled'}>
            <FlatList
              data={this.state.sbuProducts}
              alwaysBounceVertical={false}
              extraData={JSON.stringify(Products.sbuAndProductLinkedList)}
              renderItem={({item, i}) => this.renderProductItem(item, i)}
              showsVerticalScrollIndicator={false}
              // contentContainerStyle={styles.communityListContentContainerStyle}
              keyExtractor={this._keyExtractor}
              bounces={true}
            />
          </ScrollView>
        </View>
        {this.renderLoading()}
      </View>
    );
  }
}

export default FuelPriceUpdate;
