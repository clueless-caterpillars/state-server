'use strict';

const server = require('../src/server');
const supertest = require('supertest');
const request = supertest(server);

describe('Testing the requests to the server', ()=>{

  test('Should post 404 on a a bad route', async ()=>{
    const response = await request.get('/bad-route');
    expect(response.status).toEqual(404)
  })

  test('Should post 404 on a bad method', async ()=>{
    const response = await request.delete('/capitalize-me');
    expect(response.status).toEqual(404)
  });


})