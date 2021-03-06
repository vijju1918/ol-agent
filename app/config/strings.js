/**
 * Copyright (c) 2018-present, Oleum. All rights reserved.
 *
 */

'use strict';

const strings = {
  appName: 'Oleum',
  roleSelectionInfo:
    'Your mobile number <number> is linked with a Retail Outlet. Please select your role to continue.',
  enterId: 'Reference Id',
  enterVehicleNumber: 'Vehicle Number',
  enterPin: 'Please enter the PIN',
  loginWithNumber: 'Login with mobile number',
  verifyNumber: 'Verify Your mobile number',
  verifyNumberInfo:
    'Oleum will send a verification number to your mobile number. Please enter your mobile number',
  textNotReceived: 'Didn’t receive a code ?',
  resend: 'Resend',
  otpInfo: 'Please enter the 6-digit code sent to <number>',
  changeNumber: 'Change Phone Number',
  agentUpperCase: 'AGENT',
  customerUpperCase: 'CUSTOMER',
  dispense: 'DISPENSE',
  scan: 'SCAN',
  pending: 'PENDING',
  completed: 'COMPLETED',
  searchLocation: 'Search Location',
  selectDate: 'Expiry Date',
  selectVendor: 'Select Can',
  nearByRO: 'Nearby SBUs',
  viewRO: 'View SBUs',
  details: 'Details',
  newPromos: "What's New?",
  recommendedPromos: 'Recommended for you',
  allPromos: 'All Promotions',
  activePromoInfo: 'You have <number> active Promotions',
  drTypeFuel: 'Fuel',
  drTypeMaterial: 'Plastic',
  fuelPoint: 'Fuel Point',
  fuelPoints: 'Fuel Points',
  lastUpdated: 'Last updated ',
  fp: 'FP',
  drUpper: 'DR',
  quantity: 'Quantity (L)',
  product: 'Product',
  customer: 'Customer',
  note: 'Note',
  notePlaceholder: 'Write a note...',
  order: 'Order',
  type: 'Type',
  validity: 'Validity: ',
  termsAndConditions: 'Terms & Conditions',
  price: 'Price: ',
  promotionBy: 'Promotion By : ',
  transferTo: 'Transfer to',
  uploadedImage: 'Uploaded Image',
  depositRequestStatus: 'Deposit Request (DR) has been successfully generated.',
  summary: 'Summary',
  reward: 'Reward',
  transferUpperCase: 'TRANSFER',
  transfer: 'Transfer',
  rateTransaction: 'Rate this transaction',
  submit: 'SUBMIT',
  skip: 'SKIP',
  save: 'SAVE',
  next: 'NEXT',
  done: 'DONE',
  ok: 'OK',
  clickHere: 'Click here',
  expressInterest: 'EXPRESS INTEREST',
  locateRequest: 'LOCATE REQUEST',
  completeOrder: 'COMPLETE REQUEST',
  sendCode: 'LOGIN USING OTP',
  sendOTP: 'SEND OTP',
  updateBill: 'Change',
  uploadBill: 'Upload Proof of Purchase',
  selectFromList: 'Select from contact list',
  materialRangeInfoText: 'Material Quantity Range & Rewards (<condition>)',
  nearByCollectionPointsInfoText: 'Nearby Collection Points',
  viewCollectionPoints: 'View Nearby Collection Points',
  distance: 'Distance : ',
  km: 'Km',
  version: 'Version 0.0.1',
  copyrightText: '© 2018-2020 Oleum Inc.',
  rightsText: 'All rights reserved.',
  linkTitle: 'Evolvier Technologies ',
  promoBy: 'Promoted By',
  selectPayment: 'Select Payment',
  debitCard: 'Debit Card',
  creditCard: 'Credit Card',
  netBanking: 'Net Banking',
  totalPayable: 'Total Payable',
  payNow: 'PAY NOW',
  paymentSuccessful: 'Congratulations, Payment successful!',
  rupeeSymbol: '₹ ',
  agreementText: 'I agree to the terms and conditions',
  purchaseStatusInfo: 'Fuel Point Purchased Successfully',
  orderDetails: 'Order Details',
  paymentDetails: 'Payment',
  paymentMethod: 'Payment Method : ',
  paymentStatus: 'Payment Status : ',
  paymentChannel: 'Payment Channel :',
  amountPaid: 'Amount Paid',
  statusInfoText: 'Successful',
  purchasePriceInfo: 'Purchase Price Range and Rewards (<condition>)',
  actionLinkType: 'LINK',
  actionVedioType: 'VIDEO',
  actionOtherType: 'OTHER',
  actions: 'Actions (<number>)',
  multiActionInfo: 'Customer must complete all actions to get rewards',
  singleActionInfo: 'Customer must complete any actions to get rewards',
  redeemSingleType: 'SINGLE',
  vendor: 'Vendor',
  linkDescription: 'Click And Get FP',
  debit: 'Debit',
  credit: 'Credit',
  selectLocation: 'Select Location',
  corporateListSelection: 'Select corporate from list',
  donateTitle: 'Donate',
  fpTransferInfo: ' Enter the FP to transfer',
  nothing: 'No corporates found!!',
  corporate: 'corporate',
  customerSmall: 'customer',
  promotionShareMessage:
    'Hi, please checkout this promotion. \nClick here: <url> \n\nDownload Oleum application and avail the promotion',
  donateInfo:
    'Great, by availing this promotion you are going to donate the FP to ',
  privacyPolicy: 'Privacy Policy',
  from: 'From',
  to: 'To',
  selectPersonalCan: 'Select personal can',
  selectVehicleCan: 'Select vehicle can',
  selectVehicle: 'Select vehicle',
  vehicle: 'Vehicle',
  proceedToPay: 'Proceed to Pay',
};

const sceneTitles = {
  selectRole: 'Select Role',
  dr: 'Pending Requests',
  myCan: 'My Can',
  transferFP: 'Transfer Fuel Points',
  dispenseRequest: 'Dispense Request',
  drSummary: 'Request Summary',
  drReceipt: 'Request Receipt',
  drDetails: 'Details',
  transferDetails: 'My Transfers',
  transferDetailsReceipt: 'Transfer Details',
  myDispensationsHistory: 'My Dispensations/Deposits',
  myDispensationsHistoryDetails: 'Details',
  myTransferHistoryDetails: 'Transfer Details',
  activePromosList: 'Pending Actions',
  promotionsHome: 'Promotion',
  promotionDetails: 'Promotion Details',
  promoHistoryDetails: 'Promo History Details',
  materialPromotionDetails: 'Promotion Details',
  promotionsAndRewards: 'My Rewards',
  depositRequestReceipt: 'Deposit Request',
  profile: 'Profile',
  agentHome: 'Agent',
  agentReceipt: 'Agent Receipt',
  agentRequestDetails: 'Request Details',
  agentDispensationHistory: 'My Transactions',
  aboutOleum: 'About Oleum',
  orderSummary: 'Order Summary',
  outlets: 'SBUs',
  myPurchaseHistory: 'My Purchases',
  transactiondetails: 'Recent Activity',
  sbuRatingList: 'My Vendor Rating',
  promoRatingList: 'My Promotion Rating',
  myLocations: 'My Locations', 
  notification: 'Notifications',
  donate: 'Donate Fuel Points',
  myDonations: 'My Donations',
  allTransactions: 'All Transactions',
};
export default {
  ...strings,
  ...sceneTitles,
};
