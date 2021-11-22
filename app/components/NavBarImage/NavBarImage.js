/**
 * Copyright (c) 2018-present, Evolvier Technologies. All rights reserved.
 *
 */

'use strict';

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import {observer} from 'mobx-react';

import styles from './styles';
import {AppResources} from '@config';

import Image from '@components/Image';
@observer
class NavBarImage extends Component {
  render() {
    return (
      <View>
        <Image
          style={styles.titleImage}
          resizeMode={'contain'}
          source={AppResources.appLogo}
        />
      </View>
    );
  }
}

NavBarImage.propTypes = {
  image: PropTypes.string.isRequired,
};

export default NavBarImage;
