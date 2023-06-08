'use strict';

const postPlantStatus = require('./postPlantStatus');
global.fetch = jest.fn(()=> 
  Promise.resolve({
    json: ()=> Promise.resolve({ plant: 'new plant'})
  }))

test('Should return plants to be posted to the database', async ()=>{
  let result = await postPlantStatus({newplant: 'newplant'});
  // console.log(result)
  expect(result.plant).toEqual('new plant')
  expect(fetch).toHaveBeenCalled()
})