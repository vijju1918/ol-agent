/**
 * Copyright (c) 2018-present, Oleum. All rights reserved.
 *
 */
 'use strict';
 import {observable, action} from 'mobx';
 import Meteor from '@meteorrn/core';

 import Account from '@stores/Account';
 
 class AgentPriceIntervalUpdate {
   
   @observable ready = false;
 
   @action
   logout() {
     this.ready = false;
   }

   addAgentPriceInterval = () => {
    this.addAgentPriceIntervalLoading = true;
    console.log( {
        agentId : Account.user.endUserId,
        date : (new Date()).toISOString().split('T')[0],
      })
     return new Promise((resolve, reject) => {
       Meteor.call(
            'addAgentPriceUpdateInterval',
         {
           agentId : Account.user.endUserId,
           date : (new Date()).toISOString().split('T')[0],
         },
         (err, data) => {
           if (!err) {
            this.addAgentPriceIntervalLoading = false;
             resolve(data);
           } else {
             this.addAgentPriceIntervalLoading = false;
             reject(err);
           }
         },
       );
     });
   };
}
 
 export default new AgentPriceIntervalUpdate();