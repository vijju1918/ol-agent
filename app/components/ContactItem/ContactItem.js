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

class ContactItem extends Component {
  render() {
    return (
      <View style={styles.contactMainView}>
        <View style={styles.imageView}>
          <Image
            style={styles.userImage}
            source={getImageDisplayUri(
              this.props.contact.localPicture,
              AppResources.noProfilePic,
            )}
          />
        </View>
        <View style={styles.nameView}>
          <Text style={[AppStyles.regularBoldText, styles.nameText]}>
            {this.props.contact.name}
          </Text>
          <Text style={AppStyles.mediumText}>
            {this.props.contact.phoneNumber}
          </Text>
        </View>
      </View>
    );
  }
}

ContactItem.propTypes = {
  contact: PropTypes.object.isRequired,
};

export default ContactItem;
