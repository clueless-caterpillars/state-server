'use strict';

const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');

async function togglePiState(state='off') {
  
  const AWS_REGION = 'us-west-2';
  AWS.config.update({ region: AWS_REGION});
  
  const sns = new AWS.SNS({ apiVersion: '2010-03-31', region: 'us-west-2' });
  // const { Consumer } = require('sqs-consumer');
  
  //FIFO SNS holds pick up
  const AWS_PISTATE_SNS = 'arn:aws:sns:us-west-2:919132472542:PiStatus.fifo';
  // const AWS_TOGGLEPISTATE_SQS = 'https://sqs.us-west-2.amazonaws.com/919132472542/TogglePiState.fifo';
  
  let id = uuidv4();
  const piState ={
    state: state,
    id: id
  };
  
  //send message to pickup SNS
  const payload = {
    Message: JSON.stringify(piState),
    MessageGroupId: id,
    TopicArn: AWS_PISTATE_SNS
  }
  
  await sns.publish(payload).promise()
  .then( state => {
    console.log('Current Pi State, ', state);
  })
  .catch((e) => {
    console.log('Pi state failed to send ', e);
  })
  
}

module.exports = togglePiState