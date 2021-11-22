/**
 * Copyright (c) 2018-present, Evolvier Technologies. All rights reserved.
 *
 */

'use strict';

import React, {Component} from 'react';
import {Actions} from 'react-native-router-flux';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  Alert,
} from 'react-native';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react';
import {openSettings} from 'react-native-permissions';

import styles from './styles';
import {AppStyles} from '@theme';
import {checkContactPermissionStatus} from '@lib/utils';
import {AppConstants} from '@config';

import ContactsStore from '@stores/Contacts';

import ContactItem from '@components/ContactItem';
import BackButton from '@components/BackButton';

@observer
class Contacts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      contactPermissionStatus: '',
    };
  }

  componentDidMount() {
    checkContactPermissionStatus()
      .then(data => {
        this.setState({contactPermissionStatus: data});
      })
      .catch(err => console.log(err));
  }

  _keyExtractor = item => item.phoneNumber;
  renderContactList(contact) {
    return (
      <TouchableOpacity
        style={styles.contactItemView}
        onPress={() => this.props.contactTransfer(contact)}>
        <ContactItem contact={contact} />
      </TouchableOpacity>
    );
  }

  renderItemSeperator() {
    return <View style={AppStyles.horizontalLine} />;
  }
  _keyExtractor = item => item.phoneNumber;

  renderContactsList() {
    return (
      <View>
        <FlatList
          style={styles.flatListView}
          data={ContactsStore.filteredContacts}
          refreshing={ContactsStore.loading}
          onRefresh={ContactsStore.upload}
          renderItem={({item}) => this.renderContactList(item)}
          ItemSeparatorComponent={() => this.renderItemSeperator()}
          extraData={ContactsStore.filter}
          keyExtractor={this._keyExtractor}
          onEndReachedThreshold={4}
          onEndReached={ContactsStore.nextPage}
        />
      </View>
    );
  }

  getAllContacts() {
    ContactsStore.load();
  }

  alertForContactsPermission() {
    Alert.alert(
      'Can we access your contacts?',
      'We need access so you can list your contacts',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Open Settings',
          onPress: () =>
            openSettings().catch(() => console.warn('cannot open settings')),
        },
      ],
    );
  }

  renderNoContactsView() {
    if (
      this.state.contactPermissionStatus ===
        AppConstants.permissionStatusValues.authorized ||
      this.state.contactPermissionStatus ===
        AppConstants.permissionStatusValues.granted
    ) {
      return (
        <View style={styles.permissionView}>
          <Text style={AppStyles.regularBoldText}>No Contacts</Text>
        </View>
      );
    } else if (
      this.state.contactPermissionStatus ===
      AppConstants.permissionStatusValues.denied
    ) {
      return (
        <View style={styles.permissionView}>
          <Text style={AppStyles.regularText}>Need Contact Permission!</Text>
          <TouchableOpacity
            style={styles.permissionTouch}
            onPress={() => this.getAllContacts()}>
            <Text style={AppStyles.regularText}>Grand Permission</Text>
          </TouchableOpacity>
        </View>
      );
    } else if (
      this.state.contactPermissionStatus ===
      AppConstants.permissionStatusValues.blocked
    ) {
      return (
        <View style={styles.permissionView}>
          <Text style={AppStyles.regularBoldText}>
            Need Contact Permission!
          </Text>
          <TouchableOpacity
            style={styles.permissionTouch}
            onPress={() => this.alertForContactsPermission()}>
            <Text style={AppStyles.regularText}>Grand Permission</Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      return null;
    }
  }

  render() {
    return (
      <View style={[AppStyles.lightBoxBg, styles.mainView]}>
        <SafeAreaView style={styles.contentView}>
          <View style={styles.searchbarView}>
            <TouchableOpacity style={styles.backButtonTouch} activeOpacity={1}>
              <BackButton onBack={() => Actions.pop()} />
            </TouchableOpacity>
            <View style={styles.searchView}>
              <TextInput
                style={[styles.input, AppStyles.regularText]}
                placeholder={'Search contact...'}
                underlineColorAndroid="transparent"
                onChangeText={ContactsStore.updateFilter}
                value={ContactsStore.filter}
                returnKeyType={'next'}
                editable={true}
                autoFocus={true}
              />
            </View>
          </View>
          {ContactsStore.filteredContacts &&
          ContactsStore.filteredContacts.length
            ? this.renderContactsList()
            : this.renderNoContactsView()}
        </SafeAreaView>
      </View>
    );
  }
}

Contacts.propTypes = {
  contactTransfer: PropTypes.func.isRequired,
};

export default Contacts;
