'use strict';

const readState = require('./readState');
const { S3Client, GetObjectCommand } = require("@aws-sdk/client-s3");
const client = new S3Client()

jest.mock('../getCreds/getCreds');
const creds = require('../getCreds/getCreds')
creds.mockImplementation(() => ['id', 'secret', 'token']);


let input = {
  Body: { state: 'on' }
}

jest.mock(new GetObjectCommand(input))

client.send = jest.fn(()=> Promise.resolve({
    json: () => Promise.resolve({ state: 'on' })
  })
)

describe('Testing the function to get the current state of the Pi', () => {
  test('Should return the current state of the pi', async ()=>{
    const result = await readState();
    console.log(result);
    expect(result.state).toEqual('on')

  })
})