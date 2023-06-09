'use strict';

const getCreds = require('../getCreds/getCreds')
const { S3Client, GetObjectCommand } = require("@aws-sdk/client-s3");

async function getState (){


  const creds = await getCreds();
  const user = {
    region: "us-west-2",
    credentials: {
      accessKeyId: creds[0],
      secretAccessKey: creds[1],
      sessionToken: creds[2]
    }
}

    
  const client = new S3Client(user);
  
  // const client = new S3Client()


  const input = { 
    Bucket: 'pi-state', 
    Key: 'state.json' 
  };
  const response = await client.send(new GetObjectCommand(input));
  console.log(response.Body)
  let stateData = await response.Body.transformToString();
  // console.log(stateData)
  // stateData = JSON.parse(stateData)
  
  console.log('Current RPi state' + stateData);
  return stateData;
}

// getState()

module.exports = getState;