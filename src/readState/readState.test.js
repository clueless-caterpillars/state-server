'use strict';

const readState = require('./readState');
const { S3Client, GetObjectCommand } = require("@aws-sdk/client-s3");
const client = new S3Client()

jest.mock('../getCreds/getCreds');
const creds = require('../getCreds/getCreds')
creds.mockImplementation(() => ['id', 'secret', 'token']);

jest.mock("@aws-sdk/client-s3", ()=>{
  const s3Interface = {
    S3Client: jest.fn(() => s3Interface),
    GetObjectCommand: jest.fn(() => s3Interface),
  };
  return {
    S3Client: jest.fn(() => s3Interface),
    GetObjectCommand: jest.fn(() => s3Interface),
  }
})

const transformToString = () => jest.fn()

client.send = jest.fn(()=> Promise.resolve(
    {Body: transformToString}
  )
)


xdescribe('Testing the function to get the current state of the Pi', () => {
  test('Should return the current state of the pi', async ()=>{
    const result = await readState();
    console.log(result);
    expect(result.state).toEqual('on')

  })
})