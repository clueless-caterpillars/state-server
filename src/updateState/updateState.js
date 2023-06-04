'use strict';

const { PutObjectCommand, S3Client } = require('@aws-sdk/client-s3');

const client = new S3Client({ region: 'us-west-2' });
// const fs = require('fs');

async function updateState(state='off') {

  let data = {
    state: state
  }
  
    const command = new PutObjectCommand({
      Bucket: "pi-state",
      Key: "state.json",
      Body: JSON.stringify(data),
    });

    try {
      const response = await client.send(command);
      console.log('UPDATE STATE: ', response);
    } catch (err) {
      console.error(err);
    }
};


module.exports = {
  updateState
}