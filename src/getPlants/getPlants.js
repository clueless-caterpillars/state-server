

async function getPlants(params='', query='') {
  let url = 'https://313kw3q2id.execute-api.us-west-2.amazonaws.com/test-deploy/status';
  console.log(params, typeof(query))
  if (params) {
    if (Object.keys(query).length){
      console.log('QUERY', Object.keys(query))
      let queryKey = Object.keys(query)[0];
      let queryValue = Object.values(query)[0];
      url = `${url}${params}?${queryKey}=${queryValue}`
    }
    else {
      url = `${url}${params}`
    }
    
  }
  console.log(url)
  let plantStatus = await fetch(url);
  let plantStatusResult = await plantStatus.json();
  console.log('YOUR CURRENT PLANTS', plantStatusResult)
  return plantStatusResult;
}

module.exports = getPlants;