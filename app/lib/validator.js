/**
 * Copyright (c) 2018-present, Evolvier Technologies. All rights reserved.
 *
 */

'use strict';

import Validator from 'react-native-joi';

export function isNumber(value, required = false) {
  let schema = Validator.number();
  if (required) {
    schema = schema.required();
  }
  let result = schema.validate(value);
  if (result.error) {
    if (value) {
      return {
        status: false,
        message: 'Enter a valid number',
      };
    }
    return {
      status: false,
      message: 'This field is required',
    };
  } else {
    return {
      status: true,
    };
  }
}

export function isRequired(value) {
  let result = Validator.string()
    .required()
    .validate(value);
  if (result.error) {
    return {
      status: false,
      message: 'This field is required',
    };
  } else {
    return {
      status: true,
    };
  }
}

export function isEmail(value, required = false) {
  let schema = Validator.string().email();
  if (required) {
    schema = schema.required();
  }
  let result = schema.validate(value);
  if (result.error) {
    if (result.error.details[0].type === 'string.email') {
      return {
        status: false,
        message: 'Enter a valid email',
      };
    }
    return {
      status: false,
      message: 'This field is required',
    };
  } else {
    return {
      status: true,
    };
  }
}
