'use strict';

const getCreds = require('./getCreds');

global.fetch = jest.fn(()=> 
{
  return Promise.resolve({
    text: () => Promise.resolve('YOURTOKEN'),
    json: () => Promise.resolve({ AccessKeyId: 'YOURKEY', SecretAccessKey: 'YOURSECRET', Token:'YOURTOKEN' })
  })
})

beforeEach(() => {
  fetch.mockClear();
});

describe('Tests for getting credentials from AWS EC2', ()=> {
  test('Should return a list of credentials consists of key, secret, and token', async ()=>{
    let creds = await getCreds()
    // console.log(creds);

    expect(creds).toEqual(["YOURKEY", "YOURSECRET", "YOURTOKEN"])
  })
})