import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {createIconSetFromFontello} from 'react-native-vector-icons';

import styles from './styles';
import {AppStyles} from '@theme';
import {AppIconFonts} from '@config';

const Icon = createIconSetFromFontello(AppIconFonts);

export default class SingleSelectList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedData: props.selectedData ? props.selectedData : {},
    };
  }

  handleSelect(data) {
    this.setState({
      selectedData: data,
    });
    this.props.onSelectOption(data);
  }

  isCheckBoxSelected(data) {
    if (
      this.state.selectedData &&
      this.state.selectedData.id &&
      data &&
      data.id &&
      this.state.selectedData.id === data.id
    ) {
      return true;
    } else {
      return false;
    }
  }

  renderItem(data) {
    return (
      <TouchableOpacity
        activeOpacity={0.5}
        style={styles.selectItemMainView}
        onPress={() => this.handleSelect(data)}>
        <View
          style={
            this.isCheckBoxSelected(data)
              ? styles.selectView
              : styles.unSelectView
          }>
          {this.isCheckBoxSelected(data) ? (
            <MaterialCommunityIcons style={styles.checkedIcon} name="check" />
          ) : null}
        </View>
        <View style={styles.labelTextView}>
          <Text style={AppStyles.regularBoldText}>{data.name}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <View style={styles.mainView}>
        <View style={styles.textFieldLabelMainView}>
          <View style={styles.iconView}>
            <View style={styles.iconWrapView}>
              <Icon
                style={[AppStyles.icons, styles.icons]}
                name={'oleum_vehicle'}
              />
            </View>
          </View>
          <View style={styles.labelView}>
            <Text style={[AppStyles.regularText]}>{this.props.label}</Text>
          </View>
        </View>
        <ScrollView
          style={styles.scrollView}
          horizontal={true}
          showsHorizontalScrollIndicator={false}>
          {this.props.data.map((a, i) => this.renderItem(a, i))}
        </ScrollView>
      </View>
    );
  }
}

SingleSelectList.propTypes = {
  data: PropTypes.array.isRequired,
  label: PropTypes.string.isRequired,
};
