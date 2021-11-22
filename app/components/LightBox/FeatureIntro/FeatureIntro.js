/**
 * Copyright (c) 2018-present, Oleum. All rights reserved.
 *
 */

'use strict';

import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {View, Text, StatusBar, TouchableOpacity} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';

import styles from './styles';
import {AppStyles} from '@theme';

import Image from '@components/Image';

class FeatureIntro extends Component {
  constructor(props) {
    super(props);
    this.state = {
      slides: [],
    };
  }

  _renderItem = props => (
    <View style={styles.dataView}>
      <StatusBar
        backgroundColor={'#FFFFFF'}
        hidden={false}
        barStyle={'dark-content'}
      />
      <View style={styles.imageView}>
        <Image
          resizeMode={'contain'}
          style={styles.image}
          source={{
            uri: props.item.image,
          }}
        />
      </View>
      <View>
        <Text style={[AppStyles.titleBoldText, styles.title]}>
          {props.item.title}
        </Text>
        <Text style={[AppStyles.regularText, styles.text]}>
          {props.item.text}
        </Text>
      </View>
    </View>
  );

  _renderSkipButton = () => {
    return (
      <View style={styles.buttonView}>
        <Text style={[AppStyles.regularText, styles.buttonText]}>Skip</Text>
      </View>
    );
  };

  _renderNextButton = () => {
    return (
      <View style={styles.buttonView}>
        <Text style={[AppStyles.regularText, styles.buttonText]}>Next</Text>
      </View>
    );
  };

  _renderDoneButton = () => {
    return (
      <View style={styles.buttonView}>
        <Text style={[AppStyles.regularText, styles.buttonText]}>Done</Text>
      </View>
    );
  };

  _onDone = () => {
    this.props.onBack();
  };

  render() {
    const {featureList} = this.props;
    return (
      <TouchableOpacity style={styles.lightBoxBg} activeOpacity={1}>
        <View style={styles.sliderView}>
          <View style={styles.titleView}>
            <Text style={[AppStyles.titleBoldText, styles.titleText]}>
              {this.props.pageTitle}
            </Text>
          </View>
          <AppIntroSlider
            showSkipButton={true}
            slides={featureList}
            renderItem={this._renderItem}
            dotStyle={styles.defaultDotStyle}
            activeDotStyle={styles.activeDotStyle}
            renderDoneButton={this._renderDoneButton}
            renderNextButton={this._renderNextButton}
            renderSkipButton={this._renderSkipButton}
            onDone={this._onDone}
            onSkip={this._onDone}
          />
        </View>
      </TouchableOpacity>
    );
  }
}

FeatureIntro.propTypes = {
  featureList: PropTypes.array.isRequired,
  pageTitle: PropTypes.string.isRequired,
};

export default FeatureIntro;
