'use strict';

const capitalize = require('./capitalize')

describe('Testing the parameters are properly capilitalized', ()=>{
  it('Should capitalize the query parameters', ()=>{
    let output = capitalize('caterpillar');
    expect(output).toEqual('CATERPILLAR')
  })
})