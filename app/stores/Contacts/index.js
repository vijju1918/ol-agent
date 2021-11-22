/**
 * Copyright (c) 2018-present, Oleum. All rights reserved.
 *
 */

'use strict';

import {observable, computed} from 'mobx';
import Meteor from '@meteorrn/core';

import {getAllContacts} from '@lib/utils';
import Contact from './contact';

class Contacts {
  @observable list = [];
  @observable filter = '';
  @observable pagination = 1;
  @observable loading = false;
  limit = 10;

  add = contact => {
    this.list.push(new Contact(contact));
  };

  addAll = contacts => {
    let list = [];
    contacts.forEach(contact => {
      list.push(new Contact(contact));
    });
    this.list.push(...list);
  };

  reset = () => {
    this.filter = '';
    this.pagination = 1;
    this.loading = false;
  };

  getDetails = (phoneNumber, userId = null, userType = null) => {
    const user = Meteor.user();
    if (userId && userType && user) {
      const contactList =
        user.profile &&
        user.profile.contactList &&
        user.profile.contactList.length
          ? user.profile.contactList
          : [];
      const contact = contactList.find(
        eachContact =>
          eachContact.user === userId && eachContact.type === userType,
      );
      if (contact) {
        return contact;
      } else {
        return this.getContactDetails(phoneNumber);
      }
    } else {
      return this.getContactDetails(phoneNumber);
    }
  };

  getContactDetails = phoneNumber => {
    const contact = this.list.find(
      eachContact => eachContact.phoneNumber === phoneNumber,
    );
    return contact;
  };

  load = () => {
    getAllContacts().then(contacts => {
      const user = Meteor.user();
      if (contacts.length > 0 && user) {
        let list = [];
        const contactList =
          user.profile &&
          user.profile.contactList &&
          user.profile.contactList.length
            ? user.profile.contactList
            : [];
        this.removeAll();
        contactList.forEach(contact => {
          let matchedList = contacts.filter(
            item => item.formattedPhoneNumber === contact.formattedPhoneNumber,
          );
          if (matchedList.length > 0) {
            matchedList[0].user = contact.user;
            matchedList[0].picture = contact.picture;
            list.push(matchedList[0]);
            contacts = contacts.filter(function(el) {
              return !matchedList.includes(el);
            });
          }
        });

        this.sort(list);
        this.addAll(list);
        this.sort(contacts);
        this.addAll(contacts);
        this.loading = false;
      }
    });
  };

  sort = contacts => {
    if (contacts) {
      contacts.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      this.list.sort((a, b) => a.name.localeCompare(b.name));
    }
  };

  upload = () => {
    this.loading = true;
    return new Promise((resolve, reject) => {
      getAllContacts().then(contacts => {
        if (contacts.length > 0) {
          Meteor.call(
            'updateContactList',
            {
              contacts,
            },
            err => {
              if (!err) {
                this.load();
              } else {
                this.loading = false;
              }
            },
          );
          resolve(true);
        } else {
          this.loading = false;
          reject(false);
        }
      });
    });
  };

  removeAll = () => {
    let newList = this.list.filter(() => false);
    this.list.replace(newList);
  };

  updateFilter = data => {
    this.pagination = 1;
    this.filter = data.replace(/[^a-zA-Z0-9 ]/gi, '');
  };

  nextPage = () => {
    if (this.list.length > this.pagination * this.limit) {
      this.pagination++;
    }
  };

  @computed
  get filteredContacts() {
    let matchesFilter = new RegExp(this.filter, 'i');
    const filteredContacts = this.list
      .filter(data => !this.filter || matchesFilter.test(data.name))
      .slice(0, this.pagination * this.limit)
      .map(contact => {
        if (contact) {
          const selectedContact = this.list.find(
            participant => participant.phoneNumber === contact.phoneNumber,
          );
          if (selectedContact) {
            return selectedContact;
          }
        }
        return contact;
      });
    return filteredContacts;
  }

  // @computed
  // get addParticipantContacts() {
  //   let matchesFilter = new RegExp(this.filter, "i");
  //   const filteredContacts = this.list.filter((data) => !this.filter || matchesFilter.test(data.name))
  //     .filter((contact) => {
  //       if (Potluck.participants) {
  //         const selectedContact = Potluck.participants.find(participant => participant.phoneNumber === contact.phoneNumber);
  //         if (!selectedContact) {
  //           return true;
  //         }
  //       }
  //       return false;
  //     })
  //     .slice(0, this.pagination * this.limit);
  //   return filteredContacts;
  // }
}

export default new Contacts();
export {Contacts};
