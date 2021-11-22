/**
 * Copyright (c) 2018-present, Evolvier Technologies. All rights reserved.
 *
 */

'use strict';

const introKeys = {
  customerIntroKey: 'CUSTOMER',
  agentIntroKey: 'AGENT',
  transferIntroKey: 'TRANSFER',
  donateIntroKey: 'DONATE',
  drIntroKey: 'DR',
  actionPromoIntroKey: 'ACTION',
  materialPromoIntroKey: 'MATERIAL',
  purchaseFuelIntroKey: 'FP',
  valuePromoIntroKey: 'VALUE',
};

const introTitles = {
  agentIntroTitle: 'Completing a Request',
  transferIntroTitle: 'Transfer FP to Friends',
  donateIntroTitle: 'Donate FP to Corporates',
  drIntroTitle: 'Dispense Fuel',
  actionPromoIntroTitle: 'Availing Action Promotion',
  materialPromoIntroTitle: 'Depositing a Material',
  purchaseFuelIntroTitle: 'Purchase FP',
  valuePromoIntroTitle: 'Upload Proof and Avail FP',
};

const promotionTyeps = {
  action: 'ACTION',
  material: 'MATERIAL',
  value: 'VALUE',
  fp: 'FP',
  other: 'OTHER',
};

const promotionStatus = {
  created: 'CREATED',
  active: 'ACTIVE',
  pending: 'PENDING',
  claimed: 'CLAIMED',
  completed: 'COMPLETED',
  canceled: 'CANCELED',
  published: 'PUBLISHED',
};

const userRoles = {
  corporate: 'corporate',
  endUser: 'customer',
  agent: 'agent',
  vehicle: 'vehicle',
};

const quantityType = {
  fuel: 'FUEL',
  fuelPoint: 'FUELPOINT',
  material: 'MATERIAL',
  currency: 'CURRENCY',
};

const drType = {
  fuel: 'FUEL',
  material: 'MATERIAL',
};

const transferTypes = {
  transfer: 'TRANSFER',
  reward: 'REWARD',
  purchase: 'PURCHASE',
  dispense: 'DISPENSE',
  donate: 'DONATE',
  redeem: 'REDEEM',
  refund: 'REFUND',
};

const productStatus = {
  activated: 'ACTIVATED',
  deactivated: 'DEACTIVATED',
  deleted: 'DELETED',
};

const paymentStatus = {
  failed: 'FAILED',
  completed: 'COMPLETED',
  pending: 'PENDING',
  canceled: 'CANCELED',
};

const invoiceType = {
  allInvoices: 'allInvoices',
};

const permissionStatusValues = {
  undefined: 'undefined',
  authorized: 'authorized',
  denied: 'denied',
  granted: 'granted',
  blocked: 'blocked',
};

const paymentModes = {
  fuelPoint: 'FP',
};

const configParameterKeys = {
  convenienceFee: 'convenienceFee',
  minBuildVersion: 'minBuildVersion',
  currentBuildVersion: 'currentBuildVersion',
  paymentModes: 'paymentModes',
  fallbackGoogleApiKey: 'fallbackGoogleApiKey',
};

const asyncStorageKeys = {
  lastFuelDispensedNozzleId: 'lastFuelDispensedNozzleId',
  lastSelectedUserRole: 'lastSelectedUserRole',
};

const userTypes = {
  oleum: 'oleum',
};

const canTypes = {
  oleum: 'oleum',
};

const fuelTambolaUrl =
  'https://play.google.com/store/apps/details?id=com.fueltambola';

const fuelTambolaPackageName = 'com.fueltambola';

const constants = {
  fuelTypes: [
    {
      title: 'Enter Fuel Point (FP)',
      value: quantityType.fuelPoint,
      unit: 'FP',
    },
    {
      title: 'Quantity (L)',
      value: quantityType.fuel,
      unit: 'L',
    },
  ],
  promotionFilter: [
    {
      title: 'Action',
      value: 'ACTION',
    },
    {
      title: 'Material Deposit',
      value: 'MATERIAL',
    },
    {
      title: 'Value Other',
      value: 'OTHER',
    },
  ],
  sbuFilter: [
    {
      title: 'Distance',
      value: 'distance',
    },
    {
      title: 'Rating',
      value: 'rating',
    },
  ],
  materialSbuFilter: [
    {
      title: 'Rating',
      value: 'rating',
    },
  ],
  customerIntro: [
    {
      key: '1',
      title: 'Dispense Fuel',
      text:
        'Dispense fuel from anywhere without money. All you need is Fuel Points(FP).',
      image:
        'https://res.cloudinary.com/dqpjrkdne/image/upload/v1593774725/Info_Images/Dispense-Fuel_n9viqf.png',
    },
    {
      key: '2',
      title: 'Transfer Fuel Points(FP)',
      text: 'Share Fuel Points with your friends in simple steps.',
      image:
        'https://res.cloudinary.com/dqpjrkdne/image/upload/v1593774727/Info_Images/Transfer-to-_a-friend_enmgop.png',
    },
    {
      key: '3',
      title: 'Track Mileage',
      text: 'Get your vehicle fuel efficiency reports',
      image:
        'https://res.cloudinary.com/dqpjrkdne/image/upload/v1593774727/Info_Images/Track-milage_n4zcbp.png',
    },
    {
      key: '4',
      title: 'Avail promotions and get Fuel Points(FP)',
      text: 'Complete simple tasks and get rewarded with Fuel Points.',
      image:
        'https://res.cloudinary.com/dqpjrkdne/image/upload/v1593774726/Info_Images/Get-FP_msh8a6.png',
    },
  ],
  agentIntro: [
    {
      key: '1',
      title: 'Scan QR or enter ID',
      text: 'Scan the QR code or enter the reference ID from the customer.',
      image:
        'https://res.cloudinary.com/dqpjrkdne/image/upload/v1593774726/Info_Images/Scan-QR-or-enter-the-ID_mtuulj.png',
    },
    {
      key: '2',
      title: 'Enter the quantity',
      text:
        'Enter the quantity of fuel dispensed / material collected from a customer.',
      image:
        'https://res.cloudinary.com/dqpjrkdne/image/upload/v1593774726/Info_Images/Enter-the-quantity_v1uiad.png',
    },
    {
      key: '3',
      title: 'Complete the request',
      text: 'Complete the request and confirm the receipt.',
      image:
        'https://res.cloudinary.com/dqpjrkdne/image/upload/v1593774726/Info_Images/Scan-QR-or-enter-the-ID_mtuulj.png',
    },
  ],
  transferIntro: [
    {
      key: '1',
      title: 'Select Can',
      text: 'Select the can from which you want to transfer FP.',
      image:
        'https://res.cloudinary.com/dqpjrkdne/image/upload/v1593774726/Info_Images/Select-a-can_cx7cwc.png',
    },
    {
      key: '2',
      title: 'Enter the FP',
      text: 'Enter the Fuel Points to transfer.',
      image:
        'https://res.cloudinary.com/dqpjrkdne/image/upload/v1593774726/Info_Images/Enter-the-quantity_v1uiad.png',
    },
    {
      key: '3',
      title: 'Choose Contact',
      text: 'Select the contact from your contact list.',
      image:
        'https://res.cloudinary.com/dqpjrkdne/image/upload/v1593774725/Info_Images/chose-a-contact_uvcdai.png',
    },
    {
      key: '4',
      title: 'Transfer to friend',
      text: 'Click Transfer to complete the transaction.',
      image:
        'https://res.cloudinary.com/dqpjrkdne/image/upload/v1593774727/Info_Images/Transfer-to-_a-friend_enmgop.png',
    },
  ],
  donateIntro: [
    {
      key: '1',
      title: 'Select Can',
      text: 'Select the can from which you want to donate FP.',
      image:
        'https://res.cloudinary.com/djxme54wa/image/upload/v1572933051/Into%20images/select_can_gscvef.png',
    },
    {
      key: '2',
      title: 'Enter the FP',
      text: 'Enter the Fuel Points to donate.',
      image:
        'https://res.cloudinary.com/djxme54wa/image/upload/v1572933051/Into%20images/enter_the_fp_y5uaru.png',
    },
    {
      key: '3',
      title: 'Choose Corporate',
      text: 'Select the corporate from the list.',
      image:
        'https://res.cloudinary.com/djxme54wa/image/upload/v1572933050/Into%20images/choose_the_corporate_zvfdtl.png',
    },
    {
      key: '4',
      title: 'Donate FP',
      text: 'Click Donate to complete the transaction.',
      image:
        'https://res.cloudinary.com/djxme54wa/image/upload/v1572933050/Into%20images/donate_fp_uis8ua.png',
    },
  ],
  dispenseRequestIntro: [
    {
      key: '1',
      title: 'Select location & Can',
      text:
        'Select the location, dispensation date and the can from which you like to dispense fuel.',
      image:
        'https://res.cloudinary.com/dqpjrkdne/image/upload/v1593774728/Info_Images/Select-location-_-Can_tkuswe.png',
    },
    {
      key: '2',
      title: 'Choose a Product',
      text: 'Select the product from the list and enter the quantity.',
      image:
        'https://res.cloudinary.com/dqpjrkdne/image/upload/v1593774724/Info_Images/Choose-Product_xsoaa0.png',
    },
    {
      key: '3',
      title: 'Create DR',
      text: 'Click the button to generate QR code with reference ID.',
      image:
        'https://res.cloudinary.com/djxme54wa/image/upload/v1572933050/Into%20images/create_dr_jd6bxr.png',
    },
    {
      key: '4',
      title: 'Show at Fuel Station',
      text: 'Show the generated QR code or reference ID at the Fuel Station.',
      image:
        'https://res.cloudinary.com/dqpjrkdne/image/upload/v1593774727/Info_Images/Show-at-_Fuel-Station_c6dben.png',
    },
    {
      key: '5',
      title: "That's all!",
      text: 'Get the fuel dispensed and confirm the receipt.',
      image:
        'https://res.cloudinary.com/dqpjrkdne/image/upload/v1593774725/Info_Images/Dispense-Fuel_n9viqf.png',
    },
  ],
  actionPromoIntro: [
    {
      key: '1',
      title: 'Visit a Website',
      text: 'Earn Fuel Points on a single click.',
      image:
        'https://res.cloudinary.com/djxme54wa/image/upload/v1572933052/Into%20images/visit_a_site_aclzvz.png',
    },
    {
      key: '2',
      title: 'Watch a Video',
      text: 'Earn Fuel Points by watching videos.',
      image:
        'https://res.cloudinary.com/djxme54wa/image/upload/v1572933052/Into%20images/watchvideo_gtb0co.png',
    },
  ],
  materialPromoIntro: [
    {
      key: '1',
      title: 'Select the range',
      text: 'Select the quantity of material to deposit.',
      image:
        'https://res.cloudinary.com/dqpjrkdne/image/upload/v1593774727/Info_Images/select-quantity_p7ntbf.png',
    },
    {
      key: '2',
      title: 'Create DR',
      text: 'Click the button to generate QR code with reference ID.',
      image:
        'https://res.cloudinary.com/dqpjrkdne/image/upload/v1593774725/Info_Images/Create-DR_h2yfyx.png',
    },
    {
      key: '3',
      title: 'Show at Collection Point',
      text:
        'Show the generated QR code or reference ID at the Collection Point.',
      image:
        'https://res.cloudinary.com/dqpjrkdne/image/upload/v1593774727/Info_Images/Show-at-Collection-Point_k0mp73.png',
    },
    {
      key: '4',
      title: 'Deposit material',
      text: 'Deposit the collected material and earn Fuel Points.',
      image:
        'https://res.cloudinary.com/dqpjrkdne/image/upload/v1593774725/Info_Images/Deposit-material_igr6jw.png',
    },
  ],
  purchaseFuelPromoIntro: [
    {
      key: '1',
      title: 'Select the range',
      text: 'Select the price range and enter the amount.',
      image:
        'https://res.cloudinary.com/dqpjrkdne/image/upload/v1593774726/Info_Images/select-range_adq7ta.png',
    },
    {
      key: '2',
      title: 'Make payment',
      text: 'Complete the payment by choosing any method.',
      image:
        'https://res.cloudinary.com/dqpjrkdne/image/upload/v1593774725/Info_Images/Complete-the-payment_ucsuvy.png',
    },
    {
      key: '3',
      title: 'Get FP',
      text: 'Earn extra Fuel Points as reward.',
      image:
        'https://res.cloudinary.com/dqpjrkdne/image/upload/v1593774726/Info_Images/Get-FP_msh8a6.png',
    },
  ],
  valuePromoIntro: [
    {
      key: '1',
      title: 'Upload the proof',
      text: 'Upload bills of your purchases.',
      image:
        'https://res.cloudinary.com/dqpjrkdne/image/upload/v1593774727/Info_Images/upload-the-proof_n4oel3.png',
    },
    {
      key: '2',
      title: 'Get FP',
      text: 'Earn Fuel Points on approval.',
      image:
        'https://res.cloudinary.com/dqpjrkdne/image/upload/v1593774724/Info_Images/Avail-promotions-_and-get-FP_vvvol6.png',
    },
  ],
  quantityType,
  drType,
  promotionStatus,
  transferTypes,
  ...introKeys,
  ...introTitles,
  ...promotionTyeps,
  ...userRoles,
  productStatus,
  invoiceType,
  permissionStatusValues,
  paymentModes,
  configParameterKeys,
  asyncStorageKeys,
  userTypes,
  canTypes,
  paymentStatus,
  fuelTambolaUrl,
  fuelTambolaPackageName,
};

export default constants;
