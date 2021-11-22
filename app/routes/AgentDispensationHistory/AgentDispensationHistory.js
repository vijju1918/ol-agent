/**
 * Copyright (c) 2018-present, Evolvier Technologies. All rights reserved.
 *
 */

'use strict';

import React, {Component} from 'react';
import {
  View,
  Text,
  SectionList,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import {observer} from 'mobx-react';
import {showMessage} from 'react-native-flash-message';

import NoData from '@components/NoData';
import LoadingSmall from '@components/LoadingSmall';
import LoadingShadow from '@components/LoadingShadow';
import AgentDispensationListItem from '@components/AgentDispensationListItem';
import AgentMaterialDepositListItem from '@components/AgentMaterialDepositListItem';

import {getDateTimeString} from '../../lib/utils';
import {AppStyles, AppColors} from '@theme';
import {AppResources} from '@config';
import styles from './styles';

import {Dispensations} from '@stores/Dispensations';
import AccountStore from '@stores/Account';
import {DispenseRequestList} from '@stores/DispenseRequests';

@observer
class AgentDispensationHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      getAgentDispensationFlag: true,
      getAgentMaterialDepositFlag: true,
    };
    this.dispensations = new Dispensations();
    this.dispenseRequestList = new DispenseRequestList();
  }

  componentDidMount() {
    if (AccountStore.connectionReady) {
      this.loadDispensations();
    } else {
      this.timer = setInterval(() => {
        if (AccountStore.connectionReady) {
          this.loadDispensations();
          clearInterval(this.timer);
        }
      }, 500);
    }
  }

  loadDispensations() {
    if (AccountStore.isAgentMCA()) {
      this.dispenseRequestList.loadAgentMaterialDeposits().catch(error =>
        showMessage({
          message:
            error && error.details && error.details.displayMessage
              ? error.details.displayMessage
              : 'Something went wrong, try again later',
        }),
      );
    } else if (AccountStore.isAgentDSM()) {
      this.dispensations.loadAgentDispensations().catch(error =>
        showMessage({
          message:
            error && error.details && error.details.displayMessage
              ? error.details.displayMessage
              : 'Something went wrong, try again later',
        }),
      );
    } else {
      return false;
    }
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  _keyExtractor = item => item.id;

  renderSectionHeader(date) {
    return (
      <View style={styles.sectionHeaderView}>
        <Text style={[AppStyles.labelText, AppStyles.darkText]}>
          {getDateTimeString(date.title, 'DD MMMM YYYY')}
        </Text>
      </View>
    );
  }

  renderRowData(item) {
    if (AccountStore.isAgentMCA()) {
      return (
        <View>
          <TouchableOpacity
            style={styles.drItemMainView}
            activeOpacity={0.5}
            disabled={true}
            onPress={() => {}}>
            <AgentMaterialDepositListItem data={item} />
          </TouchableOpacity>
        </View>
      );
    } else if (AccountStore.isAgentDSM()) {
      return (
        <View>
          <TouchableOpacity
            style={styles.drItemMainView}
            activeOpacity={0.5}
            disabled={true}
            onPress={() => {}}>
            <AgentDispensationListItem data={item} />
          </TouchableOpacity>
        </View>
      );
    } else {
      return null;
    }
  }

  loadMoreAgentDispensations() {
    if (
      this.state.getAgentDispensationFlag &&
      !this.dispensations.getAgentDispensationsLoading &&
      this.dispensations.agentList &&
      this.dispensations.agentList.length >= 15
    ) {
      if (this.dispensations && this.dispensations.agentNext) {
        this.dispensations
          .loadAgentDispensations(true)
          .then(result => {
            if (result && result.list && !result.list.length) {
              this.setState({
                getAgentDispensationFlag: false,
              });
            }
          })
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
          message: 'Unable to load more data',
        });
      }
    }
  }

  loadMoreAgentMaterialDeposits() {
    if (
      this.state.getAgentMaterialDepositFlag &&
      !this.dispenseRequestList.getAgentDispensationsLoading &&
      this.dispenseRequestList.materialDepositList &&
      this.dispenseRequestList.materialDepositList.length >= 15
    ) {
      if (
        this.dispenseRequestList &&
        this.dispenseRequestList.materialDepositsNext
      ) {
        this.dispenseRequestList
          .loadAgentMaterialDeposits(true)
          .then(result => {
            if (result && result.list && !result.list.length) {
              this.setState({
                getAgentMaterialDepositFlag: false,
              });
            }
          })
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
          message: 'Unable to load more data',
        });
      }
    }
  }

  onEndReached() {
    if (AccountStore.isAgentMCA()) {
      this.loadMoreAgentMaterialDeposits();
    } else if (AccountStore.isAgentDSM()) {
      this.loadMoreAgentDispensations();
    } else {
      return null;
    }
  }

  renderFooter() {
    if (
      this.dispensations.isLoadingMore ||
      this.dispenseRequestList.isLoadingMore
    ) {
      return (
        <View style={styles.loadMoreLoadingView}>
          <LoadingSmall />
        </View>
      );
    }
  }

  itemSeparatorComponent() {
    return (
      <View
        style={[
          AppStyles.horizontalLine,
          AppStyles.marginHorizontal,
          styles.line,
        ]}
      />
    );
  }

  render() {
    if (
      this.dispensations.getAgentDispensationsLoading ||
      this.dispenseRequestList.getAgentMaterialDepositsLoading
    ) {
      return (
        <View style={[AppStyles.container, styles.mainView]}>
          <LoadingShadow />
        </View>
      );
    } else if (
      (this.dispensations.agentDispenseList &&
        this.dispensations.agentDispenseList.length) ||
      (this.dispenseRequestList.agentMaterialDeposits &&
        this.dispenseRequestList.agentMaterialDeposits.length)
    ) {
      return (
        <View style={[AppStyles.container, styles.mainView]}>
          <View>
            
            <SectionList
              showsVerticalScrollIndicator={false}
              renderItem={({item}) => this.renderRowData(item, this)}
              renderSectionHeader={({section}) =>
                this.renderSectionHeader(section)
              }
              keyExtractor={this._keyExtractor}
              sections={
                AccountStore.isAgentDSM()
                  ? this.dispensations.agentDispenseList &&
                    this.dispensations.agentDispenseList.length
                    ? this.dispensations.agentDispenseList.slice()
                    : []
                  : AccountStore.isAgentMCA()
                  ? this.dispenseRequestList.agentMaterialDeposits &&
                    this.dispenseRequestList.agentMaterialDeposits.length
                    ? this.dispenseRequestList.agentMaterialDeposits
                    : []
                  : []
              }
              extraData={
                AccountStore.isAgentDSM()
                  ? this.dispensations.agentDispenseList &&
                    this.dispensations.agentDispenseList.length
                    ? this.dispensations.agentDispenseList.slice()
                    : []
                  : AccountStore.isAgentMCA()
                  ? this.dispenseRequestList.agentMaterialDeposits &&
                    this.dispenseRequestList.agentMaterialDeposits.length
                    ? this.dispenseRequestList.agentMaterialDeposits
                    : []
                  : []
              }
              bounces={true}
              onEndReachedThreshold={0.1}
              onEndReached={() => this.onEndReached()}
              stickySectionHeadersEnabled={true}
              ListFooterComponent={this.renderFooter(
                this.dispensations.isLoadingMore,
              )}
              ItemSeparatorComponent={() => this.itemSeparatorComponent()}
            />
          </View>
        </View>
      );
    } else if (!AccountStore.connectionReady) {
      return (
        <View style={[AppStyles.container, AppStyles.containerCentered]}>
          <View style={styles.loadingView}>
            <LoadingShadow />
          </View>
        </View>
      );
    } else {
      return (
        <View style={[styles.center]}>
         
          <StatusBar
            backgroundColor={AppColors.statusBarBg}
            hidden={false}
            barStyle={AppColors.statusBarStyle}
          />
          <NoData
            image={AppResources.noHistory}
            title={'No Activity!'}
            content={'You have no activity'}
          />
        </View>
      );
    }
  }
}

export default AgentDispensationHistory;
