'use strict';

function clientError (err, req, res, next) {
  console.log(err);
  res.status(500).send('SERVER ERROR');
}

module.exports = clientError;