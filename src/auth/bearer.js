'use strict';

const base64 = require('base-64');

const { TEST_USER_JWT } = require('./users');

module.exports = async (req, res, next) => {

  try {
    if (!req.headers.authorization) { _authError() }
    console.log("TEST USER JWT IS: " + TEST_USER_JWT);
    const REQUEST_ENCODED_TOKEN = req.headers.authorization.split(' ').pop();
    const DECODED_JWT = base64.decode(REQUEST_ENCODED_TOKEN);
    console.log("DECODED JWT IS: " + DECODED_JWT);
    if (TEST_USER_JWT === DECODED_JWT) {
      console.log("valid token received from mobile client");
      next();
    }
  } catch (e) {
    _authError();
  }

  function _authError() {
    next('BEARER AUTH TOKEN NOT VALID');
  }
}