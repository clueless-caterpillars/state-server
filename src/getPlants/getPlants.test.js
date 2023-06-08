'use strict';

const getPlants = require('./getPlants');

global.fetch = jest.fn(()=> 
  Promise.resolve({
    json: ()=> Promise.resolve({ plant: 'good'})
  }));

beforeEach(()=>{
  fetch.mockClear();
})

describe('Tests for getting plants from DB', () => {
  test('Get plants from DB', async ()=> {
    let allPlantsResult = await getPlants('day',{date:'today'})
    expect(allPlantsResult.plant).toEqual('good')
  });

})