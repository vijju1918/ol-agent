import React, {Component} from 'react';
import {View, Text} from 'react-native';
import CountDown from 'react-native-countdown-component';
import moment from 'moment';

import styles from './styles';
import {AppStyles} from '@theme';

export default class CountDownView extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  getCountDuration() {
    var date = moment().utcOffset('+05:30');
    //Getting the current date-time with required formate and UTC
    var expiryDate = moment(this.props.endDate); //You can set your own date-time
    var diffr = moment.duration(moment(expiryDate).diff(moment(date)));
    var hours = parseInt(diffr.asHours()); // eslint-disable-line radix
    var minutes = parseInt(diffr.minutes()); // eslint-disable-line radix
    var seconds = parseInt(diffr.seconds()); // eslint-disable-line radix
    var d = hours * 60 * 60 + minutes * 60 + seconds;

    if (d) {
      return d;
    }
  }

  render() {
    if (
      this.getCountDuration() &&
      this.getCountDuration() > 0 &&
      this.getCountDuration() < 7200
    ) {
      return (
        <View style={styles.counterView}>
          <View style={styles.counterInfoView}>
            <Text>
              <Text style={[AppStyles.titleBoldText, AppStyles.whiteText]}>
                HURRY!,
              </Text>
              <Text style={[AppStyles.regularText, AppStyles.whiteText]}>
                {' Promotion ends in'}
              </Text>
            </Text>
          </View>
          <CountDown
            until={this.getCountDuration()}
            timeToShow={['H', 'M', 'S']}
            timeLabels={{m: null, s: null}}
            separatorStyle={styles.separatorStyle}
            onFinish={
              this.props.onFinishCount
                ? () => this.props.onFinishCount()
                : () => {}
            }
            showSeparator
            size={this.props.size ? this.props.size : 15}
          />
        </View>
      );
    } else {
      return null;
    }
  }
}
