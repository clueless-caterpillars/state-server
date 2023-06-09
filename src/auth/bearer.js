'use strict';

const base64 = require('base-64');
const jwt_decode = require('jwt-decode');
const { CognitoJwtVerifier } = require('aws-jwt-verify')

// const { TEST_USER_JWT } = require('./users');
const TEST_USER_JWT = process.env.TEST_USER_JWT

module.exports = async (req, res, next) => {
  console.log('HEADERS', req.headers.authorization)
  if (!req.headers.authorization) { _authError() }
  else {
    try {
      // console.log("TEST USER JWT IS: " + TEST_USER_JWT);
      const REQUEST_ENCODED_TOKEN = req.headers.authorization.split(' ').pop();
      // console.log('REQUEST ENCDED TOKEN', REQUEST_ENCODED_TOKEN);

      // const DECODED_JWT = jwt_decode(REQUEST_ENCODED_TOKEN);

      // console.log("DECODED JWT IS: " + JSON.stringify(DECODED_JWT));

      const verifier = CognitoJwtVerifier.create({
        userPoolId: "us-west-2_llNHChsXX",
        tokenUse: null,
        clientId: "raf0a6jhcll4haamgduhi2bvp",
      });

      const awsVerify = await verifier.verify(REQUEST_ENCODED_TOKEN);
      console.log('Token is valid', awsVerify);

        next();
    } catch (e) {
      _authError();
    }
  }

  function _authError() {
    next('BEARER AUTH TOKEN NOT VALID');
  }
}