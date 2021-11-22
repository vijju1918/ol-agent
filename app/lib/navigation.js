/**
 * Copyright (c) 2018-present, Oleum. All rights reserved.
 *
 */

'use strict';

import {Actions} from 'react-native-router-flux';

import Promotions from '@stores/Promotions';
import {AppConstants} from '@config';

export function openPromotionPageFromRef(data) {
  if (data && data.ref) {
    if (!Promotions.isLoading) {
      let promotion = Promotions.list.find(
        item => item.referenceId === data.ref,
      );
      openPromotion(promotion, data.ref);
    } else {
      let timer = setInterval(() => {
        if (!Promotions.isLoading) {
          clearInterval(timer);
          let promotion = Promotions.list.find(
            item => item.referenceId === data.ref,
          );
          openPromotion(promotion, data.ref);
        }
      }, 200);
    }
  }
}

function openPromotion(promotion, referenceId) {
  if (promotion) {
    switch (promotion.type) {
      case AppConstants.action:
        Actions.promotionDetails({
          promotion: promotion,
        });
        break;
      case AppConstants.material:
        Actions.materialPromotionDetails({
          promotion: promotion,
        });
        break;
      case AppConstants.value:
        if (promotion.valueType.type === 'FP') {
          Actions.purchaseFuelPromoDetails({
            referenceId: referenceId,
          });
        } else {
          Actions.valuePromotionDetails({
            promotion: promotion,
          });
        }
        break;
    }
  }
}
