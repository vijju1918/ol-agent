/**
 * Copyright (c) 2018-present, Evolvier Technologies. All rights reserved.
 *
 */
'use strict';

import React, {Component} from 'react';

import {View, Text} from 'react-native';

import styles from './styles';
import {AppStyles} from '@theme';
import {AppResources} from '@config';
import PropTypes from 'prop-types';

import Image from '@components/Image';

class CorporateDetails extends Component {
  render() {
    if (this.props.corporateItems) {
      return (
        <View style={styles.corporateDetailsMainView}>
          <View>
            <Text style={[AppStyles.regularBoldText, AppStyles.darkText]}>
              {this.props.componentTitle}
            </Text>
          </View>
          <View style={styles.logoAndTitleView}>
            {this.props.corporateItems.companyLogo ? (
              <View style={styles.logoView}>
                <Image
                  style={styles.vendorLogo}
                  source={
                    this.props.corporateItems.companyLogo
                      ? {
                          uri: this.props.corporateItems.companyLogo,
                        }
                      : AppResources.noImage
                  }
                />
              </View>
            ) : (
              <View style={styles.logoView}>
                <View style={styles.letterView}>
                  <Text
                    style={[
                      AppStyles.titleBoldText,
                      AppStyles.upperCaseText,
                      styles.titleLetterText,
                    ]}>
                    {this.props.corporateItems.title
                      ? this.props.corporateItems.title
                          .match(/\b(\w)/g)
                          .join('')
                          .slice(0, 2)
                      : ''}
                  </Text>
                </View>
              </View>
            )}
            <View style={styles.titleView}>
              {this.props.corporateItems.title ? (
                <Text
                  style={[
                    AppStyles.regularBoldText,
                    AppStyles.darkText,
                    styles.titleText,
                  ]}>
                  {this.props.corporateItems.title}
                </Text>
              ) : null}
              {this.props.corporateItems.email ? (
                <Text style={[AppStyles.mediumRegularText, styles.titleText]}>
                  {this.props.corporateItems.email}
                </Text>
              ) : null}
              {this.props.corporateItems.address &&
              this.props.corporateItems.address.street &&
              this.props.corporateItems.address.district &&
              this.props.corporateItems.address.state ? (
                <Text style={[AppStyles.smallText, styles.titleText]}>
                  {this.props.corporateItems.address.street +
                    ', ' +
                    this.props.corporateItems.address.district +
                    ', ' +
                    this.props.corporateItems.address.state}
                </Text>
              ) : null}
            </View>
          </View>
        </View>
      );
    } else {
      return null;
    }
  }
}

CorporateDetails.propTypes = {
  corporateItems: PropTypes.object.isRequired,
  componentTitle: PropTypes.string.isRequired,
};

export default CorporateDetails;
