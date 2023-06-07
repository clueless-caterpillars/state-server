
// const axios = require('axios');

async function postPlantStatus(newPlant) {

  try {

    let config = {
      method: "POST",
      body: JSON.stringify(newPlant)
    }
  
    let postedPlant = await fetch('https://313kw3q2id.execute-api.us-west-2.amazonaws.com/test-deploy/status', config);
    let resultedPlant = await postedPlant.json()
    console.log('NEW PLANT', resultedPlant);
    return resultedPlant
  }
  catch(e){
    console.log(e)
  }

}

module.exports = postPlantStatus;