'use strict';

function serverErr (err, req, res, next) {
  console.log(err);
  res.status(500).send('SERVER ERROR');
}

module.exports = serverErr;