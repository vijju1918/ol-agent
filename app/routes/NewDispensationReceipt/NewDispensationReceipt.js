import React, {Component} from 'react';
import {View, Text, ScrollView} from 'react-native';

import {AppStyles} from '@theme';
import AppStrings from '@config/strings';
import styles from './styles';

import Button from '@components/Button';
import DetailsTable from '@components/DetailsTable';

import {Dispensation} from '@stores/Dispensations';

export default class NewDispensationReceipt extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.dispensation = new Dispensation(props.data);
  }

  render() {
    return (
      <View style={AppStyles.container}>
        <ScrollView
          alwaysBounceVertical={false}
          showsVerticalScrollIndicator={false}>
          <View style={styles.labelView}>
            <Text style={[AppStyles.labelText, AppStyles.darkText]}>
              Receipt Details
            </Text>
          </View>
          <View style={styles.detailsTableView}>
            <DetailsTable listData={this.dispensation.newDispensationDetails} />
          </View>
        </ScrollView>
        <View style={styles.buttonView}>
          <Button
            buttonText={AppStrings.done}
            onPress={() => this.props.renderAgentHome()}
          />
        </View>
      </View>
    );
  }
}
