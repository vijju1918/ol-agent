/**
 * Copyright (c) 2018-present, Oleum. All rights reserved.
 *
 */

'use strict';
import {Alert} from 'react-native';
import {Actions} from 'react-native-router-flux';
// import NavBarTitle from "@components/NavBarTitle";
import Communications from 'react-native-communications';
// import React from "react";

// import AppStrings from "@config/strings";

// const sample = () => {
//   console.log("Pressed");
// };

const sendFeedback = () => {
  Communications.email(
    [' support@oleumx.com'],
    null,
    null,
    'Feedback-Oleum',
    null,
  );
};

const onPressLogOut = () => {
  Alert.alert(
    'Are you sure?',
    'Do you really want to logout from Oleum?',
    [
      {
        text: 'No',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'Yes, Logout', onPress: () => Actions.logout()},
    ],
    {cancelable: false},
  );
};

const onPressOleumSupport = () => {
  Communications.phonecall('18004205566', true);
};

export const userDrawer = [
  {
    title: 'My Profile',
    icon: 'oleum_my-profile',
    type: 'single',
    onPress: () => Actions.profile(),
    divider: false,
  },
  {
    title: 'My Transactions',
    icon: 'oleum_my-transactions',
    type: 'group',
    divider: false,
    data: [
      {
        title: 'Purchase',
        onPress: () => Actions.myPurchaseHistory(),
      },
      {
        title: 'Transfers',
        onPress: () => Actions.myTransferHistory(),
      },
      {
        title: 'Dispensations/Deposits',
        onPress: () => Actions.myDispensationsHistory(),
      },
      // {
      //   title: 'Rewards',
      //   onPress: () => Actions.myRewardsHistory(),
      // },
      // {
      //   title: 'Donations',
      //   onPress: () => Actions.myDonations(),
      // },
      {
        title: 'All Transactions',
        onPress: () => Actions.allTransactions(),
      },
    ],
  },
  {
    title: 'My Locations',
    icon: 'oleum-03',
    type: 'single',
    onPress: () => Actions.myLocations(),
    divider: false,
  },
  {
    title: 'My Vendor Rating',
    icon: 'oleum_my-vendor-rating',
    type: 'single',
    onPress: () => Actions.sbuRatingList(),
    divider: false,
  },
  {
    title: 'My Promotion Rating',
    icon: 'oleum_click',
    type: 'single',
    onPress: () => Actions.promoRatingList(),
    divider: false,
  },
  {
    title: 'Memberships',
    icon: 'oleum_home',
    type: 'single',
    onPress: () => Actions.memberships(),
    divider: false,
  },
  {
    title: 'About Oleum',
    icon: 'oleum_home',
    type: 'single',
    onPress: () => Actions.aboutOleum(),
    divider: true,
  },
  // {
  //   title: "Rate and Review",
  //   icon: "star-half",
  //   type: "single",
  //   onPress: sample,
  //   divider: false
  // },
  {
    title: 'Send Feedback',
    icon: 'oleum_send-feedback',
    type: 'single',
    onPress: sendFeedback,
    divider: false,
  },
  // {
  //   title: "Terms & Conditions",
  //   icon: "file-document-outline",
  //   type: "single",
  //   onPress: () => Actions.webViewPage({
  //     renderTitle: <NavBarTitle title={AppStrings.termsAndConditions} />
  //   }),
  //   divider: false
  // },
  {
    title: 'Logout',
    icon: 'oleum_logout',
    type: 'single',
    onPress: onPressLogOut,
    divider: false,
  },
];

export const agentDrawer = [
  {
    title: 'My Profile',
    icon: 'oleum_my-profile',
    type: 'single',
    onPress: () => Actions.agentProfile(),
    divider: false,
  },
  {
    title: 'My Transactions',
    icon: 'oleum_tank',
    type: 'single',
    onPress: () => Actions.agentDispensationHistory(),
    divider: false,
  },
  // {
  //   title: "About Oleum",
  //   icon: "information-outline",
  //   type: "single",
  //   onPress:  () => Actions.aboutOleum(),
  //   divider: true
  // },
  // {
  //   title: "Send Feedback",
  //   icon: "message-plus",
  //   type: "single",
  //   onPress: sample,
  //   divider: false
  // },
  // {
  //   title: "Terms & Conditions",
  //   icon: "file-document-outline",
  //   type: "single",
  //   onPress: () => Actions.webViewPage({
  //     renderTitle: <NavBarTitle title={AppStrings.termsAndConditions} />
  //   }),
  //   divider: false
  // },
  {
    title: 'Oleum Support',
    icon: 'phone',
    type: 'single',
    onPress: onPressOleumSupport,
    divider: false,
    materialIcon: true,
  },
  {
    title: 'Logout',
    icon: 'oleum_logout',
    type: 'single',
    onPress: onPressLogOut,
    divider: false,
  },
];
