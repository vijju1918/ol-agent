/**
 * Copyright (c) 2018-present, Evolvier Technologies. All rights reserved.
 *
 */

'use strict';

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text} from 'react-native';

import {getImageDisplayUri} from '../../lib/utils';

import AppResources from '@config/resources';
import styles from './styles';
import {AppStyles} from '@theme';

import Image from '@components/Image';

class CorporateItem extends Component {
  render() {
    return (
      <View style={styles.corporateMainView}>
        <View style={styles.imageView}>
          <Image
            style={styles.corporateImage}
            source={getImageDisplayUri(
              this.props.corporate.companyLogo
                ? this.props.corporate.companyLogo
                : this.props.corporate.corporateImage &&
                  this.props.corporate.corporateImage.url
                ? this.props.corporate.corporateImage.url
                : '',
              AppResources.noProfilePic,
            )}
          />
        </View>
        <View style={styles.nameView}>
          <Text style={[AppStyles.regularBoldText, styles.nameText]}>
            {this.props.corporate.title}
          </Text>
          <Text style={[AppStyles.mediumText, styles.nameText]}>
            {this.props.corporate.email}
          </Text>
          <Text style={[AppStyles.smallText, styles.nameText]}>
            {this.props.corporate.address.street +
              ', ' +
              this.props.corporate.address.district +
              ', ' +
              this.props.corporate.address.state}
          </Text>
        </View>
      </View>
    );
  }
}

CorporateItem.propTypes = {
  corporate: PropTypes.object.isRequired,
};

export default CorporateItem;
